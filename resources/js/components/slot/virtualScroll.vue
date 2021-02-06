<template>
    <v-card
        class="mx-auto"
        max-width="900"
    >
        <v-card-title class="white--text orange darken-4">
            Showing Results for {{query}}

            <v-spacer></v-spacer>

            <!--                <v-btn
                                :color="$store.state.theme.primary"
                                class="text&#45;&#45;primary"
                                fab
                                small
                            >
                                <v-icon>mdi-plus</v-icon>
                            </v-btn>-->
        </v-card-title>


        <v-divider></v-divider>

        <v-virtual-scroll
            :items="searchStaffs"
            :item-height="90"
            height="600"
        >
            <template v-slot="{ item }">
                <v-list v-model="active" three-line>
                    <v-list-item-group
                        color="primary"
                    >
                        <v-list-item
                            :key="item.id"

                        >
                            <v-list-item-avatar>
                                <v-img :src="item.img_name ? item.image_url : '/img/dfa.png'"></v-img>
                            </v-list-item-avatar>

                            <v-list-item-content>
                                <v-list-item-title v-html="item.name"></v-list-item-title>
                                <!--                                        <v-list-item-subtitle
                                                                            v-html="getDepartmentName(item.department_id)"></v-list-item-subtitle>-->
                            </v-list-item-content>
                        </v-list-item>
                        <v-divider></v-divider>
                    </v-list-item-group>
                </v-list>
            </template>
        </v-virtual-scroll>
    </v-card>
</template>

<script>
export default {
name: "virtualScroll"
}
</script>

<style scoped>

</style>
