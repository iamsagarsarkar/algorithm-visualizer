import React, { Component } from 'react';
import { getAStartAlgorithm } from './AStarAlogirthm';
import { getBreadthFirstSearch } from './BreadthFirstSearch';
import { getDepthFirstSearch } from './DepthFirstSearch';
import { getDijkstar } from './DijkstraAlgorithm';
import Node from './Node';
import { getNodesPath } from './NodesPath';
import './PathfinderVisualizer.css'
import { getRecursiveMaze } from './RecursiveMaze';
import { getStairMaze } from './StairMaze';


let START_NODE_ROW = 10;
let START_NODE_COL = 15;
let FINISH_NODE_ROW = 10;
let FINISH_NODE_COL = 35;
let isMouseClickStartNode = false;
let isMouseClickFinishNode = false;
export default class PathfinderVisualizer extends Component {


constructor(){
  super();
  this.state = {
    grid: [],
    algorithm:"Select Algorithm",
    maze:"Select Maze",
    isMousePressed :false,
  }
}

componentDidMount(){
  const grid = getGrid();
  this.setState({grid});
}

selectAlgorithm(value){
  const algorithm = value;
  this.setState({algorithm});
}

selectMaze(value){
  const maze = value;
  this.setState({maze});

  switch (maze) {
    case "Recursize Maze":
      this.recursiveMaze();
      break;
      case  "Stair Maze":
        this.stairMaze();
      break;
    default:
         this.resetMaze();
      break;
  }
}

visualize(){
  const {algorithm} = this.state;
 switch (algorithm) {
   case "Dijkstra's Algorithm":
        this.visualizeDijkstarAlgorithm();
          break;
     case "A* Search Algorithm":
         this.visualizeAStarAlgorithm()
     break;
     case "Breadth First Search":
       this.visualizeBFSAlgorithm();
     break;
     case  "Depth First Search":
       this.visualizeDFSAlgorithm();
     break;
   default:
    window.alert("Please Select any Algorithm");
     break ;
 }
}

clear(){
  const grid = getGrid();
  const algorithm = "Select Algorithm";
  const maze = "Select Maze";
  

  for (let i = 0; i < grid.length; i++) {
    const row = grid[i];
    for (let j = 0; j < row.length; j++) {
      const node = grid[i][j];
      if(node === grid[START_NODE_ROW][START_NODE_COL]){
        document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-start';
      }else if(node === grid[FINISH_NODE_ROW][FINISH_NODE_COL]){
        document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-finish';
      }else{
        node.isWall = false;
        document.getElementById(`node-${node.row}-${node.col}`).className = 'node';
      }
    }
    
  }
  this.setState({grid:grid,algorithm,maze});

}

handleMouseDown(row,col){
  const {grid} = this.state;
  if(grid[row][col].isStart){
    isMouseClickStartNode = true;
    const newGrid = getStartNode(grid,row,col);
    this.setState({grid:newGrid,isMousePressed: true});
  }else if(grid[row][col].isFinish){
    isMouseClickFinishNode = true;
    const newGrid = getEndNode(grid,row,col);
    this.setState({grid:newGrid,isMousePressed: true});
  }else{
    const newGrid = getWallGrid(grid,row,col);
    this.setState({grid:newGrid,isMousePressed: true});
  }
  
}

handleMouseEnter(row,col){
  const {grid} = this.state;
  if(this.state.isMousePressed){
    if(isMouseClickStartNode){
      const newGrid = getStartNode(grid,row,col);
      this.setState({grid:newGrid});
    }else if(isMouseClickFinishNode){
      const newGrid = getEndNode(grid,row,col);
      this.setState({grid:newGrid});
    }else{
      const newGrid = getWallGrid(grid,row,col);
      this.setState({grid:newGrid});
    }
   
  }
}

handleMouseUp(){
  isMouseClickStartNode = false;
  isMouseClickFinishNode = false;
  this.setState({isMousePressed: false});
}

 
visualizeDijkstarAlgorithm() {
  this.resetNode();
  const {grid} = this.state;
  const startNode = grid[START_NODE_ROW][START_NODE_COL];
  const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
  const visitedNodes = getDijkstar(grid,startNode,finishNode);
  const path = getNodesPath(finishNode);
  animateAlgorithm(visitedNodes,path);
}

visualizeAStarAlgorithm(){
  this.resetNode();
  const {grid} = this.state;
  const startNode = grid[START_NODE_ROW][START_NODE_COL];
  const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
  const visitedNodes = getAStartAlgorithm(grid,startNode,finishNode,FINISH_NODE_ROW,FINISH_NODE_COL);
  const path = getNodesPath(finishNode);
  animateAlgorithm(visitedNodes,path);
}

visualizeBFSAlgorithm(){
  this.resetNode();
  const {grid} = this.state;
  const startNode = grid[START_NODE_ROW][START_NODE_COL];
  const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
  const visitedNodes = getBreadthFirstSearch(grid,startNode,finishNode);
  const path = getNodesPath(finishNode);
  animateAlgorithm(visitedNodes,path);
}

visualizeDFSAlgorithm(){
  this.resetNode();
  const {grid} = this.state;
  const startNode = grid[START_NODE_ROW][START_NODE_COL];
  const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
  const visitedNodes = getDepthFirstSearch(grid,startNode,finishNode);
  const path = getNodesPath(finishNode);
  animateAlgorithm(visitedNodes,path);
}



resetNode(){
  const {grid} = this.state;
  for(const row of grid){
      for(const node of row){
        node.distance = Infinity;
        node.distanceToFinish = 0;
        node.previousNode = null;
        node.isVisited = false;
      }
  }
  this.setState({grid:grid});
}

resetMaze(){
  const {grid} = this.state;
  const startNode = grid[START_NODE_ROW][START_NODE_COL];
  const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
  for(const row of grid){
      for(const node of row){
        if(node !== startNode && node !== finishNode){
        node.isWall = false;
        document.getElementById(`node-${node.row}-${node.col}`).className = 'node';
        }
      }
  }
  this.setState({grid:grid});
}



recursiveMaze(){
  this.resetMaze();
  const {grid} = this.state;
  const startNode = grid[START_NODE_ROW][START_NODE_COL];
  const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
  const wallNodes = getRecursiveMaze(grid,startNode,finishNode);
  animateWall(wallNodes);
}

stairMaze(){
  this.resetMaze();
  const {grid} = this.state;
  const wallNodes = getStairMaze(grid);
  animateWall(wallNodes);
}


