<script setup lang="ts">

import HeaderBanner from "@/components/HeaderBanner.vue";
import type {TabsPaneContext} from 'element-plus'

import videoBanner from "@/assets/images/video-banner.jpg";

import router from "@/router";

import {onMounted, ref} from "vue";
import ClassesView from "@/components/ClassesView.vue";
import FacilityView from "@/components/FacilityView.vue";
import ConsultationView from "@/components/ConsultationView.vue";

const activeName = ref("class");

function handleClickTabs(tab: TabsPaneContext, event: Event) {
  console.log(tab);
}

function logout() {
  router.push("/");
}

</script>

<template>
    <v-container class="full-screen">
      <HeaderBanner/>
      <v-row class="home__container">
        <v-col cols="12" md="11">
          <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClickTabs">
            <el-tab-pane label="Class" name="class">
              <ClassesView/>
            </el-tab-pane>
            <el-tab-pane label="Facility" name="facility">
              <FacilityView/>
            </el-tab-pane>
            <el-tab-pane label="Consultation" name="consultation">
              <ConsultationView/>
            </el-tab-pane>
          </el-tabs>
        </v-col>
        <v-col cols="12" md="1">
          <v-row class="log_out__container">
            <v-col cols="12">
              <v-btn color="error" @click="logout">Logout</v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
</template>

<style lang="scss">
.full-screen {
  width: 100%;
  max-width: 100%;

  &__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
}
</style>
