<template>
    <v-data-table
        :headers="headers"
        :items="products"
        sort-by="calories"
        class="elevation-1"
    >

        <template v-slot:top>
            <v-toolbar
                flat
            >
                <v-toolbar-title>All Products</v-toolbar-title>
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
                            New Product
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
                                        <v-text-field
                                            v-model="editedItem.name"
                                            label="Product name"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col
                                        cols="12"
                                        sm="6"
                                        md="4"
                                    >
                                        <v-text-field
                                            type="number"
                                            v-model="editedItem.price"
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
                                            v-model.number="editedItem.in_stock"
                                            label="In Stock"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col
                                        cols="12"
                                        sm="6"
                                        md="4"
                                    >
                                        <v-text-field
                                            type="number"
                                            v-model.number="editedItem.min_stock"
                                            label="Minimum Stock"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col
                                        cols="12"
                                        sm="12"
                                        md="12"
                                    >
                                        <v-textarea
                                            v-model="editedItem.description"
                                            label="Description"
                                        ></v-textarea>
                                    </v-col>

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
                class="mr-2"
                @click="editItem(item)"
            >
                mdi-pencil
            </v-icon>
            <v-icon
                small
                @click="deleteItem(item)"
            >
                mdi-delete
            </v-icon>
        </template>
        <template v-slot:item.description="{ item }">
            <v-btn
                class="mr-2"
                @click="showDescription(item)"
            >View</v-btn>


        </template>
        <template v-slot:item.is_out_stock="{ item }">
            <v-chip
                :color="item.is_out_stock ? 'red' : 'green'"
                dark
            >
                {{ item.is_out_stock  ?   'Out of Stock' : 'In Stock'}}
            </v-chip>
        </template>
        <template v-slot:item.is_low_stock="{ item }">
            <v-chip
                :color="item.is_low_stock ?  'red':'green'"
                dark
            >
                {{ item.is_low_stock ?     'Low Stock':'In Stock' }}
            </v-chip>
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
    name: "Product",
    data: () => ({
        activeItem:{
            description:""
        },
        dialog: false,
        showingDescription:false,
        headers: [
            {
                text: 'Product Name',
                align: 'start',
                sortable: false,
                value: 'name',
            },
            { text: 'Price', value: 'price' },
            { text: 'In Stock', value: 'in_stock', align: "start" },
            { text: 'Min Stock', value: 'min_stock' },
            { text: 'Low Stock', value: 'is_low_stock' },
            { text: 'Out Of Stock', value: 'is_out_stock' },
            { text: 'Description', value: 'description', sortable: false },
            { text: 'Actions', value: 'actions', sortable: false },
        ],

        editedIndex: -1,
        editedItem: {
            name: '',
            price: 0,
            in_stock: 0,
            min_stock: 0,
            description: "",
            is_out_stock: false,
            is_low_stock: false,
            img_name: "",
        },
        defaultItem: {
            name: '',
            price: 0,
            in_stock: 0,
            min_stock: 0,
            description: "",
            is_out_stock: false,
            is_low_stock: false,
            img_name: "",
        },
    }),
    watch: {
        dialog (val) {
            val || this.close()
        },
        showingDescription (val) {
            val || this.close()
        },
    },
    mounted () {
        // this.initialize()
    },
    methods:{
        showDescription(item){
            this.activeItem = item;
            this.showingDescription = true;
        },
        initialize(){
             this.$store.dispatch('loadProducts');
        },
        editItem (item) {
            this.editedIndex = this.products.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem (item) {
            // const index = this.products.indexOf(item)

            confirm('Are you sure you want to delete this item?') && this.$store.dispatch('deleteProduct',item)
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
                this.$store.dispatch('updateProduct',this.editedItem);
                // Object.assign(this.products[this.editedIndex], this.editedItem)
            } else {
                this.$store.dispatch('createProduct',this.editedItem)
            }
            this.close()
        },
    },
    computed:{
        products(){
            return this.$store.state.products;
        },
        formTitle () {
            return this.editedIndex === -1 ? 'New Product' : 'Edit Product'
        },
    },



}
</script>

<style scoped>

</style>
