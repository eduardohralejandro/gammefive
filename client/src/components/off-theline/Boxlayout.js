import React, { Component, Fragment } from "react";
import "./boxlayout.scss";
import { ufoSpaceShips, heroHearts } from "./spaceElements";
import Particles from "particlesjs";
class Boxlayout extends Component {
  state = {
    shipHeroPosition: null,
    ufoPosition: 0,
    showHeroLaser: false,
    showLaserEnemy: false,
    heroLasers: [],
    ufoLaserPositions: [],
    heroHearts: heroHearts,
    initialUfoLasersPositions: [],
    initialHeroLaserPosition: [],
    ufoCrafts: ufoSpaceShips,
    ufoPositions: [],
    ufoLasers: []
  };

  positionsRef = React.createRef();
  laserPositions = React.createRef();

  componentDidMount() {
    //space particles for background animation
    Particles.init({
      selector: ".background",
      color: "white",
      speed: 2
    });

    window.addEventListener("keydown", this.moveObject);
    window.addEventListener("keydown", this.handleLaser);
    setTimeout(() => {
      this.enemyLaser();
    }, 4000);
  }

  UNSAFE_componentWillMount() {
    window.removeEventListener("keydown", this.moveObject);
    window.removeEventListener("keydown", this.handleLaser);
    clearTimeout(this.enemylaserTransition);
  }

  enemyLaser = () => {
    this.enemylaserTransition = () => {
      setTimeout(this.enemylaserTransition, 2000);

      setTimeout(() => {
        this.setState({
          initialUfoLasersPositions: []
        });
      }, 4000);

      // get the positions of the ufo, generate random initial position of the laser from the calculation of the left space of the ufocraft

      for (let i = 0; i < this.state.ufoPositions.length; i++) {
        let rand = this.state.ufoPositions[
          Math.floor(Math.random() * this.state.ufoPositions.length)
        ];

        if (typeof rand === "string") {
          return;
        } else {
          this.setState({
            ufoPosition: rand.current.getBoundingClientRect().x
          });
        }

        this.setState(prevState => ({
          initialUfoLasersPositions: [
            ...prevState.initialUfoLasersPositions,
            this.state.ufoPosition
          ]
        }));
      }

      const newEnemyLaser = "https://i.ibb.co/DRdfXB7/bichito-fire.png";
      this.setState({ ufoLasers: [newEnemyLaser] });
      this.setState({ showLaserEnemy: true });
      // every two senconds run this function to get the hero X Y positions & HEIGTH WIDTH to calculate the space between enemy lasers & spaceship from the hero
      window.cancelAnimationFrame(this.heroDamage);
    };

    this.heroDamage();
    this.enemylaserTransition();
  };

  heroDamage = () => {
    if (this.state.heroHearts.length !== 0) {
      window.requestAnimationFrame(this.heroDamage);

      const infoEnemyLaser = document.querySelectorAll(".enemy-laser");

      let newPositions = [];

      for (let i = 0; i < infoEnemyLaser.length; i++) {
        newPositions.push(infoEnemyLaser[i]);
      }
      window.cancelAnimationFrame(this.heroDamage);
      if (newPositions) {
        //    get the position of the animation X Y HEIGHT & WIDTH

        for (let i = 0; i < newPositions.length; i++) {
          const spaceheroPosition = this.positionsRef.current.getBoundingClientRect();

          const enemyLaserPositions = newPositions[i].getBoundingClientRect();

          if (newPositions.length > 0) {
            const heroCraft = {
              x: spaceheroPosition.x,
              y: spaceheroPosition.y,
              width: spaceheroPosition.width,
              height: spaceheroPosition.height
            };

            const invaderLasers = {
              x: enemyLaserPositions.x,
              y: enemyLaserPositions.y,
              width: enemyLaserPositions.width,
              height: enemyLaserPositions.height
            };

            // AABB Collision Detection or "Axis-Aligned Bounding Box"
            // to ensure specific area where there will be the collision between the laser and the space hero craft
            window.cancelAnimationFrame(this.heroDamage);

            if (
              heroCraft.x < invaderLasers.x + invaderLasers.width &&
              heroCraft.x + heroCraft.width > invaderLasers.x &&
              heroCraft.y < invaderLasers.y + invaderLasers.height &&
              heroCraft.y + heroCraft.height > invaderLasers.y
            ) {
              this.setState({ ufoLasers: [] });

              this.state.heroHearts.pop();
              this.setState({ heroHearts: this.state.heroHearts });

              if (this.state.heroHearts.length > 0) {
                const urlHeroHurt =
                  "http://k007.kiwi6.com/hotlink/bqbo6n66so/herohurtsound.wav";
                const stream = new Audio(urlHeroHurt);
                stream.play();
              } else {
                const urlGameOver =
                  "http://k007.kiwi6.com/hotlink/ymsv0owugn/gameoversound.wav";
                const stream = new Audio(urlGameOver);
                stream.play();
              }
            }
          } else {
            return;
          }
        }
      }
    }
  };

