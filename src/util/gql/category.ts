import type { Category } from "@/types/gql/response/Category";
import { addEntity, getEntities, uniqueEntityQueryFields } from "./entity";

export const categoryQueryFields = `
${uniqueEntityQueryFields}
shop_items {
    id
}
`
export async function getCategories(): Promise<Category[]> {
    return getEntities('category', categoryQueryFields)
}
export async function addCategory(data: any): Promise<Category> {
    return addEntity('category', data)
}