<template>
  <ion-page>

    <ion-content :fullscreen="true">
      <div class="container auth">

        <img class="logo" src="../assets/logo.svg" alt="logo" />
        <input class="input" placeholder="Лицевой счет" />
        <div class="input-wrapper">
          <input class="input" ref="passAuth" placeholder="Пароль" type="password" />
          <div @click="passToggle">
            <img v-show="pass== true" src="../assets/pass-close.svg" alt="pen">
            <img v-show="pass== false" src="../assets/pass-open.svg" alt="pen">
          </div>
        </div>
        <button class="btn-link" @click="$router.push('/passwordRecovery')">
          Забыли пароль?
        </button>
      </div>
    </ion-content>
    <ion-footer class="ion-no-border">

      <div class="btns container">
        <button class="btn" @click="$router.push('/tabs')">Войти</button>
        <button class="btn-clear" @click="$router.push('/reg')">Зарегистрироваться</button>

      </div>
    </ion-footer>
  </ion-page>
</template>
  
<script lang="ts">
import { IonPage, IonContent, IonFooter } from '@ionic/vue';

import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Auth',
  components: {
    IonPage, IonContent, IonFooter
  },
  data() {
    return {
      pass: false
    }
  },
  methods: {
    passToggle() {
      var x = this.$refs.passAuth
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
.logo {
  object-fit: contain;
  height: 55px;
  margin-top: 100px;
  margin-bottom: 40px;
}
</style>
  