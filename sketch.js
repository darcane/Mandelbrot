let minX, minY, maxX, maxY;
let iterate = 1000;
let mX, mY;
let frDiv;

function setup() {
    createCanvas(1200, 800);
    frDiv = createDiv('');
    mandelbrot(-2,-1,1,1);

    // createCanvas(1000,1000);
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

                if (a + b > 40) {
                    break;
                }
            }

            let h =  n+ 1 - Math.log(Math.log(sqrt(a*a + b*b)))/ Math.log(2);
            h = h/iterate;
            h = map(h,0,1,0,360); //??
            // console.log(h);
            let s = 0.6;
            let v = 1;
            let c = v*s;
            let xVal = c*(1-abs((h/60)%2-1));
            let m = v-c;

            let r1,g1,b1;
            if(0<=h && h<60){
                r1=c;g1=xVal;b1=0;
            }else if(h<120){
                r1=xVal;g1=c;b1=0;
            }else if(h<180){
                r1=0;g1=c;b1=xVal;
            }else if(h<240){
                r1=0;g1=xVal;b1=c;
            }else if(h<300){
                r1=xVal;g1=0;b1=c;
            }else{
                r1=c;g1=0;b1=xVal;
            }

            let bright = map(n, 0, iterate, 0, 255);
            //bright = map(sqrt(bright), 0, 1, 0, 255);
            if (n === iterate) bright = 0;

            let pix = (x + y * width) * 4;

            pixels[pix + 0] = (r1+m)*255;
            pixels[pix + 1] = (g1+m)*255;
            pixels[pix + 2] = (b1+m)*255;


            // pixels[pix + 0] = bright;
            // pixels[pix + 1] = bright;
            // pixels[pix + 2] = bright;
            pixels[pix + 3] = 255;
        }
    }
    updatePixels();


    frDiv.html('X wide : ['+(abs(minX-maxX)+'] </br>Y wide: ['+abs(minY-maxY))+']');
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