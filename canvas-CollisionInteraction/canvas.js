var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

const mouse = {
    x: innerWidth/2,
    y: innerHeight/2
};

//Utility Functions

let clr = ['white'];
function colour_selector() {
        return(clr[(Math.floor(Math.random() * clr.length))])
}



function randomIntFromRange(min, max){
    return(Math.floor(Math.random()* (max-min +1) + min));
}

function distance(x1,y1,x2,y2){
    const xDist = x2-x1;
    const yDist = y2-y1;

    return(Math.sqrt(Math.pow(xDist,2) + Math.pow(yDist,2)));
}




function rotate(velocity, angle) {
    const rotatedVelocities = {
        x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
        y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
    };

    return rotatedVelocities;
}


function resolveCollision(particle, otherParticle) {
    const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
    const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;

    const xDist = otherParticle.x - particle.x;
    const yDist = otherParticle.y - particle.y;

    // Prevent accidental overlap of particles
    if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {

        // Grab angle between the two colliding particles
        const angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x);

        // Store mass in var for better readability in collision equation
        const m1 = particle.mass;
        const m2 = otherParticle.mass;

        // Velocity before equation
        const u1 = rotate(particle.velocity, angle);
        const u2 = rotate(otherParticle.velocity, angle);

        // Velocity after 1d collision equation
        const v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };
        const v2 = { x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y };

        // Final velocity after rotating axis back to original location
        const vFinal1 = rotate(v1, -angle);
        const vFinal2 = rotate(v2, -angle);

        // Swap particle velocities for realistic bounce effect
        particle.velocity.x = vFinal1.x;
        particle.velocity.y = vFinal1.y;

        otherParticle.velocity.x = vFinal2.x;
        otherParticle.velocity.y = vFinal2.y;
    }
}





window.addEventListener('resize', ()=> {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

addEventListener('mousemove', event =>{
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

var maxOpacity = 0.99;

function Particles(x, y, radius, color){
    this.x = x;
    this.y = y;
    this.velocity = {
        x: (Math.random() -0.5) * 4,
        y: (Math.random() -0.5) * 4
    }
    this.radius = radius;
    this.color = color;
    this.mass = 1; // for the resolveCollision function
    this.opacity = 0;

    this.update = particleArray => {

        this.draw();
        for(let i=0; i< particleArray.length; i++){
            if (this == particleArray[i]) continue;
            if(distance(this.x, this.y, particleArray[i].x, particleArray[i].y) - this.radius*2 < 0){
                resolveCollision(this,particleArray[i]);
            }

        }

        if(this.x-this.radius < 0 || this.x + this.radius > innerWidth){
            this.velocity.x = -this.velocity.x;
        }

        if(this.y-this.radius < 0 || this.y + this.radius > innerHeight){
            this.velocity.y = -this.velocity.y;
        }

        //mouse collision detection
        if(distance(mouse.x, mouse.y, this.x, this.y) < 80 && this.opacity < maxOpacity){
            this.opacity += 0.07;
        }
        else if(this.opacity > 0){
            this.opacity -= 0.05;
            this.opacity = Math.max(0,this.opacity);
        }
        

        this.x += this.velocity.x;
        this.y += this.velocity.y;

        
    }

    this.draw = () => {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.save();
        c.globalAlpha = this.opacity;
        c.fillStyle = this.color;
        c.fill();
        c.restore();
        c.strokeStyle = this.color;
        c.stroke();
        // console.log('working');
    }

}

var particleArray = [];

function init(){
    particleArray = [];

    for(var i=0; i<1000; i++){

        const radius = 2;

        let x = randomIntFromRange(radius, canvas.width - radius);
        let y = randomIntFromRange(radius, canvas.height - radius);
        
        var color = colour_selector();

        if(i != 0){
            for(let j=0; j<particleArray.length; j++){
                if(distance(x, y, particleArray[j].x, particleArray[j].y) - radius*2 < 0){
                    x = randomIntFromRange(radius, canvas.width - radius);
                    y = randomIntFromRange(radius, canvas.height - radius);

                    j = -1;
                }
            }
        }

        particleArray.push(new Particles(x,y,radius,color));
    }
}

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0,innerWidth,innerHeight);

    for(var i =0; i < particleArray.length; i++){
        // console.log('working');
        particleArray[i].update(particleArray);
    }
}

init();
animate();