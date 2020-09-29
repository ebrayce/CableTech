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
        sales:[],
        purchases:[],
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
        },


        deleteOneSale(state, sale){
            let index = -1;
            for (const sal of state.sales) {
                if (sal.id === sale.id ){
                    index = state.sales.indexOf(sal);
                }
            }
            state.sales.splice(index, 1);
        },
        updateAllSales(state,sales){
            state.sales = sales;
        },
        addToSales(state, sale){
            state.sales.push(sale)
        },
        updateOneSale(state, sale){
            let index = -1;
            for (const sal of state.sales) {
                if (sal.id === sale.id ){
                    index = state.sales.indexOf(sal);
                }
            }
            Object.assign(state.sales[index], sale)
        },



        deleteOnePurchase(state, purchase){
            let index = -1;
            for (const sal of state.purchases) {
                if (sal.id === purchase.id ){
                    index = state.purchases.indexOf(sal);
                }
            }
            if (index>-1){
                state.purchases.splice(index, 1);
            }

        },
        updateAllPurchases(state,purchases){
            state.purchases = purchases;
        },
        addToPurchases(state, purchase){
            state.purchases.push(purchase)
        },
        updateOnePurchase(state, purchase){
            let index = -1;
            for (const sal of state.purchases) {
                if (sal.id === purchase.id ){
                    index = state.purchases.indexOf(sal);
                }
            }
            if (index>-1){
                Object.assign(state.purchases[index], purchase)
            }

        },


    },
    actions:{

        async loadData(context){
            await context.dispatch('loadProducts');
            await context.dispatch("loadOverview");
            await context.dispatch("loadPurchases");
            await context.dispatch("loadSales");

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
                    // console.log("Good",res)
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
        },




        async loadSales (context){
            let data = {
                url: "/sale",
                mode: "load-sales",
            }
            loadSomething(context, data).then(res => {
                // console.log("Good", res)
                context.commit('updateAllSales', res)
            }).catch(error => {
                console.log("Bad")
                console.log(error);
                reject(error)
            });

        },
        updateSale(context,sale){
            let data = {
                url: "/sale",
                mode:"update-sale",
                id:sale.id,
                price:sale.name,
                sold_at:sale.sold_at,
                quantity:sale.quantity,
                product_id:sale.product_id,
            }

            loadSomething(context, data).then(res=>{
                context.commit('updateOneSale',res)
            }).catch(error=>{
                console.log("Bad")
                console.log(error);
                reject(error)
            });
        },

        deleteSale(context,sale){
            let data = {
                url: "/sale",
                mode:"delete-sale",
                id:sale.id,

            }

            loadSomething(context, data).then(res=>{
                context.commit('deleteOneSale',sale)
                context.commit('updateOneProduct',res.product)
            }).catch(error=>{
                console.log("Bad")
                console.log(error);
                reject(error)
            });
        },

        createSale:function (context,sale){
            // console.log(sale,"Salll")
            let data = {
                url: "/sale",
                mode:"create-sale",
                price:sale.price,
                sold_at:sale.sold_at,
                quantity:sale.quantity,
                product_id:sale.product_id,

            }

            loadSomething(context, data).then(res=>{
                console.log(res)
                context.commit('addToSales',res.sale)
                context.commit('updateOneProduct',res.product)
            }).catch(error=>{
                console.log("Bad")
                console.log(error);
                reject(error)
            });
        },


        async loadPurchases (context){
            let data = {
                url: "/purchase",
                mode: "load-purchases",
            }
            loadSomething(context, data).then(res => {
                // console.log("Good", res)
                context.commit('updateAllPurchases', res)
            }).catch(error => {
                console.log("Bad")
                console.log(error);
                reject(error)
            });

        },
        updatePurchase(context,purchase){
            let data = {
                url: "/purchase",
                mode:"update-purchase",
                id:purchase.id,
                price:purchase.name,
                quantity:purchase.quantity,
                product_id:purchase.product_id,
            }

            loadSomething(context, data).then(res=>{
                context.commit('updateOneSale',res)
            }).catch(error=>{
                console.log("Bad")
                console.log(error);
                reject(error)
            });
        },

        deletePurchase(context,purchase){
            let data = {
                url: "/purchase",
                mode:"delete-purchase",
                id:purchase.id,

            }

            loadSomething(context, data).then(res=>{
                context.commit('dop',purchase)
                context.commit('updateOneProduct',res.product)
            }).catch(error=>{
                console.log("Bad")
                console.log(error);
                reject(error)
            });
        },
        createPurchase:function (context,purchase){
            // console.log(purchase,"Salll")
            let data = {
                url: "/purchase",
                mode:"create-purchase",
                price:purchase.price,
                sold_at:purchase.sold_at,
                quantity:purchase.quantity,
                product_id:purchase.product_id,

            }

            loadSomething(context, data).then(res=>{
                console.log(res)
                context.commit('addToPurchases',res.purchase)
                context.commit('updateOneProduct',res.product)
            }).catch(error=>{
                console.log("Bad")
                console.log(error);
                reject(error)
            });
        },

    },
    getters:{
        outOfStock: (state, getters) => {
            return state.products.filter(product => product.is_out_stock)
        },
        belowMinStock: (state, getters) => {
            return state.products.filter(product => product.is)
        },
        querySelections:(state)=>(v) =>{

            let prods = [];
            // Simulated ajax query
            prods =  state.products.filter(e => {
                return (e.name || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
            })
            // console.log(prods)
            return prods


        },
        getSaleById:(state)=>(id) =>{
            let sales = state.sales.filter(sale=>{
                return sale.id === id;
            })
            if(sales.length > 0){
                return sales[0]
            }else{
                return null;
            }

        },
        getProductById:(state)=>(id) =>{
            let products = state.products.filter(product=>{
                return product.id === id;
            })

            if(products.length > 0){
                return products[0]
            }else{
                return null;
            }
        },

    }
})

export default store;
