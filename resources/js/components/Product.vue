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
                            New Product
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
                                            <v-text-field
                                                :rules="[rules.required]"
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
                                                :rules="[rules.price]"
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
                                                :rules="[rules.inStock]"
                                                type="number"
                                                v-model.number="editedItem.in_stock"
                                                label="In Stock f"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col
                                            cols="12"
                                            sm="6"
                                            md="4"
                                        >
                                            <v-text-field
                                                :rules="[rules.minStock]"
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
                    v-model="showProductImages"
                    persistent
                >
                    <v-card>
                        <v-container >
                            <div v-if="addingImages" class="pa-12">
                                <v-file-input
                                    v-model="addingImageFiles"
                                    @change="addImages"
                                    accept="image/*"
                                    multiple
                                    label="Add Images"
                                    prepend-icon="mdi-camera"
                                ></v-file-input>

                                <div>
                                    <v-row dense>
                                        <v-col
                                            v-for="(image,index ) in addedImages"
                                            :key="index"
                                            cols="12"
                                            sm="6"
                                            md="4"
                                            lg="3"
                                        >
                                            <v-card>
                                                <v-img
                                                    :src="getUrl(image)"
                                                    class="white--text align-end"
                                                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                                                    height="200px"
                                                >
                                                    <!--                                                <v-card-title   v-text="card.title"></v-card-title>-->
                                                </v-img>

                                                <v-card-actions>
                                                    <v-spacer></v-spacer>


                                                    <v-tooltip bottom>
                                                        <template v-slot:activator="{ on, attrs }">
                                                            <v-btn
                                                                @click="removeImage(image)"
                                                                color="secondary"
                                                                dark
                                                                v-bind="attrs"
                                                                v-on="on"
                                                            >
                                                                <v-icon class="">mdi-delete</v-icon>
                                                            </v-btn>
                                                        </template>
                                                        <span>Remove Image</span>
                                                    </v-tooltip>
                                                    <!--<v-btn icon title="Remove Image">
                                                        <v-icon class="">mdi-delete</v-icon>
                                                    </v-btn>-->

                                                    <!--<v-btn icon>
                                                        <v-icon>mdi-share-variant</v-icon>
                                                    </v-btn>-->
                                                </v-card-actions>
                                            </v-card>
                                        </v-col>
                                    </v-row>
                                </div>


                            </div>

                            <div v-else-if="productImages.length === 0">
                                <v-sheet class="text-center pa-12">
                                    <h3>NO Images</h3>

                                    <v-btn @click="showAddingImages">Add Images</v-btn>
                                </v-sheet>
                            </div>

                            <v-row v-else dense>
                                <v-col
                                    v-for="image in productImages"
                                    :key="image.id"
                                    cols="12"
                                    sm="6"
                                    md="4"
                                    lg="3"
                                >
                                    <v-card>
                                        <v-img
                                            :src="image.thumbnail"
                                            class="white--text align-end"
                                            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                                            height="200px"
                                        >
<!--                                                <v-card-title   v-text="card.title"></v-card-title>-->

                                            <template v-slot:placeholder>
                                                <v-row
                                                    class="fill-height ma-0"
                                                    align="center"
                                                    justify="center"
                                                >
                                                    <v-progress-circular
                                                        indeterminate
                                                        color="grey lighten-5"
                                                    ></v-progress-circular>
                                                </v-row>
                                            </template>
                                        </v-img>
<!-- Uploading Image card -->
                                        <v-card-actions>
                                            <v-spacer></v-spacer>

                                            <v-btn icon @click="deleteProductImage(image.id)">
                                                <v-icon class="">mdi-delete</v-icon>
                                            </v-btn>

