import React, { Component } from "react";
import "./boxlayout.scss";
import ufoSpaceShips from './ufoCrafts'
import Particles from 'particlesjs'
import { setTimeout, clearInterval } from "timers";
class Boxlayout extends Component {
    
  
    state = {
        shipPosition: null,
        ufoPosition:0,
        laser: false,
        showLaserEnemy:false,
        lasers: [],
        ufoLaserPositions:[],
        heroDamage: [1, 2, 3, 4],
        initialUfoLasersPositions:[],
        initialLaserPosition: [],
        ufoCrafts: ufoSpaceShips,
        ufoPositions: [],
        ufoLasers: []
    }
    
    positionsRef = React.createRef();
    laserPositions = React.createRef()
    
    componentDidMount() {
        const particles = Particles.init({
            selector: '.background',
            color: '#DA0463',
            speed:3
        });
        window.addEventListener('keydown', this.moveObject)
        window.addEventListener('keydown', this.handleLaser)
        this.enemyLaser()
        }

    UNSAFE_componentWillMount() {
        window.removeEventListener('keydown', this.moveObject);
        window.removeEventListener('keydown', this.handleLaser);
        clearInterval(this.enemylaserTransition)
    }

    enemyLaser = () => {
        // call this function to automatically have enemy lasers every 2 seconds
        this.enemylaserTransition = () => {
            setTimeout(this.enemylaserTransition, 2000);
         
            setTimeout(() => {
                this.setState({
                    initialUfoLasersPositions:[]
                })
        }, 4000)
           
     
            for(let i = 0; i < this.state.ufoPositions.length; i++) {
                
                const UFO = this.state.ufoPositions[i]
               
                    this.setState({
                        ufoPosition: UFO.current.getBoundingClientRect().x
                   })
          
                this.setState((prevState) => ({
                    initialUfoLasersPositions: [...prevState.initialUfoLasersPositions, this.state.ufoPosition]
                }))
                
            }
    
    
            const newEnemyLaser = "https://i.ibb.co/KGqLttB/laser.png"
            this.setState({ufoLasers: [newEnemyLaser]})
            this.setState({
                showLaserEnemy: true
            })
            // every two senconds run this function to get the hero X Y positions & HEIGTH WIDTH to calculate the space between enemy lasers & spaceship from the hero
            this.heroDamage()
        }
        
        this.enemylaserTransition();
    }

  
   
    

    heroDamage = () => {
    
        const infoEnemyLaser = document.querySelectorAll(".enemy-laser")

        try {

            let newPositions = []
          
            for (let i = 0; i < infoEnemyLaser.length; i++){
                newPositions.push(infoEnemyLaser[i])
            }
            
            if (this.positionsRef.current.getBoundingClientRect().x > 0) {
               
                //    get the position of the animation X Y HEIGHT & WIDTH
                window.requestAnimationFrame(this.heroDamage)

                for (let i = 0; i < newPositions.length; i++) {
                
                    const spaceheroPosition = this.positionsRef.current.getBoundingClientRect()
               
                    const  enemyLaserPositions = newPositions[i].getBoundingClientRect()
                   
                        window.cancelAnimationFrame(this.heroDamage)
                 
                        
                    if (newPositions.length > 0) {
                        
                     
                        const heroCraft = {
                            x: spaceheroPosition.x,
                            y: spaceheroPosition.y,
                            width: spaceheroPosition.width,
                            height: spaceheroPosition.height
                        }
                        

                        const invaderLasers = {
                            x: enemyLaserPositions.x,
                            y: enemyLaserPositions.y,
                            width: enemyLaserPositions.width,
                            height: enemyLaserPositions.height
                        }

                      
                        // AABB Collision Detection or "Axis-Aligned Bounding Box"
                        // to ensure specific area where there will be the collision between the laser and the space hero craft

                        if (heroCraft.x < invaderLasers.x + invaderLasers.width &&
                            heroCraft.x + heroCraft.width > invaderLasers.x &&
                            heroCraft.y < invaderLasers.y + invaderLasers.height &&
                            heroCraft.y + heroCraft.height > invaderLasers.y
                        ) {
                           
                            console.log('collisioooon')
                            const url = 'http://k007.kiwi6.com/hotlink/wvrnb631f2/explosion.wav'
                            
                            const stream = new Audio(url);
                            stream.play();

                
                        }
                    } else {
                        return;
                    }
                   
                }
            }
  
    } catch (e) {
     console.log(e)   
}

   
    }
    
