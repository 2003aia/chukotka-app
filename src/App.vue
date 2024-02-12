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
    console.log('getUser')
    this.getUser().then(()=>{
      console.log('getUser2')
    })
  },

});
</script>
