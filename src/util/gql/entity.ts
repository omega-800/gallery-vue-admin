import { UploadStatus } from "@/types/files/FileUpload";
import type { EntityType } from "../entities"
import { fillDate, makeGQLRequest, mapIdArr, pluralName, removeNullVals, returnKeysAndDate, stringifyForGQL } from "./request"
import { useLoadingStore } from "@/stores/loading";

export const entityQueryFields = `
id
date_added
date_updated
date_deleted
`
export const descEntityQueryFields = `${entityQueryFields}
name
description
`
export const uniqueEntityQueryFields = `${descEntityQueryFields}
color
`

function initLoading(name: string, action: string) {
    const store = useLoadingStore()
    const loadingId = store.addItem(name)
    store.setStatusFor(loadingId, UploadStatus.progress)
    store.setDetailsFor(loadingId, action, 25)
    return loadingId;
}
function finishLoading(id: string) {
    const store = useLoadingStore()
    store.setStatusFor(id, UploadStatus.done)
    setTimeout(() => store.removeItem(id), 500)
}

export async function deleteOrRestoreEntity(type: string, id: string, doDelete: boolean): Promise<{ deleted?: Date, updated: Date }> {
    const loadingId = initLoading(type, doDelete ? 'Deleting' : 'Restoring')
    const queryName = (doDelete ? 'delete' : 'restore') + '_' + type
    const query = `mutation {
        ${queryName} (id:"${id}"){
            date_updated
            date_deleted
        }
    }`
    const response = await makeGQLRequest(query)
    const data = response.data[queryName]

    finishLoading(loadingId)
    return { updated: new Date(data.date_updated), deleted: data.date_deleted ? new Date(data.date_deleted) : undefined }
}

export async function alterEntity(type: 'image' | 'video' | EntityType, data: any): Promise<any> | never {
    const loadingId = initLoading(type, 'Changing')
    const dataWithoutNull = removeNullVals(data);
    if (JSON.stringify(dataWithoutNull) == "{}" || Object.keys(dataWithoutNull).length <= 1) throw new Error('No data given')
    const query = `mutation {
            alter_${type} (data:${stringifyForGQL(dataWithoutNull)}){${returnKeysAndDate(dataWithoutNull)}}
        }`

    const response = await makeGQLRequest(query)

    finishLoading(loadingId)
    return mapEntity(response.data[`alter_${type}`], type)
}

export async function getEntities(type: 'image' | 'video' | EntityType, queryFields: string): Promise<any> | never {
    const loadingId = initLoading(pluralName(type), 'Getting')
    const query = ` {
            ${pluralName(type)} {${queryFields}}
        }`

    const response = await makeGQLRequest(query)

    finishLoading(loadingId)
    return response.data[pluralName(type)].map((e: any) => mapEntity(e, type))
}

export async function addEntity(type: 'image' | 'video' | EntityType, data: any): Promise<any> | never {
    const loadingId = initLoading(type, 'Adding')

    const dataWithoutNull = removeNullVals(data);
    if (JSON.stringify(dataWithoutNull) == "{}" || Object.keys(dataWithoutNull).length <= 1) {
        useLoadingStore().setErrorFor(loadingId, 'No data given')
        throw new Error('No data given')
    }

    const query = `mutation {
            create_${type} (data:${stringifyForGQL(data)}){${returnKeysAndDate(dataWithoutNull, true)}}
        }`
    const response = await makeGQLRequest(query)

    finishLoading(loadingId)
    return mapEntity(response.data[`create_${type}`], type)
}

export async function setFavorite(type: 'image' | 'video' | EntityType, id: string, favorite: boolean): Promise<Date> {
    const loadingId = initLoading(type, `${favorite ? 'Setting' : 'Removing'} favorite`)

    const query = `mutation {
        alter_${type} (data:{id:"${id}", favorite:${favorite}}){date_updated}
    }`
    const response = await makeGQLRequest(query)

    finishLoading(loadingId)
    return new Date(response.data[`alter_${type}`].date_updated)
}

export const mapEntity = (data: any, type: 'image' | 'video' | EntityType) => ({ ...fillDate(mapIdArr(data, ['tags', 'files', 'galleries', 'category'])), entity_type: ['image', 'video'].includes(type) ? 'file' : type })
