import { useFileStore } from "@/stores/files";
import { useUploadStore } from "@/stores/upload";
import { addImageToDB, addVideoToDB } from "../gql/file";
import { storeToRefs } from "pinia";
import { type Range, UploadStatus, type UploadFileResponse, type GeneratePreviewResponse, type UploadEntry } from "@/types/files/FileUpload";

export enum UploadAction {
    queued = "Queued",
    uploading = "Uploading",
    preview = "Generating preview",
    db = "Adding to database"
}

export function uploadFiles() {
    const uploadStore = useUploadStore()
    const fileStore = useFileStore()
    const { items } = storeToRefs(useUploadStore());
    if (items.value.length == 0) return;
    uploadStore.setProgress(true);
    let cnt = 0;
    items.value.forEach(item => {
        let result: UploadFileResponse;
        uploadFileRequest(item, { from: 0, to: 40 })
            .then(uploadResult => {
                result = uploadResult;
                return generateThumbnailRequest(uploadResult.file_name_full, item, { from: 40, to: 80 })
            })
            .then(previewResult => {
                result = { ...result, ...previewResult }
                uploadStore.setActionFor(item.id, UploadAction.db)
                if (result.type == 'image') return addImageToDB(result);
                if (result.type == 'video') return addVideoToDB(result);
            })
            .then(fileInfo => {
                if (!fileInfo) return uploadStore.setErrorFor(item.id, 'Type of file is not image or video');
                fileStore.add(fileInfo)
                uploadStore.setStatusFor(item.id, UploadStatus.done)
                handleEnd()
            })
            .catch(err => {
                console.log(err);
                uploadStore.setErrorFor(item.id, `${err}`)
                handleEnd()
            })
    })
    function handleEnd() {
        cnt += 1;
        if (cnt == items.value.length) {
            uploadStore.setProgress(false);
            uploadStore.clearFinished();
        }
    }
}

export async function uploadFileRequest(item: UploadEntry, percentRange?: Range): Promise<UploadFileResponse> {
    return new Promise(function (resolve, reject) {
        const uploadStore = useUploadStore();
        uploadStore.setActionFor(item.id, UploadAction.uploading)
        const uploadSingle = `http://${import.meta.env.VITE_FILE_HOST}:${import.meta.env.VITE_FILE_PORT}${import.meta.env.VITE_FILE_UPSINGLE}`;

        const formData = new FormData();
        formData.append("file", item.file, item.file.name)
        const xhr = new XMLHttpRequest();
        xhr.open("POST", uploadSingle, true);

        xhr.upload.onprogress = (e: any) => uploadStore.setPercentFor(item.id, getPercentInRange((e.loaded / e.total) * 100, percentRange))

        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(JSON.parse(xhr.response));
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };
        xhr.send(formData);
    });
}

export async function generateThumbnailRequest(filename: string, item: UploadEntry, percentRange?: Range): Promise<GeneratePreviewResponse> {
    return new Promise(function (resolve, reject) {
        const uploadStore = useUploadStore();
        uploadStore.setActionFor(item.id, UploadAction.preview)
        const uploadPreview = `http://${import.meta.env.VITE_FILE_HOST}:${import.meta.env.VITE_FILE_PORT}${import.meta.env.VITE_FILE_UPPREVIEW}/${filename}`;

        const evtSource = new EventSource(uploadPreview);
        evtSource.onmessage = (e) => {
            const data = JSON.parse(e.data);
            uploadStore.setDetailsFor(item.id, data.msg, getPercentInRange(data.percent, percentRange))
            if (data.error) {
                evtSource.close()
                reject(data)
            }
            if (data.data) {
                evtSource.close()
                resolve(data.data)
            }
        }
        evtSource.onerror = (e) => {
            evtSource.close()
            reject('Error creating preview')
        }
    })
}

export const getPercentInRange = (percent: number, range?: Range): number => range ? Math.round(range.from + ((range.to - range.from) * percent / 100)) : percent