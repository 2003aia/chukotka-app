<template>
  <ion-page>
    <ion-header  class="ion-no-border">
      <ion-toolbar>
        <ion-title>Profile</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">

      <ExploreContainer name="Tab 3 page" />
    </ion-content>
  </ion-page>
</template>
  
<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';

import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Profile',
  components: {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainer
  },
  data() {
    return {
      selected: ''
    }
  },
  methods: {
    afterTabChange: function (v: any) {
      this.selected = v.tab;
      console.log(v.tab)
    }
  },
  setup() {
    return {
    }
  }

});
</script>
  