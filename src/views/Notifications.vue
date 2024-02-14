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
                            Уведомления
                        </span>
                    </ion-title>

                    <!-- <img src="../assets/bell.svg" alt="notification" class="notif"> -->
                </div>

            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <div class="container">
                <div class="spinner" v-show="loading">
                    <ion-spinner name="circles"></ion-spinner>
                </div>

                <p class="errorText" v-show="errorText">{{ errorText }}</p>
                <div class="card" v-for="el in notifArr" :key="el?.data?.id" v-show="!loading">
                    <ion-text>
                        <div class="card-item">
                            <p class="name link">{{ el?.data?.name }}</p>
                            <p class="value">{{ el?.data?.date_create?.substring(0, 10) }}</p>
                        </div>
                        <p class="text">
                            {{ el?.data?.text }}
                        </p>
                        <a class="link" @click="setShow(el?.data?.id, el?.show)">{{ el?.show == false ? 'Подробнее' :
                            'Скрыть' }}</a>
                        <div v-show="el?.show == true" class="card" style="margin-bottom: 0;">
                            {{ el?.data?.text }}

                            <div class="card-last">
                                <div class="spinner" v-show="el?.loading">
                                    <ion-spinner name="circles"></ion-spinner>
                                </div>

                                <span v-for="el2 in el?.data?.files" v-show="!el?.loading"
                                    @click="downloadHandler(el2?.link)" :key="el2?.id">
                                    Скачать <img src="../assets/download.svg" alt="download">
                                </span>
                            </div>

                        </div>

                    </ion-text>
                </div>


            </div>

        </ion-content>
    </ion-page>
</template>
  
<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonMenuButton, IonButtons, IonText, IonSpinner } from '@ionic/vue';
import { defineComponent } from 'vue'
import { mapActions } from "pinia"
import { useNotifStore } from '../stores/notifications'

export default defineComponent({
    name: 'Уведомления',
    components: {
        IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonMenuButton, IonButtons, IonText, IonSpinner
    },
    methods: {
        ...mapActions(useNotifStore, ['getNotif']),
        setShow(id: any, show: any) {

            console.log(show)
            if (show == true) {
                this.notifArr?.map((t: any) => {
                    t?.data?.id === id ? t.show = false : t.show = false
                });
            } else {
                this.notifArr?.map((t: any) => {
                    t?.data?.id === id ? t.show = true : t.show = false
                });
            }

        },
        downloadHandler(el: any) {
            window.open(el, '_system')
        }
    },
    mounted() {
        this.loading = true
        this.getNotif().then(() => {
            this.loading = false
            if (this.$pinia.state.value.notif?.notifResponse?.status == true) {
                this.$pinia.state.value.notif?.notifResponse?.data?.forEach((el) => {
                    this.notifArr.push({ data: el, show: false, loading: false })
                })
            } else {
                this.errorText = this.$pinia.state.value.notif?.notifResponse?.data
            }
            console.log(this.$pinia.state.value.notif?.notifResponse)
        })
    },
    computed: {
        notif() {
            return this.$pinia.state.value.notif?.notifResponse?.data
        }
    },
    data() {
        return {
            loading: false,
            notifArr: [],
            errorText: '',
        }
    }
})
</script>
  
<style scoped>
.card .text {
    color: #232323;
    font-family: AppFont-Bold;
    font-size: 16px;
    font-weight: 450;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}


.card .value {
    color: #6D6D6D;
    font-size: 14px;
}

.card-last {
    display: flex;
    /* justify-content: end; */
    margin-top: 20px;
    flex-direction: column;
}

.card-last span {
    display: flex;
    align-items: center;
    justify-content: end;
    margin-bottom: 10px;

}
</style>
  