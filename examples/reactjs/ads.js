
var Ads = function(player) {
  this.player = player;
  // Set up UI stuff.
  this.adTagInput = document.getElementById('tagInput');
  this.sampleAdTag = document.getElementById('sampleAdTag');
  this.addSampleFn = this.addSample.bind(this);
  this.sampleAdTag.onclick = this.addSampleFn;
  this.console = document.getElementById('ima-sample-console');

  var options = {debug: true};
  this.player.ima(options);

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

  this.applyBtn = document.getElementById('apply-tag');
  this.applyFn = this.apply.bind(this);
  this.applyBtn.onclick = this.applyFn;
};

Ads.prototype.SAMPLE_AD_TAG = 'http://pubads.g.doubleclick.net/gampad/ads?' +
    'sz=640x480&iu=/124319096/external/ad_rule_samples&ciu_szs=300x250&' +
    'ad_rule=1&impl=s&gdfp_req=1&env=vp&output=xml_vmap1&' +
    'unviewed_position_start=1&' +
    'cust_params=sample_ar%3Dpremidpostpod%26deployment%3Dgmf-js&cmsid=496&' +
    'vid=short_onecue&correlator=';

Ads.prototype.apply = function() {
  this.player.ima.updateOptions({adTagUrl: this.adTagInput.value});
  var src = this.player.currentSrc();
  // source is same so we have to reset before
  this.player.reset();
  this.player.src(src);
};

Ads.prototype.addSample = function() {
  this.adTagInput.value = this.SAMPLE_AD_TAG;
};

Ads.prototype.onAdEvent = function(event) {
  var message = 'Ad event: ' + event.type;
  this.log(message);
};

Ads.prototype.log = function(message) {
  this.console.innerHTML = this.console.innerHTML + '<br/>' + message;
}

Ads.prototype.destroy = function() {
  this.sampleAdTag.removeEventListener('click', this.addSampleFn);
  this.applyBtn.removeEventListener('click', this.applyFn);
  this.player = null;
}

class VideoPlayer extends React.Component {
  componentDidMount() {
    // instantiate Video.js
    this.player = videojs(this.videoNode, this.props);
    this.ads = new Ads(this.player);
  }

  // destroy player on unmount
  componentWillUnmount() {
    if (this.player) {
      this.ads.destroy();
      this.player.dispose();
    }
  }

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856
  render() {
    return React.createElement('video', {
      className: 'video-js',
      ref: (node => this.videoNode = node)});
  }
}

var videojsOptions = {
  controls: true,
  preload: "auto",
  width: 640,
  height: 360,
  sources: [{src: "//commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", type: "video/mp4"}]
}

ReactDOM.render(React
  .createElement(VideoPlayer, videojsOptions),
  document.getElementById('ima-sample-videoplayer')
)