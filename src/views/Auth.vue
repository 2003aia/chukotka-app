<template>
  <ion-page>

    <ion-content :fullscreen="true">
      <div class="container auth">

        <img class="logo" src="../assets/logo.svg" alt="logo" />
        <div class="input-wrapper">

          <input :value="login" v-on:change="(e)=>login = e.target.value" class="input" required />
          <label>Лицевой счет</label>
        </div>

        <div class="input-wrapper">
          <input :value="password" v-on:change="(e)=>password = e.target.value" class="input" ref="passAuth" required type="password" />
          <label>Пароль</label>
          <div @click="passToggle">
            <img v-show="pass == true" src="../assets/pass-close.svg" alt="pen">
            <img v-show="pass == false" src="../assets/pass-open.svg" alt="pen">
          </div>
        </div>
        <button class="btn-link" @click="$router.push('/passwordRecovery')">
          Забыли пароль?
        </button>
      </div>
    </ion-content>
    <ion-footer class="ion-no-border">

      <div class="btns container">
        <button class="btn" @click="authUserHandler(login, password)">Войти</button>
        <button class="btn-clear" @click="$router.push('/reg')">Зарегистрироваться</button>

      </div>
    </ion-footer>
  </ion-page>
</template>
  
<script lang="ts">
import { IonPage, IonContent, IonFooter } from '@ionic/vue';
import { defineComponent } from 'vue';
import {mapActions} from 'pinia'
import {useLoginStore} from '../stores/login'

export default defineComponent({
  name: 'Auth',
  components: {
    IonPage, IonContent, IonFooter
  },
  data() {
    return {
      pass: false,
      password: '',
      login: '',
    }
  },
  
  methods: {
    ...mapActions(useLoginStore, ["authUser",]),
    authUserHandler(login: any, password: any){
      this.authUser(login, password).then(()=>{
        if(this.$pinia.state.value?.login.authResponse.status == true) {
          this.$router.push('/tabs')
        }
        console.log('authUser response:',this.$pinia.state.value?.login.authResponse)
      })

    },
    passToggle() {
      var x = this.$refs.passAuth
      if (x?.type === "password") {
        x.type = "text";
        this.$data.pass = true
      } else {
        x.type = "password";
        this.$data.pass = false

      }
    }
  },

});
</script>


<style scoped>
.logo {
  object-fit: contain;
  height: 55px;
  margin-top: 100px;
  margin-bottom: 40px;
}
</style>
  