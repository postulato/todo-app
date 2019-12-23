export default class Observer {
  constructor() {
    this.subscribers = {};
  }

  subscribe (event, callback) {
    if (!this.subscribers[event]) {
      this.subscribers[event] = [];
    }

    this.subscribers[event].push(callback);
  }

  unsubscribe (event, callback) {
    if (this.subscribers[event]) {
      this.subscribers[event] = this.subscribers[event].filter(cb=>cb!==callback);
    }
  }

  broadcast (event, value) {
    if (!this.subscribers[event]) {
      console.warn('Event is not supported', event);
      return;
     }
    this.subscribers[event].forEach(cb => cb(value));
  }
}