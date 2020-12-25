<template>
    <v-app>

        <v-navigation-drawer
            v-if="isAuth"
            v-model="drawer"
            bottom
            app
        >
            <app-nav></app-nav>
            <template v-if="isAuth" v-slot:append>
                <div class="pa-2">
                    <v-btn block @click="logout">
                        Logout
                    </v-btn>
                </div>
            </template>
        </v-navigation-drawer>

        <v-app-bar app class="teal darken-4" dark>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

            <v-toolbar-title>{{ pageName }}</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn icon>
                <v-icon>mdi-magnify</v-icon>
            </v-btn>

            <v-btn icon>
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
        <v-main>

            <!-- Provides the application the proper gutter -->
            <v-container fluid>
                <!-- If using vue-router -->
                <router-view></router-view>
                <vue-progress-bar></vue-progress-bar>
            </v-container>

        </v-main>
        <v-footer
            absolute
            app
            class="font-weight-medium teal darken-2"
            dark
        >
            <v-col
                class="text-center"
                cols="12"
            >
                {{ new Date().getFullYear() }} — <strong class="text--black"><a href="https://www.facebook.com/brayce.ernest/" class="darken-4">Powered By
                Ernest Brayce</a></strong>
            </v-col>
        </v-footer>
    </v-app>

</template>

<script>
import {mapState} from 'vuex'

export default {
    name: "MainApp",
    data: () => ({
        drawer: null,
        expandOnHover: false,
        group: 1,
        mini: true,
    }),
    props: {
        pIsAuth: String,
        pUser: String
    },
    computed: {
        ...mapState(['isAuth']),
        isMobile() {
            return this.$vuetify.breakpoint.mobile;
        },
        isLoggedIn() {
            return this.$store.state.isAuth;
        },
        user() {
            return this.$store.state.user;
        },
        pageName() {
            return this.$route.name;
        }
    },
    methods: {
        logout() {
            this.$store.dispatch('logout')
        }
    },
    mounted() {
        let to = this.$router.currentRoute.fullPath;
        if (!!this.pUser) {

            this.$route.query.redirect = this.$router.currentRoute.name === "Login" ? "/":to;
            let obj = JSON.parse(this.pUser);
            this.$store.commit('updateUser', obj);
            this.$store.dispatch('loadData');
            this.$store.commit('updateIsAuth', !!this.pIsAuth)

        }else {
            if (this.$router.currentRoute.name !== "Login"){
                let to = this.$router.currentRoute.fullPath
                console.log(this.$route.fullPath)
                this.$router.push({
                    name:"Login",
                    query: {redirect:to}
                })
            }

        }
    },
    watch: {
        isAuth(val) {
            if (val) {
                let to = this.$route.query.redirect;
                this.$router.push(to || "/");
            } else {
                this.$router.push({name: "Login"})
            }
        }
    }

}
</script>

<style scoped>

</style>
