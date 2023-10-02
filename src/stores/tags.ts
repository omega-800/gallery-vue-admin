import { defineStore } from "pinia";
import type { Tag } from "@/types/gql/response/Tag";
import type { FormFields } from "@/types/Form";

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
        updateProp(id: string, key: keyof Tag, value: any) {
            const tag = this.tags.find(f => f.id == id)
            if (tag) tag[key] = value;
        },
        updateProperties(id: string, data: any) {
            //this.$patch((state) => {})
            const tag = this.tags.find(t => t.id == id)
            if (tag) Object.assign(tag, data);
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
            return (ids: string[]) => ids ? state.tags.filter(tag => ids.includes(tag.id)) : []
        },
        deleted(state) {
            return state.tags.filter(tag => tag.date_deleted != undefined)
        },
        available(state) {
            return state.tags.filter(tag => tag.date_deleted == undefined)
        },
        doesExist(state) {
            return (name: string) => state.tags.some(tag => tag.name == name)
        },
        fields(state) {
            return (id?: string): FormFields => {
                const tag = state.tags.find(tag => tag.id === id);
                return {
                    name: {
                        value: tag?.name || '',
                        name: 'Name',
                        nullable: false,
                        unique: true
                    },
                    description: {
                        value: tag?.description || '',
                        name: 'Description',
                        nullable: true
                    },
                    color: {
                        value: tag?.color || '#77B28C',
                        name: 'Color',
                        nullable: true
                    }
                }
            }
        }
    },
});