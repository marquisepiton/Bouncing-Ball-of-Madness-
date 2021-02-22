// calling from the canvas element
const canvas = document.querySelector('canvas');


const ctx = canvas.getContext('2d');


//Call the width and height of the canvas element. 
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;


/*
Definition:
    - getContext: Method returns a drawing context on the canvas, or null if the context identifier 
    is not supported, or the canvas has already been set to a different context mode.
    -innerWidth: Returns the interior width of the window in pixels
    -innerHeight: Returns the interior Height of the window in pixels

Thoughts: 
    - I think the "Canvas" is what we are editing to give it width and height. 
    
*/
// Takes two numbers as arguments, and returns a random number in the range between the two.
function random(min, max) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
}

// This will represent the balls as objects. 

/*
    - x and y coordinates: the horizontal and vertical coordinates where the ball starts on the screen. 
    This can range between 0 (top left hand corner) to the width and height of the browser viewport (bottom right hand corner).
    - horizontal and vertical velocity (velX and velY): each ball is given a horizontal and vertical velocity; in real terms 
    these values are regularly added to the x/y coordinate values when we animate the balls, to move them by this much on each frame.
    - Color: each ball gets a color. 
    - Size: Each ball gets a size this is its radius, in pixels.
*/
function Ball(x, y, velX, velY, color, size) {

    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
}

/*
Definition: 
    - draw(): creates the object. 
    - beginPath(): method of the Canvas 2D API starts a new path by emptying the list of sub-paths. Call this method when you want to create a new path.
    - fillStyle: gives the object the color.
    - arc: Gives the object the circular frame, ball's size
    - fill: Gives the element the detailed color

*/
// Draws the ball on the screen.
Ball.prototype.draw = function () {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
}

// This function will update the balls movement. 
/*
Definition: 
  - update():  This method replaces the content of the element with the provided newContent argument and returns the element.


*/

/*
The first four parts of the function check whether the ball has reached the edge of the canvas. If it has, we reverse the polarity of the relevant velocity to make the ball travel in the opposite direction. 
So for example, if the ball was traveling upwards (positive velY), then the vertical velocity is changed so that it starts to travel downwards instead (negative velY).
*/
Ball.prototype.update = function () {
    // width is the horizontal frame of the canvas. 
    if ((this.x + this.size) >= width) {
        this.velX = -(this.velX);
    }

    if ((this.x - this.size) <= 0) {
        this.velX = -(this.velX);
    }

    if ((this.y + this.size) >= height) {
        this.velY = -(this.velY);
    }

    if ((this.y - this.size) <= 0) {
        this.velY = -(this.velY);
    }

    this.x += this.velX;
    this.y += this.velY;

    


}
Ball.prototype.collisionDetect = function() {
    for (let j = 0; j < balls.length; j++) {
      if (!(this === balls[j])) {
        const dx = this.x - balls[j].x;
        const dy = this.y - balls[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
  
        if (distance < this.size + balls[j].size) {
          balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';
        }
      }
    }
  };

let balls = [];

// Creates new balls under 25.
while (balls.length < 25) {
    let size = random(10, 20);
    let ball = new Ball(
        // ball position always drawn at least one ball width
        // away from the edge of the canvas, to avoid drawing errors
        random(0 + size, width - size),
        random(0 + size, height - size),
        random(-7, 7),
        random(-7, 7),
        'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')',
        size
    );

    balls.push(ball);
}
/*
Definition: 
    -fillRect:  method of the canvas 2D API draws a rectangle that is filled according to the  current fillStyle.
*/
function loop() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.fillRect(0, 0, width, height);
  
    for (let i = 0; i < balls.length; i++) {
      balls[i].draw();
      balls[i].update();
      balls[i].collisionDetect();
    }
    requestAnimationFrame(loop);
  }
  
  loop();

 




















