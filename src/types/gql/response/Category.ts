import type { UniqueNamedEntry } from "./Entry";

export interface Category extends UniqueNamedEntry {
    shop_item_ids: string[]
}