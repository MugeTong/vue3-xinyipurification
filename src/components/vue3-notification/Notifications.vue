<script setup>
import {ref, onMounted, computed} from 'vue'
import Notify from './index'
import {event} from "./event";
import {Id, listToDirection, Timer} from './utils'
import defaults from './defaults'
import VelocityGroup from './VelocityGroup.vue'
import CssGroup from './CssGroup.vue'
import parseNumericValue from './parser'


const STATE = {IDLE: 0, DESTROYED: 2};
const emit = defineEmits(['click', 'destroy']);

/**************************************** Props ****************************************/
const props = defineProps({
  group: {type: String, default: ''},
  width: {type: [Number, String], default: 300},
  reverse: {type: Boolean, default: false},
  position: {type: [String, Array], default: () => defaults.position},
  classes: {type: String, default: 'vue-notification'},
  animationType: {
    type: String, default: 'css', validator(value) {
      return value === 'css' || value === 'velocity'
    }
  },
  animation: {type: Object, default: () => defaults.velocityAnimation},
  animationName: {type: String, default: defaults.cssAnimation},
  speed: {type: Number, default: 300},
  cooldown: {type: Number, default: 0},  // Todo: try to implement
  duration: {type: Number, default: 3000},
  delay: {type: Number, default: 0},
  max: {type: Number, default: Infinity},
  ignoreDuplicates: {type: Boolean, default: true},
  closeOnClick: {type: Boolean, default: true},
  pauseOnHover: {type: Boolean, default: true}
})


const list = ref([]);
const velocity = Notify.params.velocity;

/**************************************** Lifecycle ****************************************/
onMounted(() => {
  event.on('add', addItem);
  event.on('close', closeItem);
  // event.on('clear', destroyAll);  // TODO
});


/**************************************** Computed ****************************************/
const actualWidth = computed(() => parseNumericValue(props.width));
const isVA = computed(() => props.animationType === 'velocity');
// const componentName = computed(() => isVA.value ? 'VelocityGroup' : 'CssGroup');
const componentGroup = computed(() => isVA.value ? VelocityGroup : CssGroup);
const styles = computed(() => {
  const {x, y} = listToDirection(props.position);
  const width = actualWidth.value;
  const suffix = actualWidth.value.type;

  let styles = {
    width: width + suffix,
    [y]: '0px'
  }

  if (x === 'center') {
    styles['left'] = `calc(50% - ${width / 2}${suffix})`
  } else {
    styles[x] = '0px'
  }

  return styles
});

const active = computed(() => list.value.filter(v => v['state'] !== STATE.DESTROYED));

// const botToTop = computed(() => styles.value.hasOwnProperty('bottom'));
const botToTop = computed(() => Object.prototype.hasOwnProperty.call(styles.value, 'bottom'))

/**************************************** Methods ****************************************/
const addItem = (event = {}) => {
  // event = {group, id, title, text, type, data, duration, speed, ignoreDuplicates}

  // step over if the group is not matched
  event.group = event.group || '';
  if (props.group !== event.group) return;

  // step over if duplicates are not allowed
  if (!(typeof event.ignoreDuplicates === 'boolean'
      ? event.ignoreDuplicates
      : props.ignoreDuplicates)) {
    if (active.value.some(m => m['title'] === event.title && m['text'] === event.text)) {
      return
    }
  }

  // calulate the properties of the notification
  const {title, text, type} = event;
  const data = typeof event.data === 'object'
      ? event.data
      : {};
  const id = typeof event.id === 'number'
      ? event.id
      : Id();
  const duration = typeof event.duration === 'number'
      ? event.duration
      : props.duration;
  const speed = typeof event.speed === 'number'
      ? event.speed
      : props.speed;
  const state = STATE.IDLE;
  const lifeCycle = duration + 2 * speed;

  const item = {id, title, text, type, data, speed, lifeCycle, state}  // timer

  // Set the timer to control the lifecycle of the notification
  if (duration >= 0) {
    item.timer = new Timer(() => destroyItem(item), item.lifeCycle);
  }

  let direction = props.reverse ? !botToTop.value : botToTop.value
  // Add the notification to the list
  if (direction) {
    list.value.push(item);
    if (active.value.length > props.max) {
      destroyItem(active.value[0])
      // list.value.shift();
    }
  } else {
    list.value.unshift(item);
    if (active.value.length > props.max) {
      destroyItem(active.value[active.value.length - 1])
      // list.value.pop(); TODO: check this
    }
  }
}

