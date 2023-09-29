import type { Identifiable } from "./Identifiable"


export interface CreateGalleryInput {
    name: string
    file_ids: string[]
    //shop_item_ids: ShopItem[]
}

export interface AlterGalleryInput extends Identifiable {
    name?: string
    file_ids?: string[]
    //shop_item_ids: ShopItem[]
}