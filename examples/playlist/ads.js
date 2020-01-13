
var Ads = function() {
  this.player = videojs('content_video');

  this.options = {
    adTagUrl: 'http://pubads.g.doubleclick.net/gampad/ads?sz=640x480&' +
        'iu=/124319096/external/ad_rule_samples&ciu_szs=300x250&ad_rule=1&' +
        'impl=s&gdfp_req=1&env=vp&output=xml_vmap1&unviewed_position_start=1&' +
        'cust_params=sample_ar%3Dpremidpostpod%26deployment%3Dgmf-js&' +
        'cmsid=496&vid=short_onecue&correlator='
  };

  this.contents = [{
      src: '//commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
    },{
      src: '//s0.2mdn.net/4253510/google_ddm_animation_480P.mp4'
  }]

  this.console = document.getElementById('ima-sample-console');

  this.playlistDiv = document.getElementById('ima-sample-playlistDiv');
  if (this.playlistDiv) {
    this.playlistItems = this.playlistDiv.childNodes;
    for (var index in this.playlistItems) {
      if (this.playlistItems[index].tagName == 'DIV') {
        this.playlistItems[index].onclick = this.onPlaylistItemClick.bind(this);
      }
    }
  }
  this.player.ima(this.options);
  var events = [
    google.ima.AdEvent.Type.ALL_ADS_COMPLETED,
    google.ima.AdEvent.Type.CLICK,
    google.ima.AdEvent.Type.COMPLETE,
    google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED,
    google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED,
    google.ima.AdEvent.Type.FIRST_QUARTILE,
    google.ima.AdEvent.Type.LOADED,
    google.ima.AdEvent.Type.MIDPOINT,
    google.ima.AdEvent.Type.PAUSED,
    google.ima.AdEvent.Type.STARTED,
    google.ima.AdEvent.Type.THIRD_QUARTILE
  ];
  for (var index = 0; index < events.length; index++) {
    this.player.ima.on(events[index], this.onAdEvent.bind(this));
  }

  // When the page first loads, don't autoplay. After that, when the user
  // clicks a playlist item to switch videos, autoplay.
  if (this.playlistItemClicked) {
    this.player.play();
  }

}

Ads.prototype.onAdEvent = function(event) {
    this.console.innerHTML = this.console.innerHTML + '<br/>Ad event: ' + event.type;
};

Ads.prototype.onPlaylistItemClick = function(event) {
  if (!this.player.ads.inAdBreak()) {
    this.player.src(this.contents[event.target.id].src);
  }
  this.playlistItemClicked = true;
};
