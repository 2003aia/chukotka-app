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
          <input class="input" required />
          <label>Лицевой счет</label>
        </div>
        <div class="input-wrapper">
          <input class="input" required />
          <label>E-mail</label>
        </div>
        <div class="input-wrapper">
          <input class="input" required />
          <label>Телефон</label>
        </div>
        <div class="input-wrapper">
          <input class="input" ref="passReg" required type="password" />
          <label>Пароль</label>
          <div @click="passToggle">
            <img v-show="pass == true" src="../assets/pass-close.svg" alt="pen">
            <img v-show="pass == false" src="../assets/pass-open.svg" alt="pen">
          </div>
        </div>
        <div class="radio">
          <input id="policy" type="radio" name="policy" value="policy">
          <label class="label" for="policy">
            <span></span>
            <p>Я принимаю условия <a class="link">пользовательского соглашения</a></p>
          </label>
        </div>
      </div>

    </ion-content>
    <ion-footer class="ion-no-border">
      <div class="btns container">
        <button class="btn" @click="$router.push('/codeConfirm')">Зарегистрироваться</button>
      </div>
    </ion-footer>
  </ion-page>
</template>
  
<script lang="ts">
import { IonPage, IonContent, IonItem, IonButton, IonCheckbox, IonText, IonFooter } from '@ionic/vue';

import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Registration',
  components: {
    IonPage, IonContent, IonItem, IonButton, IonCheckbox, IonText, IonFooter
  },
  data() {
    return {
      pass: false,
    }
  },
  methods: {
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
});
</script>


<style scoped>
p {
  margin-bottom: 0;
}
</style>
  