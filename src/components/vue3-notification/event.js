// eventBus.js

// Not necessary to use `ref` to create listeners
const listeners = new Map();

export const event = {
  // add listener
  on(event, callback) {
    if (!listeners.has(event)) {
      listeners.set(event, new Set());
    }
    const eventListeners = listeners.get(event);
    eventListeners.add(callback);
  },
  // remove listener
  off(event, callback) {
    if (listeners.has(event)) {
      const eventListeners = listeners.get(event);
      eventListeners.delete(callback);
      if (eventListeners.size === 0) {
        listeners.delete(event);
      }
    }
  },
  // emit event
  emit(event, ...args) {
    if (listeners.has(event)) {
      const eventListeners = listeners.get(event);
      for (const callback of eventListeners) {
        callback(...args);
      }
    }
  },
};

