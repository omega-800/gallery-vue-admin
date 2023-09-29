import type { Gallery } from "@/types/gql/response/Gallery"
import { getEntities } from "./entity"
import { entityQueryFields } from "./request"

export const galleryQueryFields = `
${entityQueryFields}
name
files {
    id
}
`
export async function getGalleries(): Promise<Gallery[]> {
    return getEntities('gallery', galleryQueryFields)
}