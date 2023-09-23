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