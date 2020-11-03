/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

import store from "./store/VuexStore";

import vue from "vue";
require('./bootstrap');
import VueProgressBar from 'vue-progressbar';
import router from './router/router';
import vuetify  from './helpers/vuetify';
import VueProgressOptions  from "./helpers/VueProgress";
window.Vue = vue;
import Vuex from 'vuex'

import VueSweetalert2 from 'vue-sweetalert2';

// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.use(VueSweetalert2);


Vue.use(Vuex)
/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component('example-component', require('./components/ExampleComponent').default);
Vue.component('login', require('./components/LogIn').default);
Vue.component('main-app', require('./components/layout/MainApp.vue').default);
Vue.component('app-nav', require('./components/layout/NavigationDrawer.vue').default);
// Vue.component('home', require('./components/Home').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
Vue.use(VueProgressBar, VueProgressOptions);

const app = new Vue({
    router,
    store,
    vuetify,
}).$mount('#app');

store.$app = app;


window.axios.interceptors.request.use(
    config => {
        app.$Progress.start(); // for every request start the progress
        return config;}
);

window.axios.interceptors.response.use(response => {
    app.$Progress.finish(); // finish when a response is received
    return response;
});