<!--                                            <v-btn icon>
                                                <v-icon>mdi-bookmark</v-icon>
                                            </v-btn>

                                            <v-btn icon>
                                                <v-icon>mdi-share-variant</v-icon>
                                            </v-btn>-->
                                        </v-card-actions>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-container>
                        <v-card-actions>

                            <v-btn
                                text
                                color="gray"
                                v-if="addingImages && addedImages.length>0"
                                @click="removeAllImages">
                                Clear all
                            </v-btn>

                            <v-spacer></v-spacer>

                            <v-btn v-if="addingImages && addedImages.length>0" color="green" text @click="uploadImages">
                                Upload Image
                            </v-btn>
<!--                            <v-btn @click="closeAddingImages">Cancel</v-btn>-->
                            <v-btn
                                v-if="!addingImages"
                                color="orange"
                                text
                                @click="showAddingImages"
                            >
                                Select Images

                            </v-btn>

                            <v-btn
                                color="orange"
                                text
                                @click="closeImages"
                            >
                                Close
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

        <template class="mdi-image" v-slot:item.images="{ item }">
            <v-btn @click="showImages(item)">
                <v-icon>mdi-image</v-icon>
            </v-btn>
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
        validForm:true,

        activeItem:{
            description:""
        },
        rules:{
            required: value => !!value || 'Required.',
            price: value => value > 0 || 'Invalid Price.',
            quantity: value => value >= 1 || 'Invalid Quantity',
            minStock: value => value >= 0 || 'Invalid Min Stock',
            inStock: value => value >= 0 || 'Invalid In Stock',

        },
        dialog: false,
        showingDescription:false,

        activeProductImages:[],
        showProductImages:false,
        productImages:[],

        addingImages:false,
        addingImageFiles:[],
        addedImages:[],


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
            { text: 'Images', value: 'images', sortable: false },
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
            // val || this.close()
        },
    },
    mounted () {
        this.$store.dispatch('loadData');
    },
    methods:{
        deleteProductImage(imageId){
            let productId = this.products[this.editedIndex].id
            let payload = {
                mode:"delete-image",
                product_id:productId,
                image_id:imageId,
                url:'/data',
            }

            this.$store.dispatch('removeProductImage', payload).then(()=>{
                this.$swal({
                    icon:'success',
                    position:'top-right',
                    title:"Successful",
                    showConfirmButton:false,
                    timer:1000
                })
            })
        },
        uploadImages(){
            let load = {}
            load.images = this.addedImages;

            load.productId = this.products[this.editedIndex].id;

            this.$store.dispatch('uploadProductImages', load).then(()=>{
                this.$swal({
                    icon:'success',
                    position:'top-right',
                    title:"Successful",
                    showConfirmButton:false,
                    timer:1000
                })
                this.removeAllImages();
                this.addingImages = false;

            })

        },
        removeImage(image){
            let index = this.addedImages.indexOf(image);
            this.addedImages.splice(index, 1)
        },
        removeAllImages(){
            this.addedImages = [];
        },
        getUrl(file){
            return URL.createObjectURL(file);
        },

        addImages(){

            //    Add the uploaded files to the addedImages variable
            this.addedImages = this.addedImages.concat(this.addingImageFiles);

            //    Empty the file input for more selections
            this.addingImageFiles = [];
        },

        showAddingImages(){
            this.addingImages = true;
        },
        closeAddingImages(){
            this.addingImages = false;
        },

        showImages(item){

            this.editedIndex = this.products.indexOf(item)

            this.productImages = item.images;

            // this.productImages = item.images;
            this.showProductImages = true;
        },
        closeImages(){
            this.showProductImages = false;
            this.productImages = [];
            this.addingImages = false;
        },

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
            this.$refs.form.reset();
            this.$refs.form.resetValidation();
        },

        save () {
            this.$refs.form.validate();
            if (this.validForm){
                if (this.editedIndex > -1) {
                    this.$store.dispatch('updateProduct',this.editedItem);
                    // Object.assign(this.products[this.editedIndex], this.editedItem)
                } else {
                    this.$store.dispatch('createProduct',this.editedItem)
                }
                this.close()
            }

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
