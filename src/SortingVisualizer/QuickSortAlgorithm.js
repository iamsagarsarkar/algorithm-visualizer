export function getQuickSort(array) {
    let n = array.length;
    const animation = [];
    quickSort(array,0,n-1,animation);
    return animation;

}

function quickSort(array,low,high,animation) {
    if(low<high){
        let pivot = partition(array,low,high,animation);
        quickSort(array,low,pivot-1,animation);
        quickSort(array,pivot+1,high,animation);
    }
}

function partition(array,low,high,animation) {
    let pivot = array[low];
    let i = low;
    let j = high;

    while(i<j){
        while(array[i]<=pivot) i++;
        while(array[j]>pivot) j--;
        if(i<j){
            animation.push([i,j,array[i],array[j]]);
            animation.push([i,j,array[i],array[j]]);
            swap(array,i,j);
        }
    }

    animation.push([low,j,array[low],array[j]]);
    animation.push([low,j,array[low],array[j]]);
    swap(array,low,j);

     return j;
}


function swap(array,i,j) {
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}