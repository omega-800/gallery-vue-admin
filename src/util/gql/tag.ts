import type { Tag } from "@/types/gql/response/Tag";
import { entityQueryFields, fillDate, makeGQLRequest, mapIdArr } from "./request";

export const tagQueryFields = `
${entityQueryFields}
name
description
files {
    id
}
`
export async function getTags(): Promise<Tag[]> {
    const query = ` {
            tags {${tagQueryFields}}
        }`

    const response = await makeGQLRequest(query)
    return response.data.tags.map((tag: any) => mapTag(tag))
}
export const mapTag = (tag: any) => ({ ...fillDate(mapIdArr(tag, 'file')), entity_type: 'tag' })