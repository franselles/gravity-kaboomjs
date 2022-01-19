import k from './kaboom';

import game from './game';

const {
  scene,
  go,
  add,
  text,
  pos,
  onClick,
  width,
  origin,
  loadSprite,
  sprite,
} = k;

loadSprite('background', 'assets/background.jpg');

scene('main', () => {
  add([sprite('background'), pos(0, 0)]);

  add([
    text('Click  \nto  \nSTART', {
      size: 60,
    }),
    pos(width() / 2, 300),
    origin('center'),
  ]);

  add([
    text('Made with Kaboomjs\nby FRaN. 2022 v.0.0.4', {
      size: 20,
    }),
    pos(width() / 2, 500),
    origin('center'),
  ]);

  onClick(() => {
    game();
  });
});

go('main');
