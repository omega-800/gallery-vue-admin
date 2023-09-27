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

export async function uploadFiles() {
    const uploadStore = useUploadStore()
    const fileStore = useFileStore()
    const { items } = storeToRefs(useUploadStore());
    if (items.value.length == 0) return;
    uploadStore.setProgress(true);

    for (const item of items.value) {
        let uploadResult: UploadFileResponse;
        try {
            uploadResult = await uploadFileRequest(item, uploadStore, { from: 0, to: 40 });
        } catch (err) {
            console.log(err);
            continue;
        }
        let previewResult: GeneratePreviewResponse;
        try {
            previewResult = await generateThumbnailRequest(uploadResult.file_name_full, item, uploadStore, { from: 40, to: 80 });
        } catch (err) {
            console.log(err);
            continue;
        }

        const result = { ...uploadResult, ...previewResult };
        let fileInfo: any;
        try {
            uploadStore.setActionFor(item.id, UploadAction.db)
            if (result.type == 'image') {
                fileInfo = await addImageToDB(result);
            } else if (result.type == 'video') {
                fileInfo = await addVideoToDB(result);
            } else {
                uploadStore.setErrorFor(item.id, 'Type of file is not image or video')
                continue;
            }
        } catch (err) {
            console.log(err);
            uploadStore.setErrorFor(item.id, `${err}`)
            continue;
        }
        fileStore.add(fileInfo)
        uploadStore.setStatusFor(item.id, UploadStatus.done)
    }
    uploadStore.setProgress(false);
    uploadStore.clearFinished();
}

export async function uploadFileRequest(item: UploadEntry, uploadStore: any, percentRange?: Range): Promise<UploadFileResponse> {
    return new Promise(function (resolve, reject) {
        uploadStore.setActionFor(item.id, UploadAction.uploading)
        const uploadSingle = `http://${import.meta.env.VITE_FILE_HOST}:${import.meta.env.VITE_FILE_PORT}${import.meta.env.VITE_FILE_UPSINGLE}`;

        const formData = new FormData();
        formData.append("file", item.file, item.file.name)
        const xhr = new XMLHttpRequest();
        xhr.open("POST", uploadSingle, true);

        xhr.upload.onprogress = (e: any) => {
            uploadStore.setPercentFor(item.id, getPercentInRange((e.loaded / e.total) * 100, percentRange))
        }
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(JSON.parse(xhr.response));
            } else {
                uploadStore.setErrorFor(item.id, this.status + xhr.statusText)
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = function () {
            uploadStore.setErrorFor(item.id, this.status + xhr.statusText)
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };
        xhr.send(formData);
    });
}

export async function generateThumbnailRequest(filename: string, item: UploadEntry, uploadStore: any, percentRange?: Range): Promise<GeneratePreviewResponse> {
    return new Promise(function (resolve, reject) {
        uploadStore.setActionFor(item.id, UploadAction.preview)
        const uploadPreview = `http://${import.meta.env.VITE_FILE_HOST}:${import.meta.env.VITE_FILE_PORT}${import.meta.env.VITE_FILE_UPPREVIEW}/${filename}`;

        const evtSource = new EventSource(uploadPreview);
        evtSource.onmessage = (e) => {
            const data = JSON.parse(e.data);
            uploadStore.setDetailsFor(item.id, data.msg, getPercentInRange(data.percent, percentRange))
            if (data.error) {
                uploadStore.setErrorFor(item.id, data.msg)
                evtSource.close()
                reject(data)
            }
            if (data.data) {
                evtSource.close()
                resolve(data.data)
            }
        }
        evtSource.onerror = (e) => {
            uploadStore.setErrorFor(item.id, 'Error creating preview')
            evtSource.close()
            reject('Error creating preview')
        }
    })
}

export const getPercentInRange = (percent: number, range?: Range): number => range ? Math.round(range.from + ((range.to - range.from) * percent / 100)) : percent