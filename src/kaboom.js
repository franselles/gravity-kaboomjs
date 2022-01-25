import kaboom from 'kaboom';

const k = kaboom({
  width: 360,
  height: 640,
  background: [0, 0, 255],
  scale: 1,
  canvas: document.getElementById('myCanvas'),
  scaleMode: 'stretch',
});

export default k;
