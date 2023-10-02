import { defineStore } from "pinia";
import type { FileData } from "@/types/gql/response/File";
import { deepCopy, isImage } from "@/util/util";
import type { FormField, FormFields } from "@/types/Form";

export type FilesState = {
    files: FileData[];
};

export const useFileStore = defineStore("files", {
    state: (): FilesState => {
        return { files: [] };
    },
    actions: {
        updateProperty<
            KEY extends keyof FileData,
            VAL extends FileData[KEY]
        >(id: string, key: KEY, value: VAL) {
            const file = this.files.find(f => f.id == id)
            if (file) file[key] = value;
        },
        set(files: FileData[]) {
            this.files = files;
        },
        add(file: FileData) {
            this.files.push(file);
        },
        updateProperties(id: string, data: any) {
            //this.$patch((state) => {})
            const file = this.files.find(f => f.id == id)
            if (file) {
                Object.assign(file, data);
            }
        },
        addMultiple(files: FileData[]) {
            this.files.push(...files);
        },
    },
    getters: {
        byId(state) {
            return (id: string) => state.files.find(file => file.id === id);
        },
        byIds(state) {
            return (ids: string[]) => ids ? state.files.filter(file => ids.includes(file.id)) : []
        },
        deleted(state) {
            return state.files.filter(file => file.date_deleted != undefined)
        },
        available(state) {
            return state.files.filter(file => file.date_deleted == undefined)
        },
        fields(state) {
            return (id?: string): FormFields => {
                const file = state.files.find(file => file.id === id);
                return {
                    edited: {
                        value: !!file?.edited,
                        name: 'Was edited',
                        nullable: true
                    },
                    name: {
                        value: file?.name || '',
                        name: 'Name',
                        nullable: true
                    },
                    description: {
                        value: file?.description || '',
                        name: 'Description',
                        nullable: true
                    },
                    alt: {
                        value: file?.alt || '',
                        name: 'Alt text',
                        nullable: true
                    },
                    tag_ids: {
                        value: file?.tag_ids ? deepCopy(file.tag_ids) : [],
                        name: 'Tags',
                        nullable: true
                    },

                    /* galleries: Gallery[];
                    shop_items?: ShopItem[] | null */
                }
            }
        }
    },
});