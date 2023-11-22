<template>
  <ion-page>

    <ion-menu content-id="main-content">
      <ion-toolbar>
        <div class="menu-header">
          <img src="../assets/logo.svg" alt="logo" class="logo">
          <!-- <ion-img class="logo" :src="'../src/assets/Чукотэнерго_LOGO_rus_horizont_color 1.svg'" alt="logo"></ion-img> -->
          <ion-menu-toggle>
            <ion-button class="close" size="small" shape="round" fill="clear" aria-label="close">
              <img src="../assets/close.svg" alt="close">
            </ion-button>
          </ion-menu-toggle>

        </div>

      </ion-toolbar>
      <ion-content>
        <div class="container">

          <ion-list lines="none">
            <ion-item class="menu-item" router-link="/tabs/profile">
              <img class="menu-icon" src="../assets/add.svg" slot="start" />

              <ion-label>
                Добавить лицевой счет
              </ion-label>
            </ion-item>
            <ion-item class="menu-item">
              <img class="menu-icon" src="../assets/indices.svg" slot="start" />
              <ion-label>Начисление и оплата </ion-label>
            </ion-item>
            <ion-item class="menu-item" router-link="/tabs/services">
              <img class="menu-icon" src="../assets/docs.svg" slot="start" />

              <ion-label>Сервисы </ion-label>
            </ion-item>
            <ion-item class="menu-item" router-link="/tabs/notif">
              <img class="menu-icon" src="../assets/notif.svg" slot="start" />

              <ion-label>Уведомление</ion-label>
            </ion-item>
            <ion-item class="menu-item" router-link="/tabs/profile">
              <img class="menu-icon" src="../assets/profile.svg" slot="start" />

              <ion-label>Профиль</ion-label>
            </ion-item>

          </ion-list>


          <ion-item lines="none" @click="setOpen(true)" :button="true">
            <img class="menu-icon" src="../assets/out.svg" slot="start" />
            <ion-text>
              Выйти из аккаунта
            </ion-text>
          </ion-item>


        </div>
        <ion-modal :is-open="isOpen" mode="ios" :presenting-element="presentingElement">
          <ion-content>
            <div class="modal-wrapper">
              <div class="modal-header">
                <ion-text>
                  <p class="modal-text">Вы точно хотите
                    выйти из аккаунта</p>
                </ion-text>
                <img @click="setOpen(false)" aria-hidden="true" src="../assets/close.svg" alt="close">


                <!-- <ion-button @click="setOpen(false)" class="close" size="small" shape="round" fill="clear"
                  aria-label="close">
                  <ion-icon aria-hidden="true" size="large" :icon="closeOutline"></ion-icon>
                </ion-button> -->
              </div>
              <div class="modal-footer">
                <button class="btn" fill="clear" @click="(e) => logout(e)">Да</button>
                <button class="btn-outline" fill="clear" @click="setOpen(false)">Нет</button>
              </div>

            </div>
          </ion-content>

        </ion-modal>
      </ion-content>
      <ion-footer class="ion-no-border">
        <div class="container">
          <ion-text>
            <span class="version">
              Версия приложения 0.0.1
            </span>
          </ion-text>
        </div>

      </ion-footer>
    </ion-menu>
    <ion-page id="main-content">
      <!-- <ion-header class="ion-no-border">
        <ion-toolbar>
          <div class="header-wrapper">
            <ion-buttons slot="start">
              <ion-menu-button></ion-menu-button>
            </ion-buttons>
            <ion-title>
              <span class="title">
                {{ title }}
              </span>
            </ion-title>

            <img src="../assets/bell.svg" alt="notification" class="notif">
          </div>

        </ion-toolbar>
      </ion-header> -->
      <ion-tabs @ionTabsDidChange="afterTabChange">
        <ion-router-outlet></ion-router-outlet>

        <ion-tab-bar slot="bottom" class="tabs-wrapper">

          <ion-tab-button tab="tab1" href="/tabs/main">


            <img class="tab-icon"
              :src="selected == 'tab1' ? $image('assets/home-active.svg') : $image('assets/home.svg')" />

            <ion-label>
              <span class="tab-text">Главная</span>
            </ion-label>
          </ion-tab-button>

          <ion-tab-button tab="tab2" href="/tabs/payment" @click="$router.push({path: '/tabs/payment', query: {name: 'Оплатить'}})">
            <img class="tab-icon"
              :src="selected == 'tab2' ? $image('assets/pay-active.svg') : $image('assets/pay.svg')" />

            <ion-label>
              <span class="tab-text">Оплатить</span>
            </ion-label>
          </ion-tab-button>

          <ion-tab-button tab="tab3" href="/tabs/indices">
            <img class="tab-icon"
              :src="selected == 'tab3' ? $image('assets/indices2-active.svg') : $image('assets/indices2.svg')" />

            <ion-label>
              <span class="tab-text">Показания</span>
            </ion-label>
          </ion-tab-button>
          <ion-tab-button tab="tab4" href="/tabs/profile">
            <img class="tab-icon profile"
              :src="selected == 'tab4' ? $image('assets/profile2-active.svg') : $image('assets/profile2.svg')" />

            <ion-label>
              <span class="tab-text">Профиль</span>
            </ion-label>
          </ion-tab-button>

        </ion-tab-bar>

      </ion-tabs>
    </ion-page>
  </ion-page>
