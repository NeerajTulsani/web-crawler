import Vue from 'vue'
import App from './App.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import store from './store'
import PrimeVue from 'primevue/config'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import 'primevue/resources/themes/saga-blue/theme.css'
import './css/overrides/index.scss'
import ToastService from 'primevue/toastservice'
import Toast from 'primevue/toast'
import axios from './plugins/axios'
import { FormValidator, InputValidator } from './plugins/validate'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import moment from 'moment'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import InputText from 'primevue/inputtext'
import { ValidationObserver, ValidationProvider } from 'vee-validate'

Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)
Vue.prototype.moment = moment
Vue.component('DataTable', DataTable)
Vue.component('Column', Column)
Vue.component('Button', Button)
Vue.component('FormValidator', FormValidator)
Vue.component('InputValidator', InputValidator)
Vue.component('Dialog', Dialog)
Vue.component('InputText', InputText)
Vue.component('Toast', Toast)

Vue.use(PrimeVue)
Vue.use(ToastService)

let app

Vue.use(PrimeVue)
Vue.config.productionTip = false

app = new Vue({
  axios,
  store,
  render: h => h(App)
}).$mount('#app')

export default app
