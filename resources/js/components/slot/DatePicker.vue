<template>
    <form-col>
        <v-menu
            ref="menu1"
            v-model="showDate"
            :close-on-content-click="false"
            max-width="290px"
            min-width="290px"
            offset-y
            transition="scale-transition"
        >
            <template v-slot:activator="{ on, attrs }">
                <v-text-field

                    v-model="dateFormatted"
                    v-bind="attrs"
                    v-on="on"
                    hint="MM/DD/YYYY format"
                    label="Date"
                    persistent-hint
                    prepend-icon="mdi-calendar"
                    @blur="fields.commencement = parseDate(dateFormatted)"
                ></v-text-field>
            </template>
            <v-date-picker
                v-model="fields.commencement"
                :max="new Date().toISOString().substr(0, 10)"
                :min="this.$moment().subtract(4, 'months').toISOString().substr(0, 10)"
                no-title
                @input="showDate = false"
            ></v-date-picker>
        </v-menu>
    </form-col>
</template>

<script>
export default {
name: "DatePicker"
}
</script>

<style scoped>

</style>
