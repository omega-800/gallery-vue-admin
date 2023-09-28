import { useFileStore } from "@/stores/files"
import { useTagStore } from "@/stores/tags"

export type EntityType = 'tag' | 'file';

export interface EntityInfo {
    name: EntityType,
    display_name: string,
    store: any,
}

export const entities: EntityInfo[] = [
    { name: 'file', display_name: 'File', store: useFileStore },
    { name: 'tag', display_name: 'Tag', store: useTagStore },
]

export const getEntityInfo = (name: EntityType): EntityInfo => entities.find(e => e.name == name)
export const isEntity = (name: string): name is EntityType => entities.some(e => e.name == name)