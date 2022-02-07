export function getDijkstar(grid,start,end) {
    start.distance = 0;
    const nodes = getNodes(grid);
    const visitedNodes = [];
    while(nodes.length>0){
      shortNodesByDistance(nodes);
      const node = nodes.shift();
      if(!node.isWall){
          if(node.distance === Infinity) return visitedNodes;
          node.isVisited = true;
          visitedNodes.push(node);
          if(node === end) return visitedNodes;
          updateNeigbourNode(node,grid);
      }
    }
}
function updateNeigbourNode(node,grid) {
    const unvisitedNodes = unvisitedNeighbourNodes(node,grid);
    for(const unvisitedNode of unvisitedNodes){
        unvisitedNode.distance = node.distance+1;
        unvisitedNode.previousNode = node;
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
function getNodes(grid) {
    const nodes = [];
    for(const row of grid){
        for(const node of row){
            nodes.push(node);
        }
    }
    return nodes;
}

function shortNodesByDistance(nodes) {
    nodes.sort((a,b)=> a.distance-b.distance);
}