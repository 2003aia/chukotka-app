<template>
  <ion-page>

    <ion-content :fullscreen="true">
      <div class="container">
        <button fill="clear" class="btn-back" @click="changeShow == true ? changeShow = false : $router.push('/auth')">
          <img src='../assets/back.svg' />
        </button>
        <ion-text>
          <h1 v-show="changeShow == false">Восстановление пароля</h1>
          <h1 v-show="changeShow == true">Смена пароля</h1>

        </ion-text>
        <ion-text>
          <p v-show="changeShow == false">
            Укажите адрес электронной почти или номер телефона, указанные при регистрации
          </p>

        </ion-text>
        <div class="input-wrapper" v-show="changeShow == false">
          <input :value="email" v-on:change="(e: any) => email = e.target.value" class="input" required />
          <label>E-mail</label>
        </div>
        <div class="input-wrapper" v-show="changeShow == false">
          <input :value="login" v-on:change="(e: any) => login = e.target.value" class="input" required />
          <label>Логин</label>
        </div>
        <div class="input-wrapper" v-show="changeShow == false">
          <input :value="pok" v-on:change="(e: any) => pok = e.target.value" class="input" required />
          <label>Последнее показание</label>
        </div>
        <div v-show="changeShow == true">

          <div class="input-wrapper">
            <input :value="password" v-on:change="(e:any)=>password = e.target.value" required ref="passOld" type="password" class="input">
            <label>Пароль</label>
            <div @click="passToggle('passOld')">
              <img v-show="pass.passOld == true" src="../assets/pass-open.svg" alt="pen">
              <img v-show="pass.passOld == false" src="../assets/pass-close.svg" alt="pen">
            </div>
          </div>
          <div class="input-wrapper">
            <input :value="passwordConfirm" v-on:change="(e:any)=>passwordConfirm = e.target.value" required ref="passNew" type="password" class="input">
            <label>Повторите пароль</label>
            <div @click="passToggle('passNew')">
              <img v-show="pass.passNew == true" src="../assets/pass-open.svg" alt="pen">
              <img v-show="pass.passNew == false" src="../assets/pass-close.svg" alt="pen">
            </div>
          </div>

        </div>

      </div>

    </ion-content>

    <ion-footer class="ion-no-border">
      <div class="btns container">
        <p class="response">{{ response }}</p>
        <button v-show="changeShow == false" class="btn" @click="passwordRecoveryHandler">
          <div class="spinner" v-show="loadingRecovery">
            <ion-spinner name="circles"></ion-spinner>
          </div>
          <span v-show="!loadingRecovery">
            Далее
          </span>
        </button>
        <button v-show="changeShow == true" class="btn" @click="authHandler">
          <div class="spinner" v-show="loadingAuth">
            <ion-spinner name="circles"></ion-spinner>
          </div>
          <span v-show="!loadingAuth">
            Далее
          </span>
        </button>
      </div>

    </ion-footer>
  </ion-page>
</template>
  
<script lang="ts">
import { IonPage, IonContent, IonText, IonFooter, IonSpinner } from '@ionic/vue';
import { mapActions } from 'pinia';
import { useLoginStore } from '../stores/login'
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PasswordRecovery',

  components: {
    IonPage, IonContent, IonText, IonFooter, IonSpinner
  },
  data() {
    return {
      changeShow: false,
      email: '',
      login: '',
      pok: '',
      password: '',
      passwordConfirm: '',
      response: '',
      error: '',
      pass: {
        passOld: false,
        passNew: false,
      },
      loadingAuth: false,
      loadingRecovery: false
    }
  },
  methods: {
    ...mapActions(useLoginStore, ['passwordRecovery', 'authUser']),
    passwordRecoveryHandler() {
      this.loadingRecovery = true
      let data = {}
      // console.log(this.login)
      // if (this.login.includes('@')) {
      //   data = {
      //     email: this.email,
      //   }
      // } else {
      data = {
        email: this.email,
        login: this.login,
        pok: this.pok,
      }
      // }

      this.passwordRecovery(data).then(() => {
        this.loadingRecovery = false
        if (this.$pinia.state.value.login.passRecoveryResponse?.status == true) {
          this.changeShow = true
        } else {
          console.log(this.$pinia.state.value.login.passRecoveryResponse)

        }
        this.response = this.$pinia.state.value.login.passRecoveryResponse?.data
        console.log(this.$pinia.state.value.login.passRecoveryResponse)
      })
    },
    authHandler() {
      this.loadingAuth = true
      if(this.password == this.passwordConfirm) {
        this.loadingAuth = false
        this.authUser(this.login, this.password).then(() => {
        if (this.$pinia.state.value?.login.authResponse?.status == true) {
          this.$router.push('/tabs')
        } else {
          console.log(this.$pinia.state.value?.login.authResponse)
        }
        this.response = this.$pinia.state.value?.login.authResponse?.data
      })
      } else {
        this.loadingAuth = false

        this.error = 'Пароли не совпадают!'
      }
      
    },
    passToggle(el: string) {
      if (el == 'passOld') {
        var x = this.$refs.passOld
        if (x.type === "password") {
          x.type = "text";
          this.$data.pass.passOld = true
        } else {
          x.type = "password";
          this.$data.pass.passOld = false

        }
      } else {
        var x = this.$refs.passNew
        if (x?.type === "password") {
          this.$data.pass.passNew = true

          x.type = "text";
        } else {
          x.type = "password";
          this.$data.pass.passNew = false

        }
      }

    }
  }

});
</script>


<style scoped>
.logo {
  object-fit: contain;
  height: 55px;
  margin-top: 100px;
}
</style>
  