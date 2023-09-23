import { defineStore } from "pinia";
import type { FileData } from "@/types/File";

export type FilesState = {
    files: FileData[];
};

export const useFileStore = defineStore("files", {
    state: (): FilesState => {
        return { files: [] };
    },
    actions: {
        update(file: FileData) {
            console.log(file)
        },
        set(files: FileData[]) {
            this.files = files;
        },
    },
    getters: {
        file(state) {
            return (id: string) => state.files.filter(file => file.id === id);
        },
    },
});