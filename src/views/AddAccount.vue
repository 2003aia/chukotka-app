<template>
    <ion-page>

        <ion-content :fullscreen="true">
            <div v-show="show == true" class="container">
                <button class="btn-back" @click="$router.go(-1)">
                    <img src="../assets/back.svg" alt="back" />
                </button>
                <ion-text>
                    <h1>Добавить лицевой счет</h1>
                </ion-text>
                <ion-accordion-group ref="acc">
                    <ion-accordion value="first">
                        <div class="input-wrapper" slot="header">
                            <input v-on:input="(e) => cityChange(e.target.value)" :value="city" class="input" required
                                :class="[errorText && 'error']" />
                            <label>Город/населенный пункт</label>
                        </div>
                        <div slot="content">
                            <div class="spinner" v-show="loadingAddress">
                                <ion-spinner name="circles"></ion-spinner>
                            </div>
                            <div class="card" v-show="!loadingAddress">
                                <p class="response" style="margin-bottom: 0;"
                                    v-show="addressArr == null || addressArr?.length == 0">Ничего не найдено</p>
                                <div class="card-list" v-show="addressArr != null || addressArr?.length > 0">
                                    <div class="card-line" v-for="el in addressArr" :key="el" v-on:click="cityChange2(el)">
                                        <p class="value">{{ el?.value }}</p>
                                        <!-- <p class="value">№ {{ el?.data?.number }}</p> -->
                                    </div>
                                </div>
                            </div>
                        </div>

                    </ion-accordion>

                    <ion-accordion value="second">

                        <div class="input-wrapper" slot="header">
                            <input v-on:input="(e) => streetChange(e.target.value)" :value="street" class="input" required
                                :class="[errorText && 'error']" />
                            <label>Улица</label>
                        </div>
                        <div slot="content">
                            <div class="spinner" v-show="loadingStreet">
                                <ion-spinner name="circles"></ion-spinner>
                            </div>
                            <div class="card" v-show="!loadingStreet">
                                <p class="response" style="margin-bottom: 0;"
                                    v-show="streetArr == null || streetArr?.length == 0">Ничего не найдено</p>
                                <div class="card-list" v-show="streetArr != null || streetArr?.length > 0">
                                    <div class="card-line" v-for="el in streetArr" :key="el" v-on:click="streetChange2(el)">
                                        <p class="value">{{ el?.value }}</p>
                                        <!-- <p class="value">№ {{ el?.data?.number }}</p> -->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ion-accordion>

                    <ion-accordion value="third">
                        <div class="input-block" slot="header">

                            <div class="input-wrapper">
                                <input v-on:input="(e)=>houseChange(e.target.value)" :value="house" class="input" required :class="[errorText && 'error']" />
                                <label>Дом</label>
                            </div>
                            <div class="input-wrapper">
                                <input v-model="apartment" class="input" required :class="[errorText && 'error']" />
                                <label>Квартира</label>
                            </div>
                        </div>
                        <div slot="content">
                            <div class="spinner" v-show="loadingHouse">
                                <ion-spinner name="circles"></ion-spinner>
                            </div>
                            <div class="card" v-show="!loadingHouse">
                                <p class="response" style="margin-bottom: 0;"
                                    v-show="houseArr == null || houseArr?.length == 0">Ничего не найдено</p>
                                <div class="card-list" v-show="houseArr != null || houseArr?.length > 0">
                                    <div class="card-line" v-for="el in houseArr" :key="el" v-on:click="houseChange2(el)">
                                        <p class="value">{{ el?.value }}</p>
                                        <!-- <p class="value">№ {{ el?.data?.number }}</p> -->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ion-accordion>
                </ion-accordion-group>
                <div class="input-wrapper">
                    <input v-model="lc" class="input" required :class="[errorText && 'error']" />
                    <label>Номер лицевого счета</label>
                </div>


            </div>
            <div v-show="show == false && error == false" class="container">
                <button class="btn-back" @click="$router.go(-1)">
                    <img src="../assets/back.svg" alt="back" />
                </button>
                <ion-text>
                    <h1>Счет добавлен</h1>
                    <p style="">{{ response }}</p>

                </ion-text>
                <div class="happy">
                    <img style="width: 140px;" src="../assets/happy.gif" alt="">
                </div>

            </div>
            <div v-show="show == false && error == true" class="container">
                <button class="btn-back" @click="$router.go(-1)">
                    <img src="../assets/back.svg" alt="back" />
                </button>
                <ion-text>
                    <h1>Что-то пошло не так</h1>
                    <p> {{ errorText }}<!-- Попробуйте снова через пару минут --></p>

                </ion-text>
                <div class="sad">
                    <img style="width: 140px;" src="../assets/sad.gif" alt="">

                    <!-- <Vue3Lottie :animationData="SadFace" :height="70" :width="70" /> -->
                </div>

            </div>

        </ion-content>
        <ion-footer class="ion-no-border">
            <div class="container">
                <p v-show="errorText.length > 0" class="errorText">{{ errorText }}</p>
                <button v-if="show == true" class="btn" @click="addLcHandler/* show = false */">
                    <ion-spinner v-show="addLcLoading" name="circles"></ion-spinner>
                    <span v-show="!addLcLoading">Добавить</span>
                </button>
                <button v-else class="btn" @click="$router.push('/tabs')">
                    <span>На главную</span>

                </button>
            </div>
        </ion-footer>
    </ion-page>
