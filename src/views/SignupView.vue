<script setup lang="ts">
import {ref, computed, reactive, onMounted} from 'vue'
import {useUserStore} from '@/stores/user'
import {signUp, emailRegisteredCheck} from "@/api/user";
import {getMembershipPlans, getMembershipLevels, registerMembership} from "@/api/membership";
import {addUserPaymentMethod} from "@/api/payment";
import {Avatar, Operation, SuccessFilled} from '@element-plus/icons-vue'
import {ElMessage} from "element-plus";

import HeaderBanner from "@/components/HeaderBanner.vue";
import router from "@/router";


const userStore = useUserStore()

interface Plan {
  id: number,
  name: string,
  label: string,
  describe: string,
}
interface Level {
  id: number,
  name: string,
  label: string,
  price: number,
  describe: string,
}

onMounted(() => {
  getMembershipPlans().then(res => {
    membershipPlanItems.value = res.map((item: Plan) => {
      return {
        value: item.id,
        name: item.name,
        department: item.describe,
      }
    })
  })
  getMembershipLevels().then(res => {
    membershipLevelItems.value = res.map((item: Level) => {
      return {
        value: item.id,
        name: item.name,
        department: item.describe,
      }
    })
  })
})

const signUpSteps = ref({
  current: 0,
  steps: [
    {
      title: 'Club & payment plan',
      description: 'Club & payment plan',
    },
    {
      title: 'Personal data',
      description: 'Personal data',
    },
    {
      title: 'Payment',
      description: 'Payment',
    },
  ],
})
interface Membership {
  userId: string;
  planId: number;
  levelId: number;
  price: number;
  userPaymentMethodId: string;
}

const membershipRequest = ref({} as Membership)

const userSelectedMembership = ref({
  planId: undefined,
  levelId: undefined,
})

const userSelectedPlan = computed(() => {
  return membershipPlanItems.value.find((item: any) => item.value === userSelectedMembership.value.planId)
})

const userSelectedLevel = computed(() => {
  return membershipLevelItems.value.find((item: any) => item.value === userSelectedMembership.value.levelId)
})

const userInfoFormValid = ref(false)

const userInfoForm = ref({
  firstName: '',
  lastName: '',
  gander: '',
  birthday: '',
  country: '',
  city: '',
  address: '',
  addressAddition: '',
  email: '',
  phone: '',
  emergencyContact: '',
  emergencyContactPhone: '',
  emergencyContactRelation: '',
  fpNumber: '',
  medicalHistory: {
    heartCondition: false,
    chestPain: false,
    dizzy: false,
    asthma: false,
    diabetes: false,
    muscleProblem: false,
    otherMedicalCondition: false,
    newToGym: false,
  },
  password: '',
  passwordConfirm: '',
  agreement: false,
  medicalHistoryConfirm: false,
})

interface MembershipLevel {
  [key: string]: number;
}

interface PaymentMethod {
  name: string,
  cardName: string,
  cardNumber: number,
  expiryDate: string,
  cvc: string,
}

const payment = reactive({
  amount: computed(() => {
    return userSelectedLevel.value ? userSelectedLevel.value.price : 0
  }),
  method: {} as PaymentMethod,
})

const paymentMethodSettle = computed(() => {
      return payment.method.name === 'cash' ? true : (payment.method.cardName && payment.method.cardNumber && payment.method.expiryDate && payment.method.cvc && payment.method.name === 'bank-card')
    }
)


function phoneRule(v: string) {
  return v.length >= 8 || 'Min 8 characters for phone number'
}

function cardNameRule(v: string) {
  return v.length >= 3 || 'Min 3 characters'
}

function cardNumberRule(v: number) {
  return (v + "").length == 16 || 'card number should be 16 digits'
}

function passwordRule(v: string) {
  return v.length >= 6 || 'Min 6 characters'
}

function confirmPass() {
  return userInfoForm.value.password === userInfoForm.value.passwordConfirm || 'Password does not match'
}

function handleSubmitUserInfo() {
  emailRegisteredCheck(userInfoForm.value.email).then(res => {
    if (res) {
      errorMessage('email is already registered')
    } else {
      signUp(userInfoForm.value).then(res => {
        userStore.userInfo = res
        signUpSteps.value.current++
      })
    }
  })
}

function handleSubmitPayment() {
  const userId = userStore.userInfo.id
  const paymentMethod = payment.method.name
  const bankCard = payment.method
  // add user payment method
  addUserPaymentMethod({userId, paymentMethod, bankCard}).then(res => {
    userStore.setUserPaymentInformation(res)
    //TODO register user membership
    membershipRequest.value = {
      userId: userStore.userInfo.id,
      planId: userSelectedMembership.value.planId,
      levelId: userSelectedMembership.value.levelId,
      price: userSelectedLevel.value.price,
      userPaymentMethodId: userStore.userPaymentInformation.id,
    }
    registerMembership(membershipRequest.value).then(res => {
      userStore.setMembership(res)
      router.push({ path: '/home' })
    })
  })
}

