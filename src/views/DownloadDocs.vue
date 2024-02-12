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
                            Скачать документы
                        </span>
                    </ion-title>

                    <img @click="$router.push('/tabs/notif')" src="../assets/bell.svg" alt="notification" class="notif">
                </div>

            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <div class="container">

                <p class="input-text">Тип документа</p>
                <details class="custom-select">
                    <summary class="radios">
                        <!-- <label class="label">Выберите тему обращения</label> -->

                        <input class="placeholder" type="radio" name="item" id="default" title="Квитанция" checked>
                        <input type="radio" name="item" id="item1" title="Тема 1">
                        <input type="radio" name="item" id="item2" title="Тема 2">
                        <input type="radio" name="item" id="item3" title="Тема 3">
                        <input type="radio" name="item" id="item4" title="Тема 4">
                    </summary>
                    <ul class="list">
                        <li>
                            <label for="item1">
                                Тема 1
                            </label>
                        </li>
                        <li>
                            <label for="item2">Тема 2</label>
                        </li>
                        <li>
                            <label for="item3">Тема 3</label>
                        </li>
                        <li>
                            <label for="item4">Тема 4</label>
                        </li>

                    </ul>
                </details>
                <p class="input-text" style="margin-bottom:15px;">Период</p>
                <div class="input-date-wrapper">
                    <div class="input-date">
                        {{ from }}
                        <img @click="setOpen(true)" src="../assets/calendar.svg" alt="">
                    </div>
                    <ion-modal :is-open="isOpen" mode="ios">
                        <ion-content>
                            <div class="modal-wrapper date-picker">
                                <div class="date-picker-header">
                                    {{ year }}

                                    <div class="date-year-toggle">
                                        <img @click="setMinus('from')" src="../assets/date-prev.svg">
                                        <img @click="setPlus('from')" class="next" src="../assets/date-next.svg">
                                    </div>
                                </div>
                                <div class="date-picker-list">
                                    <div class="date-picker-item" v-for="el in monthList">
                                        <div @click="setMonth(el, 'from'), setOpen(false)">
                                            {{ el }}
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </ion-content>
                    </ion-modal>

                    <div class="input-date">
                        {{ to }}
                        <img @click="setOpenTo(true)" src="../assets/calendar.svg" alt="">
                    </div>
                    <ion-modal :is-open="isOpenTo" mode="ios">
                        <ion-content>
                            <div class="modal-wrapper date-picker">
                                <div class="date-picker-header">
                                    {{ yearTo }}
                                    <div class="date-year-toggle">
                                        <img @click="setMinus('to')" src="../assets/date-prev.svg">
                                        <img @click="setPlus('to')" class="next" src="../assets/date-next.svg">
                                    </div>
                                </div>
                                <div class="date-picker-list">
                                    <div @click="setMonth(el, 'to'), setOpenTo(false)" class="date-picker-item"
                                        v-for="el in monthList">
                                        {{ el }}
                                    </div>
                                </div>
                            </div>
                        </ion-content>
                    </ion-modal>
                </div>


                <div class="custom-month-picker">
                </div>

                <!-- <div class="month-card">
                    <div class="month-header">
                        <p class="year">2023</p>
                    </div>
                    <div class="month-item" v-for="el in monthList">
                        <p class="val">{{ el }}</p>
                    </div>
                </div> -->
                <div class="btns">
                    <p class="response" v-show="response">{{ response }}</p>
                    <p class="errorText" v-show="errorText">{{ errorText }}</p>
                    <button class="btn" @click="downloadAllHandler">
                        <div class="spinner" v-show="loadingDownloadAll">
                            <ion-spinner name="circles"></ion-spinner>
                        </div>
                        <span v-show="!loadingDownloadAll">
                            Скачать все документы
                        </span>
                    </button>

                    <button class="btn" @click="sendAllReceiptsHandler">
                        <div class="spinner" v-show="loadingSendAll">
                            <ion-spinner name="circles"></ion-spinner>
                        </div>
                        <span v-show="!loadingSendAll">
                            Отправить все документы на E-mail
                        </span>
                    </button>

                </div>

                <div class="spinner" v-show="loadingReceipts">
                    <ion-spinner name="circles"></ion-spinner>
                </div>
                <div class="card" v-show="!loadingReceipts" v-for="el in receiptsArr" :key="el?.data?.id">
                    <div class="card-list">
                        <div class="card-line">
                            <p class="name">Квитанция</p>
                            <p class="value">№ {{ el?.data?.number }}</p>
                        </div>
                        <div class="card-line">
                            <p class="name">Месяц</p>
                            <div class="load">
                                <p class="value">{{ (el?.data?.date) }}</p>
                                <p class="load" @click="downloadHandler(el?.data?.id)">
                                <div class="spinner" v-show="el?.loading">
                                    <ion-spinner name="circles"></ion-spinner>
                                </div>
                                <span v-show="!el?.loading">
                                    Скачать <img src="../assets/download.svg" alt="download">
                                </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- <div class="card">
                    <div class="card-list">
                        <div class="card-line">
                            <p class="name">Квитанция</p>
                            <p class="value">№ 12345678901</p>
                        </div>
                        <div class="card-line">
                            <p class="name">Месяц</p>
                            <div class="load">
                                <p class="value">Апрель 2023</p>
                                <p class="load">Скачать <img src="../assets/download.svg" alt="download"></p>
                            </div>
                        </div>
                    </div>
                </div> -->

            </div>
        </ion-content>
    </ion-page>
</template>
    
<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonMenuButton, IonButtons, IonText, IonModal, IonSpinner } from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router'
import { mapActions } from 'pinia'
import { useReceiptStore } from '../stores/receipts'
import { useLcStore } from '../stores/lc'
import moment from 'moment';

