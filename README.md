# html5-video-with-pre-roll-ad
HTML5 Video でプリロール動画を再生できるようにする

動作デモ
<a href="https://www.axesor.co.jp/js/html5-video-with-pre-roll-ad">https://www.axesor.co.jp/js/html5-video-with-pre-roll-ad</a>

# 使い方
1.videoタグをID付きで宣言する
```html	
<video src="本編動画のパス" id="example" controls poster="sample.png" width="320" height="320"></video>
```

2.初期化
```html	
  <script src="js/pre-roll-video.js"></script>
	<script>
		window.videoPlayer = new preRollVideo.VideoPlayer("動画のID");
		window.videoPlayer.setPreRollVideo("広告動画のパス");
	</script>
```
3. おしまい
