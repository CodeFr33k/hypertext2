import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import store from '@/store';
import KeyValue from 'caml-js/KeyValue';
import Tag from 'caml-js/Tag';
import 'caml-js/shims';

// add store to window,
// so users can access in browser console.
(window as any).store = store;
(window as any).KeyValue = KeyValue;
(window as any).Tag = Tag;

window.addEventListener('beforeunload', (event) => {
    if(
        store.appData.length > 0 &&
        store.data.saveEnabled
    ) {
        event.preventDefault();
        event.returnValue = '';
    }
});

const searchParams = new URLSearchParams(window.location.search as string);
const uri = searchParams.get('manifest');
if(uri) {
    store.loadManifest(uri);
}
const save = searchParams.get('save');
if(save) {
    store.data.saveEnabled = true;
}
import("../pkg/index.js")
    .then(module => {
        //console.log(module.go());
    })
    .catch(console.error);

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
