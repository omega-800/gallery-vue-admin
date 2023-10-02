import type { DescEntry } from "./Entry"

export interface Gallery extends DescEntry {
    file_ids: string[]
    //shop_item_ids: string[]
}