import { ref } from 'vue'
import { defineStore } from 'pinia'
import { UploadStatus, type UploadEntry } from '@/types/files/FileUpload';
import { uuid } from '@/util/util';

export type UploadState = {
    items: UploadEntry[],
    inProgress: boolean
};

export const useUploadStore = defineStore("upload", {
    state: (): UploadState => {
        return { items: [], inProgress: false };
    },
    actions: {
        addItem(file: File) {
            if (this.inProgress || this.items.some(item => file.name == item.file.name) || !['image', 'video'].includes(file.type.split('/')[0])) return;
            const item: UploadEntry = {
                id: uuid(),
                file: file,
                state: {
                    status: UploadStatus.queued
                }
            }
            this.items.push(item);
        },
        addItems(files: File[]) {
            if (this.inProgress) return;
            files.forEach(file => this.addItem(file))
        },
        removeItem(id: string) {
            if (this.inProgress) return;
            const index = this.items.findIndex(i => i.id == id)
            this.items.splice(index, index >= 0 ? 1 : 0);
        },
        resetItems() {
            if (this.inProgress) return;
            this.items = [];
        },
        setProgress(progress: boolean) {
            this.inProgress = progress
        },
        setStatusFor(id: string, status: UploadStatus) {
            if (!this.inProgress) return;
            const item = this.items.find(i => i.id == id)
            if (!item) return;
            item.state.percent = undefined
            item.state.action = undefined
            item.state.status = status
        },
        setActionFor(id: string, action: string) {
            console.log('setAction')
            if (!this.inProgress) return;
            const item = this.items.find(i => i.id == id)
            if (!item) return;
            item.state.action = action
        },
        setPercentFor(id: string, percent: number) {
            if (!this.inProgress) return;
            const item = this.items.find(i => i.id == id)
            if (!item) return;
            item.state.percent = percent
        },
        setDetailsFor(id: string, details: string, percent: number) {
            if (!this.inProgress) return;
            const item = this.items.find(i => i.id == id)
            if (!item) return;
            item.state.percent = percent
            item.state.action = details
        },
        setErrorFor(id: string, details: string) {
            if (!this.inProgress) return;
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
