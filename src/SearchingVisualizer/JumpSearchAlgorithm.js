export function getJumpSearch(array,target) {
    const n = array.length;
    const animation = [];
    let found = jumpSearch(array,target,n,animation);
    if(found === -1){
        animation.push([-1,0]);
    }
    return animation;
}

function jumpSearch(array,target,n,animation) {
    let step = Math.sqrt(n);
    let prev = 0;
    while(array[Math.min(step,n)-1]<target){
        animation.push([prev,0]);
        animation.push([prev,0]);
        prev = step;
        step += Math.sqrt(n);
        if(prev>=n) return -1;
    }

    while(array[prev]<target){
        animation.push([prev,0]);
        animation.push([prev,0]);
        prev++;
        if(prev === Math.min(step,n)) return -1;
    }

    if(array[prev] === target){
        animation.push([prev,1]);
        animation.push([prev,1]);
        return prev;
    }
    return -1;
}