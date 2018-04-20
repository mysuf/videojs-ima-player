
function pause(id) {
  var player = videojs(id);
  player.ima.pause();
}

var Player = function(id) {
  this.id = id;
  this.init = function() {
    var player = videojs(this.id);

    var options = {
      adTagUrl: 'http://pubads.g.doubleclick.net/gampad/ads?sz=640x480&' +
          'iu=/124319096/external/ad_rule_samples&ciu_szs=300x250&ad_rule=1&' +
          'impl=s&gdfp_req=1&env=vp&output=xml_vmap1&unviewed_position_start=1&' +
          'cust_params=sample_ar%3Dpremidpostpod%26deployment%3Dgmf-js&cmsid=496&' +
          'vid=short_onecue&correlator='
    };

    player.ima(options);
  }
}

var player1 = new Player('content_video');
player1.init();
var player2 = new Player('content_video1');
player2.init();
