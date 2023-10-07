import type { EntityType } from "../entities"
import { fillDate, makeGQLRequest, mapIdArr, pluralName, removeNullVals, returnKeysAndDate, stringifyForGQL } from "./request"

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

export async function deleteOrRestoreEntity(type: string, id: string, doDelete: boolean): Promise<{ deleted?: Date, updated: Date }> {
    const queryName = (doDelete ? 'delete' : 'restore') + '_' + type
    const query = `mutation {
        ${queryName} (id:"${id}"){
            date_updated
            date_deleted
        }
    }`
    const response = await makeGQLRequest(query)
    const data = response.data[queryName]
    return { updated: new Date(data.date_updated), deleted: data.date_deleted ? new Date(data.date_deleted) : undefined }
}

export async function alterEntity(type: 'image' | 'video' | EntityType, data: any): Promise<any> | never {
    const dataWithoutNull = removeNullVals(data);
    if (JSON.stringify(dataWithoutNull) == "{}" || Object.keys(dataWithoutNull).length <= 1) throw new Error('No data given')
    const query = `mutation {
            alter_${type} (data:${stringifyForGQL(dataWithoutNull)}){${returnKeysAndDate(dataWithoutNull)}}
        }`

    const response = await makeGQLRequest(query)
    return mapEntity(response.data[`alter_${type}`], type)
}

export async function getEntities(type: 'image' | 'video' | EntityType, queryFields: string): Promise<any> | never {
    const query = ` {
            ${pluralName(type)} {${queryFields}}
        }`

    const response = await makeGQLRequest(query)
    return response.data[pluralName(type)].map((e: any) => mapEntity(e, type))
}

export async function addEntity(type: 'image' | 'video' | EntityType, data: any): Promise<any> | never {
    const dataWithoutNull = removeNullVals(data);
    if (JSON.stringify(dataWithoutNull) == "{}" || Object.keys(dataWithoutNull).length <= 1) throw new Error('No data given')
    const query = `mutation {
            create_${type} (data:${stringifyForGQL(data)}){${returnKeysAndDate(dataWithoutNull, true)}}
        }`
    console.log(query)
    const response = await makeGQLRequest(query)
    return mapEntity(response.data[`create_${type}`], type)
}
/* export async function addEntity(type: 'image' | 'video' | EntityType, attrs: any, queryFields: string): Promise<any> | never {
    const query = `mutation {
            create_${type} (data:${stringifyForGQL(attrs)}){${queryFields}}
        }`

    const response = await makeGQLRequest(query)
    return mapEntity(response.data[`create_${type}`], type)
} */

export async function setFavorite(type: 'image' | 'video' | EntityType, id: string, favorite: boolean): Promise<Date> {
    const query = `mutation {
        alter_${type} (data:{id:"${id}", favorite:${favorite}}){date_updated}
    }`
    const response = await makeGQLRequest(query)
    return new Date(response.data[`alter_${type}`].date_updated)
}

export const mapEntity = (data: any, type: 'image' | 'video' | EntityType) => ({ ...fillDate(mapIdArr(data, ['tags', 'files', 'galleries', 'category'])), entity_type: ['image', 'video'].includes(type) ? 'file' : type })
