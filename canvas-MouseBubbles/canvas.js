var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
})

var c = canvas.getContext('2d');

// // drawing_Rectangles
// c.fillStyle = 'rgba(255,0,0,.2)'
// // c.fillRect(100,400,50,50);

// c.fillStyle = 'rgba(86,99,45,.5)'
// // c.fillRect(600,500,50,50);

// c.fillStyle = 'rgba(0,0,0,.2)'
// // c.fillRect(900,300,50,70);

// // drawing_Lines
// c.beginPath();
// c.moveTo(50,300);
// c.lineTo(300,100);
// c.lineTo(400,600);
// c.strokeStyle = "#fa36a4"
// // c.stroke();

// // drawing_Arcs/Cricles
// c.beginPath();
// c.arc(300,300, 200,0,Math.PI * 2, false);
// c.strokeStyle = 'blue';
// // c.stroke();

let clr = ['#36BFB1','#038C73','#02735E','#014034','#333333'];
    function colour_selector() {
        return(clr[(Math.floor(Math.random() * clr.length))])
    }

var mouse = {
    x:undefined,
    y:undefined
}

window.addEventListener('mousemove',function(event){
    mouse.x = event.x;
    mouse.y = event.y;
})

var maxRadius = 40;
// var minRadius = 6;
c.strokeStyle = 'rgba(255,255,255.2)';

function Circle(x,y,dx,dy, Circle_Radius){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.Circle_Radius = Circle_Radius;
    this.minRadius = Circle_Radius;
    this.colour = colour_selector();

    this.draw = function(){
        c.beginPath();
        c.arc(this.x, this.y, this.Circle_Radius,0,Math.PI * 2,false);
    
        c.stroke();
        c.fillStyle = this.colour;
        c.fill();
    }

    this.update = function(){
        if(this.x + this.Circle_Radius > innerWidth || this.x - this.Circle_Radius < 0){
            this.dx = -this.dx;
            // c.strokeStyle = colour_selector();
        }
        if(this.y + this.Circle_Radius > innerHeight || this.y - this.Circle_Radius < 0){
            this.dy = -this.dy;
            // c.strokeStyle = colour_selector();
        }
    
        this.x += this.dx;
        this.y += this.dy;

        // interactivity
        if(mouse.x - this.x < 40 && mouse.x - this.x >-40 && mouse.y - this.y <40 && mouse.y - this.y >-40){
            if(this.Circle_Radius< maxRadius){
            this.Circle_Radius += 1.7 ;
            }
        }

        else if(this.Circle_Radius > this.minRadius) {
            console.log("woah");
            this.Circle_Radius -= 1;
        }

        this.draw();
    }
}


var circleArray = [];

// circle.draw();

function init(){
    circleArray = [];
    
    for(var i = 0; i<800; i++){

        var Circle_Radius = Math.random() * 4 +1;
    
        var x = Math.random() * (window.innerWidth - Circle_Radius*2) + Circle_Radius;
        var dx = (Math.random() - 0.5) * 2;
    
        var y = Math.random() * (window.innerHeight - Circle_Radius*2) + Circle_Radius;
        var dy = (Math.random() - 0.5) * 2;
    
        
        circleArray.push(new Circle(x,y,dx,dy,Circle_Radius));
    }

}


function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0,innerWidth,innerHeight);

    for(var i =0 ; i< circleArray.length; i++){
        circleArray[i].update();
    }
    
    // circle.update();

    // c.beginPath();
    // c.arc(x,y,Circle_Radius,0,Math.PI * 2,false);
    
    // c.stroke();
    
}

init();

animate();

// drawing_Bezier_Curves

// drawing_Images

// drawing_texts

console.log(canvas);