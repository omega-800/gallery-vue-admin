import { defineStore } from "pinia";
import type { Tag } from "@/types/gql/response/Tag";

export type TagsState = {
    tags: Tag[];
};

export const useTagStore = defineStore("tags", {
    state: (): TagsState => {
        return { tags: [] };
    },
    actions: {
        updateProperty<
            KEY extends keyof Tag,
            VAL extends Tag[KEY]
        >(id: string, key: KEY, value: VAL) {
            const tag = this.tags.find(f => f.id == id)
            if (tag) tag[key] = value;
        },
        updateProp(id: string, key: any, value: any) {
            const tag = this.tags.find(f => f.id == id)
            if (tag) tag[key as keyof typeof tag] = value;
        },
        set(tags: Tag[]) {
            this.tags = tags;
        },
        add(tag: Tag) {
            this.tags.push(tag);
        },
        addMultiple(tags: Tag[]) {
            this.tags.push(...tags);
        },
    },
    getters: {
        byId(state) {
            return (id: string) => state.tags.find(tag => tag.id === id);
        },
        byIds(state) {
            return (ids: string[]) => state.tags.filter(tag => ids.includes(tag.id));
        },
        deleted(state) {
            return state.tags.filter(tag => tag.date_deleted != undefined)
        },
        available(state) {
            return state.tags.filter(tag => tag.date_deleted == undefined)
        }
    },
});