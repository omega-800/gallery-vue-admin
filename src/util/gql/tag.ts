import type { Tag } from "@/types/gql/response/Tag";
import { entityQueryFields } from "./request";
import { addEntity, getEntities } from "./entity";

export const tagQueryFields = `
${entityQueryFields}
name
description
files {
    id
}
`
export async function getTags(): Promise<Tag[]> {
    return getEntities('tag', tagQueryFields)
}
export async function addTag(data: any): Promise<Tag> {
    return addEntity('tag', data, tagQueryFields)
}