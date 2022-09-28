import React from 'react';
let rowSize = 10;
export class Squares extends  React.Component {
    constructor(props){
        super(props);
        this.state = {
            colorArray: new Array(rowSize * rowSize).fill('transparent'),
            colorArray2: new Array(rowSize * rowSize).fill('white'),
            numberOfSquares: rowSize * rowSize,
            myColor: 'black',
            fullBackground: 'white',
            myBackgroundColor: 'rgb(256,256,256)',
            myBorderRadius: '0%',
            grid: '1px dashed grey',
            gridButton: '2px dashed black',
        }
        this.handleClick = this.handleClick.bind(this)
        this.handleTouchMove = this.handleTouchMove.bind(this)
        this.handleChange = this.handleChange.bind(this);
        this.handlePrint = this.handlePrint.bind(this);
        this.handleColor = this.handleColor.bind(this)
        this.handleSize = this.handleSize.bind(this)
        this.handleToggle = this.handleToggle.bind(this)
        this.handleTipChange = this.handleTipChange.bind(this)
        this.handleBackground = this.handleBackground.bind(this);
        this.handleFullBackground = this.handleFullBackground.bind(this);
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
       if(zzz.className === 'square'){
         zzz.style.borderRadius = this.state.myBorderRadius;
         
       }
    }
    handleChange(changeMe){
        let colorArray = this.state.colorArray
        let colorArray2 = this.state.colorArray2
        colorArray[changeMe] = this.state.myColor;
        colorArray2[changeMe] = this.state.myBackgroundColor
        this.setState({
            colorArray: colorArray,
            colorArray2: colorArray2,
        })
    }
  
