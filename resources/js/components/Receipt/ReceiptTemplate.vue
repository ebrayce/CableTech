<template>
    <v-container>
        <!--        Logo-->
        <v-row class="justify-center">
            <v-col cols="3">
                <img alt="" src="/logo.jpeg" width="100%">
            </v-col>
        </v-row>

        <!--        Items table-->

        <v-container class="mb-5">
            <div class="text-h5">{{ titles.items }}</div>

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
                        <td>{{ item.price | currency }}</td>
                        <td>{{ (item.price * item.quantity) | currency}}</td>
                    </tr>
                    <tr>
                        <td class="font-weight-medium">Labour</td>
                        <td></td>
                        <!--                        <td>{{items.length + 1}}</td>-->
                        <td></td>
                        <td></td>
                        <td class="">{{ titles.labour | currency }}</td>
                    </tr>
                    <tr>
                        <td class="font-weight-bold">Total</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td class="font-weight-bold">{{ total | currency }}</td>
                    </tr>


                    </tbody>
                </template>
            </v-simple-table>
        </v-container>


        <v-container v-if="packages.length > 0" class="mt-12">
            <div class="text-h5">{{ titles.packages }}</div>
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
                    </tr>
                    </thead>
                    <tbody>
                    <tr
                        v-for="(item, index) in packages"
                        :key="item.id"
                    >
                        <td>{{ index + 1 }}</td>
                        <td>{{ item.name }}</td>
                        <td>{{ item.price | currency }}</td>
                    </tr>


                    </tbody>
                </template>
            </v-simple-table>
        </v-container>

        <!--        Packages Table-->

    </v-container>
</template>

<script>
    export default {
        name: "ReceiptTemplate",
        props: ['items', 'titles', 'packages'],
        computed: {
            total() {
                let t = 0;
                this.items.forEach((item) => {
                    t += item.price * item.quantity
                })
                return t + this.titles.labour;
            }
        }
    }
</script>

<style scoped>

</style>
