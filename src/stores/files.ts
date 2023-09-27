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
        addMultiple(files: FileData[]) {
            this.files.push(...files);
        },
    },
    getters: {
        byId(state) {
            return (id: string) => state.files.find(file => file.id === id);
        },
        deleted(state) {
            return state.files.filter(file => file.date_deleted != undefined)
        },
        available(state) {
            return state.files.filter(file => file.date_deleted == undefined)
        }
    },
});