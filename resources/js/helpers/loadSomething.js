export function loadSomething (context,param) {
    let vm = context;
    return new Promise(function (resolve, reject) {

        /*alert("am loading something.");
        let data = {
            mode: "add-to-near-site",
            errorMessage:"",
            errorCode:"",
             url:"",

        }*/
        let problem = true;
        // vm.startLoading();
        axios.post(param.url,param)
            .then(response => {

                resolve(response.data);

            })
            .catch(error => {
                reject(error);
            });
    });
}
