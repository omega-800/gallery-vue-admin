import { defineStore } from "pinia";
import type { FileData } from "@/types/gql/response/File";

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
        }
    },
});