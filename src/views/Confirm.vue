<template>
    <ion-page>
      
      <ion-content :fullscreen="true">
        <div class="container">
            <ion-button fill="clear" class="btn-back" router-link="/reg">
              <img src="../assets/back.svg" alt="back"/> 
            </ion-button>
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
            <div class="btns">
              <ion-button fill="clear" class="btn" router-link="/tabs">
                Войти
              </ion-button>
            </div>
            
        </div>

      </ion-content>
    </ion-page>
  </template>
  
  <script setup lang="ts">
  import { IonPage, IonInput, IonContent, IonImg, IonItem, IonButton, IonTitle, IonText} from '@ionic/vue';

  import { defineComponent } from 'vue';

  defineComponent({
    name: 'Confirm',
    
    methods: {
        backFnc: function() {
            this.$router.go(-1)
        }
    }
    
  });
  </script>


<style scoped>
 
</style>
  