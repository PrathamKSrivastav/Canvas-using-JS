var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', ()=> {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
