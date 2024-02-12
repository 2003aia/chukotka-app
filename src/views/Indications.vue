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
            <div class="spinner" v-show="loadingLcs">
              <ion-spinner name="circles"></ion-spinner>
            </div>
            <div class="acc-item" v-show="!loadingLcs" v-for="el in lcs" @click="changeTab(el?.lc?.lc_number)" :key="el" :href="el?.lc?.lc_id"
              :class="[el?.current && 'active']">
              № {{ el?.lc?.lc_number }}
            </div>
            <!-- <div class="acc-item" id="12345678902">
              № 12345678901
            </div>
            <div class="acc-item" id="12345678903">
              № 12345678901
            </div> -->
          </div>
        </div>

        <div class="card">
          <ion-text>
            <p class="name">Последнее показание 1 тарифа</p>
            <p class="value">{{ lcInfo?.devices[0]?.pok }}</p>
          </ion-text>
          <div class="card-input">
            <p class="title">Новое показание</p>
            <input v-model="indice" placeholder="146.55" type="text">

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
            <button @click="addIndiceHandler" class="btn" style="margin-bottom: 0;">
              Передать показания
            </button>
          </div>
        </div>


        <div class="card">
          <div class="spinner" v-show="loadingLcInfo">
            <ion-spinner name="circles"></ion-spinner>
          </div>
          <div class="card-list" v-show="!loadingLcInfo">

            <!-- <div class="card-line" v-for="el in indiceInfo">
              <p class="name">{{ el.name }}</p>
              <p class="value">{{ el.value }}</p>
            </div> -->
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

    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonMenuButton, IonButtons, IonText, IonSpinner } from '@ionic/vue';
import { defineComponent } from 'vue'
import { useLcStore } from '../stores/lc'
import { mapActions } from 'pinia';

export default defineComponent({
  name: 'Показания',
  components: {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonMenuButton, IonButtons, IonText, IonSpinner
  },
  methods: {
    ...mapActions(useLcStore, ['getLcs', 'getLc', 'addIndice']),
    changeTab(selected: any) {
      console.log(selected)
      this.loadingLcInfo = true
      this.getLc(selected).then(() => {
        console.log('selected', this.$pinia.state.value.lc?.lcInfoResponse)
        this.loadingLcInfo = false

      })

      this.lcs?.map((t: any) => {
        t?.lc?.lc_number === selected ? t.current = true : t.current = false
      });
    },
    addIndiceHandler(lc: any) {
      this.addIndice(lc).then(() => {
        console.log(this.$pinia.state.value?.lc?.addIndiceResponse)
      })
    },
  },
  mounted() {
    this.loadingLcs = true
    this.getLcs().then(() => {
      if (this.$pinia.state.value.lc.lcResponse?.status == true) {
        this.loadingLcInfo = true
        this.getLc(this.$pinia.state.value.lc.lcResponse?.data?.lcs[0]?.lc_number).then(() => {
          this.loadingLcInfo = false

        })
      }
      this.$pinia.state.value.lc?.lcResponse?.data?.lcs?.forEach((el: any, index: any) => {
        if (index === 0) {
          this.lcs.push({ lc: el, current: true })

        } else {
          this.lcs.push({ lc: el, current: false })
          // console.log(this.lcs)
        }
      });
      console.log(this.$pinia.state.value?.lc?.lcResponse)
      this.loadingLcs = false
    })
  },
  computed: {
    lcInfo() {
      return this.$pinia.state.value.lc?.lcInfoResponse?.data
    }
  },
  data() {
    return {
      lcs: [],
      loadingLcs: false,
      loadingLcInfo: false,
      indice: '',
      response: '',
      indiceInfo: [
        {
          name: 'Прибор учета',
          value: 'ПУ №12345678'
        },
        {
          name: 'Адрес',
          value: 'г Анадырь ул. Куркутского, д. 34'
        },
        {
          name: 'Площадь помещения',
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
