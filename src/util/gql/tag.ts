import type { Tag } from "@/types/gql/response/Tag";
import { addEntity, getEntities, uniqueEntityQueryFields } from "./entity";

export const tagQueryFields = `
${uniqueEntityQueryFields}
files {
    id
}
`
export async function getTags(): Promise<Tag[]> {
    return getEntities('tag', tagQueryFields)
}
export async function addTag(data: any): Promise<Tag> {
    return addEntity('tag', data)
}