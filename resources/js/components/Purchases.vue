<template>
    <v-data-table
        :headers="headers"
        :items="purchases"
        sort-by="calories"
        class="elevation-1"
    >

        <template v-slot:top>
            <v-toolbar
                flat
            >
                <v-toolbar-title>All Purchases</v-toolbar-title>
                <v-divider
                    class="mx-4"
                    inset
                    vertical
                ></v-divider>
                <v-spacer></v-spacer>
                <v-dialog
                    persistent
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
                            Record Purchases
                        </v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                            <span class="headline">{{ formTitle }}</span>
                        </v-card-title>

                        <v-card-text>
                            <v-container>
                                <v-form ref="form" v-model="validForm">
                                    <v-row>

                                        <v-col
                                            cols="12"
                                            sm="12"
                                            md="12"
                                        >
                                            <v-autocomplete
                                                :rules="[rules.required]"
                                                v-model="editedItem.product_id"
                                                :items="products"
                                                item-value="id"
                                                item-text="name"
                                                dense
                                                filled
                                                label="Select Product"
                                                @change="fillForm"
                                            ></v-autocomplete>
                                        </v-col>
                                        <v-col
                                            cols="12"
                                            sm="6"
                                            md="6"
                                        >
                                            <v-text-field
                                                :rules="[rules.price]"
                                                type="number"
                                                v-model.number="editedItem.price"
                                                label="Price"
                                            ></v-text-field>
                                        </v-col>

                                        <v-col
                                            cols="12"
                                            sm="6"
                                            md="6"
                                        >
                                            <v-text-field
                                                :rules="[rules.required,rules.quantity]"
                                                type="number"
                                                v-model.number="editedItem.quantity"
                                                label="Quantity"
                                            ></v-text-field>
                                        </v-col>

                                        <v-col
                                            cols="12"
                                            sm="12"
                                            md="12"

                                        >
                                            <v-textarea rows="2" v-model="editedItem.note" label="Note"></v-textarea>

                                        </v-col>
                                        <v-input hidden v-model="editedItem.product_id"></v-input>
                                    </v-row>
                                </v-form>

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
                        <v-list>
                            <v-list-item><span class="headline">Date: {{activeItem.date}}</span></v-list-item>
                            <v-list-item><span class="headline">{{activeItem.fromNow}}</span></v-list-item>
                            <hr>
                            <v-card-text class="text-body-1">
                                <h5>Note:</h5>
                                {{activeItem.note}}
                            </v-card-text>
                        </v-list>
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
    name: "Purchases",
    data: () => ({
        validForm:true,
        select:null,
        items:[],
        loading:false,
        activeItem:{
            description:""
        },
        rules:{
            required: value => !!value || 'Required.',
            price: value => value >= 1 || 'Invalid Price.',
            quantity: value => value >= 1 || 'Invalid Quantity',
        },
        dialog: false,
        showingDescription:false,
        headers: [
            { text: 'Product', value: 'product' },
            { text: 'Price', value: 'price' },
            { text: 'Quantity', value: 'quantity' },
            { text: 'Description', value: 'description' },
            { text: 'Actions', value: 'actions', sortable: false },
        ],

        editedIndex: -1,
        editedItem: {
            price: 0,
            quantity: 0,
            product_id: 0,
        },
        defaultItem: {
            price: 0,
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
        this.$store.dispatch('loadData');
    },
    methods:{
        showDescription(item){
            this.activeItem = item;
            this.showingDescription = true;
        },
        productName:function (id){
            return this.$store.getters.getProductById(id).name;
        },
        initialize(){
            // this.$store.dispatch('loadPurchases');
        },
        editItem (item) {

            // console.log(item)
            this.editedIndex = this.purchases.indexOf(item)
            // this.select = item.product_id
            // console.log(item,"edit")
            //
            // this.editedItem = Object.assign({}, item)

            // this.editedItem = item.id;
            // this.items.push(item);
            this.select = item;

            this.dialog = true
        },

        deleteItem (item) {
            confirm('Are you sure you want to delete this item?') && this.$store.dispatch('deletePurchase',item)
        },

        close () {
            this.dialog = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
            this.$refs.form.reset();
            this.$refs.form.resetValidation();
        },

        save () {

            this.$refs.form.validate();
            if (this.validForm){
                if (this.editedIndex > -1) {
                    this.$store.dispatch('updatePurchase',this.editedItem);
                    // Object.assign(this.purchases[this.editedIndex], this.editedItem)
                } else {
                    this.$store.dispatch('createPurchase',this.editedItem)
                }
                this.close()
            }

        },
        fillForm(val){
            if (this.editedIndex === -1){
                let product = this.products.find(prod=>{
                    return prod.id === val;
                })
                this.editedItem.price = product.price;
                this.editedItem.sold_at = product.price;

            }
        }
    },
    computed:{
        purchases(){
            return this.$store.state.purchases;
        },
        formTitle () {
            return this.editedIndex === -1 ? 'Record Purchase' : 'Edit Purchases'
        },
        products(){
            return this.$store.state.products;
        }
    },


}
</script>

<style scoped>

</style>
