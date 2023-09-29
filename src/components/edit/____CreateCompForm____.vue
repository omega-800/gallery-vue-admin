<script setup lang="ts">
import { type EntityInfo, type EntityType } from '@/util/entities'
import FormFromFields from '@/components/edit/FormFromFields.vue';
import LoadingComp from '@/components/helpers/LoadingComp.vue'
import FileUpload from '@/components/file/FileUpload.vue'
import { ref } from 'vue'
import { addTag } from '@/util/gql/tag';

const props = defineProps<{
    entityType: EntityInfo
}>()

let isLoading = ref(false);
const store = props.entityType.store();
let fields = store.fields()

async function submitNew(data: any) {
    isLoading.value = true;
    try {
        let newData = await addTag(data);
        store.add(newData)
        fields = store.fields()
    } catch (err) {
        alert(err)
        console.error(err)
    }
    isLoading.value = false;
}
</script>

<template>
    <p class="f-l">Create new {{ entityType.display_name }}</p>
    <LoadingComp v-if="isLoading" />
    <FileUpload v-if="entityType.name as string == 'file'" />
    <FormFromFields v-else :fields="fields" @submitted="submitNew" />
</template>

<style scoped lang="scss"></style>