const membershipPlanItems = ref([])

const membershipLevelItems = ref([])

const paymentMethods = ref([
  {
    name: 'cash',
    value: 'cash',
    department: 'pay by cash.',
  },
  {
    name: 'bank card',
    value: 'bank-card',
    department: 'pay by bank card.',
  }
])

function selectorPropertyHandle(item: object) {
  return {
    title: item.name,
    value: item.value,
    subtitle: item.department,
  }
}

function handleSelectPlan(planId: number) {
  userSelectedMembership.value.planId = planId
}

function handleSelectLevel(levelId: number) {
  userSelectedMembership.value.levelId = levelId
}


function required(v: any) {
  return !!v || 'Field is required'
}

function errorMessage(message: string) {
  ElMessage.error(message)
}

function handleSubmitMembership() {
  userStore.setMembership(userSelectedMembership.value)
  signUpSteps.value.current++
}

const shortcuts = [
  {
    text: 'Today',
    value: new Date(),
  },
  {
    text: 'Yesterday',
    value: () => {
      const date = new Date()
      date.setTime(date.getTime() - 3600 * 1000 * 24)
      return date
    },
  },
  {
    text: 'A week ago',
    value: () => {
      const date = new Date()
      date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
      return date
    },
  },
]

const disabledDate = (time: Date) => {
  return time.getTime() > Date.now()
}


</script>

