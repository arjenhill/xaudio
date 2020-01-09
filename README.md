# XAudioJS

XAudioJS 是一款功能强大方便易用的 H5 背景音乐播放器

[![XAudioJS](https://nodei.co/npm/xaudiojs-cli.png)](https://npmjs.org/package/xaudiojs-cli)

## 安装

使用 npm：

`npm install xaudiojs-cli --save`

html：

`<script src="XAudioJS.min.js"></script>`

## 入门

```js
const audio = new XAudioJS();

const config = {
  src: 'music.mp3',
  loop: false,
  autoplay: true,
  preload: 'auto',
  ready: () => {
    console.log('加载完毕');
  }
};

audio.init(config);
```

## 参数

| 名称 | 默认值 | 描述 |
| :--: | :----: | :--: |
| src  |  空   | 视频播放地址|
| autoplay  |  false   | 设置true，则音频在就绪后马上播放。|
| preload  |  'auto'   | 音频自动播放。autoplay 属性优先于 preload 假如用户想自动播放音频，那么很明显浏览器需要下载音频。另外同时设置autoplay 和 preload属性在规范里是允许的。|
| loop  |  false   | 设置true，音频循环播放。|

## API

- `audio.play()`: 播放音频
- `audio.pause()`: 暂停音频
- `audio.stop()`: 停止音频
- `audio.volume() or audio.setVolume(0.1)`: 设置音量  1.0 是最高音量（默认）0.5 是一半音量 / 0.0 是静音
- `audio.currentTime() or audio.setCurrentTime(1)`: 设置或返回音频播放的当前位置（以秒计）
- `audio.duration() or audio.getDuration()`: 回当前音频长度，以秒计。
- `audio.audio() or audio.getAudio()`: 访问 Audio 对象，同getElementById() 来访问 audio 元素。
- `audio.getSrc()`: 返回src地址。
- `audio.stats() or audio.getStats()`: 返回音频播放状态(Boolean)。
- `audio.destroy()`: 销毁当前播放实例。
- `audio.playNew(src)`: 播放新音频(src:String)。

## 开发

依赖 nodejs, 请使用 terminal/iTerm 安装环境

构建项目

```bash
git clone https://github.com/halldwang/XAudioJS.git

...
npm install
npm run start
npm run build
```

运行项目

```js
npm run start
// 访问 http://localhost:8080
```

## 贡献

如果你想参与这个项目的共同创作，修改或添加内容，可以先 [Fork](https://github.com/halldwang/XAudioJS.git) 项目仓库，然后将修改的内容提交 [Pull requests](https://github.com/halldwang/XAudioJS/pulls) ；或者创建 [Issues](https://github.com/halldwang/XAudioJS/issues)。

Fork 后的仓库如何同步本仓库？

```bash
# 添加 upstream 源，只需执行一次
git remote add upstream git@github.com:halldwang/XAudioJS.git

# 拉取远程代码
git pull upstream master

# 提交修改
git add .
git commit

# 更新 fork 仓库
git push origin master
```

更多参考： [Syncing a fork](https://help.github.com/articles/syncing-a-fork/)

## 维护者

[@halldwang](https://github.com/halldwang).

## Changelog

[https://github.com/halldwang/XAudioJS/commits/master](https://github.com/halldwang/XAudioJS/commits/master).

## License

XAudioJS is released under the MIT License.
