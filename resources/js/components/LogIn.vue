<template>
    <v-form v-model="valid" ref="form">
        <v-container class="pa-sm-6">
            <v-row>
                <v-col offset-md="3" md="6" >
                    <v-sheet  elevation="3" class="pa-10 teal darken-3 ">
                        <h2 class="text-center white--text mb-8" >LogIn</h2>
                        <v-row>
                            <v-col
                                cols="12"
                                md="12"
                            >
                                <v-text-field

                                    dark
                                    v-model="form.email"
                                    :rules="[rules.required, rules.email]"
                                    label="Email"
                                    required
                                    outlined
                                    @keyup.enter="login"
                                ></v-text-field>
                            </v-col>

                            <v-col
                                cols="12"
                                md="12"
                            >
                                <v-text-field
                                    @keyup.enter="login"

                                    dark
                                    type="password"
                                    :rules="[rules.required]"
                                    v-model="form.password"
                                    label="Password"
                                    outlined
                                ></v-text-field>
                            </v-col>

                            <v-btn :disabled="loading" class="mx-auto my-7 px-15 py-4"  @click="login">Login</v-btn>
                        </v-row>
                    </v-sheet>

                </v-col>
            </v-row>

        </v-container>
    </v-form>
</template>

<script>


export default {
    name: "LogIn",
    data: () => ({
        loading:false,
        valid: false,
        form:{
          email:"",
          password:""
        },
        rules: {
            required: value => !!value || 'Required.',
            counter: value => value.length <= 20 || 'Max 20 characters',
            email: value => {
                const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                return pattern.test(value) || 'Invalid e-mail.'
            },
        },
    }),
    methods:{
        login(){
            this.$refs.form.validate();
            if(this.valid){
                this.loading = true;
                this.$store.dispatch('login',this.form).then(res=>{
                    this.$store.dispatch('loadUser').then(res=>{
                        this.$store.commit('updateIsAuth',true);
                    })
                }).catch(reason => {
                    this.loading = false;
                    if (reason.response.status === 419){

                        this.$swal({
                            showCancelButton:true,
                            title:"This is the title",
                            text:"This is the text",
                            titleText:"This is the title text",
                            cancelButtonColor:"red",
                            confirmButtonColor:"Green",

                        }).then(result=>{
                            if (result.value){
                                this.$swal('Opps!',
                                    reason.response.data.message,

                                    'error').then(result=>{
                                    console.log("Results",result)
                                })
                            }

                        })


                    }
                    console.log("reason.response",reason.response)
                    console.log("reason.response.data",reason.response.data)
                    console.log("reason.response.data.message",reason.response.data.message)
                    this.$swal('Opps!',
                        reason.response.data.errors.email[0],
                        'error')
                })
            }

        }
    },
    mounted() {
        // if (this.$store.state.isAuth){
        //     this.$router.push("/")
        // }
    }

}
</script>

<style scoped>

</style>
