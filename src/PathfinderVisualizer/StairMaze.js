export function getStairMaze(grid) {
    return getGrid(grid);
}

function getGrid(grid) {
    const nodes = [];
    let j = 0;
    for (let i = grid.length-1;i>=0; i--) {
       const root = grid[i];
       const node = root[j];
       node.isWall = true;
       nodes.push(node);
       j++;
    }
    j--;
    for (let i = 0;i<grid.length-1; i++) {
        const root = grid[i];
        const node = root[j];
        node.isWall = true;
        nodes.push(node);
        j++;
     }
    j--;
     for (let i = grid.length-2;i>=0; i--) {
        const root = grid[i];
        if(root.length-1>j){
        const node = root[j];
        node.isWall = true;
        nodes.push(node);
        j++;
        }
     }

    return nodes;
}