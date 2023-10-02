import type { UniqueNamedEntry } from "./Entry";

export interface Tag extends UniqueNamedEntry {
    file_ids: string[]
}