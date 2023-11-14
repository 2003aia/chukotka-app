<template>
    <ion-page>
      
      <ion-content :fullscreen="true">
        <div class="container">
            <ion-button fill="clear" class="btn-back" router-link="/auth">
              <img src="../assets/back.svg" alt="back"/> 
            </ion-button>
            <ion-text>
                <h1>Регистрация</h1>
            </ion-text>   
          <input class="input" placeholder="Лицевой счет" />
          <input class="input" placeholder="E-mail" />
          <input class="input" placeholder="Телефон" />

          <input class="input" placeholder="Пароль" type="password"/>
        
          <ion-item lines="none" class="check">
            <ion-checkbox  slot="start"></ion-checkbox>
            <ion-text>
                <p>Я принимаю условия пользовательского соглашения</p>
            </ion-text>
          </ion-item>

        

          <div class="btns">
            <ion-button fill="clear" class="btn" router-link="/codeConfirm">Зарегистрироваться</ion-button>

          </div>


        </div>

      </ion-content>
    </ion-page>
  </template>
  
  <script setup lang="ts">
  import { IonPage, IonContent, IonImg, IonItem, IonButton, IonCheckbox, IonText } from '@ionic/vue';

  import { defineComponent } from 'vue';

  defineComponent({
    name: 'Registration',

    
  });
  </script>


<style scoped>


  
</style>
  