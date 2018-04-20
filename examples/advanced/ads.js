
var Ads = function() {
  // Set up UI stuff.
  this.adTagInput = document.getElementById('tagInput');
  var sampleAdTag = document.getElementById('sampleAdTag');
  sampleAdTag.addEventListener('click', () => {
    this.adTagInput.value = this.SAMPLE_AD_TAG;
  });
  this.console = document.getElementById('ima-sample-console');

  this.player = videojs('content_video');

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

  var applyBtn = document.getElementById('apply-tag');
  applyBtn.onclick = this.apply.bind(this);
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

Ads.prototype.onAdEvent = function(event) {
  var message = 'Ad event: ' + event.type;
  this.log(message);
};

Ads.prototype.log = function(message) {
  this.console.innerHTML = this.console.innerHTML + '<br/>' + message;
}
