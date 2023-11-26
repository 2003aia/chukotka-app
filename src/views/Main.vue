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

          <img @click="$router.push('/tabs/notif')" src="../assets/bell.svg" alt="notification" class="notif">
        </div>

      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <div class="container" style="height: auto;">
        <div class="card user-info">
          <ion-text>
            <p class="name">ФИО</p>
            <p class="value">Иванов Иван Иванович</p>
            <p class="name">Адрес</p>
            <p class="value">г Анадырь ул.Куркутского, д. 34</p>
            <p class="name">Гарантирующий поставщик</p>
            <p class="value">АО «Чукотэне́рго» </p>
          </ion-text>
        </div>

        <button style="margin-bottom: 30px;" class="btn-outline" @click="() => $router.push('/tabs/addAcc')">Добавить
          лицевой счет</button>

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

        <div class="card acc-info">
          <div class="card-list">
            <div class="card-line">
              <p class="name">Лицевой счет</p>
              <p class="value">№ 12345678901</p>
            </div>
            <div class="card-line">

              <p class="name">Прибор учета</p>
              <p class="value">ПУ №12345678</p>
            </div>
            <div class="card-line">

              <p class="name">Последнее показание ПУ</p>
              <p class="value">8590,0</p>
            </div>
            <div class="card-line">

              <p class="name">Площадь помещения </p>
              <p class="value">56,78 кв. м</p>
            </div>
            <div class="card-line">

              <p class="name">Тип</p>
              <p class="value">Частная</p>
            </div>
            <div class="card-line" style="margin-bottom: 30px;">

              <p class="name">С учетом оплаты текущего периода </p>
              <p class="value bold">Задолженность: 0.00</p>
            </div>
          </div>

          <div class="btns">
            <button class="btn" @click="$router.push('/tabs/indices')">Передать показания</button>
            <button class="btn-outline black" @click="setOpen(true)">Удалить</button>
            <ion-modal :is-open="isOpen" mode="ios">
              <ion-content>
                <div class="modal-wrapper">
                  <div class="modal-header">
                    <ion-text>
                      <p class="modal-text">Вы точно хотите
                        удалить Лицевой счет?</p>
                    </ion-text>
                    <img @click="setOpen(false)" aria-hidden="true" src="../assets/close.svg" alt="close">


                    <!-- <ion-button @click="setOpen(false)" class="close" size="small" shape="round" fill="clear"
                  aria-label="close">
                  <ion-icon aria-hidden="true" size="large" :icon="closeOutline"></ion-icon>
                </ion-button> -->
                  </div>
                  <div class="modal-footer">
                    <button class="btn" fill="clear" @click="(e) => setOpen(false)">Да</button>
                    <button class="btn-outline" fill="clear" @click="setOpen(false)">Нет</button>
                  </div>

                </div>
              </ion-content>

            </ion-modal>
          </div>
        </div>


        <div class="accruals">
          <ion-accordion-group>
            <ion-accordion value="first">
              <ion-item class="card accordion" slot="header" color="light">
                <p class="accordion-title">
                  Начисление «Электроснабжение (PE)» за Апрель 2023
                </p>
              </ion-item>


              <div slot="content">
                <div v-for="el in accruals">
                  <div class="card" style="margin-bottom:10px">
                    <p class="card-title">{{ el.name }}</p>
                    <div class="card-list">
                      <div class="card-item" v-for="el2 in el.data">
                        <p class="name">{{ el2.name }}</p>
                        <p class="value">{{ el2.value }}</p>
                      </div>
                    </div>

                    <div class="total">
                      <p class="name">{{ el.total.name }}</p>
                      <p class="value">{{ el.total.value }}</p>
                    </div>
                  </div>
                </div>
              </div>

            </ion-accordion>

          </ion-accordion-group>
        </div>


      </div>


      <!-- <ExploreContainer name="Tab 1 page" /> -->
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton, IonText, IonButton, IonAccordionGroup, IonAccordion, IonItem, IonLabel, IonModal } from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';
import { defineComponent, ref } from 'vue';
import { useRouter } from "vue-router";


export default defineComponent({
  name: 'Main',
  components: {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton, ExploreContainer, IonText, IonButton, IonAccordionGroup, IonAccordion, IonItem, IonLabel, IonModal
  },
  setup() {
    const router = useRouter()
    const isOpen = ref(false);

    const setOpen = (open: boolean) => {
      isOpen.value = open
    }
    const remove = (e: any) => {
      isOpen.value = false

      router.push('/auth')

    }
    return {
      setOpen, remove, isOpen,
    }
  },
  data() {
    return {
      accruals: [
        {
          name: 'Акт. Э/Э (ночь)',
          total: {
            name: 'Итого',
            value: '0.00'
          },
          data: [
            {
              name: 'Ед.изм.',
              value: 'кВт.ч'
            },
            {
              name: 'Тариф',
              value: '5.13'
            },
            {
              name: 'Объем',
              value: '49'
            },
            {
              name: 'К оплате',
              value: '1 280.76'
            },
            {
              name: 'Начислено',
              value: '251.37'
            },
            {
              name: 'Оплачено',
              value: '4 956,66'
            },
            {
              name: 'Перерасчет',
              value: '0.00'
            },

          ]
        },
        {
          name: 'Акт. Э/Э (день)',
          total: {
            name: 'Итого',
            value: '0.00'
          },
          data: [
            {
              name: 'Ед.изм.',
              value: 'кВт.ч'
            },
            {
              name: 'Тариф',
              value: '5.13'
            },
            {
              name: 'Объем',
              value: '49'
            },
            {
              name: 'К оплате',
              value: '1 280.76'
            },
            {
              name: 'Начислено',
              value: '251.37'
            },
            {
              name: 'Оплачено',
              value: '4 956,66'
            },
            {
              name: 'Перерасчет',
              value: '0.00'
            },
          ]
        },
        {
          name: 'Пени',
          total: {
            name: 'Итого',
            value: '0.00'
          },
          data: [
            {
              name: 'Ед.изм.',
              value: 'Руб'
            },
            {
              name: 'Тариф',
              value: '5.13'
            },
            {
              name: 'Объем',
              value: '49'
            },
            {
              name: 'К оплате',
              value: '1 280.76'
            },
            {
              name: 'Начислено',
              value: '251.37'
            },
            {
              name: 'Оплачено',
              value: '4 956,66'
            },
            {
              name: 'Перерасчет',
              value: '0.00'
            },
          ]
        },
        {
          name: 'Итого',
          total: {
            name: 'Итого к оплате',
            value: '0.00'
          },
          data: [
            {
              name: 'К оплате',
              value: '1 280.76'
            },
            {
              name: 'Начислено',
              value: '251.37'
            },
            {
              name: 'Оплачено',
              value: '4 956,66'
            },
            {
              name: 'Перерасчет',
              value: '0.00'
            },

          ]
        },
      ]
    }
  }
})
</script>


<style scoped>
p {
  margin-top: 0px;
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
  font-family: AppFont-Light;
  margin-bottom: 0px;
}



ion-item {
  --padding-end: 0;
  --inner-padding-end: 0;
}
</style>
