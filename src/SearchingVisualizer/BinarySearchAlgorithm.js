export function getBinarySearch(array,target) {

    const animation = [];
    const n = array.length;
    let found = binarySearch(array,0,n-1,target,animation);
    if(found === -1){
        animation.push([-1,0]);
    }
    return animation;
    
}

function binarySearch(array,start,end,target,animation) {
    if(start<=end){
        let mid = start+Math.floor((end-start)/2);
        if(array[mid] === target){
            animation.push([mid,1]);
            animation.push([mid,1]);
            return mid;
        }

        if(array[mid]>target){
            animation.push([mid,0]);
            animation.push([mid,0]);
           return binarySearch(array,start,mid-1,target,animation);
        }else{
            animation.push([mid,0]);
            animation.push([mid,0]);
           return binarySearch(array,mid+1,end,target,animation);
        }
    }
    return -1;
}