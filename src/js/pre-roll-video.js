var preRollVideo;
(function (preRollVideo) {
    var VideoPlayer = (function () {
        /**
         * videoエレメントのIDを入れてね
         * @param videoId
         */
        function VideoPlayer(videoId) {
            var _this = this;
            /**
             * 再生時間変更イベントで現在の時刻を保管
             */
            this.timeUpdate = function () {
                if (!_this.element.seeking) {
                    _this.currentTime = _this.element.currentTime;
                }
            };
            /**
             * seekされたら時間を戻す
             */
            this.onSeeking = function () {
                if (Math.abs(_this.element.currentTime - _this.currentTime) > 0.01) {
                    _this.element.currentTime = _this.currentTime;
                }
            };
            /**
             * 本編の動画に切り替える
             */
            this.switchToMainVideo = function () {
                //本編に来たら広告動画関連のイベントを外す
                _this.element.removeEventListener("ended", _this.switchToMainVideo, false);
                _this.element.removeEventListener("timeupdate", _this.timeUpdate, false);
                _this.element.removeEventListener("seeking", _this.onSeeking, false);
                _this.element.src = _this.mainVideo;
                _this.element.play();
            };
            this.element = document.getElementById(videoId);
            this.mainVideo = this.element.src;
            this.element.addEventListener("ended", this.switchToMainVideo, false);
            this.element.addEventListener("timeupdate", this.timeUpdate, false);
            this.element.addEventListener("seeking", this.onSeeking, false);
        }
        /**
         * プリリード広告のvideoパスを設定するよん
         * @param videoUrl
         */
        VideoPlayer.prototype.setPreRollVideo = function (videoUrl) {
            this.element.src = videoUrl;
        };
        return VideoPlayer;
    })();
    preRollVideo.VideoPlayer = VideoPlayer;
})(preRollVideo || (preRollVideo = {}));
//# sourceMappingURL=pre-roll-video.js.map