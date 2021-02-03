<template>
    <v-container>
        <v-row>
            <v-col  offset="4" sm="4"><v-img src="/logo.jpeg"></v-img></v-col>
        </v-row>
    </v-container>
</template>

<script>
import GenerateReceiptItems from "./GenerateReceiptItems";

export default {
    name: "ReceiptBuilder",
    props:["data", "titles"]

}
</script>

<style scoped>

</style>
