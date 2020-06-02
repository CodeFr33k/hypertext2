import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from '@/store';
import KeyValue from '@/KeyValue';
import Tag from '@/Tag';

// add store to window,
// so users can access in browser console.
(window as any).store = store;
(window as any).KeyValue = KeyValue;
(window as any).Tag = Tag;

const searchParams = new URLSearchParams(window.location.search as string);
const uri = searchParams.get('manifest');
if(uri) {
    store.loadManifest(uri);
}

import("../pkg/index.js")
    .then(module => {
        //console.log(module.go());
    })
    .catch(console.error);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
