import Player from '@vimeo/player';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on('timeupdate', time => {
  console.log(time);
});

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});
