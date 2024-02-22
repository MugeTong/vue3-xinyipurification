<script setup>
// define the hooks to be passed to the parent component
// In `CssGroup`, it won't be used.
defineEmits(['enter', 'leave', 'afterLeave'])

</script>

<template>
  <transition-group>
    <slot/>
  </transition-group>
</template>

<style lang="scss" scoped>

</style>