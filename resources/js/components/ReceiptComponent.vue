<template>
    <v-container>
        <receipt-builder v-if="!isPrinting" @print="print"></receipt-builder>

        <receipt-template :items="items" :titles="titles" :packages="packages"> </receipt-template>

    </v-container>
</template>

<script>
import GenerateReceiptItems from "./GenerateReceiptItems";
import ReceiptTemplate from "./Receipt/ReceiptTemplate";


export default {
    name: "ReceiptComponent",
    components: {
        'receipt-builder': GenerateReceiptItems,
        'receipt-template': ReceiptTemplate
    },

    data: () => {
        return {
            isPrinting: false,
            items: [],
            packages: [],
            titles: {
                items: "",
                packages: ""
            }
        }
    },
    methods: {
        print(data) {
            console.log(data)
            Object.assign(this.titles, data.titles)
            this.packages = data.packages
            this.items = data.items
            this.$emit('print')
            this.isPrinting = true

            this.$nextTick(()=>{
                this.isPrinting = false
            })
        }
    },
}
</script>

<style scoped>

</style>
