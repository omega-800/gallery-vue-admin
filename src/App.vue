<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { loadFiles } from './util/setup.ts'
import ImageIcon from '@/components/icons/IconImage.vue'
import HomeIcon from '@/components/icons/IconHome.vue'
</script>

<script lang="ts">
loadFiles();
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">
        <HomeIcon />Home
      </RouterLink>
      <RouterLink to="/files">
        <ImageIcon />Files
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

      &.router-link-exact-active {
        color: $c-light;
      }
    }
  }
}
</style>
