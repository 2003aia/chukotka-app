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
            На номер телефона +7999 999 99 99 было направлено SMS-сообщение с кодом подтверждения регистрации, введите
            полученный код
          </p>
        </ion-text>

        <div class="input-otp">
          <input id="first" :value='first' v-on:change="(e:any)=>first=e.target.value" required v-on:keyup="(e) => clickEvent(e, 'sec')" placeholder="1" max="1" type="number"
            class="input">
          <input id="sec" :value='second' v-on:change="(e:any)=>second=e.target.value" required v-on:keyup="(e) => clickEvent(e, 'third')" placeholder="1" maxlength="1" type="number"
            class="input">
          <input id="third" :value='third' v-on:change="(e:any)=>third=e.target.value" required v-on:keyup="(e) => clickEvent(e, 'fourth')" placeholder="1" maxlength="1"
            type="number" class="input">
          <input id="fourth" :value='fourth' v-on:change="(e:any)=>fourth=e.target.value" required placeholder="1" maxlength="1" type="number" class="input">
        </div>
      </div>

    </ion-content>
    <ion-footer class="ion-no-border">
      <div class="btns container">
        <p class="response">{{ response }}</p>
        <button class="btn" @click="confirmHandler">
          Далее
        </button>
      </div>
    </ion-footer>
  </ion-page>
</template>
  
<script lang="ts">
import { IonPage, IonContent, IonText, IonFooter } from '@ionic/vue';

import { defineComponent } from 'vue';
import { mapActions } from 'pinia';
import { useLoginStore } from '../stores/login'

export default defineComponent({
  name: 'CodeConfirm',
  components: {
    IonPage, IonContent, IonText, IonFooter
  },
  data() {
    return {
      code: '',
      first: '',
      second: '',
      third: '',
      fourth: '',
      response: '',
    }
  },
  methods: {
    ...mapActions(useLoginStore, ['confirm',]),
    confirmHandler() {
      let input = this.first + this.second + this.third + this.fourth
      let data = {
        code: input
      }
      this.confirm(data).then(() => {
        this.response = this.$pinia.state.value.login.codeResponse?.data
        if (this.$pinia.state.value.login.codeResponse?.status == true) {
          this.$router.push('/confirm')
        } else {
          console.log(this.$pinia.state.value.login.codeResponse)

        }
        console.log(this.$pinia.state.value.login.codeResponse)
      })
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

.input-otp input:not(:valid) {
  border-color: 1px solid #F00 !important;
  /* caret-color: #F00; */
}

.input-otp input:last-child {
  margin-right: 0;
}</style>
  