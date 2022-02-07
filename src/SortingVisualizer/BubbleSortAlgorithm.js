export function getBubbleSort(array) {
    const animation = [];
    let n = array.length;
    for(let i = 0;i<n-1;i++){
        for(let j = 0;j<n-i-1;j++){
            if(array[j]>array[j+1]){
                animation.push([j,j+1,array[j],array[j+1]]);
                animation.push([j,j+1,array[j],array[j+1]]);
                 swap(array,j,j+1);
            }
        }
    }

    return animation;
}

function swap(array,i,j) {
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}