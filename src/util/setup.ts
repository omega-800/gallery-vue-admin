import { useFileStore } from '@/stores/files'
import { getImages, getVideos } from './gql/file';
import { useTagStore } from '@/stores/tags';
import { getTags } from './gql/tag';
import { getGalleries } from './gql/gallery';
import { useGalleryStore } from '@/stores/galleries';
import { useShopItemStore } from '@/stores/shop_items';
import { getShopItems } from './gql/shop_item';
import { useCategoryStore } from '@/stores/categories';
import { getCategories } from './gql/category';

export async function loadFiles() {
    const fileStore = useFileStore();
    getImages().then(images => fileStore.set(images));
    getVideos().then(videos => fileStore.addMultiple(videos));
    getTags().then(tags => useTagStore().set(tags));
    getGalleries().then(galleries => useGalleryStore().set(galleries));
    getShopItems().then(shop_items => useShopItemStore().set(shop_items));
    getCategories().then(categories => useCategoryStore().set(categories));
}