<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import ImageIcon from '@/components/icons/IconImage.vue'
import ImageIconSolid from '@/components/icons/IconImageSolid.vue'
import HomeIcon from '@/components/icons/IconHome.vue'
import HomeIconSolid from '@/components/icons/IconHomeSolid.vue'
import TagIcon from '@/components/icons/IconTag.vue'
import TagIconSolid from '@/components/icons/IconTagSolid.vue'
</script>

<script lang="ts">
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/" v-slot="{ isActive, isExactActive }">
        <HomeIconSolid v-if="isActive && isExactActive" />
        <HomeIcon v-else />
        <span>Home</span>
      </RouterLink>
      <RouterLink to="/files" v-slot="{ isActive, isExactActive }">
        <ImageIconSolid v-if="isActive && isExactActive" />
        <ImageIcon v-else />
        <span>Files</span>
      </RouterLink>
      <RouterLink to="/categories" v-slot="{ isActive, isExactActive }">
        <TagIconSolid v-if="isActive && isExactActive" />
        <TagIcon v-else />
        <span>Categories</span>
      </RouterLink>
    </nav>
  </header>
  <main>
    <RouterView />
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
      color: $c-p-light;
      display: flex;
      align-items: center;
      gap: $el-pad;

      &.router-link-exact-active {
        color: $c-light;
      }
    }
  }
}
</style>