    moveObject = (e) => {
        switch (e.keyCode) {
            case 25: 
                this.downArrow()
            case 37:
                this.leftArrow();
                break;
            case 39:
                this.rightArrow();
                break;
                default:
        }
    }
   
  
  
    handleLaser = async (e) => {
       
        if (e.keyCode === 32) {
            //add laser from their respective positions starting from the spaceship
            this.setState((prevState) => ({
                initialLaserPosition: [...prevState.initialLaserPosition, this.state.shipPosition]
                }))
            
            const laserSound = "http://k007.kiwi6.com/hotlink/r45egjje5t/laser.wav"
            const stream = new Audio(laserSound);
            stream.play();
        
            this.setState({ laser: true })

            const newLaser = "https://i.ibb.co/KGqLttB/laser.png"
                
            await this.setState((prevState) => ({
                lasers:[newLaser]
            }))

            if (this.state.laserInfoPosition && this.state.laserInfoPosition.length > 1 ) {
                this.setState({
                    initialLaserPosition: []
                })
            }
            this.getLaserTransitionPosition(e)
        }   
        
    }


    
    getLaserTransitionPosition = async (e) => {
       
        try {

                let newPositions = []
            
                for (let i = 0; i < this.state.ufoPositions.length; i++) {
                        newPositions.push(this.state.ufoPositions[i].current.getBoundingClientRect())
                }

                const laserPositions = this.laserPositions.current
                
                if (laserPositions) {
             
                    //    get the position of the animation X Y HEIGHT & WIDTH
                    window.requestAnimationFrame(this.getLaserTransitionPosition)

                    for (let i = 0; i < newPositions.length; i++) {
                     
                        const laserInfoPosition = laserPositions.getBoundingClientRect()
                       
                        const ufoInfoPosition = newPositions[i]

                        if (this.state.lasers.length === 0 || laserInfoPosition.y === 0) {
                          
                            window.cancelAnimationFrame(this.getLaserTransitionPosition)
                      
                        }
                        
             

                        for (let j = 0; j < this.state.lasers.length; j++){
                           
                        if (newPositions.length > 0) {
                            
                            
                            const heroLaser = {
                                x: laserInfoPosition.x,
                                y: laserInfoPosition.y,
                                width: laserInfoPosition.width,
                                height: laserInfoPosition.height
                            }
                            

                            const invadersCrafts = {
                                x: ufoInfoPosition.x,
                                y: ufoInfoPosition.y,
                                width: ufoInfoPosition.width,
                                height: ufoInfoPosition.height
                            }

                            if (laserInfoPosition.y === 0) {
                                this.setState({
                                    initialLaserPosition: []
                                })
                            }
                            // AABB Collision Detection or "Axis-Aligned Bounding Box"
                            // to ensure specific area where there will be the collision between the laser and the invader crafts

                            if (heroLaser.x < invadersCrafts.x + invadersCrafts.width &&
                                heroLaser.x + heroLaser.width > invadersCrafts.x &&
                                heroLaser.y < invadersCrafts.y + invadersCrafts.height &&
                                heroLaser.y + heroLaser.height > invadersCrafts.y
                            ) {

                                
                                const IndexUfoPosition = i
                                const IndexLaserPosition = j
    
                                this.setState({
                                    ufoPositions: this.state.ufoCrafts.splice(IndexUfoPosition, 1),
                                    initialLaserPosition: this.state.lasers.splice(IndexLaserPosition, 1),
                                 
                                })

                                const url = 'http://k007.kiwi6.com/hotlink/wvrnb631f2/explosion.wav'
                                
                                const stream = new Audio(url);
                                stream.play();
   
                    
                            }
                        } else {
                            return;
                        }
                        }
                    }
                }
      
        } catch (e) {
         console.log(e)   
}
      }
    
