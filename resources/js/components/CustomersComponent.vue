<template>
    <v-container>
        <v-dialog v-model="showForm" persistent width="1000">
            <v-card>
                <v-card-title :class="$store.state.theme.primary" class=" white--text">
                    {{ editedIndex >= 0 ? "Update" : "Create" }} Customer
                </v-card-title>
                <v-card-text>
                    <v-form ref="depForm" v-model="isFormValid" @submit.prevent="">
                        <v-row>
                            <four-col>
                                <v-text-field
                                    v-model="form.name"
                                    :rules="[rules.required]"
                                    clearable
                                    label="Name"
                                >
                                </v-text-field>
                            </four-col>


                            <four-col>
                                <v-text-field
                                    v-model="form.phone"
                                    clearable
                                    label="Telephone"
                                >
                                </v-text-field>
                            </four-col>

                            <four-col>
                                <v-text-field
                                    v-model="form.location"
                                    clearable
                                    label="Location"
                                >
                                </v-text-field>
                            </four-col>

                            <four-col>
                                <v-text-field
                                    v-model="form.account_num"
                                    clearable
                                    label="Account Number"
                                >
                                </v-text-field>
                            </four-col>

                            <four-col>
                                <v-text-field
                                    v-model="form.amount_paid"
                                    clearable
                                    label="Amount Paid"
                                >
                                </v-text-field>
                            </four-col>

                            <four-col>
                                <v-menu
                                    v-model="menu1"
                                    :close-on-content-click="false"
                                    :nudge-right="40"
                                    min-width="290px"
                                    offset-y
                                    transition="scale-transition"

                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field
                                            v-model="form.expired_date"
                                            v-bind="attrs"
                                            v-on="on"
                                            label="Expired Date"
                                            prepend-inner-icon="mdi-calendar"
                                            readonly
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker
                                        v-model="form.expired_date"
                                        @input="menu1 = false"
                                    ></v-date-picker>
                                </v-menu>
                            </four-col>

                        </v-row>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-btn
                        v-if="editedIndex >= 0"
                        color="red darken-1"
                        text
                        @click="remove"
                    >
                        Delete
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="black darken-1"
                        text
                        @click="close"
                    >
                        close
                    </v-btn>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="save"
                    >
                        {{ editedIndex >= 0 ? "Update" : "Create" }}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-card
            :loading="loading"
            class="mx-auto"
            max-width="600"
        >
            <v-toolbar
                :color="$store.state.theme.primary"
                dark
            >
                <v-toolbar-title>Customer</v-toolbar-title>

                <v-spacer></v-spacer>

                <!--<v-btn icon>
                    <v-icon>mdi-magnify</v-icon>
                </v-btn>-->
                <v-text-field
                    v-model="search"
                    clearable
                    flat
                    hide-details
                    label="Search"
                    solo-inverted
                ></v-text-field>

                <v-btn icon @click="showForm=true">
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
            </v-toolbar>
            <v-data-iterator
                :items="customers"
                :search="search"
                item-key="id"

            >
                <template v-slot:default="{ items, isExpanded, expand }">
                    <v-list v-model="active" three-line>
                        <v-list-item-group
                            color="primary"
                        >
                            <template v-for="(item, index) in items">
                                <v-list-item
                                    :key="item.id"
                                    @click="edit(index, item.id)"
                                    three-line
                                >

                                    <v-list-item-content >
                                        <v-list-item-title v-html="item.name"></v-list-item-title>
                                        <v-list-item-title v-html="item.account_num"></v-list-item-title>
                                        <v-list-item-subtitle>{{item.expired_date}}</v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-divider></v-divider>
                            </template>
                        </v-list-item-group>
                    </v-list>
                </template>
            </v-data-iterator>


        </v-card>
    </v-container>
</template>

<script>
import {mapState} from "vuex";
import CustomToolbar from "../helpers/CustomToolbar";


export default {
    name: "CustomersComponent",
    data() {
        return {
            active: 1,
            menu1: false,
            menu2: false,
            loading: false,
            search: "",
            editedID: -1,
            editedIndex: -1,
            isFormValid: false,
            showForm: false,
            defaultForm: {
                name: "",
                phone: "",
                account_num: "",
                location: "",
                expired_date: "",
                amount_paid: "",
            },
            form: {
                image_url: '',
                name: "",
                phone: "",
                account_num: "",
                location: "",
                expired_date: "",
                amount_paid: "",
            },
            rules: {
                required: value => !!value || 'Required.',
                phone: value => /[0][2-5][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]$/.test(value) || 'The telephone number is not correct.',
                email: value => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    return pattern.test(value) || 'Invalid e-mail.'
                },
                image: value => !value || value.size < 2000000 || 'Image size should be less than 2 MB!',

            },
            customToolbar: CustomToolbar,

        }
    },
    computed: {
        ...mapState(['customers']),
        getUrl() {
            if (!!this.form.image) {
                return URL.createObjectURL(this.form.image);
            } else {
                if (this.form.img_name === null) {
                    return '/img/dfa.png';
                }
                return this.form.image_url;
            }
        },

    },
    methods: {

        edit(index, id) {
            this.editedID = id;
            this.editedIndex = index;
            let spItem = this.customers.find(item => {
                return item.id === id;
            })
            this.form = Object.assign({}, spItem);
            this.showForm = true;
        },
        save() {

            if (this.editedIndex >= 0) {
                //    Update
                this.$refs.depForm.validate()
                if (this.isFormValid) {
                    let pl = this.form;
                    pl.mode = "update-customer";
                    this.$store.dispatch('handleCustomer', pl).then(() => {
                        this.close();
                    })

                }

            } else {
                //    create
                this.$refs.depForm.validate()
                if (this.isFormValid) {

                    let pl = this.form;
                    pl.mode = "create-customer";
                    this.$store.dispatch('handleCustomer', pl).then(() => {
                        this.close();
                    }).catch(() => {
                        this.$swal({
                            icon: "error",
                            text: "There was a problem.",
                            timer: 2000,
                            position: "top-right",
                            showConfirmButton: false,
                        })
                    })

                }

            }

        },
        close() {
            this.showForm = false
            this.form = Object.assign({}, this.defaultForm)
            this.editedIndex = -1;
            this.$refs.depForm.resetValidation();

        },
        remove() {
            this.$swal({
                position: "center",
                icon: "warning",
                title: "Confirm Delete",
                text: "Are you sure you want to delete.",
                showConfirmButton: true,
                showCancelButton: true,
            }).then(result => {
                if (result.isConfirmed) {
                    this.$store.dispatch('deleteCustomer', {id: this.editedID})
                    this.close()
                }
            })

        },

        removeImage() {
            this.form.image = null;
        }
    },
    mounted() {
        this.loading = true;
        this.$store.dispatch('loadCustomers')

    }
}
</script>

<style scoped>

</style>

