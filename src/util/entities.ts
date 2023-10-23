import { useFileStore } from "@/stores/files"
import { useTagStore } from "@/stores/tags"
import { useGalleryStore } from "@/stores/galleries"
import { pluralName } from "./gql/request";
import type { Entry } from "@/types/gql/response/Entry";
import { entityQueryFields } from "./gql/entity";
import { useShopItemStore } from "@/stores/shop_items";
import { useCategoryStore } from "@/stores/categories";

export type EntityType = 'tag' | 'file' | 'gallery' | 'shop_item' | 'category';

export interface EntityInfo {
    name: EntityType,
    display_name: string,
    store: any
}

export const entities: EntityInfo[] = [
    { name: 'file', display_name: 'File', store: useFileStore },
    { name: 'tag', display_name: 'Tag', store: useTagStore },
    { name: 'gallery', display_name: 'Gallery', store: useGalleryStore },
    { name: 'shop_item', display_name: 'Shop Item', store: useShopItemStore },
    { name: 'category', display_name: 'Category', store: useCategoryStore },
]

export interface EntityUtil {
    byId: (ent: EntityInfo, id: string) => any
    byIds: (ent: EntityInfo, ids: string[]) => any
    deleted: (ent: EntityInfo, deleted: boolean) => any
    favorites: (ent: EntityInfo) => any
    all: (ent: EntityInfo) => any
    queryFields: (ent: EntityInfo) => string
}

export const entityUtil: EntityUtil = {
    byId: (ent: EntityInfo, id: string) => ent.store()[pluralName(ent.name)].find((e: Entry) => e.id == id),
    byIds: (ent: EntityInfo, ids: string[]) => ent.store()[pluralName(ent.name)].find((e: Entry) => ids.includes(e.id)).sort((a: Entry, b: Entry) => b.date_added.getTime() - a.date_added.getTime()),
    deleted: (ent: EntityInfo, deleted: boolean) => ent.store()[pluralName(ent.name)].filter((e: Entry) => !!e.date_deleted == deleted).sort((a: Entry, b: Entry) => b.date_added.getTime() - a.date_added.getTime()),
    favorites: (ent: EntityInfo) => ent.store()[pluralName(ent.name)].filter((e: Entry) => !!e.favorite).sort((a: Entry, b: Entry) => b.date_added.getTime() - a.date_added.getTime()),
    all: (ent: EntityInfo) => ent.store()[pluralName(ent.name)].sort((a: Entry, b: Entry) => b.date_added.getTime() - a.date_added.getTime()),
    queryFields: (ent: EntityInfo) => entityQueryFields + Object.keys(ent.store().fields).join(' ')
}

export const getEntityInfo = (name: EntityType): EntityInfo => entities.find(e => e.name == name)!
export const isEntity = (name: string): name is EntityType => entities.some(e => e.name == name)
