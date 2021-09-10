var cursor = document.querySelector('.cursor');
var cursorinner = document.querySelector('.cursor2');
var a = document.querySelectorAll('a');

document.addEventListener('mousemove', function(e){
  cursor.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`
});

document.addEventListener('mousemove', function(e){
  var x = e.clientX;
  var y = e.clientY;
  cursorinner.style.left = x + 'px';
  cursorinner.style.top = y + 'px';
});

a.forEach(item => {
  item.addEventListener('mouseover', () => {
    cursorinner.classList.add('cursorhover');
  });
  item.addEventListener('mouseleave', () => {
    cursorinner.classList.remove('cursorhover');
  });
})