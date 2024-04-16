import PrimeVue from 'primevue/config'
import Button from 'primevue/button'
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import ColumnGroup from 'primevue/columngroup';   // optional
import Row from 'primevue/row'; 
import 'primevue/resources/themes/md-light-indigo/theme.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Dropdown from 'primevue/dropdown';
const app = createApp(App)
app.use(router)
app.use(ToastService);

app.use(PrimeVue)
// eslint-disable-next-line vue/no-reserved-component-names
app.component('Button', Button)
app.component('DataTable', DataTable)
app.component('Column', Column)
app.component('ColumnGroup', ColumnGroup)
app.component('Row', Row)
app.component('InputText', InputText)
app.component('Toast', Toast)

app.component('Dropdown',Dropdown)
app.mount('#app')
