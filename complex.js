class Complex {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    modulus() {
        return sqrt(pow(this.x, 2) + pow(this.y, 2));
    }

    squared_modulus() {
        return pow(this.x, 2) + pow(this.y, 2);
    }

    square() {
        let newX = pow(this.x, 2) - pow(this.y, 2);
        let newY = 2 * this.x * this.y;
        return new Complex(newX, newY);
    }

    add(z) {
        if (typeof z == 'number') {
            return this.add(new Complex(z, 0));
        }
        return new Complex(this.x + z.x, this.y + z.y);
    }

    mult(n) {
        if (typeof n == 'number') {
            return this.mult(new Complex(n, 0));
        }
        return new Complex(this.x * n.x - this.y * n.y, this.x * n.y + this.y * n.x);
    }

    divide(n){
        return new Complex(this.x / n, this.y/n);
    }

    conj() {
        return new Complex(this.x, -this.y);
    }

    toString() {
        if (this.y < 0) return this.x + " - " + (-this.y) + "i";
        return this.x + " + " + this.y + "i";
    }
}

function isNumber(n) { return !isNaN(parseFloat(n)) && !isNaN(n - 0) }