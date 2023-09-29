import type { Identifiable } from "./Identifiable"

export interface CreateFileInput {
    file_type: string
    file_name: string
    file_name_orig: string
    width: number
    height: number
    width_prev: number
    height_prev: number
    size: number
}

export interface CreateVideoInput extends CreateFileInput {
    duration: number
    fps: number
    fps_prev: number
}

export interface AlterFileInput extends Identifiable {
    name?: string,
    edited?: boolean,
    tag_ids?: string[]
    /* galleries: Gallery[];
    shop_items?: ShopItem[] | null */
}
export interface AlterImageInput extends AlterFileInput {
    alt?: string,
}

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