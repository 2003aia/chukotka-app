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
            <div class="spinner" v-show="loadingLcs">
              <ion-spinner name="circles"></ion-spinner>
            </div>
            <div v-for="el in lcsMob" v-show='!loadingLcs' class="acc-item" @click="changeTab(el?.lc?.lc_number)" :key="el"
              :href="el?.lc?.lc_id" :class="[el?.current && 'active']">
              № {{ el?.lc?.lc_number }}
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
                  <div class="spinner" v-show="loadingLcInfo">
                    <ion-spinner name="circles"></ion-spinner>
                  </div>
                  <div class="card-list" v-show="!loadingLcInfo">
                    <div class="card-line">
                      <p class="name">Лицевой счет</p>
                      <p class="value">№ {{ lcInfo?.lc }}</p>
                    </div>
                    <div class="card-line">
                      <p class="name">Адрес</p>
                      <p class="value">№ {{ lcInfo?.address }}</p>
                    </div>
                    <div class="card-line">

                      <p class="name">Площадь помещения </p>
                      <p class="value">{{ lcInfo?.area }} кв. м</p>
                    </div>
                    <p class="card-title" style="border: none;">
                      Приборы учета
                    </p>
                    <div class="card-line" v-for="el in lcInfo?.devices">

                      <div class="card-list">
                        <div class="card-item">
                          <p class="name">Прибор учета</p>
                          <p class="value">{{ el?.number }}</p>
                        </div>
                      </div>
                      <div class="card-list">
                        <div class="card-item">
                          <p class="name">Последнее показание ПУ</p>
                          <p class="value">{{ el?.pok }}</p>
                        </div>
                      </div>
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
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonMenuButton, IonButtons, IonText, IonAccordionGroup, IonAccordion, IonItem, IonSpinner } from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';
import { defineComponent } from 'vue';
import { mapActions } from 'pinia'
import { useLcStore } from '../stores/lc'

export default defineComponent({
  name: 'Payment',
  components: {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainer, IonMenuButton, IonButtons, IonText, IonAccordionGroup, IonAccordion, IonItem, IonSpinner
  },
  data() {
    return {
      lcs: [],
      loadingLcs: false,
      loadingLcInfo: false,
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
  mounted() {
    this.loadingLcs = true
    this.getLcs().then(() => {
      this.loadingLcs = false
      if (this.$pinia.state.value.lc.lcResponse?.status == true) {
        this.loadingLcInfo = true
        console.log(this.$pinia.state.value.lc.lcResponse?.data)
        this.getLc(this.$pinia.state.value.lc.lcResponse?.data?.lcs[0]?.lc_number).then(() => {
          this.loadingLcInfo = false

        })
      }
      this.$pinia.state.value.lc?.lcResponse?.data?.lcs?.forEach((el: any, index: any) => {
        if (index === 0) {
          this.lcsMob.push({ lc: el, current: true })

        } else {
          this.lcsMob.push({ lc: el, current: false })
          // console.log(this.lcs)
        }
      });
    })
  },
  computed: {
    lcInfo() {
      return this.$pinia.state?.value?.lc?.lcInfoResponse?.data
    },
    lcsMob() {
      return this.$pinia.state.value.lc?.lcsMod
    }
  },
  methods: {
    ...mapActions(useLcStore, ['getLcs', 'getLc']),
    changeTab(selected: any) {
      this.loadingLcInfo = true
      console.log(selected)
      this.getLc(selected).then(() => {
        console.log('selected', this.$pinia.state.value.lc?.lcInfoResponse)
        this.loadingLcInfo = false

      })

      this.lcsMob?.map((t: any) => {
        t?.lc?.lc_number === selected ? t.current = true : t.current = false
      });
    },
  },
  setup() {
    return {
    }
  }

});
</script>

<style scoped></style>
