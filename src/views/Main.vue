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
            <p class="value">{{ userData?.data?.lastname }}
              {{ userData?.data?.name }}
              {{ userData?.data?.secondname }}</p>
            <!-- <p class="name">Адрес</p>
            <p class="value">г Анадырь ул.Куркутского, д. 34</p> -->
            <p class="name">Гарантирующий поставщик</p>
            <p class="value">АО «Чукотэне́рго» </p>
          </ion-text>
        </div>

        <button style="margin-bottom: 30px;" class="btn-outline" @click="() => $router.push('/tabs/addAcc')">Добавить
          лицевой счет</button>

        <div class="receipt" @click="$router.push('/tabs/receipt')">
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
            <div class="spinner" v-show="loadingLcs">
              <ion-spinner name="circles"></ion-spinner>
            </div>
            <div v-for="el in lcsMob" v-show='!loadingLcs' class="acc-item" @click="changeTab(el?.lc?.lc_number)" :key="el"
              :href="el?.lc?.lc_id" :class="[el?.current && 'active']">
              № {{ el.lc?.lc_number }}
            </div>

            <!-- <div class="acc-item">
              № 12345678901
            </div>
            <div class="acc-item">
              № 12345678901
            </div> -->
          </div>
        </div>

        <div class="card acc-info" v-show="loadingLcInfo">
          <div class="spinner">
            <ion-spinner name="circles"></ion-spinner>
          </div>
        </div>
        <div class="card acc-info" v-show="!loadingLcInfo">
          <div class="card-list">
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

            <div class="card-line" style="margin-bottom: 30px;">

              <p class="name">С учетом оплаты текущего периода </p>
              <p class="value bold">Задолженность: {{ lcInfo?.saldo }}</p>
            </div>
          </div>

          <div class="btns">
            <button class="btn"
              @click="$router.push({ path: '/tabs/indices', name: 'Показания', query: { link: lcInfo?.lc } })">Передать
              показания</button>
            <button class="btn-outline black" @click="setOpen(true)">Удалить</button>
            <ion-modal :is-open="isOpen" mode="ios">
              <ion-content>
                <div class="modal-wrapper">
                  <div class="modal-header">
                    <ion-text>
                      <p class="modal-text" v-show="deleted == false">Вы точно хотите
                        удалить Лицевой счет?</p>
                      <p class="modal-text" v-show="deleted == true">
                        {{ response }}
                      </p>
                    </ion-text>
                    <img @click="() => { setOpen(false); deleted = false }" aria-hidden="true" src="../assets/close.svg"
                      alt="close">


                    <!-- <ion-button @click="setOpen(false)" class="close" size="small" shape="round" fill="clear"
                  aria-label="close">
                  <ion-icon aria-hidden="true" size="large" :icon="closeOutline"></ion-icon>
                </ion-button> -->
                  </div>
                  <div class="modal-footer" v-show="deleted == true">
                    <button class="btn-outline" fill="clear"
                      @click="() => { setOpen(false); deleted = false }">Выйти</button>

                  </div>
                  <div class="modal-footer" v-show="deleted == false">
                    <p class="errorText" v-show="errorText">{{ errorText }}</p>
                    <button class="btn" fill="clear" @click="deleteLcHandler(lcInfo?.lc)">
                      <div class="spinner" style="margin-bottom: 0;" v-show="loadingDel">
                        <ion-spinner name="circles"></ion-spinner>
                      </div>
                      <span v-show="!loadingDel">
                        Да
                      </span>
                    </button>
                    <button class="btn-outline" fill="clear" @click="setOpen(false)">Нет</button>
                  </div>

                </div>
              </ion-content>

            </ion-modal>
          </div>
        </div>


        <div class="accruals">
          <div class="spinner" v-show="loadingLcInfo">
            <ion-spinner name="circles"></ion-spinner>
          </div>
          <ion-accordion-group v-show="!loadingLcInfo">
            <ion-accordion value="first">
              <ion-item class="card accordion" slot="header" color="light">
                <p class="accordion-title">
                  Начисление «Электроснабжение (PE)» за
                  {{ moment(lcInfo?.invoices?.period).locale('ru').format('MMM YYYY') }}
                </p>
              </ion-item>


              <div slot="content">

                <div>
                  <div class="card" style="margin-bottom:10px">
                    <!-- <p class="card-title">{{ el.name }}</p> -->
                    <!-- <div class="card-list">
                      <div class="card-item">
                        <p class="name">Расчетный период</p>
                        <p class="value">{{ lcInfo?.invoices?.period }}</p>
                      </div>
                    </div> -->
                    <div class="card-list">
                      <div class="card-item">
                        <p class="name">Расчетный период</p>
                        <p class="value">{{ moment(lcInfo?.invoices?.period).format('DD.MM.yyyy') }}</p>
                      </div>
                      <div class="card-item">
                        <p class="name">Сальдо начало периода</p>
                        <p class="value">{{ lcInfo?.invoices?.SALDON }}</p>
                      </div>
                      <div class="card-item">
                        <p class="name">Сальдо конец периода</p>
                        <p class="value">{{ lcInfo?.invoices?.SALDOK }}</p>
                      </div>

                      <div class="card-item">
                        <p class="name">Корректировки</p>
                        <p class="value">{{ lcInfo?.invoices?.korr }}</p>
                      </div>
                      <div class="card-item">
                        <p class="name">Оплата</p>
                        <p class="value">{{ lcInfo?.invoices?.oplata }}</p>
                      </div>
                      <div class="card-item">
                        <p class="name">Вид услуги</p>
                        <p class="value">{{ lcInfo?.invoices?.vid }}</p>
                      </div>
                    </div>

                    <div class="total">
                      <p class="name">Начисления</p>
                      <p class="value">{{ lcInfo?.invoices?.summa }}</p>
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
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton, IonText, IonButton, IonAccordionGroup, IonAccordion, IonItem, IonLabel, IonModal, IonSpinner } from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';
import { defineComponent, ref } from 'vue';
import { useRouter } from "vue-router";
import { Storage } from '@ionic/storage'
import { mapActions } from 'pinia';
import { useLoginStore } from '../stores/login'
import { useLcStore } from '../stores/lc'
import moment from 'moment'
import 'moment/dist/locale/ru';

