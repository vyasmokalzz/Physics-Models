let button = document.getElementById('btn');
let iframe = document.getElementById('frame');

console.log(button, iframe);

button.addEventListener('click', function () {
    iframe.requestFullscreen();
}) 