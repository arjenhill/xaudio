// import xAudio from '../dist/xAudio';

import XAudioJS from '../src/index';

let xaudio = new XAudioJS();

xaudio.init({
  src: 'https://mat1.gtimg.com/news/images/inews/2020/people/music.mp3',
  loop: false,
  autoplay: true,
  preload: 'auto',
  ready: () => {
    console.log('加载完毕');
  }
});
xaudio.id = Math.random();

// audio.getSrc();
console.log(xaudio);
// xaudio.playNew('https://cn-south-17-aplayer-46154810.oss.dogecdn.com/yourname.mp3');
// audio.getSrc();

console.log(xaudio.audio());
