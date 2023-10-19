<script setup lang="ts">

import HeaderBanner from "@/components/HeaderBanner.vue";
</script>

<template>
  <v-container>
    <HeaderBanner/>
  </v-container>
</template>

<style lang="scss">
  .home {
    &__container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
    }
  }
</style>