    leftArrow = () => {
      
        const object = this.positionsRef.current
        //get a number from the string + pixel
        const objNumberValue = object.style.left.replace(/[^0-9.]+/g, '') | 0

        if (objNumberValue < 105) {
            this.setState({shipPosition:105 + "px"})
        } else {
            this.setState({ shipPosition: object.style.left = parseInt(object.style.left) - 25 + 'px' })
        }

        }

    rightArrow = () => {
             
        const object = this.positionsRef.current   
        //get a number from the string + pixel
        const objNumberValue = object.style.left.replace(/[^0-9.]+/g, '') | 0
        //limits for the hero spaceship
             if (objNumberValue > 790) {
               this.setState({shipPosition:790 + "px"})
             } else {
                this.setState({ shipPosition: object.style.left = parseInt(object.style.left) + 25 + 'px' })
           }
        }
    downArrow = () => {
            
        const object = this.positionsRef.current
        const objNumberValue = object.style.top.replace(/[^0-9.]+/g, '') | 0

        if (objNumberValue === 324) {
            this.setState({shipPosition:null})
        } else {
            this.setState({shipPosition:object.style.top = parseInt(object.style.top) + 25 + 'px'})
        }
        }
 
    render() {
        
        return (
            <React.Fragment>
            <div className="big-box">
                {this.state.showLaserEnemy ? 
                        this.state.ufoLasers.map(laserElm => {
                            
                           
                            return (
                                <div>
                                    {this.state.initialUfoLasersPositions.map((position, index, array) => {
                                        this.state.ufoLaserPositions[index] = React.createRef()
                                        const element = Math.floor(position)
                                        element.toString()
                                        return (
                                            <img
                                            
                                            ref={ this.state.ufoLaserPositions[index]} 
                                            key={index}
                                            className="enemy-laser"
                                            alt="lasers"
                                            style={{ left: `${element + "px"}`, position:"absolute"} }
                                            id={index} height="35" width="35" src={laserElm} border="0" />
                                        )
                                      
                                    })}
                                    
                                </div>
                            ) 
                        })
                        :
                        null
                    }
               <canvas className="background"></canvas>
                <div  id="parentUfoDiv" style={{ position: 'relative' }} className="level-lines">
                    {this.state.ufoCrafts.map((ufo, key) => {
                        this.state.ufoPositions[key] = React.createRef()
                    return (
                        <div id="ufoParentDiv">
                            <div>
                                           
                            <img className="ufo-crafts" key={key} id={key} style={{ marginLeft: "54px", position: "relative", padding:"0px"}} ref={ this.state.ufoPositions[key]} alt="ufo"
                                height="35" width="25" src={ufo} />
                           
                           </div>   
                </div>   
               
                  )
                    })}
                
                
               
                    {this.state.laser ? 
                        this.state.lasers.map(laserElm => {
                    
                           
                            return (
                                <div>
                                    {this.state.initialLaserPosition.map((position, index, array) => {
                                        
                                        return (
                                            <img
                                            key={index}
                                            ref={this.laserPositions}
                                            alt="lasers"
                                            style={{ left: `${position}`,  top: "355px", right:"-3445px" }}
                                            id={index} className="laser" height="35" width="35" src={laserElm} border="0" />
                                        )
                                      
                                    })}
                                    
                                </div>
                            ) 
                        })
                        :
                        null
                    }
                    <img alt="space-hero" ref={this.positionsRef}  src="https://i.ibb.co/dWMWFht/spacecraft.png" style={{ top:"355px",position: "absolute", left: "0" }} height="55" width="55" />
                </div>
                <p style={{ color: "white" }}>{this.state.ufoCrafts.length}</p>
                <p style={{color:"white"}}>{this.state.ufoCrafts.length === 0 ? 'hey you won' : null}</p>
                 
                </div>

            </React.Fragment>
    )
}
                
}

export default Boxlayout;