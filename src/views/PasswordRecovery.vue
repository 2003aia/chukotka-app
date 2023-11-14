<template>
    <ion-page>
      
      <ion-content :fullscreen="true">
        <div class="container">
            <ion-button fill="clear" class="btn-back" router-link="/auth">
               <img src='../assets/back.svg'/> 
            </ion-button>
            <ion-text>
                <h1>Восстановление пароля</h1>
            </ion-text>        
            <ion-text>
              <p>
                Укажите адрес электронной почти или номер телефона, указанные при регистрации
              </p>
            </ion-text>  
            <input class="input" placeholder="E-mail или номер телефона"/>
            <div class="btns">
              <ion-button fill="clear" class="btn" router-link="/tabs">
                Далее
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
    name: 'PasswordRecovery',
    
    methods: {
        backFnc: function() {
            this.$router.go(-1)
        }
    }
    
  });
  </script>


<style scoped>
  .logo{
    object-fit: contain;
    height: 55px;
    margin-top: 100px;
  }
  
</style>
  