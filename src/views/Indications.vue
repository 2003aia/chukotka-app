<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <div class="header-wrapper">
          <ion-buttons slot="start">
            <ion-menu-button></ion-menu-button>
          </ion-buttons>
          <ion-title>
            <span class="title">
              Передача показаний
            </span>
          </ion-title>

          <img @click="$router.push('/tabs/notif')" src="../assets/bell.svg" alt="notification" class="notif">
        </div>

      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <div class="container">
        <div>
          <p class="acc-title">
            Лицевые счета
          </p>

          <div class="acc-list">
            <div class="acc-item active">
              № 12345678901
            </div>
            <div class="acc-item">
              № 12345678901
            </div>
            <div class="acc-item">
              № 12345678901
            </div>
          </div>
        </div>

        <div class="card">
          <ion-text>
            <p class="name">Последнее показание 1 тарифа</p>
            <p class="value">8590,0</p>
          </ion-text>
          <div class="card-input">
            <p class="title">Новое показание</p>
            <input placeholder="146.55" type="text">

          </div>
          <div>
            <div class="line"></div>
            <ion-text>
              <p class="name">Последнее показание 2 тарифа</p>
              <p class="value">8590,0</p>
            </ion-text>
            <div class="card-input">
              <p class="title">Новое показание</p>
              <input placeholder="146.55" type="text">

            </div>
          </div>

          <div class="btns">
            <button class="btn" style="margin-bottom: 0;">
              Передать показания
            </button>
          </div>
        </div>


        <div class="card">
          <div class="card-list">
            <div class="card-line" v-for="el in indiceInfo">
              <p class="name">{{ el.name }}</p>
              <p class="value">{{ el.value }}</p>
            </div>
          </div>

        </div>
      </div>

    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonMenuButton, IonButtons, IonText } from '@ionic/vue';
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Показания',
  components: {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonMenuButton, IonButtons, IonText
  },
  data() {
    return {
      indiceInfo: [
        {
          name: 'Прибор учета',
          value: 'ПУ №12345678'
        },
        {
          name: 'Адрес',
          value: 'ПУ №12345678'
        },
        {
          name: 'г Анадырь ул. Куркутского, д. 34',
          value: '56,78 кв. м'
        },
        {
          name: 'Тип',
          value: 'Частная'
        },
        {
          name: 'Ед.изм',
          value: 'кВт.ч'
        },
      ],
    }
  }
})
</script>

<style scoped>
.card-input input {
  width: 50%;
}

.card-input {
  margin-bottom: 30px;
}
</style>
