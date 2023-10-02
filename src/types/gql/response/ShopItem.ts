import type { DescEntry } from "./Entry"

export interface ShopItem extends DescEntry {
    price: number
    hide: boolean
    available_from: Date
    available_to?: Date
    //category_id?: string
    file_ids: string[]
    gallery_ids: string[]
}