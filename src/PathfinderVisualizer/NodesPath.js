export function getNodesPath(endNode) {
    const pathNodes = [];
    let currentNode = endNode;
     while(currentNode != null){
         pathNodes.push(currentNode);
         currentNode = currentNode.previousNode;
     }
     return pathNodes;
}