import type { ShopItem } from "@/types/gql/response/ShopItem"
import { getEntities, descEntityQueryFields } from "./entity"

export const shopItemQueryFields = `
${descEntityQueryFields}
price
hide
available_from
available_to
galleries {
    id
}
files {
    id
}
`
export async function getShopItems(): Promise<ShopItem[]> {
    return getEntities('shop_item', shopItemQueryFields)
}