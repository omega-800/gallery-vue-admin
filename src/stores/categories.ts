import { defineStore } from "pinia";
import type { Category } from "@/types/gql/response/category";
import type { FormFields } from "@/types/Form";

export type categoriesState = {
    categories: Category[];
};

export const useCategoryStore = defineStore("categories", {
    state: (): categoriesState => {
        return { categories: [] };
    },
    actions: {
        updateProperty<
            KEY extends keyof Category,
            VAL extends Category[KEY]
        >(id: string, key: KEY, value: VAL) {
            const category = this.categories.find(f => f.id == id)
            if (category) category[key] = value;
        },
        updateProp(id: string, key: keyof Category, value: any) {
            const category = this.categories.find(f => f.id == id)
            if (category) category[key] = value;
        },
        updateProperties(id: string, data: any) {
            //this.$patch((state) => {})
            const category = this.categories.find(t => t.id == id)
            if (category) Object.assign(category, data);
        },
        set(categories: Category[]) {
            this.categories = categories;
        },
        add(category: Category) {
            this.categories.push(category);
        },
        addMultiple(categories: Category[]) {
            this.categories.push(...categories);
        },
    },
    getters: {
        byId(state) {
            return (id: string) => state.categories.find(category => category.id === id);
        },
        byIds(state) {
            return (ids: string[]) => ids ? state.categories.filter(category => ids.includes(category.id)) : []
        },
        deleted(state) {
            return state.categories.filter(category => category.date_deleted != undefined)
        },
        available(state) {
            return state.categories.filter(category => category.date_deleted == undefined)
        },
        doesExist(state) {
            return (name: string) => state.categories.some(category => category.name == name)
        },
        fields(state) {
            return (id?: string): FormFields => {
                const category = state.categories.find(category => category.id === id);
                return {
                    name: {
                        value: category?.name || '',
                        name: 'Name',
                        nullable: false,
                        unique: true
                    },
                    description: {
                        value: category?.description || '',
                        name: 'Description',
                        nullable: true
                    },
                    color: {
                        value: category?.color || '#77B28C',
                        name: 'Color',
                        nullable: true
                    }
                }
            }
        }
    },
});