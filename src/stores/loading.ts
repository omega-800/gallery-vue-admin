import { ref } from 'vue'
import { defineStore } from 'pinia'
import { UploadStatus, type LoadingEntry } from '@/types/files/FileUpload';
import { uuid } from '@/util/util';

export type LoadingState = {
    items: LoadingEntry[]
};

export const useLoadingStore = defineStore("loading", {
    state: (): LoadingState => {
        return { items: [] };
    },
    actions: {
        addItem(name: string) {
            const item: LoadingEntry = {
                id: uuid(),
                name: name,
                state: {
                    status: UploadStatus.queued
                }
            }
            this.items.push(item);
            return item.id;
        },
        addItems(names: string[]) {
            names.forEach(name => this.addItem(name))
        },
        removeItem(id: string) {
            const index = this.items.findIndex(i => i.id == id)
            this.items.splice(index, index >= 0 ? 1 : 0);
        },
        resetItems() {
            this.items = [];
        },
        setStatusFor(id: string, status: UploadStatus) {
            const item = this.items.find(i => i.id == id)
            if (!item) return;
            item.state.percent = undefined
            item.state.status = status
        },
        setActionFor(id: string, action: string) {
            const item = this.items.find(i => i.id == id)
            if (!item) return;
            item.state.action = action
        },
        setPercentFor(id: string, percent: number) {
            const item = this.items.find(i => i.id == id)
            if (!item) return;
            item.state.percent = percent
        },
        setDetailsFor(id: string, details: string, percent: number) {
            const item = this.items.find(i => i.id == id)
            if (!item) return;
            item.state.percent = percent
            item.state.action = details
        },
        setErrorFor(id: string, details: string) {
            const item = this.items.find(i => i.id == id)
            if (!item) return;
            item.state.status = UploadStatus.error
            item.state.action = details
        },
        clearFinished() {
            this.items = this.items.filter(i => i.state.status != UploadStatus.done)
        }
    },
    getters: {
    },
})
