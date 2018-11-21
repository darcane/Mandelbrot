let minX, minY, maxX, maxY;
let iterate = 250;
let mX, mY;
// let frDiv;

function setup() {
    createCanvas(2000, 2000);
    // frDiv = createDiv('');
    mandelbrot(-2, -2, 2, 2);
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
            let a,b;
            if(minX < maxX) a = map(x, 0, width, minX, maxX);
            else a = map(x, 0, width, maxX,minX);
            if(minY < maxY) b = map(y, 0,height, minY, maxY);
            else b = map(y, 0,height, maxY,minY);
            let n = 0;

            let ca = a,
                cb = b;
            for (n = 0; n < iterate; n++) {
                let aa = a * a - b * b;
                let bb = 2 * a * b;

                a = aa + ca;
                b = bb + cb;

                if (a + b > 8) {
                    break;
                }
            }
            let bright = map(n, 0, iterate, 0, 255);
            //bright = map(sqrt(bright), 0, 1, 0, 255);
            if (n === iterate) bright = 0;

            let pix = (x + y * width) * 4;
            pixels[pix + 0] = -bright;
            pixels[pix + 1] = sqrt(bright);
            pixels[pix + 2] = bright;
            pixels[pix + 3] = 255;
        }
    }
    updatePixels();
    // frDiv.html('X : ['+minX+','+maxX+'] </br>Y: ['+minY+','+maxY+']');
}

let prevMouseX, prevMouseY;
function mousePressed() {
    prevMouseX = mouseX;
    prevMouseY = mouseY;
    mX = map(mouseX, 0, width, minX, maxX);
    mY = map(mouseY, 0, height, minY, maxY);
    console.log("Pressed to :" + mX + " " + mY);
}

function mouseReleased() {
    let rX = map(mouseX, 0, width, minX, maxX);
    let rY = map(mouseY, 0, height, minY, maxY);
    //zoom(mX,mY,mouseX,mouseY);
    mandelbrot(mX, mY, rX, rY);
    console.log("Release at :" + rX + " " + rY);
}

function mouseDragged(){
    strokeWeight(1);
    stroke(255);
    noFill();
    rect(prevMouseX, prevMouseY, mouseX - prevMouseX, mouseY - prevMouseY);
}