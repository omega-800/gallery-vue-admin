import { makeGQLRequest } from "./request"

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