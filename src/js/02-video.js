import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const KEY_CURRENT_TIME = 'videoplayer-current-time';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const currentTimeValue = localStorage.getItem(KEY_CURRENT_TIME);

if (currentTimeValue) {
  player.setCurrentTime(JSON.parse(currentTimeValue));
}

player.on(
  'timeupdate',
  throttle(time => {
    localStorage.setItem(KEY_CURRENT_TIME, JSON.stringify(time.seconds));
  }, 1000)
);

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});
