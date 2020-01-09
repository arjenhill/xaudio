
/*
 * XAudioJS
 * +++++++++ XAudioJS播放器 +++++++++
 * (c) 2011-2019 tnfe
 * https://github.com/halldwang/XAudioJS.git
 * version 0.0.1
 */

class XAudioJS {
  constructor() {
    let audio;
    let debug;

    let _src;

    let register = {}; // autoplay 属性优先于 preload 假如用户想自动播放音频，那么很明显浏览器需要下载音频。
    // 同时设置autoplay 和 preload属性在规范里是允许的。

    this.autoplay = false;
    this.loop = false;
    this.preload = 'auto';

    this.debug = () => {
      debug = true;
      audio.style.position = 'absolute';
      audio.style.zIndex = 9999;
      audio.style.display = 'block';
      audio.style.width = '250px';
      audio.style.height = '30px';
      audio.setAttribute('controls', true);
      document.body.appendChild(audio);
    };

    this.init = config => {
      this.loop = config.loop;
      this.ready = config.ready;
      this.canplay = config.canplay;
      this.update = config.update;
      this.loadedmetadata = config.loadedmetadata;
      audio = createAudio(config);

      if (config.src) {
        let src = config.src;
        _src = src;
        audio.src = src;

        try {
          audio.load();
        } catch (e) {}
      }
    };

    this.play = (src, autoplay) => {
      if (src !== undefined) {
        this.playNew(src);
      }

      if (autoplay !== undefined) audio.setAttribute('autoplay', autoplay);
      audio.play();
    };

    this.pause = () => {
      if (audio.pause) audio.pause();
    };

    this.stop = () => {
      // 音频播放还没有进入第一次 timeupdate 的时候设置currentTime 会报错
      try {
        audio.currentTime = 0;
      } catch (e) {}

      if (audio.pause) audio.pause();
    };

    this.setVolume = this.volume = volume => {
      audio.volume = volume;
    };

    this.setCurrentTime = this.currentTime = (time = 0) => {
      // return audio.currentTime * 1000;
      if (time === 0) {
        return audio.currentTime * 1000;
      } else {
        audio.currentTime();
      }
    };

    this.getDuration = this.duration = () => {
      return audio.duration * 1000;
    };

    this.getAudio = this.audio = () => {
      return audio;
    };

    this.getSrc = () => {
      return _src;
    };

    this.getStats = this.stats = () => {
      return !audio.paused;
    };

    this.destroy = () => {
      this.stop();

      if (this.ready) {
        register['ready'] = false;
        audio.removeEventListener('canplaythrough', this.ready);
      }

      if (this.canplay) {
        register['canplay'] = false;
        audio.removeEventListener('canplay', this.canplay);
      }

      if (this.durationchange) {
        register['durationchange'] = false;
        audio.removeEventListener('durationchange', this.durationchange);
      }

      if (this.update) {
        register['update'] = false;
        audio.removeEventListener('update', this.update);
      }

      if (this.ended) {
        register['ended'] = false;
        audio.removeEventListener('ended', this.ended);
      }

      if (register['loadedmetadata']) {
        register['loadedmetadata'] = false;
        audio.removeEventListener('ended', this.ended);
      }
    }; //  新播放


    this.playNew = src => {
      if (debug) {
        console.log(src);
      }

      addListener();
      _src = src;
      let reload = audio.src ? true : false;
      audio.src = src;

      try {
        if (reload) audio.load();
      } catch (e) {}
    }; //  添加侦听


    const addListener = () => {
      if (this.ready && !register['ready']) {
        register['ready'] = true;
        audio.addEventListener('canplaythrough', this.ready, false);
      }

      if (this.canplay && !register['canplay']) {
        register['canplay'] = true;
        audio.addEventListener('canplay', this.canplay, false);
      }

      if (this.durationchange && !register['durationchange']) {
        register['durationchange'] = true;
        audio.addEventListener('durationchange', this.durationchange, false);
      }

      if (this.update && !register['update']) {
        register['update'] = true;
        audio.addEventListener('timeupdate', this.update, true);
      }

      if (!register['loadedmetadata']) {
        register['loadedmetadata'] = true;
        audio.addEventListener('loadedmetadata', () => {
          if (debug) {
            console.log(audio.duration);
          }

          if (this.loadedmetadata) {
            this.loadedmetadata();
          }
        }, false);
      }

      if (this.ended && !register['ended']) {
        register['ended'] = true;
        audio.addEventListener('ended', this.ended, true);
      }
    }; //  创建标签


    const createAudio = config => {
      let audio = document.createElement('audio');
      if (config && config.autoplay) audio.setAttribute('autoplay', 'true');
      if (config && config.loop) audio.setAttribute('loop', 'true');
      if (config && config.type) audio.setAttribute('type', config.type);
      if (config) audio.setAttribute('preload', config.preload);
      audio.style.position = 'absolute';
      audio.style.zIndex = 999;
      audio.style.top = '0px';
      audio.style.left = '0px';
      audio.style.width = '0px';
      audio.style.height = '0px';
      audio.style.display = 'none';
      document.body.appendChild(audio);
      return audio;
    };
  }

}

export default XAudioJS;
