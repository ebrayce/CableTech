<template>
    <v-container>
        <receipt-builder v-if="!isPrinting" @print="print"></receipt-builder>
    </v-container>
</template>

<script>
import GenerateReceiptItems from "./GenerateReceiptItems";

export default {
    name: "ReceiptComponent",
    components: {
        'receipt-builder': GenerateReceiptItems,
    },
    props: {
        items: Array
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
            Object.assign(this.titles, data.titles)
            this.packages = data.packages
            this.items = data.items
            this.$emit('print')
            this.isPrinting = true
        }
    },
}
</script>

<style scoped>

</style>
