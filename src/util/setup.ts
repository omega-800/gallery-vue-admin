import { useFileStore } from '@/stores/files'
import { getImages, getVideos } from './gql/file';
import { useTagStore } from '@/stores/tags';
import { getTags } from './gql/tag';

export async function loadFiles() {
    const filesStore = useFileStore();
    const images = await getImages();
    const videos = await getVideos();
    filesStore.set([...images, ...videos])
    const tagsStore = useTagStore();
    const tags = await getTags();
    tagsStore.set(tags)
}