<template>
  <ion-page>

    <ion-content :fullscreen="true">
      <div class="container">
        <button class="btn-back" @click="$router.push('/auth')">
          <img src="../assets/back.svg" alt="back" />
        </button>
        <ion-text>
          <h1>Регистрация</h1>
        </ion-text>
        <div class="input-wrapper">
          <input :value="login" v-on:change="(e: any) => login = e.target.value" class="input" :class="[errorText && 'error']" required />
          <label>Логин</label>
        </div>
        <div class="input-wrapper">
          <input :value="lastname" v-on:change="(e: any) => lastname = e.target.value" class="input" :class="[errorText && 'error']" required />
          <label>Фамилия</label>
        </div>
        <div class="input-wrapper">
          <input :value="name" v-on:change="(e: any) => name = e.target.value" class="input" :class="[errorText && 'error']" required />
          <label>Имя</label>
        </div>
        <div class="input-wrapper">
          <input :value="secondname" v-on:change="(e: any) => secondname = e.target.value" class="input" :class="[errorText && 'error']" required />
          <label>Отчество</label>
        </div>
        <div class="input-wrapper">
          <input type="email" :value="email" v-on:change="(e: any) => email = e.target.value" class="input" :class="[errorText && 'error']" required />
          <label>E-mail</label>
        </div>
        <div class="input-wrapper">
          <input v-mask="'+7 (###) ###-##-##'" :value="tel" v-on:change="(e: any) => tel = e.target.value" class="input" :class="[errorText && 'error']" required />
          <label>Телефон</label>
        </div>
        <div class="input-wrapper">
          <input :value="password" v-on:change="(e: any) => password = e.target.value" class="input" :class="[errorText && 'error']" ref="passReg"
            required type="password" />
          <label>Пароль</label>
          <div @click="passToggle">
            <img v-show="pass == true" src="../assets/pass-close.svg" alt="pen">
            <img v-show="pass == false" src="../assets/pass-open.svg" alt="pen">
          </div>
        </div>
        <div class="input-wrapper">
          <input :value="passwordConfirm" v-on:change="(e: any) => passwordConfirm = e.target.value" class="input" :class="[errorText && 'error']"
            ref="passReg" required type="password" />
          <label>Подтвердите пароль</label>
          <div @click="passToggle">
            <img v-show="pass == true" src="../assets/pass-open.svg" alt="pen">
            <img v-show="pass == false" src="../assets/pass-close.svg" alt="pen">
          </div>
        </div>
        <div class="radio">
          <input :value="check" v-model="check" id="policy" type="radio" name="policy">
          <label class="label" for="policy">
            <span></span>
            <p>Я принимаю условия <a class="link">пользовательского соглашения</a></p>
          </label>
        </div>
        <p class="errorText" v-show="errorText">{{ errorText }}</p>
      </div>
      <div class="btns container">
        <button class="btn" @click="registrUserHandler">
          <div class="spinner" v-show="loading">
            <ion-spinner name="circles"></ion-spinner>
          </div>
          <span v-show="!loading">
            Зарегистрироваться
          </span>
        </button>
      </div>
    </ion-content>
    <!-- <ion-footer class="ion-no-border">
      
    </ion-footer> -->
  </ion-page>
</template>
  
<script lang="ts">
import { IonPage, IonContent, IonItem, IonButton, IonCheckbox, IonText, IonFooter, IonSpinner } from '@ionic/vue';

import { defineComponent } from 'vue';
import { mapActions } from 'pinia';
import { useLoginStore } from '../stores/login'
import {mask} from 'vue-the-mask'

export default defineComponent({
  name: 'Registration',
  components: {
    IonPage, IonContent, IonItem, IonButton, IonCheckbox, IonText, IonFooter, IonSpinner
  },
  directives: {mask},
  data() {
    return {
      pass: false,
      login: '',
      lastname: '',
      name: '',
      secondname: '',
      email: '',
      tel: '',
      password: '',
      passwordConfirm: '',
      check: 'policy',
      errorText: '',
      loading: false,
    }
  },
  methods: {
    ...mapActions(useLoginStore, ['registrUser',]),
    registrUserHandler() {
      if (this.login.length > 0 && this.lastname.length > 0 && this.name.length > 0 && this.secondname.length > 0 && this.email.length > 0 && this.tel.length > 0 && this.password.length > 0 && this.passwordConfirm.length > 0) {

        this.loading = true
        console.log(this.check, 'check')
        if (this.password == this.passwordConfirm) {
          let data = {
            login: this.login,
            lastname: this.lastname,
            name: this.name,
            secondname: this.secondname,
            email: this.email,
            tel: this.tel,
            password: this.password,
            password_confirm: this.password
          }
          console.log(data)

          this.registrUser(data).then(() => {
            this.loading = false
            if (this.$pinia.state.value?.login.registrResponse.status == true) {
              this.$router.push('/codeConfirm')
            } else {
              this.errorText = this.$pinia.state.value?.login.registrResponse.data
            }
            console.log(this.$pinia.state.value?.login.registrResponse)
          })
        } else {
          this.loading = false

          this.errorText = 'Пароли не совпадают'
        }
      } else {
        this.errorText = 'Заполните все поля!'
      }

    },
    passToggle() {
      var x = this.$refs.passReg
      if (x?.type === "password") {
        x.type = "text";
        this.$data.pass = true
      } else {
        x.type = "password";
        this.$data.pass = false

      }
    }
  },
  ionViewDidLeave(){
    this.errorText = ''
  }
});
</script>


<style scoped>
p {
  margin-bottom: 0;
}
</style>
  