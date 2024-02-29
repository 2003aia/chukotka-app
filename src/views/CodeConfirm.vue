<template>
  <ion-page>

    <ion-content :fullscreen="true">
      <div class="container">
        <button class="btn-back" @click="this.$router.push('/reg')">
          <img src="../assets/back.svg" alt="back" />
        </button>
        <ion-text>
          <h1>Введите код</h1>
        </ion-text>
        <ion-text>
          <p>
            На номер телефона было направлено SMS-сообщение с кодом подтверждения регистрации, введите
            полученный код
          </p>
        </ion-text>

        <div class="input-otp" :class="[errorText && 'error']">
          <input id="first" :value='first' v-on:change="(e: any) => first = e.target.value" required
            v-on:keyup="(e) => clickEvent(e, 'sec')" placeholder="1" maxlength="1" type="text" class="input">
          <input id="sec" :value='second' v-on:change="(e: any) => second = e.target.value" required
            v-on:keyup="(e) => clickEvent(e, 'third')" placeholder="1" maxlength="1" type="text" class="input">
          <input id="third" :value='third' v-on:change="(e: any) => third = e.target.value" required
            v-on:keyup="(e) => clickEvent(e, 'fourth')" placeholder="1" maxlength="1" type="text" class="input">
          <input id="fourth" :value='fourth' v-on:change="(e: any) => fourth = e.target.value"
            v-on:keyup="(e) => clickEvent(e, 'first')" placeholder="1" maxlength="1" type="text" class="input">
        </div>
      </div>

    </ion-content>
    <ion-footer class="ion-no-border">
      <div class="btns container">
        <p class="errorText" v-show="errorText">{{ errorText }}</p>
        <p class="response" v-show="response">{{ response }}</p>
        <button class="btn" @click="confirmHandler">
          <div class="spinner" v-show="loading">
            <ion-spinner name="circles"></ion-spinner>
          </div>
          <span v-show="!loading">
            Далее
          </span>
        </button>
      </div>
    </ion-footer>
  </ion-page>
</template>
  
<script lang="ts">
import { IonPage, IonContent, IonText, IonFooter, IonSpinner } from '@ionic/vue';

import { defineComponent } from 'vue';
import { mapActions } from 'pinia';
import { useLoginStore } from '../stores/login'

export default defineComponent({
  name: 'CodeConfirm',
  components: {
    IonPage, IonContent, IonText, IonFooter, IonSpinner
  },
  data() {
    return {
      code: '',
      first: '',
      second: '',
      third: '',
      fourth: '',
      response: '',
      loading: false,
      maxLength: 1,
      errorText: ''
    }
  },
  methods: {
    ...mapActions(useLoginStore, ['confirm',]),
    confirmHandler() {
      this.errorText = ''
      if (this.first.length == 1 && this.second.length == 1 && this.third.length == 1 && this.fourth.length == 1) {

        this.loading = true
        let input = this.first + this.second + this.third + this.fourth
        let data = {
          code: input
        }
        this.confirm(data).then(() => {
          this.loading = false
          this.response = this.$pinia.state.value.login.codeResponse?.data
          if (this.$pinia.state.value.login.codeResponse?.status == false/* true */) {
            this.$router.push('/confirm')
          } else {
            console.log(this.$pinia.state.value.login.codeResponse)

          }
          console.log(this.$pinia.state.value.login.codeResponse)
        })
      } else {
        this.errorText = 'Заполните все поля!'
      }

    },
    backFnc() {
      this.$router.go(-1)
    },
    clickEvent: function (first: any, last: any) {
      if (first?.target.value.length) {
        console.log(last)
        document.getElementById(last)?.focus()
      }
    }
  },
  setup() {

    return {
    }
  }


});
</script>


<style scoped>
.input-otp {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 30px;
}

.input-otp input {
  width: 48px;
  padding: 10px 15px;
  margin-right: 20px;
  font-weight: 500;
  font-size: 22px;
  background-color: #F2F9FF;
  border-radius: 5px;
  border: none;
}

.input-otp input::placeholder {
  font-size: 22px;
}

.input-otp input:focus {
  border: 1px solid #005D9F;
  caret-color: #005D9F;
}

.input-otp.error input {
  border: 1px solid #F00 !important;
  /* caret-color: #F00; */
}

.input-otp input:last-child {
  margin-right: 0;
}
</style>
  