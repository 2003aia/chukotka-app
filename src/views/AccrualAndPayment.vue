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
                        <p class="value">Иванов Иван Иванович</p>
                        <p class="name">Адрес</p>
                        <p class="value">г Анадырь ул.Куркутского, д. 34</p>
                        <p class="name">Гарантирующий поставщик</p>
                        <p class="value">АО «Чукотэне́рго» </p>
                    </ion-text>
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

                <div class="line"></div>

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
                    <div class="block" v-for="el in accrualsInfo">
                        <p class="card-title">{{ el.title }}</p>
                        <div class="card-list">
                            <div class="card-item">
                                <p class="name">Начислено</p>
                                <p class="value">{{ el.charged }}</p>
                            </div>
                            <div class="card-item">
                                <p class="name">К оплате на начало месяца</p>
                                <p class="value">{{ el.due }}</p>
                            </div>
                            <div class="card-item">
                                <p class="name">Оплачено</p>
                                <p class="value">{{ el.paid }}</p>
                            </div>
                            <div class="card-item">
                                <p class="name">К оплате</p>
                                <p class="value">{{ el.toPay }}</p>
                            </div>
                        </div>
                    </div>



                </div>
               
            </div>
        </ion-content>
    </ion-page>
</template>
    
<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonMenuButton, IonButtons, IonText, IonModal } from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';
import {useRouter} from 'vue-router'
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'AccrualAndPayment',
    components: {
        IonPage, IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainer, IonMenuButton, IonButtons, IonText, IonModal
    },
    data() {
        return {
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
            
            accrualsInfo: [
                {
                    title: 'Май 2022',
                    charged: '1375.55',
                    due: '-2481.88',
                    paid: '6.79',
                    toPay: '-1113.12'
                },
                {
                    title: 'Июнь 2022',
                    charged: '1475.55',
                    due: '5481.88',
                    paid: '4000.79',
                    toPay: '-3113.12'
                },
            ],
        }
    },
    methods: {
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
    ionViewWillEnter() {
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

.card-item:first-child .name,
.card-item:first-child .value {
    font-size: 16px;
    font-family: AppFont-Bold;
    color: #232323;
}

.card-item .value,
.name {
    color: #6D6D6D;
    font-size: 14px;
}

.card .block{
    border-bottom: 1px solid #E4F1FF;
    border-radius: 2px;
    padding-bottom: 10px;
    margin-bottom: 20px;
}

.card .block:last-child{
    margin-bottom: 0;
    padding: 0;
    border-bottom: 0;
}

.btn-link {
    margin-top: 0;
}
.input-text{
    font-family: AppFont-Bold;
}
</style>
    