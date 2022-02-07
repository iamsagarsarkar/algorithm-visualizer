export function getSelectionSort(array) {
    let n = array.length;
    const animation = [];

    for(let i = 0;i<n-1;i++){
        let minIndex = i;
        for(let j = i+1;j<n;j++){
            if(array[j]<array[minIndex]){
                minIndex = j;
            }
        }
        animation.push([i,minIndex,array[i],array[minIndex]]);
        animation.push([i,minIndex,array[i],array[minIndex]]);
        swap(array,i,minIndex);
    }
    return animation;
}

function swap(array,i,j) {
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}