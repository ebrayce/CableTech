import Vue from 'vue';
import VueRouter from 'vue-router';
import goTo from 'vuetify/es5/services/goto';
Vue.use(VueRouter);

// 2. Define some routes
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// `Vue.extend()`, or just a component options object.
// We'll talk about nested routes later.

const routes = [
    { path: '/',component: require('../components/Home').default, name:"Home" },
    { path: '/login',component: require('../components/LogIn').default, name: "Login" },
    { path: '/register',component: require('../components/Register').default, name: "Register" },
    { path: '/products',component: require('../components/Product').default, name: "Product" },
    { path: '/sales',component: require('../components/Sales').default, name: "Sales" },
    { path: '/purchases',component: require('../components/Purchases').default, name: "Purchases" },
    // { path: '/',component: require('../components/ExampleComponent').default },
    // { path: '/foo',component: require('../components/ExampleComponent').default },
    { path: '*',component: require('../components/NotFound').default, name: "NotFound"},
];


let options = {
    duration: 1000,
    offset: 1,
    easing: 'easeInOutCubic',
}

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
    mode:'history',
    routes ,// short for `routes: routes`
    beforeRouteUpdate(){
      console.log("here")
    },
    scrollBehavior: (to, from, savedPosition) => {
        let scrollTo = 0

        if (to.hash) {
            scrollTo = to.hash
        } else if (savedPosition) {
            scrollTo = savedPosition.y
        }

        return goTo(scrollTo,options)
    },
    /*beforeRouteUpdate (to, from, next) {
        console.log("changed")
        // react to route changes...
        // don't forget to call next()
        if (this.$route.name !== "Login" && !this.$store.state.isAuth){
            this.$router.push('/login');
        }
        next()

    }*/
});

export default router;
