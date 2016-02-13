
module preRollVideo {

	export class VideoPlayer {

		private element:HTMLVideoElement;
		private mainVideo:string;

		private currentTime : number;

		/**
		 * videoエレメントのIDを入れてね
		 * @param videoId
		 */
		constructor(videoId:string) {
			this.element = <HTMLVideoElement>document.getElementById(videoId);
			this.mainVideo = this.element.src;

			this.element.addEventListener("ended", this.switchToMainVideo, false);
			this.element.addEventListener("timeupdate", this.timeUpdate, false);
			this.element.addEventListener("seeking", this.onSeeking, false);
		}

		/**
		 * 再生時間変更イベントで現在の時刻を保管
		 */
		public timeUpdate = () => {
			if (!this.element.seeking){
				this.currentTime = this.element.currentTime;
			}
		}


		/**
		 * seekされたら時間を戻す
		 */
		public onSeeking = () => {
			if (Math.abs(this.element.currentTime - this.currentTime) > 0.01){
				this.element.currentTime = this.currentTime;
			}
		}


		/**
		 * プリリード広告のvideoパスを設定するよん
		 * @param videoUrl
		 */
		public setPreRollVideo(videoUrl:string):void {
			this.element.src = videoUrl;
		}


		/**
		 * 本編の動画に切り替える
		 */
		public switchToMainVideo = () => {
			//本編に来たら広告動画関連のイベントを外す
			this.element.removeEventListener("ended", this.switchToMainVideo, false);
			this.element.removeEventListener("timeupdate", this.timeUpdate, false);
			this.element.removeEventListener("seeking", this.onSeeking, false);

			this.element.src = this.mainVideo;
			this.element.play();
		}

	}

}