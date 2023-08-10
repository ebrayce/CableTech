let arr = [2,4,4,4,6,7,9,9]

function containsD (a) {
    let info = {};
    let containDuplicate = false;
    a.forEach(num => {
        if (!containDuplicate) {
            if (info[num]){
                containDuplicate =  true
            }
            info[num] = info[num] ? info[num] + 1 : 1;
        }
    })
    return containDuplicate
}

console.log(containsD(arr))
