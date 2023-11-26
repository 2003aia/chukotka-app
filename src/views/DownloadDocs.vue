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
                    <button class="btn">Скачать все документы</button>
                    <button class="btn">Отправить все документы на E-mail</button>

                </div>


                <div class="card">
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
                </div>
                <div class="card">
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
                </div>

            </div>
        </ion-content>
    </ion-page>
</template>
    
<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonMenuButton, IonButtons, IonText, IonModal, } from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router'

export default defineComponent({
    name: 'DownloadDocs',
    components: {
        IonPage, IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainer, IonMenuButton, IonButtons, IonText, IonModal,
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

.custom-select {
    margin-bottom: 25px;
}

.load {
    display: flex;
    justify-content: space-between;
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
    