</template>

<script lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet, IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton, IonMenuToggle, IonButton, IonImg, IonText, IonList, IonItem, IonModal, IonFooter } from '@ionic/vue';
import { closeOutline, addOutline, } from 'ionicons/icons';
import { defineComponent } from 'vue';
import { ref } from 'vue';
import { useRouter } from "vue-router";

export default defineComponent({
  name: 'TabsPage',
  components: {
    IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet, IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton, IonMenuToggle, IonButton, IonImg, IonText, IonList, IonItem, IonModal, IonFooter
  },
  data() {
    return {
      selected: '',
      presentingElement: null,
      tabs: {
        home: '../assets/home.svg'
      },
      // title: '',
    }
  },
  methods: {
    afterTabChange: function (v: any) {
      this.selected = v.tab;
      console.log(v.tab)

    },
  },
  computed: {
    title() {
      return this.$router.currentRoute.value.name
    }
  },
  mounted() {
    // this.$data.title = this.$router.currentRoute.value.name
  },
  setup() {
    const router = useRouter()

    const isOpen = ref(false);

    const setOpen = (open: boolean) => {
      isOpen.value = open
      // router.push(router.currentRoute.value.fullPath)

    }
    const logout = (e: any) => {
      // console.log(e)
      isOpen.value = false
      // console.log(router.currentRoute.value.fusllPath, 'test')

      router.push('/auth')

    }
    const useImage = ((url: any) => {
      return new URL(`/src/${url}`, import.meta.url).href;
    });
    return {
      closeOutline, addOutline, isOpen, setOpen, logout, useImage
    }
  }

});


</script>

<style scoped>
.menu-header {
  margin-top: 40px;
  display: flex;
  padding: 15px;
  align-items: center;
  justify-content: space-between;
}


.logo {
  object-fit: contain;
  height: 32px;
}

ion-icon {
  margin-right: 10px;
}

.menu-item {
  margin-bottom: 7px;
}

.menu-icon {
  margin-right: 10px;
}

.version {
  position: absolute;
  bottom: 15px;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  color: #232323;
}

ion-header {
  border: none;
}

.title {
  font-size: 18px;
  font-weight: 500;
  color: #232323;
}

.tab-text {
  font-size: 12px;
  font-weight: 600;
}

.modal-wrapper {
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 15px;
}

.modal-header {
justify-content: space-between;
  display: flex;
}

.modal-footer {
  display: flex;
  flex-direction: column;
  height: fit-content;
  margin-top: 40px;
}



.modal-text {
  font-size: 18px;
  font-style: normal;
  font-weight: 450;
  margin-bottom: 0;
}

.tabs-wrapper {
  border-radius: 20px 20px 0px 0px;
  background: #FFF;
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.25);
}
</style>
