import React, { Component } from 'react';
import { getBinarySearch } from './BinarySearchAlgorithm';
import { getJumpSearch } from './JumpSearchAlgorithm';
import { getLinearSearch } from './LinearSearchingAlgoritm';

import './SearchingVisualizer.css'


let NUMBER_OF_ARRAY = 150;
let isSorted = false;
export default class SearchingVisualizer extends Component {


  constructor(props){
    super(props);
    this.state = {
      array: [],
      target: '',
      result: ''
    }
    
    this.targetChange = this.targetChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount(){
    this.resetArray();
  }
  resetArray(){
    isSorted = false;
    this.resetResult();
    const array = [];
    for(let i = 0;i<NUMBER_OF_ARRAY;i++){
      array.push(getRndInteger(10,600))
    }
    this.setState({array});
}

resetResult(){
  const result = '';
  this.setState({result});
}

 sortArray(){
   isSorted = true;
   this.resetResult();
  const array = [];
  for(let i = 0;i<NUMBER_OF_ARRAY;i++){
    array.push(getRndInteger(10,600))
  }
  array.sort((a,b) => a-b);

  this.setState({array});
}

handleChange(event){
  NUMBER_OF_ARRAY = 3+((event.target.value)*3);
  if(isSorted){
    this.sortArray();
  }else{
    this.resetArray();
  }
 
}

targetChange(event){
  const target = event.target.value;
  this.setState({target});
}


linearSearch(){
  this.resetResult();
  const tempArray = this.state.array.slice();
  const target = parseInt(this.state.target);
  const animation = getLinearSearch(tempArray,target);
  for(let i = 0;i<animation.length;i++){
    const arrayBars = document.getElementsByClassName('array-bar');
    const [index,isFind] = animation[i];
    if(index !== -1){
    
    const arrayBar = arrayBars[index].style;
    const changeColor = isFind === 0? 'red':'greenyellow'
    const color = i%2 === 0? changeColor:'aqua';

    setTimeout(()=>{
      arrayBar.backgroundColor = color;
      if(isFind === 1){
        const result = index;
        this.setState({result});
      }
     },i*10)
   }else{

    setTimeout(()=>{
      const result = "Could not find that value";
      this.setState({result});
     },i*10)
     
   } 
  }
}

binarySearch(){
if(isSorted){
  this.resetResult();
  const tempArray = this.state.array.slice();
  console.log(tempArray);
  const target = parseInt(this.state.target);
  const animation = getBinarySearch(tempArray,target);
  for(let i = 0;i<animation.length;i++){
    const arrayBars = document.getElementsByClassName('array-bar');
    const [index,isFind] = animation[i];
    if(index !== -1){
    
    const arrayBar = arrayBars[index].style;
    const changeColor = isFind === 0? 'red':'#64DD17'
    const color = i%2 === 0? changeColor:'aqua';

    setTimeout(()=>{
      arrayBar.backgroundColor = color;
      if(isFind === 1){
        const result = index;
        this.setState({result});
      }
     },i*10)
   }else{
    setTimeout(()=>{
      const result = "Could not find that value";
      this.setState({result});
     },i*10)
     
   } 
  }
}else{
  window.alert("For Binary Search Please Click Sort Array");
}
}



jumpSearch(){
  if(isSorted){
    this.resetResult();
    const tempArray = this.state.array.slice();
    console.log(tempArray);
    const target = parseInt(this.state.target);
    const animation = getJumpSearch(tempArray,target);
    for(let i = 0;i<animation.length;i++){
      const arrayBars = document.getElementsByClassName('array-bar');
      const [index,isFind] = animation[i];
      if(index !== -1){
      
      const arrayBar = arrayBars[index].style;
      const changeColor = isFind === 0? 'red':'#64DD17'
      const color = i%2 === 0? changeColor:'aqua';
  
      setTimeout(()=>{
        arrayBar.backgroundColor = color;
        if(isFind === 1){
          const result = index;
          this.setState({result});
        }
       },i*10)
     }else{
      setTimeout(()=>{
        const result = "Could not find that value";
        this.setState({result});
       },i*10)
       
     } 
    }
  }else{
    window.alert("For Jump Search Please Click Sort Array");
  }

}


  render() {

    const {array,target,result} = this.state;

    const arrayBarWidth = Math.floor(2000 / (array.length * 3));
    const width = `${arrayBarWidth}px`;
    const fontColor = arrayBarWidth > 8 ? "red" : "transparent";
    const arrayFontSize = arrayBarWidth > 100 ? 20: arrayBarWidth > 60 ? 16 : arrayBarWidth > 50 ?14 : arrayBarWidth > 40 ?12 : arrayBarWidth > 30 ?10 : arrayBarWidth > 20 ?8 : 4;
    const fontSize = `${arrayFontSize}px`;

    return <div className='searching-visualizer'>
        <div className='array-bars'>
            {array.map((value,index)=>(
              <div className='array-bar' key={index} 
              style={{
                width : width,
                backgroundColor: 'aqua',
                height: `${value}px`,
                fontSize: fontSize,
                color: fontColor,
              }}>
              {value}
              </div>
            ))}
             </div>
             <div className='searching-button'>
            <button onClick={()=> this.resetArray()}>Reset Array</button>
            <button onClick={()=> this.sortArray()}>Sort Array</button>
            <input className='sneek-bar' 
                type='range' max="100" min="0"
                onChange={this.handleChange}
            />

          <input 
          type="number" 
          placeholder='Enter Traget Value'
          required 
          value={target}
          onChange={this.targetChange}
          className='input-target'
        />

               <button onClick={()=> this.linearSearch()}>Linear Search</button>
               <button onClick={()=> this.binarySearch()}>Binary Search</button>
               <button onClick={()=> this.jumpSearch()}>Jump Search</button>
               <input 
          type="text" 
          placeholder='Result Index'
          required 
          value={result}
          readOnly
          className='input-target'
        />
              
            </div>
    </div>;
  }
}


function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

