import React, { Component } from 'react';
import { getBubbleSort } from './BubbleSortAlgorithm';
import { getInsertionSort } from './InsertionSortAlgorithm';
import { getMergeSort } from './MergeSortAlgoritm';
import { getQuickSort } from './QuickSortAlgorithm';
import { getSelectionSort } from './SelectionSortAlgorithm';
import './SortingVisualizer.css'





let NUMBER_OF_ARRAY = 150;
export default class SortingVisualizer extends Component {


  constructor(props){
    super(props);
    this.state = {
      array: [],
    }

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount(){
    this.resetArray();
  }

  handleChange(event){
     NUMBER_OF_ARRAY = 3+((event.target.value)*3);
     this.resetArray();
  }

  resetArray(){
       const array = [];
       for(let i = 0;i<NUMBER_OF_ARRAY;i++){
         array.push(getRndInteger(10,600))
       }
       this.setState({array});
  }



   bubbleSort(){
       const tempArray = this.state.array.slice();
        const animation = getBubbleSort(tempArray);
       for(let i = 0;i<animation.length;i++){
         const arrayBar = document.getElementsByClassName('array-bar');
         const [firstIndex,secondIndex,firstArray,secondArray] = animation[i];
         const firstBar = arrayBar[firstIndex];
         const secondBar = arrayBar[secondIndex];
         const firstBarStyle = arrayBar[firstIndex].style;
         const secondBarStyle = arrayBar[secondIndex].style;

         const color = i%2 === 0? 'red':'aqua';

        setTimeout(()=>{
          firstBarStyle.backgroundColor = color;
          secondBarStyle.backgroundColor = color;
          firstBar.innerHTML = secondArray;
          secondBar.innerHTML = firstArray;
          firstBarStyle.height = `${secondArray}px`;
          secondBarStyle.height = `${firstArray}px`;
         },i*2)
       }
  }

  insertionSort(){
    const tempArray = this.state.array.slice();
        const animation = getInsertionSort(tempArray);
       for(let i = 0;i<animation.length;i++){
         const arrayBar = document.getElementsByClassName('array-bar');
         const [firstIndex,secondIndex,firstArray,secondArray] = animation[i];
         const firstBar = arrayBar[firstIndex];
         const secondBar = arrayBar[secondIndex];
         const firstBarStyle = arrayBar[firstIndex].style;
         const secondBarStyle = arrayBar[secondIndex].style;


         const color = i%2 === 0? 'red':'aqua';

        setTimeout(()=>{
          firstBarStyle.backgroundColor = color;
          secondBarStyle.backgroundColor = color;
          firstBar.innerHTML = secondArray;
          secondBar.innerHTML = firstArray;
          firstBarStyle.height = `${secondArray}px`;
          secondBarStyle.height = `${firstArray}px`;
         },i*2)
       }
  }

  quickSort(){
    const tempArray = this.state.array.slice();
        const animation = getQuickSort(tempArray);
       for(let i = 0;i<animation.length;i++){
         const arrayBar = document.getElementsByClassName('array-bar');
         const [firstIndex,secondIndex,firstArray,secondArray] = animation[i];
         const firstBar = arrayBar[firstIndex];
         const secondBar = arrayBar[secondIndex];
         const firstBarStyle = arrayBar[firstIndex].style;
         const secondBarStyle = arrayBar[secondIndex].style;


         const color = i%2 === 0? 'red':'aqua';

        setTimeout(()=>{
          firstBarStyle.backgroundColor = color;
          secondBarStyle.backgroundColor = color;
          firstBar.innerHTML = secondArray;
          secondBar.innerHTML = firstArray;
          firstBarStyle.height = `${secondArray}px`;
          secondBarStyle.height = `${firstArray}px`;
         },i*2)
       }
  }


  mergeSort(){
    const tempArray = this.state.array.slice();
        const animation = getMergeSort(tempArray);

        console.log(animation);

       for(let i = 0;i<animation.length;i++){
         const arrayBar = document.getElementsByClassName('array-bar');
         const [firstIndex,secondIndex,changeIndex,changeArray] = animation[i];
         const changeBar = arrayBar[changeIndex];
         const firstBarStyle = arrayBar[firstIndex].style;
         const secondBarStyle = arrayBar[secondIndex].style;
         const changeBarStyle = arrayBar[changeIndex].style;

         const color = i%2 === 0? 'red':'aqua';
         const colorForChangeBar = i%2 === 0? 'greenyellow':'aqua';

        setTimeout(()=>{
          firstBarStyle.backgroundColor = color;
          secondBarStyle.backgroundColor = color;
          changeBarStyle.backgroundColor = colorForChangeBar;
          changeBarStyle.height = `${changeArray}px`;
          changeBar.innerHTML = changeArray;
         },i*2)
       }
  }

  

  selectionSort(){
    const tempArray = this.state.array.slice();
     const animation = getSelectionSort(tempArray);
    for(let i = 0;i<animation.length;i++){
      const arrayBar = document.getElementsByClassName('array-bar');
      const [firstIndex,secondIndex,firstArray,secondArray] = animation[i];
      const firstBar = arrayBar[firstIndex];
      const secondBar = arrayBar[secondIndex];
      const firstBarStyle = arrayBar[firstIndex].style;
      const secondBarStyle = arrayBar[secondIndex].style;


      const color = i%2 === 0? 'red':'aqua';

     setTimeout(()=>{
      firstBarStyle.backgroundColor = color;
          secondBarStyle.backgroundColor = color;
          firstBar.innerHTML = secondArray;
          secondBar.innerHTML = firstArray;
          firstBarStyle.height = `${secondArray}px`;
          secondBarStyle.height = `${firstArray}px`;
      },i*2)
    }
}

  render() {

      const {array} = this.state;
      
      const arrayBarWidth = Math.floor(2000 / (array.length * 3));
      const width = `${arrayBarWidth}px`;
      const fontColor = arrayBarWidth > 8 ? "red" : "transparent";
      const arrayFontSize = arrayBarWidth > 100 ? 20: arrayBarWidth > 60 ? 16 : arrayBarWidth > 50 ?14 : arrayBarWidth > 40 ?12 : arrayBarWidth > 30 ?10 : arrayBarWidth > 20 ?8 : 4;
      const fontSize = `${arrayFontSize}px`;
      

    return (
    <div className='sorting-visualizer'>
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
             <div className='sorting-button'>
            <button onClick={()=> this.resetArray()}>Reset Array</button>
            <input className='sneek-bar' 
                type='range' max="100" min="0"
                onChange={this.handleChange}
            />
            <button onClick={()=> this.bubbleSort()}>BubbleSort</button>
            <button onClick={()=> this.quickSort()}>QuickSort</button>
            <button onClick={()=> this.mergeSort()}>MergeSort</button>
            <button onClick={()=> this.selectionSort()}>SelectionSort</button>
            <button onClick={()=> this.insertionSort()}>InsertionSort</button>
            </div>
    </div>
    );
  }
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}