  render() {

   const {grid,algorithm,maze} = this.state;

    return <div className='PathfinderVisualizer'>
       <div className='grid'>
         {grid.map((row,rowIndex) =>{
           return(
             <div key={rowIndex} >
               {row.map((node,nodeIndex) =>{
                 const {row,col,isStart,isFinish,isVisted} = node;
                 return(
                   <Node key={nodeIndex} row= {row} col ={col} isStart={isStart} isFinish={isFinish} isVisted={isVisted} 
                       onMouseDown = {()=> this.handleMouseDown(row,col)}
                       onMouseEnter = {()=> this.handleMouseEnter(row,col)}
                       onMouseUp = {()=> this.handleMouseUp()}
                   />
                 )
               })}
             </div>
           );
         })}
       </div>

       <div className='pathfinder-button'>
       <div className='select-alogorithm'>
       <button className='select-alogorith-btn'>{algorithm}</button>
       <div className='select-alogorithm-content'>
            <button onClick={()=> this.selectAlgorithm("Dijkstra's Algorithm")}>Dijkstra's Algorithm</button>
            <button onClick={()=> this.selectAlgorithm("A* Search Algorithm")}>A* Search Algorithm</button>
            <button onClick={()=> this.selectAlgorithm("Breadth First Search")}>Breadth First Search</button>
            <button onClick={()=> this.selectAlgorithm("Depth First Search")}>Depth First Search</button>
       </div>
       </div>
      <div className='mazes'>
       <button className='maze-btn'>{maze}</button>
       <div className='maze-content'>
            <button onClick={()=> this.selectMaze("Select Maze")}>Remove Maze</button>
            <button onClick={()=> this.selectMaze("Recursize Maze")}>Recursize Maze</button>
            <button onClick={()=> this.selectMaze("Stair Maze")}>Stair Maze</button>
       </div>
       </div>

       <button className='visualize-btn'onClick={()=> this.visualize()} >Visualize</button>
       <button className='clear-btn'onClick={()=> this.clear()} >Clear</button>
      </div>
    </div>;
  }
}

function animateAlgorithm(visitedNodes,path) {
  for (let i = 0; i <= visitedNodes.length; i++) {
    if(i === visitedNodes.length){
        setTimeout(() => {
          animatePath(path);
        }, 10 * i);
    }else{
    const node = visitedNodes[i];
     setTimeout(()=>{
      document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-visited';
     },10*i);
    }
  }
}

function animatePath(path) {
  for (let i = 0; i < path.length; i++) {
    const node= path[i];
        setTimeout(()=>{
         document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-path'
        },i*10);
    
  }
}



function animateWall(path) {
  for (let i = 0; i < path.length; i++) {
    const node= path[i];
        setTimeout(()=>{
         document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-wall'
        },i*10);
    
  }
}

function getGrid() {

  START_NODE_ROW = 10;
  START_NODE_COL = 15;
  FINISH_NODE_ROW = 10;
  FINISH_NODE_COL = 35;
  isMouseClickStartNode = false;
  isMouseClickFinishNode = false;

  const grid = [];
  for(let i = 0;i<24;i++){
    const current = [];
    for(let j = 0;j<52;j++){
      current.push(createNode(i,j));
    }
    grid.push(current);
  }
  return grid;
}

function createNode(row,col) {
  return{
    row,col,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    distanceToFinish: 0,
    isVisited:false,
    isWall:false,
    previousNode:null,
  };
}

function getWallGrid(grid,row,col) {
 
  const node = grid[row][col];
  if (node.isStart ||node.isFinish) {
    return grid;
  } else if(node.isWall){
    node.isWall = false;
    document.getElementById(`node-${node.row}-${node.col}`).className = 'node';
  }else{
    node.isWall = true;
    document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-wall';
  }
  return grid;
}


function getStartNode(grid,row,col) {
  const node = grid[row][col];
  if(node.isFinish){
      return grid;
  }else{
  const previousStartNode = grid[START_NODE_ROW][START_NODE_COL];
  previousStartNode.isStart = false;
  document.getElementById(`node-${previousStartNode.row}-${previousStartNode.col}`).className = 'node';
  START_NODE_ROW = row;
  START_NODE_COL = col;
  node.isWall = false;
  node.isStart = true;
  document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-start';
  return grid;
  }
}

function getEndNode(grid,row,col) {
  const node = grid[row][col];
  if(node.isStart){
    return grid;
  }else{
  const previousEndNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
  previousEndNode.isFinish = false;
  document.getElementById(`node-${previousEndNode.row}-${previousEndNode.col}`).className = 'node';
  FINISH_NODE_ROW = row;
  FINISH_NODE_COL = col;
  node.isWall = false;
  node.isFinish = true;
  document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-finish';
  return grid;
  }
}






