
var onAdErrorEvent = function(event) {
  console.log(event);
};

var adTags = {
  linear: 'http://localhost:8000/test/webdriver/content/canned_ads/linear.xml',
  skippable: 'http://localhost:8000/test/webdriver/content/canned_ads/' +
      'skippable_linear.xml',
  vmap_preroll: 'http://localhost:8000/test/webdriver/content/canned_ads/' +
    'vmap_preroll.xml',
  vmap_midroll: 'http://localhost:8000/test/webdriver/content/canned_ads/' +
    'vmap_midroll.xml',
  nonlinear: 'http://localhost:8000/test/webdriver/content/canned_ads/' +
      'nonlinear.xml',
  error_303: 'http://localhost:8000/test/webdriver/content/canned_ads/empty_wrapper.xml'
};

var searchParams = new URLSearchParams(location.search);
var adTagName = searchParams.get('ad');

var player = videojs('content_video');

player.ima({
  disableFlagAds: true,
  adTagUrl: adTags[adTagName]
});

player.ready(function() {
  var log = document.getElementById('log');
  log.innerHTML += "ready<br>"; 
});

var events = [
  google.ima.AdErrorEvent.Type.AD_ERROR,
  google.ima.AdEvent.Type.STARTED,
];

for (var index = 0; index < events.length; index++) {
  player.ima.on(events[index], function(event) {
    var msg = event.type;
    if (event.type === google.ima.AdErrorEvent.Type.AD_ERROR) {
      msg = event.getError !== undefined ? 
        event.getError().getVastErrorCode() : event.stack;
    }
    var log = document.getElementById('log');
    log.innerHTML += msg + "<br>";
  });
}

player.on("playing", function(event) {
  var log = document.getElementById('log');
  log.innerHTML += event.type + "<br>";
});
