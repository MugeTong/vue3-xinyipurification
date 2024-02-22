import Notifications from './Notifications.vue'
import {event} from "./event";


const Notify = {
  install(app, args = {}) {
    console.log(app)
    // ensure the plugin is installed only once
    if (this.installed) return
    this.installed = true

    // merge the options
    args.componentName = typeof args.componentName === 'string'
      ? args.componentName
      : 'notifications'
    args.name = typeof args.name === 'string'
      ? args.name
      : 'notify'
    this.params = args

    // create a new object for notification
    const notify = (params) => {
      // simple string as message
      if (typeof params === 'string') {
        params = {title: '', text: params}
      }
      // if the message is an object, we assume it's a notification
      if (typeof params === 'object') {
        event.emit('add', params)
      }
    }

    notify.close = function (id) {
      event.emit('close', id)
    }

    notify.clearGroup = function (groupName) {
      event.emit('clearGroup', groupName)
    }

    notify.clearAll = function () {
      event.emit('clearAll')
    }

    // register the component
    app.component(args.componentName, Notifications)

    // use it in `<template>` as {{ $notify }}
    app.config.globalProperties['$' + args.name] = notify

    // use it in `<script setup>` as `const notify = inject('notify')`
    app.provide(args.name, notify) // 使用provide/inject来实现跨组件通信
  }
}

export default Notify
