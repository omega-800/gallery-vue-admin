import type { Entry, NamedEntry } from "./Entry"

export interface FileData extends NamedEntry {
    /*url: string
    preview_url: string*/
    file_type: string
    file_name: string
    file_name_orig: string
    size: number
    width: number
    height: number
    width_prev: number
    height_prev: number
    edited: boolean
    __typename: string
    tag_ids: string[]
    /* galleries: Gallery[];
    shop_items?: ShopItem[] | null */
}

export interface Image extends FileData {
    alt?: string | null
}

export interface Video extends FileData {
    duration: number
    fps: number
    fps_prev: number
}