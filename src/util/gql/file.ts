import type { CreateImageInput, FileData, Image } from "@/types/File";
import { makeGQLRequest, stringifyForGQL } from "./request";

export async function addImage(image: CreateImageInput): Promise<Image> {
    const query = `mutation {
            create_image (data:${stringifyForGQL(image)}){
                id
                date_added
                date_updated
                date_deleted
                name
                alt
                url
                preview_url
                file_type
                file_name
                width
                height
                __typename
            }
        }`

    const response = await makeGQLRequest(query)

    return fillDate(response.data.create_image)
}

export async function getFiles(): Promise<FileData[]> {

    const query = ` {
            files {
                id
                date_added
                date_updated
                date_deleted
                name
                url
                preview_url
                file_type
                file_name
                width
                height
                __typename
            }
        }`

    const response = await makeGQLRequest(query)

    return response.data.files.map((file: any) => fillDate(file))
}

function fillDate(file: any): FileData {
    if (file.date_added) {
        file.date_added = new Date(file.date_added)
    }
    if (file.date_deleted) {
        file.date_deleted = new Date(file.date_deleted)
    }
    if (file.date_updated) {
        file.date_updated = new Date(file.date_updated)
    }
    return file
}



