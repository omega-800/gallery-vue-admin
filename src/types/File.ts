import type { NamedEntry } from "./Entry"
import type { IPostgresInterval } from 'postgres-interval';

export interface FileData extends NamedEntry {
    url: string
    preview_url: string
    file_type: string
    file_name: string
    width: number
    height: number
    __typename: string
    /* galleries: Gallery[];
    product?: Product | null */
}

export interface Image extends FileData {
    alt?: string | null
}

export interface Video extends FileData {
    duration?: IPostgresInterval | null
}

export interface CreateImageInput {
    name?: string | null
    alt?: string | null
    url: string
    preview_url: string
    file_type: string
    file_name: string
    width: number
    height: number
    gallery_ids?: string[] | null;
    product_id?: string | null
}

export interface CreateVideoInput {
    name?: string | null
    duration?: IPostgresInterval | null
    url: string
    preview_url: string
    file_type: string
    file_name: string
    width: number
    height: number
    gallery_ids?: string[] | null;
    product_id?: string | null
}