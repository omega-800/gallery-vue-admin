import { useFileStore } from "@/stores/files"
import { useTagStore } from "@/stores/tags"
import { useGalleryStore } from "@/stores/galleries"
import { pluralName } from "./gql/request";
import type { Entry } from "@/types/gql/response/Entry";

export type EntityType = 'tag' | 'file' | 'gallery';

export interface EntityInfo {
    name: EntityType,
    display_name: string,
    store: any
}

export const entities: EntityInfo[] = [
    { name: 'file', display_name: 'File', store: useFileStore },
    { name: 'tag', display_name: 'Tag', store: useTagStore },
    { name: 'gallery', display_name: 'Gallery', store: useGalleryStore },
]

export interface EntityUtil {
    byId: (ent: EntityInfo, id: string) => any
    byIds: (ent: EntityInfo, ids: string[]) => any
    deleted: (ent: EntityInfo, deleted: boolean) => any
    favorites: (ent: EntityInfo) => any
    all: (ent: EntityInfo) => any
}

export const entityUtil: EntityUtil = {
    byId: (ent: EntityInfo, id: string) => ent.store()[pluralName(ent.name)].find((e: Entry) => e.id == id),
    byIds: (ent: EntityInfo, ids: string[]) => ent.store()[pluralName(ent.name)].find((e: Entry) => ids.includes(e.id)),
    deleted: (ent: EntityInfo, deleted: boolean) => ent.store()[pluralName(ent.name)].filter((e: Entry) => !!e.date_deleted == deleted),
    favorites: (ent: EntityInfo) => ent.store()[pluralName(ent.name)].filter((e: Entry) => !!e.favorite),
    all: (ent: EntityInfo) => ent.store()[pluralName(ent.name)]
}

export const getEntityInfo = (name: EntityType): EntityInfo => entities.find(e => e.name == name)!
export const isEntity = (name: string): name is EntityType => entities.some(e => e.name == name)
