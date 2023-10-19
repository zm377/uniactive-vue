<script setup lang="ts">

import {addConsultation} from "@/api/consultation";
import {ref} from "vue";

import {ElMessage} from "element-plus";
import {useUserStore} from "@/stores/user";

const userStore = useUserStore()

const consultation = ref({
  userId: "",
  userName: "",
  email: "",
  phone: "",
  message: "",
});

function submitConsultation() {
  consultation.value.userId = userStore.userInfo.id
  addConsultation(consultation.value).then((res) => {
        ElMessage.success("Consultation submitted successfully")
        consultation.value = {
          userId: "",
          userName: "",
          email: "",
          phone: "",
          message: "",
        }
      }
  )
}

</script>

<template>
  <v-container class="full-screen">
    <v-row>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>
            <h3>Consultation</h3>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="consultation.userName" label="Name" outlined></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="consultation.email" label="Email" outlined></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="consultation.phone" label="Phone" outlined></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea v-model="consultation.message" label="Message" outlined></v-textarea>
              </v-col>
              <v-col cols="12">
                <v-btn color="primary" @click="submitConsultation">Submit</v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped lang="scss">

</style>