<script setup>
import HomeFooter from '@/components/HomeFooter.vue';
import HomeNav from "@/components/HomeNav.vue";

</script>

<template>
  <home-nav/>
  <!--  准备一个二级路由出口组件 -->
  <router-view/>
  <home-footer/>
</template>

<style scoped lang="scss">

</style>