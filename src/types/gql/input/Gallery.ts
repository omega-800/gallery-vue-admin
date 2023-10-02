import type { Identifiable } from "./Identifiable"


export interface CreateGalleryInput {
    name: string
    description?: string
    file_ids: string[]
    //shop_item_ids: ShopItem[]
}

export interface AlterGalleryInput extends Identifiable {
    name?: string
    description?: string
    file_ids?: string[]
    //shop_item_ids: ShopItem[]
}