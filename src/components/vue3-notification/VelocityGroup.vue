<script setup>

// define the hooks to be passed to the parent component
const emit = defineEmits(['enter', 'leave', 'afterLeave'])

// define the enter animation
const onEnter = (el, complete) => {emit('enter', { el, complete })}

// define the leave animation
const onLeave = (el, complete) => {emit('leave', { el, complete })}

// define the afterLeave animation
const onAfterLeave = () => {emit('afterLeave')}

</script>

<template>
  <!--Because the `component` element does not has javaScript hooks same as `transition-group`-->
  <!--It is necessary to defineEmits to pass the hooks to the parent component-->
  <transition-group :css="false"
    @enter="onEnter"
    @leave="onLeave"
    @after-leave="onAfterLeave">
    <slot/>
  </transition-group>
</template>

<style lang="scss" scoped>

</style>