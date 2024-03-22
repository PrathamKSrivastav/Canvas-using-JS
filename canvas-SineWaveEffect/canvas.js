import * as dat from 'dat.gui'

var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

c.moveTo(0,innerHeight/2);
for(let i=0; i<innerWidth; i++){
    c.lineTo(i, innerHeight/2 + Math.sin(i * 0.02) * 40);
}
c.stroke();