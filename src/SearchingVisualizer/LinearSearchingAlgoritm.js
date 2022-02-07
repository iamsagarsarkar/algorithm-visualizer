export function getLinearSearch(array,target) {
    const animation = [];
    let n = array.length;

    for(let i = 0;i<n;i++){
        if(array[i] === target){
            animation.push([i,1]);
             animation.push([i,1]);
             console.log(i);
            return animation;
        }
       animation.push([i,0]);
       animation.push([i,0]);
    }

    animation.push([-1,0]);
    return animation;
    
}