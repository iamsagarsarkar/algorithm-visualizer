
import React, { Component } from 'react';
import './PathfinderVisualizer.css'

export default class Node extends Component {
  render() {
 
    const {row,col,isStart,isFinish,isWall,onMouseDown,onMouseEnter,onMouseUp} = this.props;

    const nodeType = isFinish
    ? 'node-finish'
    : isStart
    ? 'node-start'
    : isWall
    ? 'node-wall'
    : '';

    return <div id={`node-${row}-${col}`} className={`node ${nodeType}`}
    onMouseDown = {() => onMouseDown(row,col)}
    onMouseEnter = {() => onMouseEnter(row,col)}
    onMouseUp ={()=> onMouseUp()}
    ></div>;
  }
}