    handleColor(e){
        let newColor = e.target.value;
        this.setState({
            myColor: newColor 
        })
    }
    handleSize(e){
        let sizeArray = document.getElementsByClassName('sizing')
        for(let t = 0; t < sizeArray.length; t++){
            sizeArray[t].style.backgroundColor = 'white';
            sizeArray[t].style.color = 'black';
           
        }
        e.target.style.backgroundColor = 'black'
        e.target.style.color = 'white'
        let borderArray = document.getElementsByClassName('square')
        for ( let j = 0; j < borderArray.length; j++){
            let colorArray2 = this.state.colorArray2
            colorArray2[j] = 'white';
            borderArray[j].style.borderRadius = '0%';
            this.setState({
                colorArray2: colorArray2,
            })
           
        }
        document.getElementById('tipButton').style.borderRadius = '0%'
        let reSize = e.target.value;
        console.log(reSize)
        rowSize = reSize
        let total = reSize * reSize;
        //let numberOfSquares = this.state.numberOfSquares 
        //let colorArray = this.state.colorArray
        this.setState({
            numberOfSquares:  total,
            colorArray: new Array(total).fill('transparent'),
            colorArray2: new Array(total).fill(this.state.myBackgroundColor),
            
            grid: '1px dashed grey',
            myBorderRadius: '0%'
        })
        document.getElementById('tipButton2').style.opacity = '.3'
            document.getElementById('tipButton').style.opacity = '1'
       
    }
    handleToggle(){
        if(this.state.grid === '1px dashed grey'){
           
            this.setState({
                grid: 'none',
                gridButton: 'none',
            })
        } else {
            this.setState({
                grid: '1px dashed grey',
                gridButton: '2px dashed black'
            })
        }
       }
       handleTipChange(e){
        if( e.target.value === '0%'){
            this.setState({
                myBorderRadius: e.target.value,
            })
            
            
         
            document.getElementById('tipButton2').style.opacity = '.3'
            document.getElementById('tipButton').style.opacity = '1'
        } else {
            this.setState({
                myBorderRadius: e.target.value,
            })
            
            document.getElementById('tipButton2').style.opacity = '1'
            document.getElementById('tipButton').style.opacity = '.3'
           
        }
       
        
    }
    handleFullBackground(e){
        let background = e.target.value;
        let colorMe = document.getElementsByClassName('square2')
        for(let i = 0; i < colorMe.length; i++){
            colorMe[i].style.backgroundColor = e.target.value;
        }
        this.setState({
            myBackgroundColor: background,
        })
    }
    handleBackground(e) {
    
        let background = e.target.value;
        document.getElementById('backgroundButton').style.backgroundColor = background
        this.setState({
            myBackgroundColor: background,
        })
    }
    handlePrint(){
        document.getElementById('logs').style.display = 'flex'
        document.getElementById('logs').style.flexWrap = 'wrap'
        document.getElementById('logs').style.width = '300px'

        console.log(this.state.colorArray)
    }
    render() {
        return (
            <div>
                <div id='container' draggable="false">
             <div id='testCont'>   
                    <div onTouchMove={this.handleTouchMove} id="board" draggable="false">
                        
                        <Square gridToggle={this.state.grid} colorArray={this.state.colorArray} />
                    </div>
                    <div id='boardBack' onTouchMove={this.handleTouchMove}>
                        <Square2 gridToggle={this.state.grid}  colorArray2={this.state.colorArray2} />
                    </div>
             </div>       
                    <div id='controls'>
                        <div id="title">
                            <h1>RetroArtMuseum</h1>
                        </div>
                        <div className="colorContainer">
                            <h2>Color:</h2>
                            <input className="colorSelect" onChange={this.handleColor} type='color' ></input>
                        </div>  
                        <div className="colorContainer">
                            <h2 id="backgroundLabel">Background:</h2>
                            <input className="colorSelect" type='color' onChange={this.handleFullBackground}></input>
                        </div>  
                        <div id='gridSize'>
                        
                            <button style={{backgroundColor: 'black', color: 'white'}} className="sizing" onClick={this.handleSize}  value={10}><h3>10</h3><h3>x</h3><h3>10</h3></button>
                            <button className="sizing" onClick={this.handleSize}  value={20}><h3>20</h3><h3>x</h3><h3>20</h3></button>
                            <button className="sizing" onClick={this.handleSize}  value={30}><h3>30</h3><h3>x</h3><h3>30</h3></button>
                            <button className="sizing" onClick={this.handleSize}  value={40}><h3>40</h3><h3>x</h3><h3>40</h3></button>
                            <button className="sizing" onClick={this.handleSize}  value={50}><h3>50</h3><h3>x</h3><h3>50</h3></button>
                            </div>
                            <div className="colorContainer" style={{paddingBottom: '0px'}}>
                                <h2>Tip Shape:</h2>
                                <button id="tipButton" value='0%' style={{backgroundColor: this.state.myColor}} onClick={this.handleTipChange}></button>
                                <button id="tipButton2" value='50%' style={{backgroundColor: this.state.myColor, borderRadius: '50%'}} onClick={this.handleTipChange}></button>
                               
                              
                        </div>
                    <button id='gridToggle' style={{border: this.state.gridButton}} onClick={this.handleToggle}>Grid Toggle</button>
                    <button onClick={this.handlePrint}>Get Logs</button>
                    <div id='logs' style={{color: 'red', display: 'none'}}>{this.state.colorArray.join(',')}</div>
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
const Square2 = (props) => {
    let square2Array = [];
    for (let i = 0; i < props.colorArray2.length; i++){
        square2Array.push( <button value={i} className="square2" style={{backgroundColor: props.colorArray2[i], border: 'none', borderRadius: '0%'}}></button>)
    }
    return (
        [square2Array]
    )
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
    document.getElementById('boardBack').style.height = `${size}px`
    document.getElementById('boardBack').style.width = `${size}px`
    console.log(size2)
    if(size2 < 920){
        document.getElementById('controls').style.width = `200px`

    } else {
    document.getElementById('controls').style.width = `${size/2}px`
    }
    let sizeArray = document.getElementsByClassName('square')
    for (let j = 0; j < sizeArray.length; j++){
        sizeArray[j].style.width = `${size/rowSize}px`
        sizeArray[j].style.height = `${size/rowSize}px`
    }
    let sizeArray2 = document.getElementsByClassName('square2')
    for (let p = 0; p < sizeArray2.length; p++){
        sizeArray2[p].style.width = `${size/rowSize}px`
        sizeArray2[p].style.height = `${size/rowSize}px`
    }
    
}