  moveObject = e => {
    switch (e.keyCode) {
      case 37:
        this.leftArrow();
        break;
      case 39:
        this.rightArrow();
        break;
      default:
    }
  };

  handleLaser = e => {
    if (e.keyCode === 32) {
      //add laser from their respective positions starting from the  hero spaceship
      this.setState(prevState => ({
        initialHeroLaserPosition: [
          ...prevState.initialHeroLaserPosition,
          this.state.shipHeroPosition
        ]
      }));

      const laserSound = "http://k007.kiwi6.com/hotlink/r45egjje5t/laser.wav";
      const stream = new Audio(laserSound);
      stream.play();

      this.setState({ showHeroLaser: true });

      const newLaser = "https://i.ibb.co/1RZgrw6/laser-1.png";

      this.setState(prevState => ({
        heroLasers: [newLaser]
      }));

      if (
        this.state.laserInfoPosition &&
        this.state.laserInfoPosition.length > 1
      ) {
        this.setState({ initialHeroLaserPosition: [] });
      }

      if (this.state.heroLasers.length > 1) {
        this.setState({
          initialHeroLaserPosition: [],
          heroLasers: []
        });
      }

      if (this.state.ufoCrafts.length === 0) {
        return;
      } else {
        this.getLaserTransitionPosition();
      }
    }
  };

  getLaserTransitionPosition = () => {
    if (this.state.ufoCrafts.length === 0) {
      return;
    } else {
      let newPositions = [];

      for (let i = 0; i < this.state.ufoPositions.length; i++) {
        newPositions.push(
          this.state.ufoPositions[i].current.getBoundingClientRect()
        );
      }

      const laserPositions = this.laserPositions.current;

      if (laserPositions) {
        //  get the position of the animation X Y HEIGHT & WIDTH
        window.requestAnimationFrame(this.getLaserTransitionPosition);

        for (let i = 0; i < newPositions.length; i++) {
          const laserInfoPosition = laserPositions.getBoundingClientRect();

          const ufoInfoPosition = newPositions[i];

          if (this.state.heroLasers.length === 0 || laserInfoPosition.y === 0) {
            window.cancelAnimationFrame(this.getLaserTransitionPosition);
          }

          for (let j = 0; j < this.state.heroLasers.length; j++) {
            if (newPositions.length > 0) {
              const heroLaser = {
                x: laserInfoPosition.x,
                y: laserInfoPosition.y,
                width: laserInfoPosition.width,
                height: laserInfoPosition.height
              };

              const invadersCrafts = {
                x: ufoInfoPosition.x,
                y: ufoInfoPosition.y,
                width: ufoInfoPosition.width,
                height: ufoInfoPosition.height
              };

              if (
                laserInfoPosition.y === 0 ||
                this.state.heroLasers.length > 2
              ) {
                this.setState({
                  initialHeroLaserPosition: [],
                  heroLasers: []
                });
              }
              // AABB Collision Detection or "Axis-Aligned Bounding Box"
              // to ensure specific area where there will be the collision between the laser and the invader crafts

              if (
                heroLaser.x < invadersCrafts.x + invadersCrafts.width &&
                heroLaser.x + heroLaser.width > invadersCrafts.x &&
                heroLaser.y < invadersCrafts.y + invadersCrafts.height &&
                heroLaser.y + heroLaser.height > invadersCrafts.y
              ) {
                const IndexUfoPosition = i;
                const IndexLaserPosition = j;

                this.setState({
                  ufoPositions: this.state.ufoCrafts.splice(
                    IndexUfoPosition,
                    1
                  ),
                  initialHeroLaserPosition: this.state.heroLasers.splice(
                    IndexLaserPosition,
                    1
                  )
                });

                if (
                  this.state.ufoCrafts.length === 0 &&
                  this.state.heroHearts.length !== 0
                ) {
                  const urlWinMusic =
                    "http://k007.kiwi6.com/hotlink/irroikam23/WINMUSIC.wav";

                  const stream = new Audio(urlWinMusic);
                  stream.play();
                } else {
                  const urlExplosionEnemy =
                    "http://k007.kiwi6.com/hotlink/wvrnb631f2/explosion.wav";

                  const stream = new Audio(urlExplosionEnemy);
                  stream.play();
                }
              }
            } else {
              return;
            }
          }
        }
      }
    }
  };

