import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const currentTime = localStorage.getItem('videoplayer-current-time');

if (currentTime) {
  player.setCurrentTime(JSON.parse(currentTime).seconds);
}

player.on(
  'timeupdate',
  throttle(time => {
    localStorage.setItem('videoplayer-current-time', JSON.stringify(time));
  }, 1000)
);

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});
