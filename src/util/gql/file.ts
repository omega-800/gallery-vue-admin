import type { FileData, Image, Video } from "@/types/gql/response/File";
import type { AlterFileInput, AlterImageInput, CreateFileInput, CreateVideoInput } from "@/types/gql/input/File";
import { entityQueryFields, fillDate, makeGQLRequest, mapIdArr, removeNullVals, returnKeysAndDate, stringifyForGQL } from "./request";

export const fileQueryFields = `
${entityQueryFields}
name
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
tags {
    id
}
__typename`
export const imageQueryFields = `${fileQueryFields}
alt`
export const videoQueryFields = `${fileQueryFields}
duration
fps
fps_prev`
export async function addImageToDB(image: any): Promise<FileData> {
    const onlyGqlAttrs: CreateFileInput = onlyGqlAttrsObj(image)
    const query = `mutation {
            create_image (data:${stringifyForGQL(onlyGqlAttrs)}){${imageQueryFields}}
        }`

    const response = await makeGQLRequest(query)
    return mapFile(response.data.create_image)
}

export async function addVideoToDB(video: any): Promise<FileData> {
    const onlyGqlAttrs: CreateVideoInput = {
        ...onlyGqlAttrsObj(video),
        duration: video.duration,
        fps: video.fps,
        fps_prev: video.fps_prev,
    }
    const query = `mutation {
            create_video (data:${stringifyForGQL(onlyGqlAttrs)}){${videoQueryFields}}
        }`

    const response = await makeGQLRequest(query)
    return mapFile(response.data.create_video)
}

export async function getFiles(): Promise<FileData[]> {
    const query = ` {
            files {${fileQueryFields}}
        }`

    const response = await makeGQLRequest(query)
    return response.data.files.map((file: any) => mapFile(file))
}

export async function getImages(): Promise<Image[]> {
    const query = ` {
            images {${imageQueryFields}}
        }`

    const response = await makeGQLRequest(query)
    return response.data.images.map((file: any) => mapFile(file))
}

export async function getVideos(): Promise<Video[]> {
    const query = ` {
            videos {${videoQueryFields}}
        }`

    const response = await makeGQLRequest(query)
    return response.data.videos.map((file: any) => mapFile(file))
}

export async function setFavoriteFile(id: string, favorite: boolean): Promise<Date> {
    const query = `mutation {
        set_favorite (id:"${id}", favorite:${favorite}){date_updated}
    }`
    const response = await makeGQLRequest(query)
    return new Date(response.data.set_favorite.date_updated)
}

export async function alterFile(type: 'image' | 'video', data: AlterImageInput | AlterFileInput): Promise<FileData> | never {
    const dataWithoutNull = removeNullVals(data);
    console.log(data, dataWithoutNull)
    if (JSON.stringify(dataWithoutNull) == "{}" || Object.keys(dataWithoutNull).length <= 1) throw new Error('No data given')
    const query = `mutation {
            alter_${type} (data:${stringifyForGQL(dataWithoutNull)}){${returnKeysAndDate(dataWithoutNull)}}
        }`

    const response = await makeGQLRequest(query)
    return mapFile(response.data[`alter_${type}`])
}

export const mapFile = (file: any) => ({ ...fillDate(mapIdArr(file, ['tags'])), entity_type: 'file' })
//export const mapTags = (file: any) => ({ ...file, tag_ids: file.tags.map((tag: { id: string }) => tag.id) })

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

