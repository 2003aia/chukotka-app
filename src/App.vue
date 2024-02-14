<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { defineComponent } from 'vue';
import { mapActions } from 'pinia'
import { useLoginStore } from './stores/login'


export default defineComponent({
  name: 'App',
  components: {
    IonApp, IonRouterOutlet
  },
  methods: {
    ...mapActions(useLoginStore, ['getUser'])
  },
  mounted() {
    console.log('getUser', this.$router.currentRoute.value.fullPath)
    this.getUser().then(() => {
      
      if (this.$pinia.state.value?.login?.userResponse?.status == true && this.$router.currentRoute.value.fullPath == '/auth') {
        this.$router.push('/tabs')
      } else {
        this.$router.push(this.$router.currentRoute.value.fullPath)
      }

      console.log('getUser2')
    })
  },

});
</script>
