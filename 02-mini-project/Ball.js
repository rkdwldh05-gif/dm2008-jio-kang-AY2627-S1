class Ball {
  constructor(x, y, r) {
    this.pos = createVector(x, y);
    this.r = r;
    this.xSpeed = 3.5;
    this.ySpeed = 2.0;

    // Give the ball a random starting direction to get it moving
    this.vel = createVector(
      random([-1.5, 1.5]) * this.xSpeed,
      random(-1, 1) * this.ySpeed
    );
  }

  update() {
    this.pos.add(this.vel);
  }

  checkWallBounce() {
    // Bounce off top and bottom walls
    if (this.pos.y - this.r <= 0 || this.pos.y + this.r >= height) {
      this.vel.y *= -1;
      this.pos.y = constrain(this.pos.y, this.r, height - this.r);
    }

    // When the ball passes the left or right edge, a player scores
    // Increment the correct score, then call this.reset()
    if (this.pos.x <= 0) {
      rightScore = rightScore +1
      this.reset()
    }
    if (this.pos.x >= width) {
      leftScore = leftScore +1
      this.reset()
    }
  }

  checkPaddleBounce(paddle) {
    const withinY =
      this.pos.y > paddle.pos.y && this.pos.y < paddle.pos.y + paddle.h;
    const withinX =
      this.pos.x + this.r > paddle.pos.x &&
      this.pos.x - this.r < paddle.pos.x + paddle.w;

    if (withinX && withinY) {
      if (this.vel.x < 0) {
        this.pos.x = paddle.pos.x + paddle.w + this.r;
      } else {
        this.pos.x = paddle.pos.x - this.r;
      }
      this.vel.x *= -1;

      // Stretch: add angle variation based on where the ball hits the paddle
     this.vel.y += (this.pos.y - paddle.pos.y - paddle.h / 2) * 0.1;
      
    }
  }

  show() {
    fill(255, 170, 70);
    circle(this.pos.x, this.pos.y, this.r * 2);
  }

  reset() {
    this.pos.set(width / 2, height / 2);
    // random([-1, 1]) picks randomly from an array — a handy pattern for direction
    // this.vel.set(random([-1, 1]) * this.xSpeed, random([-1, 1]) * this.ySpeed);
    this.vel.set(random([-1.5, 1.5]) * this.xSpeed, random(-1, 1) * this.ySpeed)
  }
}