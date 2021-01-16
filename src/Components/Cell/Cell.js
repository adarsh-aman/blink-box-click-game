import React from 'react';
import "./cell.scss";

class Cell extends React.Component {
    constructor(props) {
      super(props);
      
      this.state = {
        x: this.props.x,
        y: this.props.y,
      };
    } 

    getRandomNumber =()=>{
        return Math.floor(Math.random()*2)+1;
     }
   
    handleCellClick = (e) => {
        let score =0;
        let element = document.getElementsByClassName("highlighted");
        if(e.target.className.includes("highlighted")){
          score+=1;
        }
        else{
          score = score-1;
        }
        if(element.length > 0) { element[0].classList.remove("highlighted"); }
        document.getElementById(`cell-${this.getRandomNumber()}-${this.getRandomNumber()}`).classList.add("highlighted")
        this.props.parentCallback(score);
      };
    
    render() {
        const {x, y, randomValue} =this.props;
      return (
        <div id={ `cell-${x}-${y}` } className={`cell ${randomValue && randomValue.x == x && randomValue.y == y ? 'highlighted': ''}`} onClick={(e)=>{this.handleCellClick(e)}}>
        </div>
      );
    };
  };
  export default Cell;