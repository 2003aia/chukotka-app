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
                            Начисление и оплата
                        </span>
                    </ion-title>

                    <img @click="$router.push('/tabs/notif')" src="../assets/bell.svg" alt="notification" class="notif">
                </div>

            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <div class="container">
                <div class="card user-info">
                    <ion-text>
                        <p class="name">ФИО</p>
                        <p class="value">{{ user?.lastname }} {{ user?.name }} {{ user?.secondname }}</p>
                        <!-- <p class="name">Адрес</p>
                        <p class="value">г Анадырь ул.Куркутского, д. 34</p> -->
                        <p class="name">Гарантирующий поставщик</p>
                        <p class="value">АО «Чукотэне́рго» </p>
                    </ion-text>
                </div>
                <div>
                    <p class="acc-title">
                        Лицевые счета
                    </p>

                    <div class="acc-list">

                        <div class="spinner" v-show="loadingLcs">
                            <ion-spinner name="circles"></ion-spinner>
                        </div>
                        <div v-for="el in lcs" v-show='!loadingLcs' class="acc-item" @click="changeTab(el?.lc?.lc_number)"
                            :key="el" :href="el?.lc?.lc_id" :class="[el?.current && 'active']">
                            № {{ el.lc?.lc_number }}
                        </div>
                    </div>
                </div>

                <div class="line"></div>
                <div class="spinner" v-show="loadingPayments">
                    <ion-spinner name="circles"></ion-spinner>
                </div>
                <div v-show="!loadingPayments">

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

                    <div class="card">


                        <div class="block" v-for="el in /*  accrualsInfo */invoices">
                            <p class="card-title">{{ moment(el?.period).format('MMMM yyyy') }}</p>
                            <div class="card-list">
                                <div class="card-item">
                                    <p class="name">Расчетный период</p>
                                    <p class="value">{{ moment(el?.period).format('DD.MM.yyyy') }}</p>
                                </div>
                                <div class="card-item">
                                    <p class="name">Сальдо начало периода</p>
                                    <p class="value">{{ el?.SALDON }}</p>
                                </div>
                                <div class="card-item">
                                    <p class="name">Сальдо конец периода</p>
                                    <p class="value">{{ el?.SALDOK }}</p>
                                </div>

                                <div class="card-item">
                                    <p class="name">Корректировки</p>
                                    <p class="value">{{ el?.korr }}</p>
                                </div>
                                <div class="card-item">
                                    <p class="name">Оплата</p>
                                    <p class="value">{{ el?.oplata }}</p>
                                </div>
                                <div class="card-item">
                                    <p class="name">Вид услуги</p>
                                    <p class="value">{{ el?.vid }}</p>
                                </div>
                                <div class="card-item">
                                    <p class="name">Начисления</p>
                                    <p class="value">{{ el?.summa }}</p>
                                </div>
                            </div>

                            <!-- <div class="total">
                            <p class="name">Начисления</p>
                            <p class="value">{{ el?.summa }}</p>
                        </div> -->
                        </div>



                    </div>
                </div>

            </div>
        </ion-content>
    </ion-page>
</template>
    
<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonMenuButton, IonButtons, IonText, IonModal, IonSpinner } from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';
import { useRouter } from 'vue-router'
import { defineComponent, ref } from 'vue';
import { mapActions } from 'pinia';
import { Storage } from '@ionic/storage';
import { useLcStore } from '../stores/lc'
import moment from 'moment'

