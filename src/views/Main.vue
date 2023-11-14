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
              Главная
            </span>
          </ion-title>

        </div>

      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <div class="container" style="height: auto;">
        <div class="user-info">
          <ion-text>
            <p class="user-name">ФИО</p>
            <p class="user-value">Иванов Иван Иванович</p>
            <p class="user-name">Адрес</p>
            <p class="user-value">г Анадырь ул.Куркутского, д. 34</p>
            <p class="user-name">Гарантирующий поставщик</p>
            <p class="user-value">АО «Чукотэне́рго» </p>
          </ion-text>
        </div>

        <ion-button style="margin-bottom: 30px;" class="btn-outline" fill="clear">Добавить лицевой счет</ion-button>

        <div class="receipt">
          <div class="rec-block">
            <p class="rec-title">
              Электронная квитанция
            </p>
            <p class="rec-text">
              Сохраним лес для будущих поколений
            </p>
          </div>
          <img src="../assets/mail-img.png" alt="rec-img" class="rec-img">
        </div>
      </div>


      <!-- <ExploreContainer name="Tab 1 page" /> -->
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton, IonText, IonButton } from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';
import { defineComponent } from 'vue';


export default defineComponent({
  name: 'Main',
  components: {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton, ExploreContainer, IonText, IonButton
  }
})
</script>


<style scoped>
p {
  margin-top: 0px;
}

.user-info {
  border-radius: 8px;
  background: #F4F8FC;
  padding: 15px;
  margin-bottom: 25px;
}

.user-name {
  color: #6D6D6D;
  margin-bottom: 5px;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.user-value {
  color: #232323;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-bottom: 20px;
}

.receipt {
  border-radius: 8px;
  background: linear-gradient(100deg, #005D9F 0%, #2D8DD2 100%);
  padding: 27px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.rec-title {
  color: #FFF;
  font-size: 18px;
  font-style: normal;
  font-weight: 450;
  line-height: normal;
  margin-bottom: 12px;
}

.rec-text {
  color: #FFF;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  font-family: AvenirNextCyr-Light;
  margin-bottom: 0px;
}
</style>
