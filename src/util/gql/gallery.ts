import type { Gallery } from "@/types/gql/response/Gallery"
import { getEntities, descEntityQueryFields } from "./entity"

export const galleryQueryFields = `
${descEntityQueryFields}
files {
    id
}
`
export async function getGalleries(): Promise<Gallery[]> {
    return getEntities('gallery', galleryQueryFields)
}