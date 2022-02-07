export function getRecursiveMaze(grid,startNode,finishNode) {
    const nodes = [];
    addSorundingWall(grid,nodes,startNode,finishNode);
    addIneerWalls(grid,true,1,grid.length-2,1,grid[0].length-2,nodes,startNode,finishNode);
    return nodes;
}

function addSorundingWall(grid,nodes,startNode,finishNode) {
    for(let i = 0;i<grid.length;i++){
        if(i === 0 || i === (grid.length-1)){
            for(let j = 0;j<grid[i].length;j++){
                const node = grid[i][j];
                if(node !== startNode && node !== finishNode){
                node.isWall = true;
                nodes.push(node);
                }
            }
        }else{

            const node = grid[i][0];
            if(node !== startNode && node !== finishNode){
            node.isWall = true;
            nodes.push(node);
            }
            const nodeSecond = grid[i][grid[i].length - 1];
            if(nodeSecond !== startNode && nodeSecond !== finishNode){
            nodeSecond.isWall = true;
            nodes.push(nodeSecond);
            }
        }
    }
}

function addIneerWalls(grid,change,minRow,maxRow,minCol,maxCol,nodes,startNode,finishNode) {
    if(change){
        if (maxCol-minCol<2) {
            return;
        }
        let random = Math.floor(getRndInteger(minRow, maxRow)/2)*2;
        addColWall(minCol,maxCol,random,grid,nodes,startNode,finishNode);
        addIneerWalls(grid,!change,minRow,random-1,minCol,maxCol,nodes,startNode,finishNode);
        addIneerWalls(grid,!change,random+1,maxRow,minCol,maxCol,nodes,startNode,finishNode);
    }else{
        if (maxRow-minRow<2) {
            return;
        }
        let random = Math.floor(getRndInteger(minCol, maxCol)/2)*2;
        addRowWall(minRow,maxRow,random,grid,nodes,startNode,finishNode);
        addIneerWalls(grid,!change,minRow,maxRow,minCol,random-1,nodes,startNode,finishNode);
        addIneerWalls(grid,!change,minRow,maxRow,random+1,maxCol,nodes,startNode,finishNode);
    }
}

function addColWall(minCol, maxCol, random,grid,nodes,startNode,finishNode) {
    let hole = Math.floor(getRndInteger(minCol, maxCol)/2)*2+1;

    for (let i = minCol; i <= maxCol; i++) {
        if (i !== hole){
            const node = grid[random][i];
            if(node !== startNode && node !== finishNode){
            node.isWall = true;
            nodes.push(node);
            }
        }
    }
}

function addRowWall(minRow, maxRow, random,grid,nodes,startNode,finishNode) {
    let hole = Math.floor(getRndInteger(minRow, maxRow)/2)*2+1;

    for (let i = minRow; i <=  maxRow; i++) {
        if (i !== hole){
            const node = grid[i][random];
            if(node !== startNode && node !== finishNode){
            node.isWall = true;
            nodes.push(node);
            }
        }
    }
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }