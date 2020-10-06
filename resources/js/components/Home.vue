<template>
    <v-sheet>
        <v-row>
            <v-col
                col="12"
                sm="12"
                md="4"
                lg="4"
            >
                <v-card class="blue" dark>
                    <v-card-text class="text-h5">Number of Products</v-card-text>
                    <v-card-text class="text-h5">{{totalProducts}}</v-card-text>

                </v-card>
            </v-col>
            <v-col
                col="12"
                sm="12"
                md="4"
                lg="4"
            >
                <v-card class="green" dark>
                    <v-card-text class="text-h5">Below minimum Stock</v-card-text>
                    <v-card-text class="text-h5">{{belowMinStock}}</v-card-text>
                </v-card>

            </v-col>

            <v-col
                col="12"
                sm="12"
                md="4"
                lg="4"
            >
            <v-card class="red" dark>
                <v-card-text class="text-h5">Product Out Of Stock </v-card-text>
                <v-card-text class="text-h5 ">{{outOfStock}}</v-card-text>
            </v-card>

            </v-col>
        </v-row>

    </v-sheet>
</template>

<script>
export default {
    name: "Home",
    data() {
        return {}
    },
    computed: {
        overview() {
            return this.$store.state.overview;
        },

        totalProducts(){
            return this.$store.state.products.length;
        },
        belowMinStock(){
            let products = this.$store.state.products.filter((product)=>{
                return product.in_stock <= product.min_stock
            });
            return products.length;

        },
        outOfStock(){
            let products = this.$store.state.products.filter((product)=>{
                return product.in_stock <= 0
            });
            return products.length;

        },
    }

}
</script>

<style scoped>

</style>
