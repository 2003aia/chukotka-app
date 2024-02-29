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

                        <input class="placeholder" value="1" v-on:change="(e: any) => setDoc(e.target.value)" type="radio"
                            name="item" id="default" title="Квитанция" checked>
                        <input type="radio" value="1" v-on:change="(e: any) => setDoc(e.target.value)" name="item"
                            id="item1" title="Квитанция">
                        <input type="radio" value="2" v-on:change="(e: any) => setDoc(e.target.value)" name="item"
                            id="item2" title="Договоры">
                        <input type="radio" value="3" v-on:change="(e: any) => setDoc(e.target.value)" name="item"
                            id="item3" title="Извещения">
                    </summary>
                    <ul class="list">
                        <li>
                            <label for="item1">
                                Квитанции
                            </label>
                        </li>
                        <li>
                            <label for="item2">Договоры</label>
                        </li>
                        <li>
                            <label for="item3">Извещения</label>
                        </li>

                    </ul>
                </details>
                <div>
                    <p class="acc-title">
                        Лицевые счета
                    </p>

                    <div class="acc-list">

                        <div class="spinner" v-show="loadingLcs">
                            <ion-spinner name="circles"></ion-spinner>
                        </div>
                        <div class="acc-item" @click="setDoc(docType)" :class="[docType2 && 'active']">
                            Все
                        </div>
                        <div v-for="el in lcsMob" v-show='!loadingLcs' class="acc-item"
                            @click="changeTab(el?.lc?.lc_number)" :key="el" :href="el?.lc?.lc_id"
                            :class="[el?.current && 'active']">
                            № {{ el.lc?.lc_number }}
                        </div>
                    </div>
                </div>
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
                <div class="card" v-show='errorText2'>
                    <p class="errorText">{{ errorText2 }}</p>
                </div>
                <div class="card" v-show="!loadingReceipts" v-for="el in receiptsArr" :key="el?.data?.id">
                    <div class="card-list">
                        <div class="card-line">
                            <p class="name">{{ docType }}</p>
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
        },
        contracts() {
            return this.$pinia.state.value?.receipt?.contractsResponse?.data
        },
        notices() {
            return this.$pinia.state.value?.receipt?.noticesResponse?.data
        },
        lcsMob() {
            return this.$pinia.state.value.lc?.lcsMod
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
            errorText2: '',

            from: '',
            to: '',
            from2: '',
            to2: '',
            docType: '',
            docType2: false,
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

            this.$pinia.state.value.lc?.lcResponse?.data?.lcs.forEach((el: any, index: any) => {
                this.lcsMob.push({ lc: el, current: false })
            });
            this.docType2 = true
        })
        this.loadingReceipts = true
        this.getReceipts().then(() => {
            this.loadingReceipts = false
            if (this.$pinia.state.value?.receipt?.receiptsResponse?.status == true) {
                this.$pinia.state.value?.receipt?.receiptsResponse?.data?.forEach((el: any) => {

                    this.receiptsArr.push({ error: '', loading: false, data: el, })
                })
            }

            console.log(this.$pinia.state.value?.receipt?.receiptsResponse)
        })

    },
    methods: {
        ...mapActions(useReceiptStore, ['sendAllReceiptsToEmail', 'downloadAllReceipts', 'downloadReceipt', 'getReceipts', 'getContracts', 'getNotices']),
        ...mapActions(useLcStore, ['getLcs']),
        downloadHandler(id: any) {
            this.loadingDownload = true
            this.response = ''
            this.errorText = ''
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
            let ids:any = []
            this.receipts.forEach((el: any,) => {
                ids.push(el?.id)
            })
            this.response = ''
            this.errorText = ''
            this.downloadAllReceipts({ document_ids: ids }).then(() => {
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
            let ids:any = []
            this.receipts.forEach((el: any,) => {
                ids.push(el?.id)
            })
            this.response = ''
            this.errorText = ''
            this.loadingSendAll = true
            this.sendAllReceiptsToEmail({ document_ids: ids }).then(() => {
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
                let monthArr: any = []
                let monthNumber = 1
                this.monthList.map((month, id) => {
                    monthArr.push({ id: id + 1, name: month })
                })
                monthArr.find((e: any) => {
                    if (e?.name == el) {
                        monthNumber = e?.id
                    }
                })
                this.from2 = `1.${monthNumber}.${this.year}`
                this.receiptsArr = []
                let newDate = `1.${monthNumber}.${this.year}`

                let toNew = this.to2.length > 0 ? moment(this.to2) : moment(`1.${new Date().getMonth()}.${new Date().getFullYear()}`)
                console.log(moment(`1.${new Date().getMonth()}.${new Date().getFullYear()}`))
                this.receipts?.map((item: any) => {
                    if (moment(moment(item?.date).format('D.M.yyyy')) <= toNew && moment(moment(item?.date).format('D.M.yyyy')) >= moment(newDate)) {
                        // this.receiptsArr.push(item)
                        this.receiptsArr.push({ error: '', loading: false, data: item, })

                    }
                })

                this.$data.from = `${el} ${this.$data.year}`
            } else {
                this.receiptsArr = []
                let monthArr: any = []
                let monthNumber = 1
                this.monthList.map((month, id) => {
                    monthArr.push({ id: id + 1, name: month })
                })
                monthArr.find((e: any) => {
                    if (e?.name == el) {
                        monthNumber = e?.id
                    }
                })
                this.to2 = `1.${monthNumber}.${this.yearTo}`
                let newDate = new Date(`1.${monthNumber}.${this.yearTo}`)
                let fromNew = this.from2.length > 0 ? moment(this.from2) : moment(`1.${new Date().getMonth()}.${new Date().getFullYear()}`)

                this.receipts?.map((item: any) => {

                    if (moment(moment(item?.date).format('D.M.yyyy')) >= fromNew && moment(moment(item?.date).format('D.M.yyyy')) <= moment(newDate)) {
                        // this.receiptsArr.push(item)
                        this.receiptsArr.push({ error: '', loading: false, data: item, })

                    }
                })

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
        },
        setDoc(e: any) {

            console.log(e, 'set')
            this.errorText2 = ''
            if (e.length > 1) {
                this.docType2 = true
                this.lcsMob = []
                this.$pinia.state.value.lc?.lcResponse?.data?.lcs.forEach((el: any, index: any) => {

                    this.lcsMob.push({ lc: el, current: false })
                });
            } else {
                this.docType2 = false

            }
            if (e == '1' || e == 'Квитанция') {
                this.docType = 'Квитанция'

                this.loadingReceipts = true
                this.getReceipts().then(() => {
                    this.loadingReceipts = false
                    if (this.$pinia.state.value?.receipt?.receiptsResponse?.status == true) {

                        this.$pinia.state.value?.receipt?.receiptsResponse?.data?.forEach((el: any) => {

                            this.receiptsArr.push({ error: '', loading: false, data: el, })
                        })

                    } else {
                        this.errorText2 = this.$pinia.state.value?.receipt?.receiptsResponse?.data
                    }

                })
                console.log(e, 'квитанции')
            }
            if (e == '2' || e == 'Договор') {
                this.docType = 'Договор'

                this.loadingReceipts = true
                this.getContracts().then(() => {
                    this.loadingReceipts = false
                    if (this.$pinia.state.value?.receipt?.contractsResponse?.status == true) {

                        this.$pinia.state.value?.receipt?.contractsResponse?.data?.forEach((el: any) => {

                            this.receiptsArr.push({ error: '', loading: false, data: el, })
                        })
                    } else {
                        this.errorText2 = this.$pinia.state.value?.receipt?.contractsResponse?.data
                    }
                })
                console.log(e, 'договоры')
            }
            if (e == '3' || e == 'Извещение') {
                this.docType = 'Извещение'

                this.loadingReceipts = true
                this.getNotices().then(() => {
                    this.loadingReceipts = false
                    if (this.$pinia.state.value?.receipt?.noticesResponse?.status == true) {

                        this.$pinia.state.value?.receipt?.noticesResponse?.data?.forEach((el: any) => {

                            this.receiptsArr.push({ error: '', loading: false, data: el, })
                        })
                    } else {
                        this.errorText2 = this.$pinia.state.value?.receipt?.noticesResponse?.data
                    }
                })
                console.log(e, 'извещения')
            }
        },
        changeTab(selected: any) {
            this.errorText2 = ''

            this.loadingReceipts = true
            this.receiptsArr = []
            if (this.docType == 'Квитанция') {
                this.docType = 'Квитанция'
                this.loadingReceipts = true
                this.getReceipts(selected).then(() => {
                    this.loadingReceipts = false
                    if (this.$pinia.state.value?.receipt?.receiptsResponse?.status == true) {

                        this.$pinia.state.value?.receipt?.receiptsResponse?.data?.forEach((el: any) => {

                            this.receiptsArr.push({ error: '', loading: false, data: el, })
                        })
                    } else {
                        this.errorText2 = this.$pinia.state.value?.receipt?.receiptsResponse?.data
                    }

                })
                console.log(selected, 'квитанции')
            }
            if (this.docType == 'Договор') {
                this.docType = 'Договор'

                this.loadingReceipts = true
                this.getContracts(selected).then(() => {
                    this.loadingReceipts = false
                    if (this.$pinia.state.value?.receipt?.contractsResponse?.status == true) {

                        this.$pinia.state.value?.receipt?.contractsResponse?.data?.forEach((el: any) => {

                            this.receiptsArr.push({ error: '', loading: false, data: el, })
                        })
                    } else {
                        this.errorText2 = this.$pinia.state.value?.receipt?.contractsResponse?.data
                    }

                })
                console.log(selected, 'договоры')
            }
            if (this.docType == 'Извещение') {
                this.docType = 'Извещение'

                this.loadingReceipts = true
                this.getNotices().then(() => {
                    this.loadingReceipts = false
                    if (this.$pinia.state.value?.receipt?.noticesResponse?.status == true) {

                        this.$pinia.state.value?.receipt?.noticesResponse?.data?.forEach((el: any) => {

                            this.receiptsArr.push({ error: '', loading: false, data: el, })
                        })
                    } else {
                        this.errorText2 = this.$pinia.state.value?.receipt?.noticesResponse?.data
                    }

                })
                console.log(selected, 'извещения')
            }

            this.lcsMob?.map((t: any) => {
                t?.lc?.lc_number === selected ? t.current = true : t.current = false
            });
        },
    },
    ionViewDidLeave() {
        this.errorText2 = ''

    },
    ionViewDidEnter() {
        this.docType = 'Квитанция'

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
    