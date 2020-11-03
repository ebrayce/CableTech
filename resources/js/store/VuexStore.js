import Vue from 'vue'
import Vuex from 'vuex'
import {loadSomething} from "../helpers/loadSomething";


Vue.use(Vuex)

function showErrorNotification() {
    Vue.swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',

    })
}


function showSuccessNotification(message = 'Product Updated successfully.', icon = 'success', position = 'top-end') {
    Vue.swal({
        position: position,
        icon: icon,
        title: message,
        showConfirmButton: false,
        timer: 1500
    })
}


const store = new Vuex.Store({
    state: {
        user: {
            name: 'Isaac Afful',
            email: '',
        },
        products: [],
        sales: [],
        purchases: [],
        isAuth: false,
        overview: {},
    },
    mutations: {

        increment(state) {
            state.count++
        },
        updateUser(state, user) {
            state.user = user;
        },
        updateIsAuth(state, value) {
            state.isAuth = value;
        },
        updateOverview(state, overview) {
            state.overview = overview;
        },

        updateAllProducts(state, products) {
            state.products = products;
        },
        addToProducts(state, product) {
            state.products.push(product)
        },
        updateOneProduct(state, product) {
            let index = -1;
            for (const prod of state.products) {
                if (prod.id === product.id) {
                    index = state.products.indexOf(prod);
                }
            }
            Object.assign(state.products[index], product)
        },
        deleteOneProduct(state, product) {
            let index = -1;
            for (const prod of state.products) {
                if (prod.id === product.id) {
                    index = state.products.indexOf(prod);
                }
            }
            state.products.splice(index, 1);
        },


        deleteOneSale(state, sale) {
            let index = -1;
            for (const sal of state.sales) {
                if (sal.id === sale.id) {
                    index = state.sales.indexOf(sal);
                }
            }
            state.sales.splice(index, 1);
        },
        updateAllSales(state, sales) {
            state.sales = sales;
        },
        addToSales(state, sale) {
            state.sales.push(sale)
        },
        updateOneSale(state, sale) {
            let index = -1;
            for (const sal of state.sales) {
                if (sal.id === sale.id) {
                    index = state.sales.indexOf(sal);
                }
            }
            Object.assign(state.sales[index], sale)
        },


        deleteOnePurchase(state, purchase) {
            let index = -1;
            for (const sal of state.purchases) {
                if (sal.id === purchase.id) {
                    index = state.purchases.indexOf(sal);
                }
            }
            if (index > -1) {
                state.purchases.splice(index, 1);
            }

        },
        updateAllPurchases(state, purchases) {
            state.purchases = purchases;
        },
        addToPurchases(state, purchase) {
            state.purchases.push(purchase)
        },
        updateOnePurchase(state, purchase) {
            let index = -1;
            for (const sal of state.purchases) {
                if (sal.id === purchase.id) {
                    index = state.purchases.indexOf(sal);
                }
            }
            if (index > -1) {
                Object.assign(state.purchases[index], purchase)
            }

        },


    },
    actions: {
        loadPost(context, payload) {
            return new Promise((resolve, reject) => {
                axios.post(payload.url, payload).then(res => {
                    resolve(res)
                }).catch(error => {
                    if (error.response.status === 419){
                        context.dispatch('pageExpired');
                    }

                    reject(error)
                })
            })
        },

        pageExpired(context){
            context.commit('updateIsAuth',false)
        },

        async loadData(context) {
            await context.dispatch('loadProducts');
            // await context.dispatch("loadOverview");
            await context.dispatch("loadPurchases");
            await context.dispatch("loadSales");

        },

        async loadProducts(context) {
            let data = {
                url: "/data",
                mode: "load-products",
            }
            loadSomething(context, data).then(res => {
                // console.log("Good", res)
                context.commit('updateAllProducts', res)

            }).catch(error => {
                showErrorNotification()
            });

        },


        async loadOverview(context) {
            let data = {
                url: "/data",
                mode: "overview",
            }
            loadSomething(context, data).then(res => {
                context.commit('updateOverview', res)
            }).catch(error => {
                showErrorNotification()
            });

        },
        updateProduct(context, product) {
            let data = {
                url: "/data",
                mode: "update-product",
                id: product.id,
                name: product.name,
                in_stock: product.in_stock,
                price: product.price,
                min_stock: product.min_stock,
                description: product.description,
            }

            loadSomething(context, data).then(res => {
                context.commit('updateOneProduct', res)
                showSuccessNotification();

            }).catch(error => {
                showErrorNotification()
            });
        },

        deleteProduct(context, product) {
            let data = {
                url: "/data",
                mode: "delete-product",
                id: product.id,

            }

            loadSomething(context, data).then(res => {
                context.commit('deleteOneProduct', product)
                showSuccessNotification("Product Deleted successfully.")
            }).catch(error => {
                showErrorNotification()
            });
        },

        createProduct: function (context, product) {
            let data = {
                url: "/data",
                mode: "create-product",
                name: product.name,
                in_stock: product.in_stock,
                price: product.price,
                min_stock: product.min_stock,
                description: product.description,
            }

            loadSomething(context, data).then(res => {
                context.commit('addToProducts', res)
                showSuccessNotification("Product Created successfully.")
            }).catch(error => {
                showErrorNotification()
            });
        },

        loadUser: function (context) {
            context.dispatch('loadPost',{
                url:"/user"
            }).then(res => {
                context.commit('updateUser', res.data)
            })
        },

        login: function (context, payload) {
            let info = payload;
            info.url = "/login";
            return new Promise((resolve, reject) => {
                context.dispatch("loadPost", info).then(res => {
                    resolve(res)
                }).catch(error => {
                    reject(error)
                })
            })


        },
        logout(context) {
           context.dispatch('loadPost',{
               url:'/logout'
           }).then(()=>{
               context.commit('updateIsAuth',false);
               context.commit('updateUser',null);
           })
        },

        async loadSales(context) {
            let data = {
                url: "/sale",
                mode: "load-sales",
            }
            loadSomething(context, data).then(res => {
                // console.log("Good", res)
                context.commit('updateAllSales', res)
            }).catch(error => {
                showErrorNotification();

            });

        },
        async updateSale(context, sale) {
            let data = {
                url: "/sale",
                mode: "update-sale",
                id: sale.id,
                price: sale.name,
                sold_at: sale.sold_at,
                quantity: sale.quantity,
                product_id: sale.product_id,
            }

            loadSomething(context, data).then(res => {
                context.commit('updateOneSale', res)
                showSuccessNotification('Sale updated successfully.')
            }).catch(error => {
                showErrorNotification();

            });
        },

        async deleteSale(context, sale) {
            let data = {
                url: "/sale",
                mode: "delete-sale",
                id: sale.id,

            }

            loadSomething(context, data).then(res => {
                context.commit('deleteOneSale', sale)
                context.commit('updateOneProduct', res.product)
                showSuccessNotification("Sale deleted successfully.")
            }).catch(error => {
                showErrorNotification();

            });
        },

        async createSale(context, sale) {
            // console.log(sale,"Salll")
            let data = {
                url: "/sale",
                mode: "create-sale",
                price: sale.price,
                sold_at: sale.sold_at,
                quantity: sale.quantity,
                product_id: sale.product_id,

            }

            loadSomething(context, data).then(res => {

                context.commit('addToSales', res.sale)
                context.commit('updateOneProduct', res.product)
                showSuccessNotification("Sale created successfully")
            }).catch(error => {
                showErrorNotification();
            });
        },


        async loadPurchases(context) {
            let data = {
                url: "/purchase",
                mode: "load-purchases",
            }
            loadSomething(context, data).then(res => {
                // console.log("Good", res)
                context.commit('updateAllPurchases', res)
            }).catch(error => {
                showErrorNotification()
            });

        },
        updatePurchase(context, purchase) {
            let data = {
                url: "/purchase",
                mode: "update-purchase",
                id: purchase.id,
                price: purchase.name,
                quantity: purchase.quantity,
                product_id: purchase.product_id,
            }

            loadSomething(context, data).then(res => {
                context.commit('updateOneSale', res)
                showSuccessNotification("Purchase updated successfully.")
            }).catch(error => {
                showErrorNotification()
            });
        },

        deletePurchase(context, purchase) {
            let data = {
                url: "/purchase",
                mode: "delete-purchase",
                id: purchase.id,

            }

            loadSomething(context, data).then(res => {
                context.commit('deleteOnePurchase', purchase)
                context.commit('updateOneProduct', res.product)
                showSuccessNotification("Sale deleted Successfully.")
            }).catch(error => {
                showErrorNotification()
            });
        },
        createPurchase: function (context, purchase) {
            // console.log(purchase,"Salll")
            let data = {
                url: "/purchase",
                mode: "create-purchase",
                price: purchase.price,
                sold_at: purchase.sold_at,
                quantity: purchase.quantity,
                product_id: purchase.product_id,

            }

            loadSomething(context, data).then(res => {
                console.log(res)
                context.commit('addToPurchases', res.purchase)
                context.commit('updateOneProduct', res.product)
                showSuccessNotification("Purchase created successfully.")
            }).catch(error => {
                showErrorNotification()
            });
        },

    },
    getters: {
        outOfStock: (state, getters) => {
            return state.products.filter(product => product.is_out_stock)
        },
        belowMinStock: (state, getters) => {
            return state.products.filter(product => product.is)
        },
        querySelections: (state) => (v) => {

            let prods = [];
            // Simulated ajax query
            prods = state.products.filter(e => {
                return (e.name || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
            })
            // console.log(prods)
            return prods


        },
        getSaleById: (state) => (id) => {
            let sales = state.sales.filter(sale => {
                return sale.id === id;
            })
            if (sales.length > 0) {
                return sales[0]
            } else {
                return null;
            }

        },
        getProductById: (state) => (id) => {
            let products = state.products.filter(product => {
                return product.id === id;
            })

            if (products.length > 0) {
                return products[0]
            } else {
                return null;
            }
        },

    }
})

export default store;
