<template>
    <v-col cols="12" sm="12" md="6" lg="6">
        <v-row>
            <v-col cols="12" sm="12"  md="8" offset-md="2" lg="8" offset-lg="2">
                <slot></slot>
            </v-col>
        </v-row>

    </v-col>

</template>

<script>
export default {
    name: "FormCol"
}
</script>

<style scoped>

</style>
