import React, { useState, Component } from "react";
import "./boxlayout.scss";


class Boxlayout extends Component {
 
    state = {
        shipPosition:""  
    }
    
    positionsRef = React.createRef();
    boxSize = React.createRef()
  
        componentDidMount () {
            window.addEventListener('keydown', this.moveObject)
        }
        componentWillMount() {
     
            window.removeEventListener('keydown', this.moveObject);
        }
    
    moveObject = (evt) => {

        switch (evt.keyCode) {
            case 37:
                this.leftArrow();
                break;
            case 39:
                this.rightArrow();
                break;
            case 38:
                this.upArrow();
                break;
            case 40:
                this.downArrow();
                break;
        }
    }
   
    
    leftArrow = () => {
         
        const object = this.positionsRef.current
        const sizes = this.boxSize.current
        const width = sizes.offsetWidth;
        const height = sizes.offsetHeight;
         const bodyRect = document.body.getBoundingClientRect()
      
        //  elemRect = element.getBoundingClientRect()
        //  offset   = elemRect.top - bodyRect.top;
        console.log("width of the box",width)
        console.log("object style left",object.style.left)
         const w = window

  
            this.setState({ shipPosition: object.style.left = parseInt(object.style.left) - "5" + 'px' })
         
        
         

        }

         rightArrow = () => {
            const object = this.positionsRef.current
            object.style.left = parseInt(object.style.left) + 5 + 'px';

        }

         upArrow = () => {
            const object = this.positionsRef.current
             object.style.top = parseInt(object.style.top) - 5 + 'px';
             
        }

        downArrow= () => {
        const object = this.positionsRef.current
        object.style.top = parseInt(object.style.top) + 5 + 'px';
        }
 
    render() {
        return (
            <div>
                <div ref={this.boxSize} style={{position:'relative'}} className="level-lines">
                    <img ref={this.positionsRef}  id="image1" src="https://i.ibb.co/dWMWFht/spacecraft.png" style={{ position: "absolute", left: "0", top: "0" }} height="55" width="55" />
                </div>
               
                
                </div>
    )
}
                
}

export default Boxlayout;