export default defineComponent({
  name: 'Main',
  components: {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton, ExploreContainer, IonText, IonButton, IonAccordionGroup, IonAccordion, IonItem, IonLabel, IonModal, IonSpinner,
  },

  mounted() {
    this.getUser()
    this.loadingLcs = true
    console.log(this.lcsMob)

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
          this.lcsMob?.push({ lc: el, current: true })

        } else {
          this.lcsMob?.push({ lc: el, current: false })

          // this.lcs.push({ lc: el, current: false })
          // console.log(this.lcs)
        }
      });

    })
  },
  methods: {
    ...mapActions(useLoginStore, ['getUser']),
    ...mapActions(useLcStore, ['getLcs', 'getLc', 'deleteLc']),
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
    async deleteLcHandler(lc: any) {
      this.deleted = false
      this.loadingDel = true
      let lcObj = this.lcsMob.find((e) => e?.lc?.lc_number == lc)
      this.loadingLcs = true
      this.deleteLc(lcObj?.lc?.lc_id).then(() => {
        this.loadingDel = false
        if (this.$pinia.state.value.lc.deleteLcResponse?.status == true) {
          this.deleted = true
          this.loadingLcs = true
          this.response = this.$pinia.state.value.lc.deleteLcResponse?.data
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
        } else {
          this.errorText = this.$pinia.state.value.lc.deleteLcResponse?.data
        }

        console.log(this.$pinia.state.value.lc.deleteLcResponse)
      })
    }
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
      setOpen, remove, isOpen, moment
    }
  },
  computed: {
    userData() {
      return this.$pinia.state.value?.login?.userResponse
    },
    lcsData() {
      return this.$pinia.state.value?.lc?.lcResponse
    },
    lcInfo() {
      return this.$pinia.state.value?.lc?.lcInfoResponse?.data
    },
    lcsMob(){
      return this.$pinia.state.value.lc?.lcsMod
    }
  },
  data() {
    return {
      lcs: [],
      loadingLcInfo: false,
      loadingLcs: false,
      loadingDel: false,
      deleted: false,
      errorText: '',
      response: '',

    }
  }
})
</script>


<style scoped>
p {
  margin-top: 0px;
}

.spinner {
  margin-bottom: 10px;
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