export default defineComponent({
    name: 'DownloadDocs',
    components: {
        IonPage, IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainer, IonMenuButton, IonButtons, IonText, IonModal, IonSpinner
    },
    computed: {
        receipts() {
            return this.$pinia.state.value?.receipt?.receiptsResponse?.data
        }
    },
    data() {
        return {
            receiptsArr: [],
            lcs: [],
            loadingSendAll: false,
            loadingReceipts: false,
            loadingDownloadAll: false,
            loadingLcs: false,
            loadingDownload: false,
            response: '',
            errorText: '',
            from: '',
            to: '',
            year: new Date().getFullYear(),
            yearTo: new Date().getFullYear(),
            monthList: [
                'Январь',
                "Февраль",
                "Март",
                "Апрель",
                "Май",
                "Июль",
                "Июнь",
                "Август",
                "Сентябрь",
                "Октябрь",
                "Ноябрь",
                "Декабрь"
            ],
            monthTo: '',

            currentMonth: new Date().getMonth(),
        }
    },
    mounted() {
        this.loadingLcs = true
        this.getLcs().then(() => {
            this.loadingLcs = false
            this.$pinia.state.value?.lc?.lcResponse?.data?.lcs?.forEach((el: any) => {
                this.lcs.push(el?.lc_id)
            })
        })
        this.loadingReceipts = true
        this.getReceipts().then(() => {
            this.loadingReceipts = false
            this.$pinia.state.value?.receipt?.receiptsResponse?.data?.forEach((el: any) => {
                this.receiptsArr.push({ error: '', loading: false, data: el, })
            })
            console.log(this.$pinia.state.value?.receipt?.receiptsResponse)
        })
    },
    methods: {
        ...mapActions(useReceiptStore, ['sendAllReceiptsToEmail', 'downloadAllReceipts', 'getReceipts', 'downloadReceipt']),
        ...mapActions(useLcStore, ['getLcs']),
        downloadHandler(id: any) {
            this.loadingDownload = true
            this.receiptsArr?.map((t: any) => {
                t?.data?.id === id ? t.loading = true : t.loading = false
            });
            this.downloadReceipt({ document_id: id }).then(() => {
                this.loadingDownload = false
                this.receiptsArr?.map((t: any) => {
                    t?.data?.id === id ? t.loading = false : t.loading = false
                });
                if (this.$pinia.state.value?.receipt?.downloadResponse?.status == true) {
                    window.open(this.$pinia.state.value?.receipt?.downloadResponse?.data?.file, '_system')
                    // this.response = this.$pinia.state.value?.receipt?.downloadAllResponse?.data
                } else {
                    this.receiptsArr?.map((t: any) => {
                        t?.data?.id === id ? t.error = this.$pinia.state.value?.receipt?.downloadResponse?.data : t.error = ''
                    });
                }
            })
        },
        downloadAllHandler() {
            this.loadingDownloadAll = true
            this.downloadAllReceipts({ document_ids: this.lcs }).then(() => {
                this.loadingDownloadAll = false
                if (this.$pinia.state.value?.receipt?.downloadAllResponse?.status == true) {
                    window.open(this.$pinia.state.value?.receipt?.downloadAllResponse?.data, '_system')
                    // this.response = this.$pinia.state.value?.receipt?.downloadAllResponse?.data
                } else {
                    this.errorText = this.$pinia.state.value?.receipt?.downloadAllResponse?.data
                }
            })
        },
        sendAllReceiptsHandler() {

            this.loadingSendAll = true
            this.sendAllReceiptsToEmail({ document_ids: this.lcs }).then(() => {
                this.loadingSendAll = false
                if (this.$pinia.state.value?.receipt?.sendAllResponse?.status == false) {
                    this.errorText = this.$pinia.state.value?.receipt?.sendAllResponse?.data
                } else {
                    this.response = this.$pinia.state.value?.receipt?.sendAllResponse?.data

                }
            })
        },
        setMonth(el: string, el2: string) {
            if (el2 == 'from') {
                this.$data.from = `${el} ${this.$data.year}`
            } else {
                this.$data.to = `${el} ${this.$data.yearTo}`
            }
        },
        setMinus(el: any) {
            if (el == 'from') {
                this.$data.year -= 1

            } else {
                this.$data.yearTo -= 1

            }
        },
        setPlus(el: any) {
            if (el == 'from') {
                this.$data.year += 1

            } else {
                this.$data.yearTo += 1
            }
        }
    },
    ionViewDidEnter() {

        this.$data.from = `${this.$data.monthList[this.$data.currentMonth]} ${this.$data.year}`
        this.$data.to = `${this.$data.monthList[this.$data.currentMonth]} ${this.$data.yearTo}`

    },
    setup() {
        const router = useRouter()

        const isOpen = ref(false);
        const isOpenTo = ref(false);


        const setOpen = (open: boolean) => {
            isOpen.value = open
        }
        const setOpenTo = (open: boolean) => {
            isOpenTo.value = open
        }
        return {
            setOpen,
            setOpenTo,
            isOpen,
            isOpenTo,
            moment
        }
    }

});
</script>
  
<style scoped>
.errorText {
    margin-top: 0;
}

.container {
    padding-top: 24px;
}

.custom-select {
    margin-bottom: 25px;
}

.load {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.load span {
    display: flex;
    align-items: center;
}

p.load {
    margin-bottom: 0;
    color: #005D9F;
    font-size: 14px;
    font-family: AppFont-Bold;
}

p.load img {
    margin-left: 10px;
}

.input-text {
    margin: 0;
    font-family: AppFont-Bold;

}

.custom-select summary {
    padding-top: 25px;
}
</style>
    