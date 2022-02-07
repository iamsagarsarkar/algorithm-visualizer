export function getBreadthFirstSearch(grid,start,end) {
    const nodes = [start];
    const visitedNodes = [];

    while(nodes.length>0){
        const node = nodes.shift();
        if(!node.isWall && !node.isVisited){
            node.isVisited = true;
            visitedNodes.push(node);
            if(node === end) return visitedNodes;
            updateNeigbourNode(node,grid,nodes);

        }
    }
    return visitedNodes;
}

function updateNeigbourNode(node,grid,nodes) {
    const unvisitedNodes = unvisitedNeighbourNodes(node,grid);
    for(const unvisitedNode of unvisitedNodes){
        unvisitedNode.previousNode = node;
        nodes.push(unvisitedNode);
    }
}
 function unvisitedNeighbourNodes(node,grid) {
    const unvisitedNodes = [];
    const {row,col} = node;
    if(row>0) unvisitedNodes.push(grid[row-1][col]);
    if(row<grid.length-1) unvisitedNodes.push(grid[row+1][col]);
    if(col>0) unvisitedNodes.push(grid[row][col-1]);
    if(col<grid[row].length-1) unvisitedNodes.push(grid[row][col+1]);
    return unvisitedNodes.filter(unvisitedNode => !unvisitedNode.isVisited);
}