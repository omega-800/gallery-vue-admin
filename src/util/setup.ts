import { useFileStore } from '@/stores/files'
import { getImages, getVideos } from './gql/file';
import { useTagStore } from '@/stores/tags';
import { getTags } from './gql/tag';
import { getGalleries } from './gql/gallery';
import { useGalleryStore } from '@/stores/galleries';
import { useShopItemStore } from '@/stores/shop_items';
import { getShopItems } from './gql/shop_item';

export async function loadFiles() {
    const fileStore = useFileStore();
    const images = await getImages();
    const videos = await getVideos();
    fileStore.set([...images, ...videos])
    const tagStore = useTagStore();
    const tags = await getTags();
    tagStore.set(tags)
    const galleryStore = useGalleryStore();
    const galleries = await getGalleries();
    galleryStore.set(galleries)
    const shopItemStore = useShopItemStore();
    const shop_items = await getShopItems();
    shopItemStore.set(shop_items)
}