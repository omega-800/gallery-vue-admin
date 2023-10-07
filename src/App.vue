<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import ToggleIconHome from '@/components/icons/toggle/ToggleIconHome.vue'
import ToggleIconFolder from '@/components/icons/toggle/ToggleIconFolder.vue'
import ToggleIconCategories from '@/components/icons/toggle/ToggleIconCategories.vue'
import ToggleIconTag from '@/components/icons/toggle/ToggleIconTag.vue'
import ToggleIconShop from '@/components/icons/toggle/ToggleIconShop.vue'
</script>

<script lang="ts">
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/" v-slot="{ isActive, isExactActive }">
        <ToggleIconHome :active="isActive && isExactActive" :disabled="isActive && isExactActive" :label="true" />
      </RouterLink>
      <RouterLink to="/files" v-slot="{ isActive, isExactActive }">
        <ToggleIconFolder :active="isActive && isExactActive" :disabled="isActive && isExactActive" :label="true" />
      </RouterLink>
      <RouterLink to="/entities">
        <span>Entities</span>
      </RouterLink>
      <RouterLink to="/categories" v-slot="{ isActive, isExactActive }">
        <ToggleIconCategories :active="isActive && isExactActive" :disabled="isActive && isExactActive" :label="true" />
      </RouterLink>
      <RouterLink to="/tags" v-slot="{ isActive, isExactActive }">
        <ToggleIconTag :active="isActive && isExactActive" :disabled="isActive && isExactActive" :label="true"
          text="Tags" />
      </RouterLink>
      <RouterLink to="/categories" v-slot="{ isActive, isExactActive }">
        <ToggleIconTag :active="isActive && isExactActive" :disabled="isActive && isExactActive" :label="true"
          text="Categories" />
      </RouterLink>
      <RouterLink to="/galleries" v-slot="{ isActive, isExactActive }">
        <ToggleIconCategories :active="isActive && isExactActive" :disabled="isActive && isExactActive" :label="true"
          text="Galleries" />
      </RouterLink>
      <RouterLink to="/shop_items" v-slot="{ isActive, isExactActive }">
        <ToggleIconShop :active="isActive && isExactActive" :disabled="isActive && isExactActive" :label="true" />
      </RouterLink>
    </nav>
  </header>
  <main>
    <RouterView :key="$route.path" />
  </main>
</template>

<style lang="scss">
@import '@/assets/main.scss';

header {
  width: 100%;
  position: sticky;

  & nav {
    display: flex;
    justify-content: space-evenly;
    background-color: $c-p-dark;
    padding: $el-size;
    text-align: center;

    a {
      font-weight: bold;
    }
  }
}
</style>
