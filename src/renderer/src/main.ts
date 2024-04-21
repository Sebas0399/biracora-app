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
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import Menubar from 'primevue/menubar';
import SpeedDial from 'primevue/speeddial';
import Dialog from 'primevue/dialog';

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Dropdown from 'primevue/dropdown';
import Badge from 'primevue/badge';
import Avatar from 'primevue/avatar';
import AvatarGroup from 'primevue/avatargroup';
// import as directive
import BadgeDirective from 'primevue/badgedirective';
import Ripple from 'primevue/ripple';
import MultiSelect from 'primevue/multiselect';

const app = createApp(App)
app.use(router)
app.use(ToastService);
app.directive('badge', BadgeDirective);

app.use(PrimeVue,{ripple:true})
// eslint-disable-next-line vue/no-reserved-component-names
app.component('Badge', Badge)
app.directive('ripple', Ripple);
app.component('Button', Button)
app.component('Avatar', Avatar)
app.component('AvatarGroup', AvatarGroup)

app.component('DataTable', DataTable)
app.component('Column', Column)
app.component('ColumnGroup', ColumnGroup)
app.component('Row', Row)
app.component('InputText', InputText)
app.component('Toast', Toast)
app.component('Menubar', Menubar)
app.component('SpeedDial',SpeedDial)
app.component('Dropdown',Dropdown)
app.component('Dialog',Dialog)
app.component('MultiSelect',MultiSelect)

app.mount('#app')
