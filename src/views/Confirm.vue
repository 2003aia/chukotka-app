<template>
  <ion-page>

    <ion-content :fullscreen="true">
      <div class="container">
        <button class="btn-back" @click="this.$router.push('/codeConfirm')">
          <img src="../assets/back.svg" alt="back" />
        </button>
        <ion-text>
          <h1>Подтверждение</h1>
        </ion-text>
        <ion-text>
          <p style="margin-bottom: 20px;">
            Для завершения регистрации необходимо
            подтвердить электронный адрес, мы
            отправили письмо на указанную вами почту
          </p>
          <p class="red">
            Если письмо с подтверждением не пришло, пройдите процедуру регистрации заново
          </p>
        </ion-text>


      </div>

    </ion-content>
    <ion-footer class="ion-no-border">
      <div class="btns container">
        <button class="btn" @click="this.$router.push('/tabs')">
          Войти
        </button>
      </div>
    </ion-footer>
  </ion-page>
</template>
  
<script lang="ts">
import { IonPage, IonContent, IonText, IonFooter } from '@ionic/vue';

import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Confirm',
  components: {
    IonPage, IonContent, IonText, IonFooter
  },
  methods: {
    backFnc: function () {
      this.$router.go(-1)
    }
  }

});
</script>


<style scoped></style>
  