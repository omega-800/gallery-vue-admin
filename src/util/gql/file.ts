import type { FileData, Image, Video } from "@/types/gql/response/File";
import type { CreateFileInput, CreateVideoInput } from "@/types/gql/input/File";
import { addEntity, getEntities, descEntityQueryFields } from "./entity";

export const fileQueryFields = `
${descEntityQueryFields}
file_type
file_name
file_name_orig
size
width
height
width_prev
height_prev
edited
favorite
alt
tags {
    id
}
__typename`
export const imageQueryFields = `${fileQueryFields}`
export const videoQueryFields = `${fileQueryFields}
duration
fps
fps_prev`
export async function addImageToDB(image: any): Promise<FileData> {
    const onlyGqlAttrs: CreateFileInput = onlyGqlAttrsObj(image)
    return addEntity('image', onlyGqlAttrs)
}

export async function addVideoToDB(video: any): Promise<FileData> {
    const onlyGqlAttrs: CreateVideoInput = {
        ...onlyGqlAttrsObj(video),
        duration: video.duration,
        fps: video.fps,
        fps_prev: video.fps_prev,
    }
    return addEntity('video', onlyGqlAttrs)
}

export async function getFiles(): Promise<FileData[]> {
    return getEntities('file', fileQueryFields)
}

export async function getImages(): Promise<Image[]> {
    return getEntities('image', imageQueryFields)
}

export async function getVideos(): Promise<Video[]> {
    return getEntities('video', videoQueryFields)
}

export const onlyGqlAttrsObj = (file: any): CreateFileInput => {
    return {
        file_type: file.file_type,
        file_name: file.file_name,
        file_name_orig: file.file_name_orig,
        width: file.width,
        height: file.height,
        width_prev: file.width_prev,
        height_prev: file.height_prev,
        size: file.size,
    }
}

