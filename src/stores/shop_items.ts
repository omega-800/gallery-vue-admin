import { defineStore } from "pinia";
import type { ShopItem } from "@/types/gql/response/ShopItem";
import type { FormFields } from "@/types/Form";

export type ShopItemsState = {
    shop_items: ShopItem[];
};

export const useShopItemStore = defineStore("shop_items", {
    state: (): ShopItemsState => {
        return { shop_items: [] };
    },
    actions: {
        updateProperty<
            KEY extends keyof ShopItem,
            VAL extends ShopItem[KEY]
        >(id: string, key: KEY, value: VAL) {
            const shop_item = this.shop_items.find(f => f.id == id)
            if (shop_item) shop_item[key] = value;
        },
        updateProp(id: string, key: keyof ShopItem, value: any) {
            const shop_item = this.shop_items.find(f => f.id == id)
            if (shop_item) shop_item[key] = value;
        },
        updateProperties(id: string, data: any) {
            //this.$patch((state) => {})
            const shop_item = this.shop_items.find(t => t.id == id)
            if (shop_item) Object.assign(shop_item, data);
        },
        set(shop_items: ShopItem[]) {
            this.shop_items = shop_items;
        },
        add(shop_item: ShopItem) {
            this.shop_items.push(shop_item);
        },
        addMultiple(shop_items: ShopItem[]) {
            this.shop_items.push(...shop_items);
        },
    },
    getters: {
        byId(state) {
            return (id: string) => state.shop_items.find(shop_item => shop_item.id === id);
        },
        byIds(state) {
            return (ids: string[]) => ids ? state.shop_items.filter(shop_item => ids.includes(shop_item.id)) : []
        },
        deleted(state) {
            return state.shop_items.filter(shop_item => shop_item.date_deleted != undefined)
        },
        available(state) {
            return state.shop_items.filter(shop_item => shop_item.date_deleted == undefined)
        },
        doesExist(state) {
            return (name: string) => state.shop_items.some(shop_item => shop_item.name == name)
        },
        fields(state) {
            return (id?: string): FormFields => {
                const shop_item = state.shop_items.find(shop_item => shop_item.id === id);
                return {
                    name: {
                        value: shop_item?.name || '',
                        name: 'Name',
                        nullable: false,
                    },
                    description: {
                        value: shop_item?.description || '',
                        name: 'Description',
                        nullable: true
                    },
                    price: {
                        name: 'Price',
                        nullable: false,
                        value: shop_item?.price || 0.00
                    },
                    hide: {
                        name: 'Hide from public',
                        nullable: true,
                        value: shop_item?.hide || true
                    },
                    available_from: {
                        name: 'Available from',
                        nullable: true,
                        value: shop_item?.available_from || new Date()
                    },
                    available_to: {
                        name: 'Available to',
                        nullable: true,
                        value: shop_item?.available_to || new Date()
                    },
                    category_id: {
                        name: 'Category',
                        nullable: true,
                        value: shop_item?.category_id || null
                    },
                    file_ids: {
                        name: 'Files',
                        nullable: false,
                        value: shop_item?.file_ids || [],
                        dependsOn: 'Galleries'
                    },
                    gallery_ids: {
                        name: 'Galleries',
                        nullable: true,
                        value: shop_item?.gallery_ids || [],
                        dependsOn: 'Files'
                    },
                }
            }
        }
    },
});