<template>
    <ion-page>
      
      <ion-content :fullscreen="true">
        <div class="container auth">
          
          <img class="logo" src="../assets/logo.svg" alt="logo"/>
          <input class="input" placeholder="Лицевой счет" />
          <input class="input" placeholder="Пароль" type="password"/>
          <ion-button class="btn-link" fill="clear" router-link="/passwordRecovery">
            Забыли пароль?
          </ion-button>

          <div class="btns">
            <ion-button fill="clear" class="btn" router-link="/tabs">Войти</ion-button>
            <ion-button fill="clear" class="btn-clear" router-link="/reg">Зарегистрироваться</ion-button>

          </div>


        </div>
      </ion-content>
    </ion-page>
  </template>
  
  <script setup lang="ts">
  import { IonPage, IonInput, IonContent, IonImg, IonItem, IonButton } from '@ionic/vue';

  import { defineComponent } from 'vue';

  defineComponent({
    name: 'Auth',

    
  });
  </script>


<style scoped>
  .logo{
    object-fit: contain;
    height: 55px;
    margin-top: 100px;
    margin-bottom: 40px;
  }
  
</style>
  