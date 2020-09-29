import Vue from 'vue'
import Vuex from 'vuex'
import {loadSomething} from "../helpers/loadSomething";

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        user: {
            name:'Isaac Afful',
            email:'',
        },
        products:[],
        isAuth:false,
        overview:{}
    },
    mutations: {

        increment (state) {
            state.count++
        },
        updateUser(state, user){
            state.user = user;
        },
        updateOverview(state, overview){
            state.overview = overview;
        },
        updateAllProducts(state,products){
            state.products = products;
        },
        addToProducts(state, product){
            state.products.push(product)
        },
        updateOneProduct(state, product){
            let index = -1;
            for (const prod of state.products) {
                if (prod.id === product.id ){
                    index = state.products.indexOf(prod);
                }
            }
            Object.assign(state.products[index], product)
        },
        deleteOneProduct(state, product){
            let index = -1;
            for (const prod of state.products) {
                if (prod.id === product.id ){
                    index = state.products.indexOf(prod);
                }
            }
            state.products.splice(index, 1);
        }

    },
    actions:{

        async loadData(context){
            await context.dispatch('loadProducts');
            await context.dispatch("loadOverview")

        },

        async loadProducts (context){
            let data = {
                url: "/data",
                mode: "load-products",
            }
            loadSomething(context, data).then(res => {
                console.log("Good", res)
                context.commit('updateAllProducts', res)
            }).catch(error => {
                console.log("Bad")
                console.log(error);
                reject(error)
            });

        },

        async loadOverview (context){
            let data = {
                url: "/data",
                mode: "overview",
            }
            loadSomething(context, data).then(res => {
                context.commit('updateOverview', res)
            }).catch(error => {
                console.log("Bad")
                console.log(error);
                reject(error)
            });

        },
        updateProduct(context,product){
            let data = {
                url: "/data",
                mode:"update-product",
                id:product.id,
                name:product.name,
                in_stock:product.in_stock,
                price:product.price,
                min_stock:product.min_stock,
                description:product.description,
            }

            loadSomething(context, data).then(res=>{
                context.commit('updateOneProduct',res)
            }).catch(error=>{
                console.log("Bad")
                console.log(error);
                reject(error)
            });
        },

        deleteProduct(context,product){
            let data = {
                url: "/data",
                mode:"delete-product",
                id:product.id,

            }

            loadSomething(context, data).then(res=>{
                context.commit('deleteOneProduct',product)
            }).catch(error=>{
                console.log("Bad")
                console.log(error);
                reject(error)
            });
        },

        createProduct:function (context,product){
            let data = {
                url: "/data",
                mode:"create-product",
                name:product.name,
                in_stock:product.in_stock,
                price:product.price,
                min_stock:product.min_stock,
                description:product.description,
            }

            loadSomething(context, data).then(res=>{
                context.commit('addToProducts',res)
            }).catch(error=>{
                console.log("Bad")
                console.log(error);
                reject(error)
            });
        },

        login: function (context) {

            return new Promise((resolve,reject)=>{
                let data = {
                    url: "/login",
                    email: "isaac@gmail.com",
                    password: "ghana1234"
                }

                loadSomething(context, data).then(res=>{
                    console.log("Good",res)
                    resolve(res)
                }).catch(error=>{
                    console.log("Bad")
                    console.log(error);
                    reject(error)
                });
            })


        },
        logout(context){
            let vm = this;
            let data = {
                url:"/logout",
            }
            /*loadSomething(this, data).then(()=>{
                vm.$router.push('/login')
            })*/
        }
    },
    getters:{
        outOfStock: (state, getters) => {
            return state.products.filter(product => product.is_out_stock)
        },
        belowMinStock: (state, getters) => {
            return state.products.filter(product => product.is)
        }

    }
})

export default store;
