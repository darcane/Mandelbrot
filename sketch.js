let minX, minY, maxX, maxY;
let iterate = 500;
let mX, mY;
let frDiv;
let escapeOrbit;

function setup() {
    createCanvas(1200, 800);
    // createCanvas(1000,1000);

    frDiv = createDiv('');
    escapeOrbit = 40;
    reset();
    let btn = createButton("Reset");
    btn.mousePressed(reset);
}

function reset() {
    mandelbrot(-2, -1, 1, 1);
    // mandelbrot(-2,-2,2,2);
}

function mandelbrot(xF, yF, xL, yL) {
    minX = xF;
    minY = yF;
    maxX = xL;
    maxY = yL;
    pixelDensity(1);
    loadPixels();
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            let a=0, b=0;
            if (minX < maxX) a = map(x, 0, width, minX, maxX);
            else a = map(x, 0, width, maxX, minX);
            if (minY < maxY) b = map(y, 0, height, minY, maxY);
            else b = map(y, 0, height, maxY, minY);
            let n;

            let ca = a,
                cb = b;
            for (n = 0; n < iterate; n++) {
                let aa = a * a - b * b;
                let bb = 2 * a * b;

                a = aa + ca;
                b = bb + cb;

                if (sqrt(aa * aa + bb * bb) > escapeOrbit) { // escape orbit or bailant
                    break;
                }
            }

            let c = chooseColor(a,b,n);
            if(n===iterate) colorPixel(x,y,0,0,0);
            else colorPixel(x, y, c, 1, 1);
        }
    }
    updatePixels();


    frDiv.style("color:white");
    frDiv.html('X wide : [' + (abs(minX - maxX) + '] </br>Y wide: [' + abs(minY - maxY)) + ']');
}

let prevMouseX, prevMouseY;
function mousePressed() {
    if (mouseX > width || mouseY > height) return;
    prevMouseX = mouseX;
    prevMouseY = mouseY;
    mX = map(mouseX, 0, width, minX, maxX);
    mY = map(mouseY, 0, height, minY, maxY);
    console.log("Pressed to :" + mX + " " + mY);
}
function mouseReleased() {
    if (mouseX > width || mouseY > height) return;
    let rX = map(mouseX, 0, width, minX, maxX);
    let rY = map(mouseY, 0, height, minY, maxY);
    //zoom(mX,mY,mouseX,mouseY);
    mandelbrot(mX, mY, rX, rY);
    console.log("Release at :" + rX + " " + rY);
}
function mouseDragged() {
    if (mouseX > width || mouseY > height) return;
    strokeWeight(1);
    stroke(255);
    noFill();
    rect(prevMouseX, prevMouseY, mouseX - prevMouseX, mouseY - prevMouseY);
}

function chooseColor(a,b,n){
    let h = 0;

    h = n - Math.log(Math.log(sqrt(a * a + b * b)) / Math.log(escapeOrbit));
    //h = map(h,0,n,0,360);
    //h = Math.sin(h - n)*360;

    return h;
}

// hue: [0,360], sat: [0,1], val: [0,1]
function colorPixel(pixelX, pixelY, hue, sat, val) {
    let c = HSVtoRGB(hue,sat,val);
    let pix = (pixelX + pixelY * width) * 4;
    pixels[pix + 0] = c.levels[0];
    pixels[pix + 1] = c.levels[1];
    pixels[pix + 2] = c.levels[2];
    pixels[pix + 3] = c.levels[3];
}

function HSVtoRGB(hue,sat,val){
    let C = val * sat;
    let X = C * (1 - abs((hue / 60) % 2 - 1));
    let m = val - C;

    let r1, g1, b1;
    if (0 <= hue && hue < 60) {
        r1 = C;
        g1 = X;
        b1 = 0;
    } else if (hue < 120) {
        r1 = X;
        g1 = C;
        b1 = 0;
    } else if (hue < 180) {
        r1 = 0;
        g1 = C;
        b1 = X;
    } else if (hue < 240) {
        r1 = 0;
        g1 = X;
        b1 = C;
    } else if (hue < 300) {
        r1 = X;
        g1 = 0;
        b1 = C;
    } else if (hue < 360) {
        r1 = C;
        g1 = 0;
        b1 = X;
    } else {
        r1 = -m;
        g1 = -m;
        b1 = -m;
    }

    return color((r1 + m) * 255,(g1 + m) * 255,(b1 + m) * 255);
}