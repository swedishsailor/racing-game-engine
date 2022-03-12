/*
Racing game in JavaScript
Part 16
*/

/*jshint esversion: 6 */

// Whole-script strict mode syntax
//"use strict";
//console.log("Strict mode is on!");

/**
 * WebSocket connection
 * It will be in another file soon (probably)
 */
const socket = io("http://localhost:8082");


socket.on("open", ()=>console.log("%c You are connected to the server", 'color: #bada55'))
socket.on("init", handleInit)

function handleInit(msg){
    console.log(msg);
}

/**
 * The Game
 */
// required canvas variables (using ctx instead of canvasContext)
var canvas;
var ctx;

function carClass() {
  
    // constants for car direction
    const CAR_START_NORTH = -90;
    const CAR_START_SOUTH = 90;
    const CAR_START_EAST = 0;
    const CAR_START_WEST = 180;

    // create constants for the car directions
    const ROAD_FRICTION = 0.98;
    const FORWARD_RATE = 0.2;
    const REVERSE_RATE = 0.2;
    const TURNING_RATE = 0.05;
    const MINIMUM_SPEED_TO_TURN = 0.4;
    
    // car image, name, x & y position, angle, and speed variables
    this.carImage = undefined;   // Don't assign nothing, use undefined going forward.
    this.name = "unNamed";
    this.car_x_position = 50;
    this.car_y_position = 50;
    this.carAngle = 0;
    this.car_speed = 0;
    
    // keyHeldDown variables with booleans
    this.keyHeldDown_Forward = false;
    this.keyHeldDown_Reverse = false;
    this.keyHeldDown_Right = false;
    this.keyHeldDown_Left = false;
    
    // create generic control keys properties that we can assign specific keys to at set up.
    this.controlKeyForward = undefined;
    this.controlKeyReverse = undefined;
    this.controlKeyRight = undefined;
    this.controlKeyLeft = undefined;
        
    // this setup function will assign different keyboard keys to each car
    this.setKeyboardKeys = function(forward, reverse, right, left) {
        this.controlKeyForward = forward;
        this.controlKeyReverse = reverse;
        this.controlKeyRight = right;
        this.controlKeyLeft = left;
    };
    
    // function to reset the car at start
    this.resetCar = function(whichImage, playerName) {
        this.carImage = whichImage;
        this.name = playerName;
        this.car_speed = 0;
        console.log("No " + playerName + " starting point found!");
    };
    
    // calculates next car position on setInterval cycle.
    this.calculateNextCarPosition = function() {
        // slow the car as it coasts to approximate friction
        this.car_speed *= ROAD_FRICTION;
    
        if(this.keyHeldDown_Forward) {
            this.car_speed += FORWARD_RATE;
        }
        if(this.keyHeldDown_Reverse) {
            this.car_speed -= REVERSE_RATE;
        }
        if(Math.abs(this.car_speed) > MINIMUM_SPEED_TO_TURN) {
            if(this.keyHeldDown_Right) {
                this.carAngle += TURNING_RATE;
            }
            if(this.keyHeldDown_Left) {
                this.carAngle -= TURNING_RATE;
            }
        }
        this.car_x_position += Math.cos(this.carAngle) * this.car_speed;
        this.car_y_position += Math.sin(this.carAngle) * this.car_speed;
      
    };
    
    // call the function with needed arguments for car placement and rotation
    this.drawCar = function() {
        makeCenteredImageRotate(this.carImage, this.car_x_position, this.car_y_position, this.carAngle);
    };
}  // END OF CAR CLASS

// Car image variables
var carImage1 = document.createElement("img");
var carImage2 = document.createElement("img");
               
// arrow key codes as constants
const ARROW_KEY_UP = 38;
const ARROW_KEY_DOWN = 40;
const ARROW_KEY_RIGHT = 39;
const ARROW_KEY_LEFT = 37;
const W_KEY_UP = 87;
const S_KEY_DOWN = 83;
const D_KEY_RIGHT = 68;
const A_KEY_LEFT = 65;

