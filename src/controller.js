(function() {
  let xaudio;

  app.controller('audioController', [
    '$scope',
    function($scope) {
      createAudio();

      $scope.toggleMusic = function() {
        let url = $scope.rootdata.music.src;
        if (url) {
          if (xaudio.getStats()) {
            $scope.$root.music_playing = false;
            xaudio.pause();
          } else {
            $scope.$root.music_playing = true;
            xaudio.play(url);
          }
        }
      };

      $scope.$watch('process', function(n, o) {
        if (n === 'no' || n === 'uploading') {
          xaudio.stop();
          $scope.$root.music_playing = false;
        }
      });

      // ///////////////////////  创建audio  /////////////////////////
      function createAudio() {
        if (!xaudio) {
          xaudio = new xAudio();
          xaudio.init({
            loop: false,
            autoplay: false,
            preload: 'auto',
            ready: function(e) {
              console.log('加载完毕');
            }
          });
          xaudio.id = Math.random();
        }
      }
    }
  ]);
})(app);