export default defineComponent({
    name: 'AccrualAndPayment',
    components: {
        IonPage, IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainer, IonMenuButton, IonButtons, IonText, IonModal, IonSpinner
    },
    data() {
        return {
            lcs: [],
            invoices: [],
            loadingPayments: false,
            loadingLcs: false,
            user: {
                lastname: '',
                name: '',
                secondname: ''
            },
            from: '',
            to: '',
            from2: '',
            to2: '',
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
    methods: {
        ...mapActions(useLcStore, ['getInvoices', 'getLcs']),
        changeTab(selected: any) {
            this.loadingPayments = true
            this.getInvoices(selected).then(() => {
                console.log('selected', this.$pinia.state.value.lc?.invoicesResponse)
                this.loadingPayments = false
                this.invoices = this.$pinia.state.value.lc?.invoicesResponse?.data

            })

            this.lcs?.map((t: any) => {
                t?.lc?.lc_number === selected ? t.current = true : t.current = false
            });
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
                this.invoices = []
                let newDate = `1.${monthNumber}.${this.year}`

                let toNew = this.to2.length > 0 ? moment(this.to2) : moment(`1.${new Date().getMonth()}.${new Date().getFullYear()}`)
                console.log(moment(`1.${new Date().getMonth()}.${new Date().getFullYear()}`))
                this.invoicesArray?.map((item: any) => {
                    if (moment(moment(item?.period).format('D.M.yyyy')) <= toNew && moment(moment(item?.period).format('D.M.yyyy')) >= moment(newDate)) {
                        this.invoices.push(item)
                    }
                })

                this.$data.from = `${el} ${this.$data.year}`
            } else {
                this.invoices = []
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

                this.invoicesArray?.map((item: any) => {

                    if (moment(moment(item?.period).format('D.M.yyyy')) >= fromNew && moment(moment(item?.period).format('D.M.yyyy')) <= moment(newDate)) {
                        this.invoices.push(item)

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
        }
    },

    mounted() {

        const getStore = async () => {
            const store = new Storage()
            await store.create()
            let user = await store.get('user')
            this.user = JSON.parse(user)
        }
        getStore()
        this.loadingPayments = true
        this.loadingLcs = true
        this.getLcs().then(() => {
            this.loadingLcs = false
            this.loadingPayments = true

            this.$pinia.state.value.lc?.lcResponse?.data?.lcs.forEach((el: any, index: any) => {
                if (index === 0) {
                    this.lcs.push({ lc: el, current: true })

                } else {
                    this.lcs.push({ lc: el, current: false })
                }
            });
            // console.log(this.lcs)
            if (this.$pinia.state.value.lc?.lcResponse?.status == true) {

                this.getInvoices(this.$pinia.state.value.lc?.lcResponse?.data?.lcs[0]?.lc_number).then(() => {
                    this.invoices = this.$pinia.state.value.lc?.invoicesResponse?.data
                    console.log(this.$pinia.state.value.lc?.invoicesResponse)
                    this.loadingPayments = false

                })
            }

        })

    },
    ionViewWillEnter() {
        this.$data.from = `${this.$data.monthList[this.$data.currentMonth]} ${this.$data.year}`
        this.$data.to = `${this.$data.monthList[this.$data.currentMonth]} ${this.$data.yearTo}`

    },
    computed: {
        lcArray() {
            return this.$pinia.state.value.lc?.lcResponse?.data?.lcs
        },
        invoicesArray() {
            return this.$pinia.state.value.lc?.invoicesResponse?.data
        }
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
.container {
    padding-top: 24px;
}

.value:last-child {
    margin-bottom: 0;
}

.card .card-title {
    border: none;
    color: #005D9F;
    font-size: 14px;
    padding: 0;
}

.card-item:last-child .name,
.card-item:last-child .value {
    font-size: 16px;
    font-family: AppFont-Bold;
    color: #232323;
}

.card-item .value,
.name {
    color: #6D6D6D;
    font-size: 14px;
}

.card .block {
    border-bottom: 1px solid #E4F1FF;
    border-radius: 2px;
    padding-bottom: 10px;
    margin-bottom: 20px;
}

.card .block:last-child {
    margin-bottom: 0;
    padding: 0;
    border-bottom: 0;
}

.btn-link {
    margin-top: 0;
}

.input-text {
    font-family: AppFont-Bold;
}
</style>
    