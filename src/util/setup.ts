import { useFileStore } from '@/stores/files'
import { getFiles } from './gql/file';

export async function loadFiles() {
    const store = useFileStore();
    store.set(await getFiles())
}