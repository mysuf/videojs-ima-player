
var player = videojs('content_video');

var options = {
  debug: true,
  autoPlayAdBreaks: false,
  adTagUrl: 'http://pubads.g.doubleclick.net/gampad/ads?sz=640x480&' +
      'iu=/124319096/external/ad_rule_samples&ciu_szs=300x250&ad_rule=1&' +
      'impl=s&gdfp_req=1&env=vp&output=xml_vmap1&unviewed_position_start=1&' +
      'cust_params=sample_ar%3Dpremidpostpod%26deployment%3Dgmf-js&cmsid=496&' +
      'vid=short_onecue&correlator='
};

var imaConsole = document.getElementById('ima-sample-console');

player.ima(options);
var events = [
  google.ima.AdEvent.Type.AD_BREAK_READY,
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
  player.ima.on(events[index], onAdEvent);
}

function onAdEvent(event) {
  var message = 'Ad event: ' + event.type;
  imaConsole.innerHTML = imaConsole.innerHTML + '<br/>' + message;
};

player.ima.on(google.ima.AdEvent.Type.AD_BREAK_READY, function() {
  player.ima.play();
});


