import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueCompositionApi from '@vue/composition-api'
import Buefy from 'buefy'
import VueLayers from 'vuelayers'
import 'vuelayers/lib/style.css'

Vue.use(VueLayers)
Vue.config.productionTip = false

Vue.use(VueCompositionApi)
Vue.use(Buefy)

new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app')
