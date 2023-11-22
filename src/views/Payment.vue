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
              {{ $route.query.name }}
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
            <p class="name">С учетом оплаты текущего периода </p>
            <p class="value">Задолженность: 0.00</p>
            <div class="line"></div>
          </ion-text>
          <div class="card-input">
            <p class="title">Оплатить</p>
            <input placeholder="146.55" type="text">
            <p class="subtitle">
              Минимальная сумма оплаты 10,00 руб.
            </p>
          </div>

          <div class="btns">
            <button class="btn" style="margin-bottom: 0;">
              Оплатить
            </button>
          </div>

        </div>

        <div class="accruals">
          <ion-accordion-group>
            <ion-accordion value="first">
              <ion-item class="card accordion" slot="header" color="light">
                <p class="accordion-title">
                  Информация о лицевом счете
                </p>
              </ion-item>


              <div slot="content">

                <div class="card">
                  <div class="card-list">
                    <div class="card-line" v-for="el in accInfo">
                      <p class="name">{{ el.name }}</p>
                      <p class="value">{{ el.value }}</p>
                    </div>
                  </div>
                  
                </div>
              </div>

            </ion-accordion>

          </ion-accordion-group>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonMenuButton, IonButtons, IonText, IonAccordionGroup, IonAccordion, IonItem } from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Payment',
  components: {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainer, IonMenuButton, IonButtons, IonText, IonAccordionGroup, IonAccordion, IonItem
  },
  data() {
    return {
      accInfo: [
        {
          name: 'Лицевой счет',
          value: '№ 12345678901'
        },
        {
          name: 'Прибор учета',
          value: 'ПУ №12345678'
        },
        {
          name: 'Последнее показание ПУ',
          value: '8590,0'
        },
        {
          name: 'Площадь помещения ',
          value: '56,78 кв. м'
        },
        {
          name: 'Тип',
          value: 'Частная'
        },
        
      ],
    }
  },
  methods: {

  },
  setup() {
    return {
    }
  }

});
</script>

<style scoped></style>
