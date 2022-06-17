import React from 'react';
let rowSize = 10;
export class Squares extends  React.Component {
    constructor(props){
        super(props);
        this.state = {
            colorArray: new Array(rowSize * rowSize).fill('blue'),
            numberOfSquares: rowSize * rowSize,
            myColor: 'black',
            grid: '1px dashed grey',
        }
        this.handleClick = this.handleClick.bind(this)
        this.handleTouchMove = this.handleTouchMove.bind(this)
        this.handleChange = this.handleChange.bind(this);
        this.handleColor = this.handleColor.bind(this)
        this.handleSize = this.handleSize.bind(this)
        this.handleToggle = this.handleToggle.bind(this)
    }
    handleClick(){
        let colorArray = this.state.colorArray
        colorArray[1] = 'green';
        this.setState({
            colorArray: colorArray
        })
    }
  
    handleTouchMove(e) {
        e.preventDefault()
        let ouch = e.changedTouches[0];
        let x;
        let y;
        x = ouch.clientX;
        y = ouch.clientY;
        let zzz = document.elementFromPoint(x,y);
        
        this.handleChange(zzz.value)
    }
    handleChange(changeMe){
        let colorArray = this.state.colorArray
        colorArray[changeMe] = this.state.myColor;
        this.setState({
            colorArray: colorArray,
        })
    }
    handleColor(e){
        let newColor = e.target.value;
        this.setState({
            myColor: newColor 
        })
    }
    handleSize(e){
        let reSize = e.target.value;
        console.log(reSize)
        rowSize = reSize
        let total = reSize * reSize;
        //let numberOfSquares = this.state.numberOfSquares 
        //let colorArray = this.state.colorArray
        this.setState({
            numberOfSquares:  total,
            colorArray: new Array(total).fill('white'),
            grid: '1px dashed grey',
        })
       
    }
    handleToggle(){
        if(this.state.grid === '1px dashed grey'){
            this.setState({
                grid: 'none',
            })
        } else {
            this.setState({
                grid: '1px dashed grey',
            })
        }
       }
    render() {
        return (
            <div>
                <div id='container' draggable="false">
                <div onTouchMove={this.handleTouchMove} id="board" draggable="false">
                <Square gridToggle={this.state.grid} colorArray={this.state.colorArray} />
                </div>
                <div id='controls'>
                    <div id="title">
                        <h1>RetroArtMuseum</h1>
                    </div>
                    <div id="colorContainer">
                        <h2>Color:</h2>
                        <input id="colorSelect" onChange={this.handleColor} type='color' ></input>
                    </div>  
                    <div id='gridSize'>
                        <h2>Grid Size:</h2>
                        <button onClick={this.handleSize}  value={10}><h3>10</h3><h3>x</h3><h3>10</h3></button><button onClick={this.handleSize}  value={20}><h3>20</h3><h3>x</h3><h3>20</h3></button><button onClick={this.handleSize}  value={30}><h3>30</h3><h3>x</h3><h3>30</h3></button><button onClick={this.handleSize}  value={40}><h3>40</h3><h3>x</h3><h3>40</h3></button><button onClick={this.handleSize}  value={50}><h3>50</h3><h3>x</h3><h3>50</h3></button></div>
                    <button id='gridToggle' style={{border: this.state.grid}} onClick={this.handleToggle}>Grid Toggle</button>
                    
                </div>
                </div>                
            </div>
        )
    }
    componentDidMount(){
        document.addEventListener('DOMContentLoaded', convertSize())
       window.addEventListener('resize', convertSize())
    }
    componentDidUpdate(){
        document.addEventListener('DOMContentLoaded', convertSize())
       window.addEventListener('resize', convertSize())
    }
}

const Square = (props) => {
   
    let squareArray = []
    for (let i = 0; i < props.colorArray.length; i++){
        squareArray.push( <button value={i} className="square" style={{backgroundColor: props.colorArray[i], border: props.gridToggle}}></button>)
    }
    return (
        [squareArray]
    )
}
function convertSize () {
    let size = window.innerHeight;
    let size2 = window.innerWidth;
    document.getElementById('board').style.height = `${size}px`
    document.getElementById('board').style.width = `${size}px`
    document.getElementById('controls').style.width = `${size2 - size}px`
    
    let sizeArray = document.getElementsByClassName('square')
    for (let j = 0; j < sizeArray.length; j++){
        sizeArray[j].style.width = `${size/rowSize}px`
        sizeArray[j].style.height = `${size/rowSize}px`
    }
}
