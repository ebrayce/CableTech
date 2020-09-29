<template>
    <v-app>

        <v-navigation-drawer
            app
            v-model="drawer"
        >
            <app-nav></app-nav>
            <!--<template v-slot:append>
                <div class="pa-2">
                    <v-btn block @click="logout">
                        Logout
                    </v-btn>
                </div>
            </template>-->
        </v-navigation-drawer>

        <v-app-bar app class="amber">
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

            <v-toolbar-title>{{pageName}}</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn icon>
                <v-icon>mdi-magnify</v-icon>
            </v-btn>

            <v-btn icon >
                <v-icon>mdi-heart</v-icon>
            </v-btn>




            <!--<v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn

                        text
                        v-bind="attrs"
                        v-on="on"
                    >
                        Account
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item
                        link
                        to="/login"
                    >
                        <v-list-item-title>Log In</v-list-item-title>
                    </v-list-item>
                    <v-list-item
                        link
                        to="/register"
                    >
                        <v-list-item-title>Register</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>-->
        </v-app-bar>

        <!-- Sizes your content based upon application components -->
        <v-main >

            <!-- Provides the application the proper gutter -->
            <v-container fluid>
                <!-- If using vue-router -->
                <router-view></router-view>
            </v-container>

        </v-main>
        <v-footer
            dark
            app
            absolute
            class="font-weight-medium purple"
        >
            <v-col
                class="text-center"
                cols="12"
            >
                {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
            </v-col>
        </v-footer>
    </v-app>

</template>

<script>
import {loadSomething} from "../../helpers/loadSomething"
import { mapState } from 'vuex'
import vuetify from "../../helpers/vuetify";
import store from "../../store/VuexStore";
export default {
name: "MainApp",
    data: () => ({
        drawer: null,
        expandOnHover:false,
        group:1,
        mini:true,
    }),
    computed:{

        isMobile(){
            return this.$vuetify.breakpoint.mobile;
        },
        isLoggedIn(){
            return this.$store.state.isAuth;
        },
        user(){
            return this.$store.state.user;
        },
        pageName(){
            return this.$route.name;
        }
    },
    methods:{
        logout(){
            let vm = this;
            let data = {
                url:"/logout",
            }
            loadSomething(this,data).then(()=>{
                vm.$router.push('/login')
            })
        }
    },
    mounted() {

        this.$store.dispatch('loadData');
        // if(!this.$store.state.isAuth){
        //     // alert("here")
        //     this.$store.dispatch('login');
        // }
    }

}
</script>

<style scoped>

</style>
