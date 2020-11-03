<template>
    <v-data-table
        :headers="headers"
        :items="sales"
        sort-by="calories"
        class="elevation-1"
    >

        <template v-slot:top>
            <v-toolbar
                flat
            >
                <v-toolbar-title>All Sales</v-toolbar-title>
                <v-divider
                    class="mx-4"
                    inset
                    vertical
                ></v-divider>
                <v-spacer></v-spacer>
                <v-dialog
                    v-model="dialog"
                    max-width="500px"
                >
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            color="primary"
                            dark
                            class="mb-2"
                            v-bind="attrs"
                            v-on="on"
                        >
                            Record Sales
                        </v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                            <span class="headline">{{ formTitle }}</span>
                        </v-card-title>

                        <v-card-text>
                            <v-container>
                                <v-row>

                                    <v-col
                                        cols="12"
                                        sm="12"
                                        md="12"
                                    >
                                        <v-autocomplete
                                            class="amber"
                                            dark
                                            v-model="select"
                                            :items="products"
                                            :item-value="this"
                                            item-text="name"
                                            dense
                                            filled
                                            label="Select Product"
                                        ></v-autocomplete>
                                    </v-col>
                                    <v-col
                                        cols="12"
                                        sm="6"
                                        md="4"
                                    >
                                        <v-text-field
                                            readonly
                                            type="number"
                                            v-model.number="editedItem.price"
                                            label="Price"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col
                                        cols="12"
                                        sm="6"
                                        md="4"
                                    >
                                        <v-text-field
                                            type="number"
                                            v-model.number="editedItem.sold_at"
                                            label="Sold At"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col
                                        cols="12"
                                        sm="6"
                                        md="4"
                                    >
                                        <v-text-field
                                            type="number"
                                            v-model.number="editedItem.quantity"
                                            label="Quantity"
                                        ></v-text-field>
                                    </v-col>
                                    <v-input hidden v-model="editedItem.product_id"></v-input>
                                </v-row>
                            </v-container>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                color="blue darken-1"
                                text
                                @click="close"
                            >
                                Cancel
                            </v-btn>
                            <v-btn
                                color="blue darken-1"
                                text
                                @click="save"
                            >
                                Save
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>

                <v-dialog
                    v-model="showingDescription"
                    max-width="500px"
                >
                    <v-card>
                        <v-card-title>
                            <v-list>
                                <v-list-item><span class="headline">{{ activeItem.description }}</span></v-list-item>
                                <v-list-item><span class="headline">Date: {{activeItem.date}}</span></v-list-item>
                                <v-list-item><span class="headline">{{activeItem.fromNow}}</span></v-list-item>
                            </v-list>
                        </v-card-title>
                    </v-card>
                </v-dialog>

            </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">

            <v-icon
                small
                @click="deleteItem(item)"
            >
                mdi-delete
            </v-icon>
        </template>

        <template v-slot:item.product="{ item }">
            {{productName(item.product_id)}}
        </template>
        <template v-slot:item.description="{ item }">
            <v-btn
                class="mr-2"
                @click="showDescription(item)"
            >View</v-btn>


        </template>
        <template v-slot:no-data>
            <v-sheet class="m-5">
                <v-card-text>Oops No record</v-card-text>
                <v-btn

                    color="primary"
                    @click="initialize"
                >
                    Refresh
                </v-btn>
            </v-sheet>

        </template>

        <template v-slot:item.price="{item}">
            <v-sheet class="m-5">
                GHC {{item.price}}
            </v-sheet>

        </template>
    </v-data-table>
</template>

<script>
export default {
    name: "Sales",
    data: () => ({
        select:null,
        items:[],
        loading:false,
        activeItem:{
            description:""
        },
        dialog: false,
        showingDescription:false,
        headers: [
            { text: 'Product', value: 'product' },
            { text: 'Price', value: 'price' },
            { text: 'Sold At', value: 'sold_at',  },
            { text: 'Quantity', value: 'quantity' },
            { text: 'Description', value: 'description' },
            { text: 'Actions', value: 'actions', sortable: false },
        ],

        editedIndex: -1,
        editedItem: {
            price: 0,
            sold_at: 0,
            quantity: 0,
            product_id: 0,
        },
        defaultItem: {
            price: 0,
            sold_at: 0,
            quantity: 0,
            product_id: 0,
        },
    }),
    watch: {
        dialog (val) {
            val || this.close()
        },
        showingDescription (val) {
            val || this.close()
        },

        select(prod){
            let item = {
                price:prod.price,
                sold_at:prod.price,
                quantity:0,
                product_id:prod.id
            }
            this.editedItem = item;

        }
    },
    mounted () {
        // this.initialize()
    },
    methods:{
        showDescription(item){
            this.activeItem = item;
            this.showingDescription = true;
        },

        productName:function (id){
            return this.$store.getters.getProductById(id);
            // return this.$store.getters.getProductById(id).name;
        },
        initialize(){
            this.$store.dispatch('loadSales');
        },
        /*editItem (item) {

            // console.log(item)
            this.editedIndex = this.sales.indexOf(item)
            // this.select = item.product_id
            // console.log(item,"edit")
            //
            // this.editedItem = Object.assign({}, item)

            // this.editedItem = item.id;
            // this.items.push(item);
            this.select = item;

            this.dialog = true
        },*/

        deleteItem (item) {
            // const index = this.sales.indexOf(item)

            confirm('Are you sure you want to delete this item?') && this.$store.dispatch('deleteSale',item)
        },

        close () {
            this.dialog = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        save () {

            if (this.editedIndex > -1) {
                this.$store.dispatch('updateSale',this.editedItem);
                // Object.assign(this.sales[this.editedIndex], this.editedItem)
            } else {
                this.$store.dispatch('createSale',this.editedItem)
            }
            this.close()
        },
    },
    computed:{
        sales(){
            return this.$store.state.sales;
        },
        formTitle () {
            return this.editedIndex === -1 ? 'Record Sale' : 'Edit Sales'
        },
        products(){
            return this.$store.state.products;
        }
    },


}
</script>

<style scoped>

</style>