<template>
  <v-container class="el-pager">
    <header-banner></header-banner>
    <v-row class="sign-up-progress">
      <el-steps :active="signUpSteps.current" simple>
        <el-step title="Club & payment plan" :icon="Operation"/>
        <el-step title="Personal data" :icon="Avatar"/>
        <el-step title="Payment" :icon="SuccessFilled"/>
      </el-steps>
    </v-row>
    <v-row v-show="signUpSteps.current == 0">
      <!-- Choose your club and payment plan. -->
      <v-col class="card__container">
        <v-card class="card">
          <v-card-title>
            <h1>Membership Options</h1>
            <h2>Which option do you prefer?</h2>
          </v-card-title>
          <v-card-item>
            <h3>Choose your club and payment plan.</h3>
            <div class="login__container__form">
              <v-form>
                <v-row>
                  <!-- choose membership plan -->
                  <v-col cols="12" sm="6" md="4">
                    <v-select
                        v-model="userSelectedMembership.planId"
                        :items="membershipPlanItems"
                        :item-props="selectorPropertyHandle"
                        @update:model-value="handleSelectPlan"
                        label="Select"
                        outlined
                    ></v-select>
                  </v-col>
                  <!-- choose membership level -->
                  <v-col v-show="userSelectedMembership.planId" cols="12" sm="6" md="4">
                    <v-select
                        v-model="userSelectedMembership.levelId"
                        :items="membershipLevelItems"
                        @update:model-value="handleSelectLevel"
                        :item-props="selectorPropertyHandle"
                        label="Select"
                        outlined
                    ></v-select>
                  </v-col>
                </v-row>
              </v-form>
            </div>
          </v-card-item>
          <v-card-actions>
            <v-btn color="primary" :disabled="!(userSelectedMembership.planId && userSelectedMembership.levelId)" @click="handleSubmitMembership">
              Next
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-show="signUpSteps.current == 1" class="sign-up-form">
      <!-- collect personal sign up information, require to double check password -->
      <v-col class="card__container">
        <v-card class="card">
          <v-card-title>
            <h1>Please enter your personal details</h1>
            <h2>Complete the fields below</h2>
          </v-card-title>
          <v-card-item>
            <div class="login__container__form">
              <v-form v-model="userInfoFormValid">
                <v-card-subtitle>
                  <h3 class="text-red">
                    <span class="text-red">*</span>PERSONAL INFORMATION
                  </h3>
                </v-card-subtitle>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                        v-model="userInfoForm.firstName"
                        label="First Name"
                        :rules="[required]"
                        outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                        v-model="userInfoForm.lastName"
                        label="Last Name"
                        :rules="[required]"
                        outlined
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <!--select gander -->
                    <v-select
                        v-model="userInfoForm.gander"
                        label="Gander"
                        :rules="[required]"
                        outlined
                        :items="['Male', 'Female', 'Other']"
                    ></v-select>
                  </v-col>
                </v-row>

                <v-card-subtitle>
                  <h3 class="text-grey">DATE OF BIRTH</h3>
                </v-card-subtitle>

                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <el-date-picker
                        v-model="userInfoForm.birthday"
                        type="date"
                        placeholder="Pick a day"
                        :disabled-date="disabledDate"
                        :shortcuts="shortcuts"
                        size="large"
                    />
                  </v-col>
                </v-row>
                <v-card-subtitle>
                  <h3 class="text-red">CONTACT INFORMATION</h3>
                </v-card-subtitle>
                <v-row>

                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                        v-model="userInfoForm.country"
                        label="Country"
                        :rules="[required]"
                        outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                        v-model="userInfoForm.city"
                        label="City"
                        :rules="[required]"
                        outlined
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>

                  <v-col cols="24" sm="12" md="8">
                    <v-text-field
                        v-model="userInfoForm.address"
                        label="Address"
                        :rules="[required]"
                        outlined
                    ></v-text-field>
                  </v-col>

                </v-row>

                <v-row>

                  <v-col cols="24" sm="12" md="8">
                    <v-text-field
                        v-model="userInfoForm.addressAddition"
                        label="Address Addition"
                        outlined
                    ></v-text-field>
                  </v-col>

                </v-row>

                <v-card-subtitle>
                  <h3 class="text-red">PHONE & EMAIL</h3>
                </v-card-subtitle>
                <v-row>

                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                        v-model="userInfoForm.email"
                        label="Email"
                        :rules="[required]"
                        outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                        v-model="userInfoForm.phone"
                        label="Phone"
                        :rules="[required, phoneRule]"
                        outlined
                    ></v-text-field>
                  </v-col>

                </v-row>

                <v-card-subtitle>
                  <h3 class="text-red">EMERGENCY CONTACT DETAILS</h3>
                </v-card-subtitle>
                <v-row>

                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                        v-model="userInfoForm.emergencyContact"
                        label="Emergency Contact"
                        :rules="[required]"
                        outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                        v-model="userInfoForm.emergencyContactPhone"
                        label="Emergency Contact Phone"
                        :rules="[required, phoneRule]"
                        outlined
                    ></v-text-field>
                  </v-col>

                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                        v-model="userInfoForm.emergencyContactRelation"
                        label="Emergency Contact Relation"
                        :rules="[required]"
                        outlined
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-card-subtitle>
                  <h3 class="text-red">FITNESS PASSPORT (IF APPLICABLE)</h3>
                </v-card-subtitle>
                <v-row>

                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                        v-model="userInfoForm.fpNumber"
                        label="FP Number"
                        outlined
                    ></v-text-field>
                  </v-col>

                </v-row>

                <v-card-subtitle>
                  <h3 class="text-red">ADULT PRE-EXERCISE SCREENING</h3>
                </v-card-subtitle>
                <!-- Has your doctor ever told you that you have a heart condition or ever suffered a stroke? switch button -->
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-switch
                        v-model="userInfoForm.medicalHistory.heartCondition"
                        label="Has your doctor ever told you that you have a heart condition or ever suffered a stroke?"
                        outlined
                    ></v-switch>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-switch
                        v-model="userInfoForm.medicalHistory.chestPain"
                        label="Do you experience unexplained pains in your chest at rest or during physical activity/exercise?"
                        outlined
                    ></v-switch>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-switch
                        v-model="userInfoForm.medicalHistory.dizzy"
                        label="Do you ever feel faint or have spells of dizziness during physical activity/exercise that causes you to lose balance?"
                        outlined
                    ></v-switch>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-switch
                        v-model="userInfoForm.medicalHistory.asthma"
                        label="Have you had an asthma attack requiring immediate medical attention at any time in the last 12 months?"
                        outlined
                    ></v-switch>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-switch
                        v-model="userInfoForm.medicalHistory.diabetes"
                        label="If you have diabetes (type 1 or type 2) have you had trouble controlling your blood glucose in the last 3 months?"
                        outlined
                    ></v-switch>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-switch
                        v-model="userInfoForm.medicalHistory.muscleProblem"
                        label="Do have any diagnosed muscle, bone or joint problems that you have been told could be made worse by participating in physical activity/exercise?"
                        outlined
                    ></v-switch>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-switch
                        v-model="userInfoForm.medicalHistory.otherMedicalCondition"
                        label="Do you have any other medical condition/s that makes it dangerous for you to participate in physical activity/exercise?"
                        outlined
                    ></v-switch>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-switch
                        v-model="userInfoForm.medicalHistory.newToGym"
                        label="Are you new to exercising in a gym"
                        outlined
                    ></v-switch>
                  </v-col>
                </v-row>

                <v-card-subtitle>
                  <h3 class="text-red">PASSWORD</h3>
                </v-card-subtitle>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                        v-model="userInfoForm.password"
                        label="Password"
                        :rules="[required, passwordRule]"
                        type="password"
                        outlined
                        required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                        v-model="userInfoForm.passwordConfirm"
                        label="Confirm Password"
                        :rules="[confirmPass]"
                        type="password"
                        outlined
                        required
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-card-subtitle>
                  <h3 class="text-red">YOU HAVE TO AGREE TO OUR TERMS AND CONDITIONS</h3>
                </v-card-subtitle>

                <!-- check all agreements, switch button color: red -->

                <v-card-subtitle>
                  <h3 class="text-black">
                    <span class="text-red">*</span>
                    I have read and agree to the UniActive Terms and Conditions
                  </h3>
                </v-card-subtitle>
                <v-row>
                  <v-col cols="16" sm="8" md="6">
                    <v-switch
                        v-model="userInfoForm.agreement"
                        label=""
                        :rules="[required]"
                        outlined
                    ></v-switch>
                  </v-col>
                </v-row>

                <v-card-subtitle>
                  <h3 class="text-black">
                    <span class="text-red">*</span>
                    I believe that to the best of my knowledge, all the medical information I have
                    supplied within this page and attachment is correct.</h3>
                </v-card-subtitle>

                <v-row>
                  <v-col cols="24" sm="12" md="10">
                    <v-switch
                        v-model="userInfoForm.medicalHistoryConfirm"
                        label=""
                        :rules="[required]"
                        outlined
                    ></v-switch>
                  </v-col>
                </v-row>

              </v-form>
            </div>
          </v-card-item>
          <v-card-actions>
            <v-btn color="primary" @click="signUpSteps.current = 0">Previous</v-btn>
            <v-btn color="primary" :disabled="!userInfoFormValid" @click="handleSubmitUserInfo">Next</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

    </v-row>

    <v-row v-show="signUpSteps.current == 2" class="payment">
      <!-- Select Payment, pay by cash or bank card-->
      <v-col class="card__container">
        <v-card class="card payment__container">
          <v-card-title>
            <h1>Payment</h1>
            <h2>How do you want to pay?</h2>
          </v-card-title>
          <v-card-item>
            <v-card-subtitle>
              <h1 class="text-red">Your plan will charge ${{ payment.amount }}</h1>
              <h3 class="text-red">Choose your payment method.</h3>
            </v-card-subtitle>
            <div class="login__container__form">
              <v-form>
                <v-row>
                  <!-- choose payment method -->
                  <v-col cols="12" sm="6" md="4">
                    <v-select
                        v-model="payment.method.name"
                        :items="paymentMethods"
                        :item-props="selectorPropertyHandle"
                        label="Select"
                        outlined
                    ></v-select>
                  </v-col>
                </v-row>
              </v-form>
            </div>
          </v-card-item>
          <v-card-item v-show="payment.method.name == 'bank-card'">
            <v-card-subtitle>
              <h3 class="text-red">Enter your bank card information.</h3>
            </v-card-subtitle>
            <div class="login__container__form">
              <v-form>
                <v-row>
                  <!-- enter card name -->
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                        v-model="payment.method.cardName"
                        label="Card Name"
                        :rules="[required, cardNameRule]"
                        outlined
                    ></v-text-field>
                  </v-col>
                  <!-- enter card number -->
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                        v-model="payment.method.cardNumber"
                        label="Card Number"
                        :rules="[required, cardNumberRule]"
                        outlined
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <!-- enter expiry date -->
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                        v-model="payment.method.expiryDate"
                        label="Expiry Date"
                        placeholder="MM/YY"
                        :rules="[required]"
                        outlined
                    ></v-text-field>
                  </v-col>
                  <!-- enter cvc -->
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                        v-model="payment.method.cvc"
                        label="CVC"
                        :rules="[required]"
                        outlined
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-form>
            </div>
          </v-card-item>
          <v-card-actions>
            <v-btn color="primary" :disabled="!paymentMethodSettle" @click="handleSubmitPayment">
              Next
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>


  </v-container>

</template>

<style scoped lang="scss">
.el-pager {
  margin: 0;
  padding: 0;
  max-width: 100%;
  flex-wrap: wrap;

  .sign-up-progress {
    margin-top: 12px;
    padding: 0;
    max-width: 100%;
    width: 100%;
    display: flex;

    .el-steps {
      padding: 12px 20%;
      width: 100%;
    }

  }

  .card__container {
    padding: 0 280px;

    .payment__container {
      padding: 0 200px;
    }
  }

}

</style>