const destroyItem = (item) => {
  console.log(item.timer)
  item.timer.clear();

  item.state = STATE.DESTROYED

  if (!isVA.value) {
    clean()
  }

  emit('destroy', item)
}

const destroyIfAllowed = (item) => {
  emit('click', item)
  if (props.closeOnClick) {
    destroyItem(item)
  }
}

const destroyById = (id) => {
  const item = list.value.find(v => v.id === id);
  if (item) destroyItem(item);
}

const destroyAll = () => {
  active.value.forEach(destroyItem)
}

const pauseTimeout = (item) => {
  if (props.pauseOnHover) {
    item.timer.pause();
  }
}

const resumeTimeout = (item) => {
  if (props.pauseOnHover) {
    item.timer.resume();
  }
}

const closeItem = (id) => {
  destroyById(id)
}

const notifyClass = (item) => {
  return [
    'vue-notification-template',
    props.classes,
    item.type
  ]
}

const notifyWrapperStyle = (item) => {
  return isVA.value
      ? null
      : {transition: `all ${item.speed}ms`}
}


const getAnimation = (index, el) => {
  const animation = props.animation[index]

  return typeof animation === 'function'
      ? animation.call(this, el)
      : animation
}

const enter = ({el, complete}) => {
  const animation = getAnimation('enter', el)

  velocity(el, animation, {
    duration: props.speed,
    complete
  })
}

const leave = ({el, complete}) => {
  console.log('leave')
  let animation = getAnimation('leave', el)

  velocity(el, animation, {
    duration: props.speed,
    complete
  })
}

const clean = () => {
  list.value = list.value.filter(v => v['state'] !== STATE.DESTROYED)
}

</script>

<template>
  <div :style="styles" class="vue-notification-group">
    <!-- Set transition group type: CssGroup or VelocityGroup -->
    <component :is="componentGroup"
               :name="animationName"
               @enter="enter"
               @leave="leave"
               @after-leave="clean">
      <div v-for="item in active"
           :key="item.id"
           :data-id="item.id"
           :style="notifyWrapperStyle(item)"
           class="vue-notification-wrapper"
           @mouseenter="pauseTimeout(item)"
           @mouseleave="resumeTimeout(item)">
        <slot
            :class="[classes, item.type]"
            :close="() => destroyItem(item)"
            :item="item"
            name="body">
          <!-- Default slot template -->
          <div
              :class="notifyClass(item)"
              @click="destroyIfAllowed(item)">
            <div
                v-if="item.title"
                class="notification-title"
                v-html="item.title">
            </div>
            <div
                class="notification-content"
                v-html="item.text">
            </div>
          </div>
        </slot>
      </div>
    </component>
  </div>
</template>

<style lang="scss" scoped>
.vue-notification-group {
  display: block;
  position: fixed;
  z-index: 5000;
}

.vue-notification-wrapper {
  display: block;
  overflow: hidden;
  width: 100%;
  margin: 0;
  padding: 0;
}

.notification-title {
  font-weight: 600;
}

.vue-notification-template {
  display: block;
  box-sizing: border-box;
  background: white;
  text-align: left;
}

.vue-notification {
  display: block;
  box-sizing: border-box;
  text-align: left;
  font-size: 12Px;
  padding: 10Px;
  margin: 0 5Px 5Px;

  color: white;
  background: #44A4FC;
  border-left: 5Px solid #187FE7;
}

.vue-notification.warn {
  background: #ffb648;
  border-left-color: #f48a06;
}

.vue-notification.error {
  background: #E54D42;
  border-left-color: #B82E24;
}

.vue-notification.success {
  background: #68CD86;
  border-left-color: #42A85F;
}

.vn-fade-enter-active, .vn-fade-leave-active, .vn-fade-move {
  transition: all .5s;
}

.vn-fade-enter, .vn-fade-leave-to {
  opacity: 0;
}

</style>