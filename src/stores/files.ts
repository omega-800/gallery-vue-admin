import { defineStore } from "pinia";
import type { FileData } from "@/types/gql/response/File";
import { isImage } from "@/util/util";

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
            return (ids: string[]) => state.files.filter(file => ids.includes(file.id));
        },
        deleted(state) {
            return state.files.filter(file => file.date_deleted != undefined)
        },
        available(state) {
            return state.files.filter(file => file.date_deleted == undefined)
        },
        fields(state) {
            return (id: string) => {
                const file = state.files.find(file => file.id === id);
                if (!file) return;
                const fields: any = {
                    edited: file.edited,
                    name: file.name,
                    /* galleries: Gallery[];
                    shop_items?: ShopItem[] | null */
                }
                if (isImage(file)) fields.alt = file.alt
                fields.tag_ids = JSON.parse(JSON.stringify(file.tag_ids))
                return fields;
            }
        }
    },
});