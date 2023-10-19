<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { ElMessage}  from "element-plus";


import HeaderBanner from "@/components/HeaderBanner.vue";



import { signIn } from '@/api/user'


const loginForm = ref({
  username: '',
  password: '',
})

let doingLogin = false


const loginFailed = () => {
  ElMessage.error(`Oops, looks your email or password is wrong, please try again.`)
}

const userStore = useUserStore()

const router = useRouter()

function handleLogin() {
  doingLogin = true
  signIn(loginForm.value.username, loginForm.value.password ).then((res) => {
    userStore.setUserInfo(loginForm.value.username, `Bear ${res.token}`, res.userInfo)
    router.push({ path: '/home' })
  }).catch((err) => {
    console.log(err)
    loginFailed()
  }).finally(() => {
    doingLogin = false
  })
}

function handleSignUp() {
  router.push({ path: '/signup' })
}

function required(v: any) {
  return !!v || 'Field is required'
}

onMounted(() => {
})

</script>

<template>
  <v-container class="login">
    <header-banner></header-banner>
    <v-row class="login__container">
      <v-col class="card__container">
        <v-card class="card float-lg-right">
          <v-card-title>
            <h2>Been here before?</h2>
            <h1>Sign in.</h1>
          </v-card-title>
          <v-card-item>
            <h3>Sign in with your email and password.</h3>
            <div class="login__container__form">
              <v-form class="login__container__form__input">
                <v-text-field
                    v-model="loginForm.username"
                    label="Email"
                    :rules="[required]"
                    outlined
                ></v-text-field>
                <v-text-field
                    v-model="loginForm.password"
                    label="Password"
                    :rules="[required]"
                    type="password"
                    outlined
                    required
                ></v-text-field>
                  <v-btn
                      color="primary"
                      class="mr-4"
                      :disabled="doingLogin"
                      :loading="doingLogin"
                      outlined
                      @click="handleLogin"
                  >
                    Sign in
                  </v-btn>
                  <v-btn
                      color="primary"
                      class="mr-4"
                      outlined
                  >
                    Forgot password?
                  </v-btn>
              </v-form>
            </div>
          </v-card-item>
        </v-card>
      </v-col>
      <v-col class="card__container">
        <v-card class="card float-lg-left">
          <v-card-title>
            <h2>Not a member yet?</h2>
            <h2>Join now!</h2>
          </v-card-title>
          <v-card-item class="card__container__form">
            <p class="sign-up-reminder">
              <h3>you should jump right in!</h3>
              Sign up with your email and password.
              Join as paid member
              Pay as you go
              Take full control of your club’s profile
            </p>
            <h1>
              <v-btn
                  color="error"
                  size="x-large"
                  class="mr-4 long-btn"
                  outlined
                  @click="handleSignUp"
              >
                Sign up
              </v-btn>
            </h1>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>

  </v-container>
</template>

<style scoped lang="scss">

.login {
  margin: 0;
  padding: 0;
  max-width: 100%;

  .login__container {
    display: flex;
    justify-content: space-between;
    background: center/100% auto no-repeat url(@/assets/images/gallery4.jpg);
    width: 100%;
    min-height: 1040px;
    padding-top: 12%;

    .card {
      background: none;
      box-shadow: none;
      color: white;

      .sign-up-reminder {
        min-height: 176px;
      }

      .long-btn {
        width: 100%;
      }
    }

    .float-lg-left {
      width: 50%;
    }

    .float-lg-right {
      width: 50%;
    }
  }
}
</style>