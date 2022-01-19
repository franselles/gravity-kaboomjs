import k from './kaboom';

const {
  scene,
  sprite,
  pos,
  add,
  go,
  loadSprite,
  area,
  width,
  origin,
  solid,
  body,
  onClick,
  destroyAll,
  vec2,
  text,
  layers,
  layer,
  onCollide,
} = k;

loadSprite('character', 'assets/character.png', {
  sliceX: 3,
  sliceY: 1,
  anims: {
    idle: {
      from: 0,
      to: 0,
    },
    jump: {
      from: 1,
      to: 1,
    },
    crash: {
      from: 2,
      to: 2,
    },
  },
});
loadSprite('earth', 'assets/earth.png');
loadSprite('pluto', 'assets/pluto.png');
loadSprite('mars', 'assets/mars.png');
loadSprite('neptune', 'assets/neptune.png');
loadSprite('uranus', 'assets/uranus.png');
loadSprite('saturn', 'assets/saturn.png');
loadSprite('venus', 'assets/venus.png');
loadSprite('jupiter', 'assets/jupiter.png');
loadSprite('mercury', 'assets/mercury.png');
loadSprite('right', 'assets/right.png');
loadSprite('left', 'assets/left.png');
loadSprite('background', 'assets/background.jpg');

const items = [
  {
    name: 'MERCURY',
    grav: 800,
    grav_text: '3.7',
  },

  {
    name: 'VENUS',
    grav: 350,
    grav_text: '8.8',
  },
  {
    name: 'EARTH',
    grav: 450,
    grav_text: '9.8',
  },
  {
    name: 'MARS',
    grav: 800,
    grav_text: '3.7',
  },
  {
    name: 'JUPITER',
    grav: 100,
    grav_text: '24.7',
  },
  {
    name: 'SATURN',
    grav: 150,
    grav_text: '10.4',
  },
  {
    name: 'URANUS',
    grav: 400,
    grav_text: '8.8',
  },
  {
    name: 'NEPTUNE',
    grav: 150,
    grav_text: '11.1',
  },
  {
    name: 'PLUTO',
    grav: 1100,
    grav_text: '0.6',
  },
];

let index_planet = 0;

let current_planet = items[index_planet];

scene('game', () => {
  layers(['bg', 'gm', 'ui'], 'gm');

  add([sprite('background'), pos(0, 0), area(), layer('bg'), 'bg']);

  const character = add([
    sprite('character', {
      anim: 'jump',
    }),
    pos(width() / 2, 50),
    area(),
    origin('center'),
    body(),
    layer('gm'),
    'character',
  ]);

  const planet = () => {
    return add([
      sprite(current_planet.name.toLowerCase()),
      pos(width() / 2, 500),
      area(),
      origin('center'),
      solid(),
      'planet',
      current_planet.name,
      layer('gm'),
    ]);
  };

  onCollide('character', 'planet', () => {
    character.play('idle');
    if (index_planet == 4) {
      character.play('crash');
    }
  });

  add([
    text('JUMP', {
      size: 40,
    }),
    pos(width() / 2, 550),
    origin('center'),
    layer('ui'),
  ]);

  planet();

  const name_planet = add([
    text(current_planet.name, {
      size: 60,
    }),
    pos(width() / 2, 30),
    origin('center'),
    layer('ui'),
  ]);

  const grav_text = add([
    text('Gravity: ' + current_planet.grav_text, {
      size: 30,
    }),
    pos(width() / 2, 100),
    origin('center'),
    layer('ui'),
  ]);

  add([
    sprite('right'),
    pos(width() - 130, 200),
    area(),
    solid(),
    'right',
    layer('gm'),
  ]);
  add([sprite('left'), pos(10, 200), area(), solid(), 'left', layer('gm')]);

  onClick('bg', () => {
    if (character.isGrounded()) {
      character.jump(current_planet.grav);
      character.play('jump');
    }
  });

  onClick('right', () => {
    if (index_planet == items.length - 1) return;
    index_planet++;
    current_planet = items[index_planet];
    destroyAll('planet');
    character.pos = vec2(width() / 2, 50);
    planet();
    name_planet.text = current_planet.name;
    grav_text.text = 'Gravity: ' + current_planet.grav_text;
    character.play('jump');
  });

  onClick('left', () => {
    if (index_planet == 0) return;

    index_planet--;
    current_planet = items[index_planet];
    destroyAll('planet');
    character.pos = vec2(width() / 2, 50);
    planet();
    name_planet.text = current_planet.name;
    grav_text.text = 'Gravity: ' + current_planet.grav_text;
    character.play('jump');
  });
});

const game = () => go('game');

export default game;
