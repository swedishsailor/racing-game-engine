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
    this.licznik = 0;
    
    // car image, name, x & y position, angle, and speed variables
    this.carImage = undefined;   // Don't assign nothing, use undefined going forward.
    this.name = "unNamed";
    this.x = 50;
    this.y = 50;
    this.carAngle = 0;
    this.car_speed = 0;
    this.oblicz = false;
    
    // create generic control keys properties that we can assign specific keys to at set up.
    this.keyHeldDown_Forward = false;
    this.keyHeldDown_Reverse = false;
    this.keyHeldDown_Right = false;
    this.keyHeldDown_Left = false;
        
    // this setup function will assign different keyboard keys to each car
    this.setPressedKeys = function(f, r, right, l) {
        this.keyHeldDown_Forward = f;
        this.keyHeldDown_Reverse = r;
        this.keyHeldDown_Right = right;
        this.keyHeldDown_Left = l;
    };
  
    this.getPlayerInfo = function() {
        var x = this.x;
        var y = this.y;
        var a = this.carAngle;
      return {x, y, a};
    }
    
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
        //console.log("hej")
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
        this.x += Math.cos(this.carAngle) * this.car_speed;
        this.y += Math.sin(this.carAngle) * this.car_speed;
       // console.log(this.x, this.y, this.carAngle);
  
        //kamil pomoz
    };
  }

  module.exports = {carClass};