// function to actually set up control keys for each car
function carControlKeySetup(keyEvent, whichCar, bindToThisKey) {
    if(keyEvent.keyCode === whichCar.controlKeyForward) {
        whichCar.keyHeldDown_Forward = bindToThisKey;
    }
    if(keyEvent.keyCode === whichCar.controlKeyReverse) {
        whichCar.keyHeldDown_Reverse = bindToThisKey;
    }
    if(keyEvent.keyCode === whichCar.controlKeyRight) {
        whichCar.keyHeldDown_Right = bindToThisKey;
    }
    if(keyEvent.keyCode === whichCar.controlKeyLeft) {
        whichCar.keyHeldDown_Left = bindToThisKey;
    }
}

// function runs when we press and hold a key down
function keyIsPressed(keyEvent) {
    //console.log("Key Pressed: " + keyEvent.keyCode);
    carControlKeySetup(keyEvent, player1, true);
    carControlKeySetup(keyEvent, player2, true);
    
    //cancels event from occuring more than the first time, when key held down
    keyEvent.preventDefault();
}

// function runs when we release a key that was held down
function keyIsLetUp(keyEvent) {
    //console.log("Key Released: " + keyEvent.keyCode);
    carControlKeySetup(keyEvent, player1, false);
    carControlKeySetup(keyEvent, player2, false);
}

// function to load initial map level and cars
function loadStartMapLevel() {
    //console.log("current map is: " + mapList[currentLevelMapNumber]);
    player1.resetCar(carImage1, "Lightning Bolt");
    player2.resetCar(carImage2, "Max Verstappen");
}

// function which will load the map level and cars
// A list array of custom bitmap image object literals
var bitmapImageList =
    [ {varName: carImage1, imageSource: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1086855/car1_30x16.png"},
      {varName: carImage2, imageSource: "f1.png"},
    ];

// function which handles loading of all graphic images in a list
function loadAllBitmapGraphics(bitmapList) {
    for(var i = 0; i < bitmapList.length; i++) {
        // varName property is used for car images, logos and misc stuff
        if(bitmapList[i].varName !== undefined){
            bitmapList[i].varName.src = bitmapList[i].imageSource;
        }

    }
}

// instantiate two new cars from the car class blueprint
var player1 = new carClass();
var player2 = new carClass();


// function which initially runs only after all the code has loaded into memory
window.onload = function () {
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");
    
    // calls our function to run at 30 fps
    var framesPerSecond = 60;
    setInterval(function() {
        calculateNextPosition();
        drawAllElements();
        }, 1000 / framesPerSecond); 
    
    // event listener for a key press down and hold
    document.addEventListener("keydown", keyIsPressed);
    
    // event listener for release of a key that was held down
    document.addEventListener("keyup", keyIsLetUp);
    
    // call the loadMapLevel function to set up the map and car positions prior to game start.    
    loadStartMapLevel();
  
    // function call to load all bitmap graphics
    loadAllBitmapGraphics(bitmapImageList);
   
    // assign control keys to player1 and player2
    player1.setKeyboardKeys(W_KEY_UP, S_KEY_DOWN, D_KEY_RIGHT, A_KEY_LEFT);
    player2.setKeyboardKeys(ARROW_KEY_UP, ARROW_KEY_DOWN, ARROW_KEY_RIGHT, ARROW_KEY_LEFT);
};

// calculates the next car position for each player car including collisions
function calculateNextPosition() {    
    player1.calculateNextCarPosition();
    player2.calculateNextCarPosition();
}

// helper function to determine the array index of the track at col, row given
function colRowToArrayIndex(col, row) {
    return col + TRACK_COLUMNS * row;
}

function drawAllElements() {
    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player1.drawCar();
    player2.drawCar();
    ctx.restore()
}

function makeCenteredImageRotate(myImage, posX, posY, atAngle) {
    // before the function runs, save the current state of the canvas
    ctx.save();
    ctx.translate(posX, posY);
    ctx.rotate(atAngle);
    ctx.drawImage(myImage, -myImage.width/2, -myImage.height/2);
    // when function done and returns, return the canvas back to original state
    ctx.restore();
   
}
