import { NamedEntry } from "./Entry"
import { IPostgresInterval } from 'postgres-interval';

export interface FileData extends NamedEntry {
    url: string
    preview_url: string
    file_type: string
    file_name: string
    width: number
    height: number
    /* galleries: Gallery[];
    product?: Product | null */
}

export interface ImageData extends FileData {
    alt?: string | null
}

export interface VideoData extends FileData {
    duration?: IPostgresInterval | null
}