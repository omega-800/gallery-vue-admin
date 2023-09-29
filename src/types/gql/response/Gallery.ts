import type { Entry } from "./Entry"

export interface Gallery extends Entry {
    name: string
    file_ids: string[]
    //shop_item_ids: string[]
}