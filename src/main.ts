import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'

import("../pkg/index.js")
    .then(module => {
        console.log(module.go());
    })
    .catch(console.error);


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
