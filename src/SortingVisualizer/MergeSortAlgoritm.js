export function getMergeSort(array) {

    const animation = [];
    let n = array.length;
    mergeSort(array,0,n-1,animation);
    return animation;
}

function mergeSort(array,start,end,animation) {
    if(start<end){
        let mid =start+ parseInt((end-start)/2);
        mergeSort(array,start,mid,animation);
        mergeSort(array,mid+1,end,animation);
        merge(array,start,mid,end,animation);
    }
}
function merge(array,start,mid,end,animation) {
    let i = start;
    let j = mid+1;
    let k = start;
    const tempArray = array.slice();
    while(i<=mid && j<=end){
        if(array[i]<array[j]){
            animation.push([i,j,k,array[i]]);
            animation.push([i,j,k,array[i]]);
          tempArray[k] = array[i];
          i++;
        }else{
            animation.push([i,j,k,array[j]]);
            animation.push([i,j,k,array[j]]);
            tempArray[k] = array[j];
          j++;
        }
        k++;
    }

    if(i>mid){
        while(j<=end){
            animation.push([j,j,k,array[j]]);
            animation.push([j,j,k,array[j]]);
            tempArray[k] = array[j];
            j++;
            k++;
        }
   }else{

    while(i<=mid){
        animation.push([i,i,k,array[i]]);
        animation.push([i,i,k,array[i]]);
        tempArray[k] = array[i];
        i++;
        k++;
    }
    }
    for(k = start;k<=end;k++){
        array[k] = tempArray[k];
    }
}

