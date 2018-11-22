class Complex {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    modulus() {
        return sqrt(pow(this.x, 2) + pow(this.y, 2));
    }

    square() {
        let newX = pow(this.x, 2) - pow(this.y, 2);
        let newY = 2 * this.x * this.y;
        this.x = newX;
        this.y = newY;
        return this;
    }

    plusWith(z){
        this.x += z.x;
        this.y += z.y;
        return this;
    }
}