<script setup>
import {inject} from 'vue'
import {RouterView} from 'vue-router'
import Notifications from "@/components/vue3-notification/Notifications.vue";

const notify = inject('notify');




function N() {
  notify({
    title: 'Hello',
    text: 'This is a notification'
  });
}


</script>

<template>
  <!--<notifications animation-type="velocity"/>-->
  <notifications/>
  <RouterView/>
  <button @click="N">Notify</button>
</template>

<style scoped>

</style>