</template>
  
<script lang="ts">
import { IonPage, IonContent, IonText, IonFooter, IonSpinner, IonAccordionGroup, IonAccordion } from '@ionic/vue';
import { defineComponent } from 'vue';
// import SadFace from '../assets/sad.json'
import { mapActions } from 'pinia'
import { useLcStore } from '../stores/lc'
import { useAddressStore } from '../stores/address'


export default defineComponent({
    name: 'AddAcc',
    components: {
        IonPage, IonContent, IonText, IonFooter, IonSpinner, IonAccordionGroup, IonAccordion
    },
    methods: {
        ...mapActions(useLcStore, ['addLc', 'getLcs']),
        ...mapActions(useAddressStore, ['getAddress']),
        cityChange(e: any) {
            this.city = e
            console.log(e)
            let data = {
                query: e,
                name: 'city',
            }
            this.loadingAddress = true
            this.getAddress(data).then(() => {
                this.loadingAddress = false

                console.log(this.$pinia.state.value.address.addressResponse)
            })
        },
        cityChange2(e: any) {
            this.streetQuery = e?.data
            this.city = e?.value
            this.$refs.acc.$el.value = undefined;
        },
        streetChange(e: any) {
            this.street = e

            console.log(e)
            let data = {
                query: e,
                name: 'street',
                city_fias_id: this.streetQuery?.city_fias_id,
                region_fias_id: this.streetQuery?.region_fias_id,
            }
            this.loadingStreet = true
            this.getAddress(data).then(() => {
                this.loadingStreet = false

                console.log(this.$pinia.state.value.address.streetResponse)
            })
        },
        streetChange2(e: any) {
            this.street = e?.value
            this.houseQuery = e?.data
            this.$refs.acc.$el.value = undefined;
        },
        houseChange(e: any) {
            this.house = e
            console.log(e)
            let data = {
                query: e,
                name: 'house',
                city_fias_id: this.houseQuery?.city_fias_id,
                region_fias_id: this.houseQuery?.region_fias_id,
                street_fias_id: this.houseQuery?.street_fias_id,
            }
            this.loadingHouse = true

            this.getAddress(data).then(() => {
                this.loadingHouse = false

                console.log(this.$pinia.state.value.address.houseResponse)
            })
        },
        houseChange2(e: any) {
            this.house = e?.value
            this.$refs.acc.$el.value = undefined;
            // this.houseQuery = e?.data
        },
        addLcHandler() {
            this.errorText = ''

            if (this.city.length > 0 && this.street.length > 0 && this.house.length > 0 && this.apartment.length > 0 && this.lc.length > 0) {
                this.addLcLoading = true
                this.response = ''
                this.errorText = ''
                let data = {
                    lc: this.lc,
                    city: this.city,
                    street: this.street,
                    house: this.house,
                    apartment: this.apartment
                }
                this.addLc(data).then(() => {
                    this.addLcLoading = false

                    if (this.$pinia.state.value.lc.addLcResponse?.status == true) {
                        this.getLcs().then(() => {
                            this.$pinia.state.value.lc?.lcs?.forEach((el: any, index: any) => {
                                if (index == 0) {
                                    this.lcsMob.push({ el: el, current: true })
                                } else {
                                    this.lcsMob.push({ el: el, current: false })
                                }
                            })

                        })
                        this.show = false
                        this.response = this.$pinia.state.value.lc.addLcResponse?.data
                    } else {
                        this.show = false
                        this.error = true
                        this.errorText = this.$pinia.state.value.lc.addLcResponse?.data
                    }
                })
            } else {
                this.errorText = 'Заполните все поля!'
            }

        },
    },
    ionViewDidLeave() {
        this.response = ''
        this.errorText = ''
        this.show = true
        this.error = false
    },
    data() {
        return {
            show: true,
            error: false,
            city: '',
            street: '',
            house: '',
            apartment: '',
            lc: '',
            response: '',
            errorText: '',
            addLcLoading: false,
            loadingAddress: false,
            loadingStreet: false,
            loadingHouse: false,
            streetQuery: null,
            houseQuery: null,

        }
    },
    computed: {
        lcsMob() {
            return this.$pinia.state.value.lc?.lcsMod
        },
        addressArr() {
            return this.$pinia.state.value.address?.addressResponse?.suggestions
        },
        streetArr() {
            return this.$pinia.state.value.address?.streetResponse?.suggestions
        },
        houseArr() {
            return this.$pinia.state.value.address?.houseResponse?.suggestions
        },
    }
})
</script>
  
  
<style scoped>
.input-block {
    display: flex;
    justify-content: space-between;
}

.input-block .input-wrapper {
    width: 47%;
}

.happy {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}

.sad {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}
</style>
  