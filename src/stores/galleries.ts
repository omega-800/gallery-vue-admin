import { defineStore } from "pinia";
import type { Gallery } from "@/types/gql/response/Gallery";
import type { FormFields } from "@/types/Form";
import { deepCopy } from "@/util/util";

export type GalleriesState = {
    galleries: Gallery[];
};

export const useGalleryStore = defineStore("galleries", {
    state: (): GalleriesState => {
        return { galleries: [] };
    },
    actions: {
        updateProperty<
            KEY extends keyof Gallery,
            VAL extends Gallery[KEY]
        >(id: string, key: KEY, value: VAL) {
            const gallery = this.galleries.find(f => f.id == id)
            if (gallery) gallery[key] = value;
        },
        set(galleries: Gallery[]) {
            this.galleries = galleries;
        },
        add(gallery: Gallery) {
            this.galleries.push(gallery);
        },
        updateProperties(id: string, data: any) {
            //this.$patch((state) => {})
            const gallery = this.galleries.find(f => f.id == id)
            if (gallery) {
                Object.assign(gallery, data);
            }
        },
        addMultiple(galleries: Gallery[]) {
            this.galleries.push(...galleries);
        },
    },
    getters: {
        byId(state) {
            return (id: string) => state.galleries.find(gallery => gallery.id === id);
        },
        byIds(state) {
            return (ids: string[]) => ids ? state.galleries.filter(gallery => ids.includes(gallery.id)) : []
        },
        deleted(state) {
            return state.galleries.filter(gallery => gallery.date_deleted != undefined)
        },
        available(state) {
            return state.galleries.filter(gallery => gallery.date_deleted == undefined)
        },
        fields(state) {
            return (id?: string): FormFields => {
                const gallery = state.galleries.find(gallery => gallery.id === id);
                return {
                    name: {
                        value: gallery?.name || '',
                        name: 'Name',
                        nullable: false
                    },
                    description: {
                        value: gallery?.description || '',
                        name: 'Description',
                        nullable: true
                    },
                    file_ids: {
                        value: gallery ? deepCopy(gallery.file_ids) : [],
                        name: 'Files',
                        nullable: true
                    }
                }
            }
        }
    },
});