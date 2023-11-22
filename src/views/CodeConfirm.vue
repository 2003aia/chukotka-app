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
          <input id="first" v-on:keyup="(e) => clickEvent(e, 'sec')" placeholder="1" max="1" type="number" class="input">
          <input id="sec" v-on:keyup="(e) => clickEvent(e, 'third')" placeholder="1" maxlength="1" type="number"
            class="input">
          <input id="third" v-on:keyup="(e) => clickEvent(e, 'fourth')" placeholder="1" maxlength="1" type="number"
            class="input">
          <input id="fourth" placeholder="1" maxlength="1" type="number" class="input">
        </div>
      </div>

    </ion-content>
    <ion-footer class="ion-no-border">
      <div class="btns container">
        <button class="btn" @click="this.$router.push('/confirm')">
          Далее
        </button>
      </div>
    </ion-footer>
  </ion-page>
</template>
  
<script lang="ts">
import { IonPage, IonContent, IonText, IonFooter } from '@ionic/vue';

import { defineComponent } from 'vue';


export default defineComponent({
  name: 'CodeConfirm',
  components: {
    IonPage, IonContent, IonText, IonFooter
  },
  methods: {
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
  border: 1px solid red;
  border: none;
}

.input-otp input:last-child {
  margin-right: 0;
}
</style>
  