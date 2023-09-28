<script setup lang="ts">
import type { FileData } from '@/types/gql/response/File';
import { isImage } from '@/util/util';
import StarIcon from '@/components/icons/IconStar.vue'
import StarIconSolid from '@/components/icons/IconStarSolid.vue'
import { alterFile, setFavoriteFile } from '@/util/gql/file'
import { ref } from 'vue';
import { useFileStore } from '@/stores/files';
import FileComp from '@/components/file/FileComp.vue'
import EditCompWrapper from '@/components/helpers/EditCompWrapper.vue';
import FileEditFields from '@/components/file/FileEditFields.vue'
import { getEntityInfo } from '@/util/entities';
import SelectEntityList from '@/components/edit/SelectEntityList.vue';
import EditForm from '@/components/edit/EditForm.vue';

const { file } = defineProps<{
    file: FileData
}>()

const fileStore = useFileStore();

let isFav = ref(file.favorite)

async function setFav() {
    isFav.value = !file.favorite;
    try {
        let dateUpdated = await setFavoriteFile(file.id, isFav.value);
        fileStore.updateProperty(file.id, 'date_updated', dateUpdated)
        fileStore.updateProperty(file.id, 'favorite', isFav.value)
    } catch (err) {
        alert(err)
        isFav.value = !isFav.value
    }
}

let input: any;

function setInput(data: any) {
    console.log(data)
    input = data;
}

let tag_ids: string[];

function setTags(data: string[]) {
    tag_ids = data;
}

async function submitEdited() {
    try {
        let newData = await alterFile(isImage(file) ? 'image' : 'video', { ...input, /* tag_ids: tag_ids, */ id: file.id });
        fileStore.updateProperties(file.id, newData)
    } catch (err) {
        alert(err)
        console.error(err)
    }
}

const fields: any = {
    edited: file.edited,
    name: file.name,
    /* galleries: Gallery[];
    shop_items?: ShopItem[] | null */
}

if (isImage(file)) fields.alt = file.alt
fields.tag_ids = JSON.parse(JSON.stringify(file.tag_ids))
</script>

<template>
    <EditCompWrapper :entity-store="fileStore" :entity-id="file.id" @submitted="submitEdited()">
        <template #form>
            <EditForm :fields="fields" @submitted="(data: any) => { setInput(data); submitEdited() }" />
            <!--FileEditFields :file="file" @changed="setInput" />
            <SelectEntityList :entity-type="getEntityInfo('tag')!" :selected_ids="file.tag_ids" @changed="setTags" /-->
        </template>
        <template #options>
            <div class="favorite hov" @click="setFav()">
                <StarIconSolid v-if="file.favorite" />
                <StarIcon v-else />
            </div>
        </template>
        <template #main>
            <FileComp :file="file" />
        </template>
    </EditCompWrapper>
</template>

<style scoped lang="scss">
.file-comp {
    width: 100%;

    &.isfavorite {
        outline-color: $c-s-light;

        & .favorite {
            color: $c-s-light;
        }
    }

    &.isdeleted {
        outline-color: $c-light;

        & .delete {
            color: $c-light;
        }
    }

    & .name-container {
        &>* {
            line-break: anywhere;
        }
    }

    & .content {
        width: 100%;
        position: relative;

        & .file {
            width: 100%;
        }

        & .info-container {
            position: absolute;
            width: 100%;
            top: 0;
            left: 0;
            opacity: 0;
            font-size: $f-s;
            color: $c-p-light;
            border-collapse: collapse;
            background-color: $c-dark;
            transition: $tr-op-def;

            & tr {
                border-bottom: $thin solid $c-p-light;
            }

            & th {
                text-align: start;
            }

        }

        &:hover .info-container {
            opacity: $op-h;
        }
    }
}
</style>
