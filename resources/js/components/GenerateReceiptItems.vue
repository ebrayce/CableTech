<template>
    <v-container>
        <v-btn @click="print">Print</v-btn>
        <!--        <v-divider></v-divider>-->

        <v-row>
            <v-col>
                <v-text-field v-model="titles.items" placeholder="Title"></v-text-field>
            </v-col>
            <v-col>
                <v-text-field hint="850" :rules="[rules.price]" v-model.number="titles.labour" placeholder="Labour"></v-text-field>
            </v-col>
        </v-row>

        <v-form ref="form" v-model="isValid">
            <v-simple-table>
                <template v-slot:default>
                    <thead>
                    <tr>
                        <th class="text-left">
                            No.
                        </th>
                        <th class="text-left">
                            Products
                        </th>
                        <th class="text-left">
                            Quantity
                        </th>
                        <th class="text-left">
                            Unit Price
                        </th>
                        <th class="text-left">
                            Amount
                        </th>
                        <th class="text-left">
                            Action
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr
                        v-for="(item, index) in items"
                        :key="item.id"
                    >
                        <td>{{ index + 1 }}</td>
                        <td>{{ item.name }}</td>
                        <td>{{ item.quantity }}</td>
                        <td>{{ item.price }}</td>
                        <td>{{ item.price * item.quantity }}</td>
                        <td>
                            <v-icon @click="remove(index)">mdi-delete</v-icon>
                        </td>
                    </tr>
                    <tr>

                        <td colspan="2">
                            <v-text-field v-model="formD.name" :rules="[rules.required]"
                                          placeholder="Product Name"></v-text-field>
                        </td>
                        <td>
                            <v-text-field v-model.number="formD.quantity" :rules="[rules.required, rules.quantity]"
                                          placeholder="Quantity"></v-text-field>
                        </td>
                        <td>
                            <v-text-field v-model.number="formD.price" :rules="[rules.required, rules.price]"
                                          placeholder="Price"></v-text-field>
                        </td>
                        <td>{{ formD.price * formD.quantity }}</td>
                        <td>
                            <v-btn @click="addToItems">Add</v-btn>
                        </td>
                    </tr>
                    </tbody>
                </template>
            </v-simple-table>
        </v-form>


        <v-form ref="packageForm" v-model="isPackageFormValid" class="mt-15">
            <v-text-field v-model="titles.packages" placeholder="Title"></v-text-field>
            <v-simple-table>
                <template v-slot:default>
                    <thead>
                    <tr>
                        <th class="text-left">
                            No.
                        </th>
                        <th class="text-left">
                            Package
                        </th>
                        <th class="text-left">
                            Price
                        </th>
                        <th class="text-left">
                            Action
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr
                        v-for="(item, index) in packages"
                        :key="item.id"
                    >
                        <td>{{ index + 1 }}</td>
                        <td>{{ item.name }}</td>
                        <td>{{ item.price }}</td>
                        <td>
                            <v-icon @click="removeFromPackages(index)">mdi-delete</v-icon>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <v-text-field v-model="packageFormD.name" :rules="[rules.required]"
                                          placeholder="Package Name"></v-text-field>
                        </td>

                        <td>
                            <v-text-field v-model.number="packageFormD.price" :rules="[rules.required, rules.price]"
                                          placeholder="Price"></v-text-field>
                        </td>

                        <td>
                            <v-btn @click="addToPackages">Add</v-btn>
                        </td>
                    </tr>
                    </tbody>
                </template>
            </v-simple-table>
        </v-form>
    </v-container>
</template>

<script>
export default {
    name: "GenerateReceiptItems",

    data: () => {
        return {
            isValid: false,
            isPackageFormValid: false,
            items: [],
            packages: [],
            titles: {
                items: "",
                labour: null,
                packages: "Packages of Dstv"
            },
            formD: {
                name: null,
                price: null,
                quantity: null
            },
            packageFormD: {
                name: null,
                price: null,
            },
            rules: {
                required: value => !!value || 'Required.',
                price: value => value >= 0.01 || 'Invalid Price.',
                quantity: value => value >= 1 || 'Invalid Quantity',
            },
            defaultForm: {
                name: null,
                price: null,
                quantity: null
            },
            defaultPackageForm: {
                name: null,
                price: null,
            },
            counter: 1,
        }
    },
    methods: {
        addToItems() {
            this.$refs.form.validate()
            if (this.isValid) {
                let add = {
                    id: this.items.length + 1,
                }
                Object.assign(add, this.formD)
                this.items.push(add)
                this.clear();
            }

        },
        addToPackages() {
            this.$refs.packageForm.validate()
            if (this.isPackageFormValid) {
                let add = {
                    id: this.packages.length + 1,
                }
                Object.assign(add, this.packageFormD)
                this.packages.push(add)
                this.clearPackageForm();
            }
        },
        remove(index) {
            this.items.splice(index, 1)
        },
        removeFromPackages(index) {
            this.packages.splice(index, 1)
        },
        clear() {
            Object.assign(this.formD, this.defaultForm)
            this.$refs.form.reset();
            this.$refs.form.resetValidation();
        },
        clearPackageForm() {
            Object.assign(this.packageFormD, this.defaultPackageForm)
            this.$refs.packageForm.reset();
            this.$refs.packageForm.resetValidation();
        },

        print() {
            let d = {
                titles: this.titles,
                items: this.items,
                packages: this.packages
            }
            this.$emit("print", d)

        }
    }
}
</script>

<style scoped>

</style>
