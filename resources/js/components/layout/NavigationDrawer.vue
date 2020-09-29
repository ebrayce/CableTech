<template>
    <v-sheet>
        <v-list-item>
            <v-list-item-content>
                <v-list-item-title class="title">
                    Cable Tech
                </v-list-item-title>
                <v-list-item-subtitle>
                    Electronics
                </v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>

        <v-list>
            <v-list-item>
                <v-list-item-avatar>
                    <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                    <v-list-item-title>{{ $store.state.user.name }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item
                v-for="item in locations"
                :key="item.title"
                :link="true"
                :to="item.path"
            >
                <v-list-item-icon>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>{{ item.name }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>


    </v-sheet>

</template>

<script>
import locations from "../../router/navigations";
import {loadSomething} from "../../helpers/loadSomething";
export default {
    name: "NavigationDrawer",
    data(){
        return {
            locations,
            group:null,
        }
    },
    methods:{
        moveTo(path){
            this.$router.push(path)
        },

    }

}
</script>

<style scoped>

</style>
