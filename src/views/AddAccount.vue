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
                <div class="input-wrapper">
                    <input v-model="city" class="input" required />
                    <label>Город/населенный пункт</label>
                </div>
                <div class="input-wrapper">
                    <input v-model="street" class="input" required />
                    <label>Улица</label>
                </div>
                <div class="input-block">
                    <div class="input-wrapper">
                        <input v-model="house" class="input" required />
                        <label>Дом</label>
                    </div>
                    <div class="input-wrapper">
                        <input v-model="apartment" class="input" required />
                        <label>Квартира</label>
                    </div>
                </div>
                <div class="input-wrapper">
                    <input v-model="lc" class="input" required />
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
import { IonPage, IonContent, IonText, IonFooter, IonSpinner } from '@ionic/vue';
import { defineComponent } from 'vue';
// import SadFace from '../assets/sad.json'
import { mapActions } from 'pinia'
import { useLcStore } from '../stores/lc'



export default defineComponent({
    name: 'AddAcc',
    components: {
        IonPage, IonContent, IonText, IonFooter, IonSpinner,
    },
    methods: {
        ...mapActions(useLcStore, ['addLc']),
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
        }
    },
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
  