  leftArrow = () => {
    const object = this.positionsRef.current;
    //get a number from the string + pixel
    const objNumberValue = object.style.left.replace(/[^0-9.]+/g, "") | 0;
    //limits in the space for the hero spaceship

    if (objNumberValue < 105) {
      this.setState({ shipHeroPosition: 105 + "px" });
    } else {
      this.setState({
        shipHeroPosition: (object.style.left =
          parseInt(object.style.left) - 25 + "px")
      });
    }
  };

  rightArrow = () => {
    const object = this.positionsRef.current;
    //get a number from the string + pixel
    const objNumberValue = object.style.left.replace(/[^0-9.]+/g, "") | 0;
    //limits in the space for the hero spaceship
    if (objNumberValue > 1370) {
      this.setState({ shipHeroPosition: 1370 + "px" });
    } else {
      this.setState({
        shipHeroPosition: (object.style.left =
          parseInt(object.style.left) + 25 + "px")
      });
    }
  };

  playAgain = () => {
    window.location.reload();
  };

  render() {
    const {
      showLaserEnemy,
      ufoLasers,
      initialUfoLasersPositions,
      ufoLaserPositions,
      ufoCrafts,
      ufoPositions,
      showHeroLaser,
      heroLasers,
      initialHeroLaserPosition,
      heroHearts
    } = this.state;
    return (
      <Fragment>
        <canvas className="background" />
        <div className="canvas">
          {showLaserEnemy
            ? ufoLasers.map((laserElm, key) => {
                return (
                  <div key={key}>
                    {initialUfoLasersPositions.map((position, index) => {
                      ufoLaserPositions[index] = React.createRef();
                      const element = Math.floor(position);
                      element.toString();
                      return (
                        <div key={index}>
                          <img
                            ref={ufoLaserPositions[index]}
                            key={index}
                            className="enemy-laser"
                            alt="lasers"
                            style={{ left: `${element + "px"}` }}
                            id={index}
                            height="25"
                            width="6"
                            src={laserElm}
                            border="0"
                          />
                        </div>
                      );
                    })}
                  </div>
                );
              })
            : null}

          <div className="level-lines">
            {ufoCrafts.map((ufo, key) => {
              ufoPositions[key] = React.createRef();
              return (
                <div key={key} id="ufoParentDiv">
                  <div className="ufocrafts-box">
                    <img
                      className="ufo-crafts"
                      key={key}
                      id={key}
                      ref={ufoPositions[key]}
                      alt="ufo"
                      src={ufo}
                    />
                  </div>
                </div>
              );
            })}

            {showHeroLaser
              ? heroLasers.map((laserElm, key) => {
                  return (
                    <div key={key}>
                      {initialHeroLaserPosition.map(
                        (position, index, array) => {
                          return (
                            <img
                              key={index}
                              ref={this.laserPositions}
                              alt="lasers"
                              style={{
                                left: `${position}`,
                                right: "-3445px",
                                top: "-455px"
                              }}
                              id={index}
                              className="laser"
                              height="35"
                              width="10"
                              src={laserElm}
                              border="0"
                            />
                          );
                        }
                      )}
                    </div>
                  );
                })
              : null}
            <div className="space-hero">
              <img
                alt="space-hero"
                ref={this.positionsRef}
                src="https://i.ibb.co/s6vRkRD/spaceship.png"
                style={{ top: "355px", position: "absolute", left: "255px" }}
                height="55"
                width="55"
              />
            </div>
          </div>
        </div>

        <div className="hero-hearts">
          {heroHearts.map((hearts, key) => {
            return (
              <div key={key}>
                <img alt="hero-hearts" width="25" height="15" src={hearts} />
              </div>
            );
          })}
        </div>

        <div className="game-over-youwin">
          {heroHearts.length === 0 ? (
            <img alt="gameover" src="https://i.ibb.co/FHgmFSd/GAME-OVER.png" />
          ) : null}
          {ufoCrafts.length === 0 && heroHearts.length !== 0 ? (
            <img
              alt="win"
              className="you-win"
              src="https://i.ibb.co/ZKZjVZN/YOU-WIN.png"
            />
          ) : null}
          {ufoCrafts.length === 0 || heroHearts.length === 0 ? (
            <button className="play-again" onClick={() => this.playAgain()}>
              play again
            </button>
          ) : null}
        </div>
      </Fragment>
    );
  }
}

export default Boxlayout;
