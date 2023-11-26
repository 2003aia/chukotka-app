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
              Профиль
            </span>
          </ion-title>

          <img @click="$router.push('/tabs/notif')" src="../assets/bell.svg" alt="notification" class="notif">
        </div>

      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <div class="container">
        <ion-text>
          <p class="title profile">
            Основная информация
          </p>
        </ion-text>
        <div class="item" @click="$router.push({ path: '/tabs/profileEdit', name: 'ProfileEdit', query: { link: 'fio' } })">
          <ion-text>
            <p class="name">
              ФИО
            </p>
            <p class="value">
              Иванов Иван Иванович
            </p>
          </ion-text>
          <img src="../assets/next.svg" alt="go">
        </div>
        <div class="item" @click="$router.push({ path: '/tabs/profileEdit', name: 'ProfileEdit', query: { link: 'address' } })">
          <ion-text>
            <p class="name">
              Адрес
            </p>
            <p class="value">
              г Анадырь ул. Куркутского, д. 34
            </p>
          </ion-text>
          <img src="../assets/next.svg" alt="go">
        </div>
        <div class="line"></div>
        <ion-text>
          <p class="title">
            Контактная информация
          </p>
        </ion-text>
        <div class="item" @click="$router.push({ path: '/tabs/profileEdit', name: 'ProfileEdit', query: { link: 'email' } })">
          <ion-text>
            <p class="name">
              Электронная почта
            </p>
            <p class="value">
              doc@Chukotenergo.ru
            </p>
          </ion-text>
          <img src="../assets/next.svg" alt="go">
        </div>
        <div class="item" @click="$router.push({ path: '/tabs/profileEdit', name: 'ProfileEdit', query: { link: 'phone' } })">
          <ion-text>
            <p class="name">
              Телефон
            </p>
            <p class="value">
              8 (999) 123-45-67
            </p>
          </ion-text>
          <img src="../assets/next.svg" alt="go">
        </div>
        <div class="line"></div>
        <button class="btn-link" @click="$router.push({ path: '/tabs/profileEdit', name: 'ProfileEdit', query: { link: 'password' } })">
          Забыли пароль?
        </button>
      </div>
    </ion-content>
  </ion-page>
</template>
  
<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonMenuButton, IonButtons, IonText } from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';

import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Profile',
  components: {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainer, IonMenuButton, IonButtons, IonText
  },
  data() {
    return {
      selected: ''
    }
  },
  methods: {
    afterTabChange: function (v: any) {
      this.selected = v.tab;
      console.log(v.tab)
    }
  },
  setup() {
    return {
    }
  }

});
</script>

<style scoped>
.container {
  padding-top: 24px;
}

.title.profile {
  color: #000;
  font-size: 16px;
  font-style: normal;
  font-weight: 450;
  line-height: normal;
  margin-bottom: 24px;
}

.item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
}

.name {
  color: #6D6D6D;
  font-size: 12px;
  margin-bottom: 5px;
}

.value {
  font-size: 14px;
  margin-bottom: 0;
}

.btn-link {
  margin-top: 0;
}
</style>
  