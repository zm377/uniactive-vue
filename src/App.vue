<script setup lang="ts">
import {onMounted} from "vue";
import {useUserStore} from "@/stores/user";
import router from "@/router";
import { RouterView } from "vue-router";

const userStore = useUserStore();
onMounted(() => {
  userStore.isLoggedIn && router.push("/home");
});

</script>

<template>
  <RouterView />
</template>

<style scoped>
</style>
