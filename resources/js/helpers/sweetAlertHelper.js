
import Vue from 'vue'
function showNotification (message ='Product Updated successfully.', icon = 'success', position = 'top-end' ){
    Vue.swal({
        position: position,
        icon: icon,
        title: message,
        showConfirmButton: false,
        timer: 1500
    })
}


