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
                    <input class="input" required />
                    <label>Город/населенный пункт</label>
                </div>
                <div class="input-wrapper">
                    <input class="input" required />
                    <label>Улица</label>
                </div>
                <div class="input-block">
                    <div class="input-wrapper">
                        <input class="input" required />
                        <label>Дом</label>
                    </div>
                    <div class="input-wrapper">
                        <input class="input" required />
                        <label>Квартира</label>
                    </div>
                </div>
                <div class="input-wrapper">
                    <input class="input" required />
                    <label>Номер лицевого счета</label>
                </div>


            </div>
            <div v-show="show == false && error == false" class="container">
                <button class="btn-back" @click="$router.go(-1)">
                    <img src="../assets/back.svg" alt="back" />
                </button>
                <ion-text>
                    <h1>Счет добавлен</h1>
                    <p style="">Лицевой счет успешно добавлен</p>

                </ion-text>
                <div class="happy">
                    <img style="width: 140px;"
                        src="https://s3-alpha-sig.figma.com/img/ed65/1709/60a6ead3b293eda67c7147eb539ffbe1?Expires=1701043200&Signature=ZggEf2NUNR6KXT0DjQDg1lMyVr9X18WsWvsLLIlemaqDUS2EOaY1B~qKmEfAGoscWsdCk55kScRvLiG4~4XW8RS8J8HCWE5J4kS1lKuOv~bymbwdykJ3924-dA0VCQMZkw-4VYIRDLx-zIUl4TxNzzxeLa1Sb3S8ERHVxM6kga3fDhsmwuaMJN6DfYlmO5v75cjjsGWTzPvatNtOMyy6jrV2W1ETsOf2A3xI4aVUBRlee5oP7NTBrQ7YIWuyInoUjmb1kr5gzlMwOH0eXR3UvhKr1V1WGdklYTcHxw6TeTmkeV4yBmyUhh~q3cjS6aaO-KHumdyNiu6PeA2LZP1~bQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
                        alt="">
                </div>

            </div>
            <div v-show="show == false && error == true" class="container">
                <button class="btn-back" @click="$router.go(-1)">
                    <img src="../assets/back.svg" alt="back" />
                </button>
                <ion-text>
                    <h1>Что-то пошло не так</h1>
                    <p style="">Попробуйте снова через пару минут</p>

                </ion-text>
                <div class="sad">
                    <Vue3Lottie :animationData="SadFace" :height="70" :width="70" />
                </div>

            </div>
        </ion-content>
        <ion-footer class="ion-no-border">
            <div class="container">
                <button class="btn" @click="show = false">Добавить</button>

            </div>
        </ion-footer>
    </ion-page>
</template>
  
<script lang="ts">
import { IonPage, IonContent, IonText, IonFooter } from '@ionic/vue';
import { defineComponent } from 'vue';
import SadFace from '../assets/sad.json'



export default defineComponent({
    name: 'AddAcc',
    components: {
        IonPage, IonContent, IonText, IonFooter,
    },
    data() {
        return {
            show: true,
            error: false,
            SadFace,
        }
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
    margin-top: 100px;
}

.sad {
    display: flex;
    justify-content: center;
    margin-top: 100px;
}
</style>
  