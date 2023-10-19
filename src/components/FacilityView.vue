<script setup lang="ts">
import {onMounted, ref} from "vue";

import {bookFacility, getAllFacilities} from "@/api/facility";

import {useUserStore} from "@/stores/user";

import {ElMessage} from "element-plus";
const useStore = useUserStore()

const facilitiesData = ref([])

onMounted(() => {
  getAllFacilities().then((res: any) => {
    facilitiesData.value = res
  })
})

const tableRowClassName = ({
                             row,
                             rowIndex,
                           }: {
  row: any
  rowIndex: number
}) => {
  if (rowIndex % 2 == 1) {
    return 'warning-row'
  } else if (rowIndex % 2 == 0) {
    return 'success-row'
  }
  return ''
}

function handleBookBtn(scope: any) {
  const facilityId = scope.row.id
  const userId = useStore.userInfo.id
  const userPaymentMethodId = useStore.userPaymentInformation.id
  bookFacility(facilityId, userId, userPaymentMethodId).then((res: any) => {
    ElMessage.success('Booked successfully')
  }).catch((err: any) => {
    ElMessage.error('Booked failed')
  })
}

</script>

<template>
  <v-container class="full-screen">
    <v-row class="fill-height">
      <v-col cols="12" md="9" class="d-flex justify-center align-center">
        <el-table :data="facilitiesData" border style="width: 100%" :row-class-name="tableRowClassName">
          <el-table-column prop="name" label="name" width="80"/>
          <el-table-column prop="startTime" label="startTime" width="180">
            <template #default="scope">
              {{ scope.row.startTime.substring(0, 16) }}
            </template>
          </el-table-column>
          <el-table-column prop="endTime" label="endTime" width="180">
            <template #default="scope">
              {{ scope.row.endTime.substring(0, 16) }}
            </template>
          </el-table-column>
          <el-table-column prop="price" label="price ($)" width="180">
            <template #default="scope">
              {{ scope.row.price / 100 }}
            </template>
          </el-table-column>
          <el-table-column prop="capacity" label="capacity" width="80"/>
          <el-table-column prop="booked" label="booked" width="80"/>
          <el-table-column label="operation" width="100">
            <template #default="scope">
              <el-button type="primary" size="mini" @click="handleBookBtn(scope)">Book</el-button>
            </template>
          </el-table-column>
        </el-table>
      </v-col>
    </v-row>

  </v-container>

</template>

<style scoped lang="scss">

</style>