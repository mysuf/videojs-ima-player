
var autoplayAllowed = false;
var autoplayRequiresMute = false;

function checkUnmutedAutoplaySupport() {
  canAutoplay
    .video({timeout: 100, muted: false})
    .then(({result, error}) => {
        if(result === false) {
          // Unmuted autoplay is not allowed.
          checkMutedAutoplaySupport();
        } else {
          // Unmuted autoplay is allowed.
          autoplayAllowed = true;
          autoplayRequiresMute = false;
          initPlayer();
        }
    })
}

function checkMutedAutoplaySupport() {
  canAutoplay
    .video({timeout: 100, muted: true})
    .then(({result, error}) => {
        if(result === false) {
          // Muted autoplay is not allowed.
          autoplayAllowed = false;
          autoplayRequiresMute = false;
        } else {
          // Muted autoplay is allowed.
          autoplayAllowed = true;
          autoplayRequiresMute = true;
        }
        initPlayer();
    })
}

function initPlayer() {
  var vjsOptions = {
    autoplay: autoplayAllowed,
    muted: autoplayRequiresMute,
    debug: true
  }
  var player = videojs('content_video', vjsOptions);

  var imaOptions = {
    adTagUrl: 'http://pubads.g.doubleclick.net/gampad/ads?sz=640x480&' +
        'iu=/124319096/external/ad_rule_samples&ciu_szs=300x250&ad_rule=1&' +
        'impl=s&gdfp_req=1&env=vp&output=xml_vmap1&unviewed_position_start=1&' +
        'cust_params=sample_ar%3Dpremidpostpod%26deployment%3Dgmf-js' +
        '&cmsid=496&vid=short_onecue&correlator='

  };
  player.ima(imaOptions);
}

checkUnmutedAutoplaySupport();
