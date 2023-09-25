import type { FileInfo } from "@/types/FileResp";
import { addImage } from "../gql/file";

export function uploadFiles(files: File[]): string {
    const url = `http://${import.meta.env.VITE_FILE_HOST}:${import.meta.env.VITE_FILE_PORT}${import.meta.env.VITE_FILE_GETPATH}`
    const endpoint = `http://${import.meta.env.VITE_FILE_HOST}:${import.meta.env.VITE_FILE_PORT}${import.meta.env.VITE_FILE_UPPATH}`;
    if (files.length == 0) return "Error: No files";
    const formData = new FormData();
    const xhr = new XMLHttpRequest();

    files.forEach(file => formData.append("files", file, file.name))

    xhr.open("POST", endpoint, true);

    xhr.onreadystatechange = async function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                console.log(xhr.responseText);
                for (const fileInfo of JSON.parse(xhr.responseText).files) {
                    if (fileInfo.type == 'image') {

                        console.log(await addImage({
                            name: "",
                            alt: "",
                            url: url + fileInfo.path,
                            preview_url: url + fileInfo.preview_path,
                            file_type: fileInfo.file_type,
                            file_name: fileInfo.original_name,
                            width: fileInfo.width,
                            height: fileInfo.height,
                        }))
                    }
                }
                if (JSON.parse(xhr.responseText).err.length != 0) {
                    return "Files uploaded but error occured: " + JSON.parse(xhr.responseText).err
                }
                return "Done!"
            } else {
                console.error(xhr.statusText);
                return "Error: " + xhr.statusText + JSON.parse(xhr.responseText).err
            }
        }
    };

    xhr.send(formData);
    return "";
}