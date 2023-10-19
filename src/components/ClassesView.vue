<script setup lang="ts">

import {onMounted, ref} from "vue";

import {bookClass, getAllClasses} from "@/api/classes";

import {useUserStore} from "@/stores/user";

import {ElMessage} from "element-plus";

const classesData = ref([])

onMounted(() => {
  getAllClasses().then((res: any) => {
    classesData.value = res
  })
})

const useStore = useUserStore()

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
  const classesId = scope.row.id
  const userId = useStore.userInfo.id
  const userPaymentMethodId = useStore.userPaymentInformation.id
  bookClass(classesId, userId, userPaymentMethodId).then((res: any) => {
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
        <el-table :data="classesData" border style="width: 100%" :row-class-name="tableRowClassName">
          <el-table-column prop="name" label="name" width="80"/>
          <el-table-column prop="coach" label="coach" width="110"/>
          <el-table-column prop="startTime" label="startTime" width="180">
            <template #default="scope">
              {{ scope.row.startTime.substring(0, 16) }}
            </template>
          </el-table-column>
          <el-table-column prop="endTime" label="endTime" width="180">
            <template #default="scope">
              {{ scope.row.startTime.substring(0, 16) }}
            </template>
          </el-table-column>
          <el-table-column prop="duration" label="duration" width="80"/>
          <el-table-column prop="price" label="price ($)" width="180">
            <template #default="scope">
              {{ scope.row.price / 100 }}
            </template>
          </el-table-column>
          <el-table-column prop="capacity" label="capacity" width="180"/>
          <el-table-column prop="id" label="Operation" fixed="right" width="180">
            <template #default="scope">
              <v-btn color="primary" @click="handleBookBtn(scope)">book</v-btn>
            </template>
          </el-table-column>
        </el-table>
      </v-col>
      <v-col cols="12" md="3" class="d-flex justify-center align-center">
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped lang="scss">

</style>