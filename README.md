# Video ad plugin for video.js

Introduction
------------

[IMA SDK](https://developers.google.com/interactive-media-ads/docs/sdks/html5/v3/apis) integration
for video.js. Based on customized videojs player, tech and UI tailored for ad playback.

Note: this is not [official IMA SDK integration](https://github.com/googleads/videojs-ima).

Requirements
------------

- [IMA SDK](https://developers.google.com/interactive-media-ads/docs/sdks/html5/v3/apis) js binary loaded
- [videojs](https://github.com/videojs/video.js) >= v6.0.1 loaded
- [videojs-contrib-ads](https://github.com/videojs/videojs-contrib-ads) >= v6.2.0 loaded

Installation
--------------

```
npm install videojs-ima-player
```

Simple example
--------------

```html
<html>
  <head>
    <!-- Load dependent stylesheets. -->
    <link href="path/to/video-js.css" rel="stylesheet">
    <link rel="stylesheet" href="path/to/videojs-contrib-ads.css" />
    <link rel="stylesheet" href="path/to/videojs.ima.css" />
  </head>

  <body>
    <video id="content_video" class="video-js vjs-default-skin"
        controls preload="auto" width="YOUR_VIDEO_WIDTH" height="YOUR_VIDEO_HEIGHT">
      <source src="PATH_TO_YOUR_CONTENT_VIDEO" type="YOUR_CONTENT_VIDEO_TYPE" />
    </video>
    <!-- Load order dependent scripts -->
    <script src="//imasdk.googleapis.com/js/sdkloader/ima3.js"></script>
    <script src="/path/to/videojs.v6.0.1.and.later.js"></script>
    <script src="/path/to/videojs-contrib-ads.v6.2.0.and.later.js"></script>
    <script src="/path/to/videojs.ima.js"></script>
    <script>
      var player = videojs("content_video");
      player.ima({adTagUrl: 'YOUR_AD_TAG'});
    </script>
  </body>
</html>
```

Playlist, quality switcher, etc.
--------------------------------

If content player's source is changed, it reinitialize IMA SDK and play ads again. To prevent this behaviour (i.e. switching quality), 
you have to set ``player.ads.contentSrc="new-source.mp4"`` before calling ``player.src("new-source.mp4")``.

Methods (bound to player.ima)
-----------------------------

**`updateOptions({options})`** -- sets new IMA options. This options is applied once content player source is changed. 

**`play()`** -- call this method to play ad only when autoPlayAdBreaks is set to false and adBreakReady occurs. Otherwise resumes paused ad.

**`pause()`** -- pauses current ad.

Events (bound to player.ima)
----------------------------

[videojs's Player events](https://docs.videojs.com/player#event:beforepluginsetup:$name)

[additional IMA SDK events](https://developers.google.com/interactive-media-ads/docs/sdks/html5/v3/apis#ima.AdEvent.Type)

Usage: `player.ima.on(...)`/`player.ima.off(...)`

Settings
--------

**`adTagUrl`** *(string)*  
url of VMAP/VAST/VPAID resource. REQUIRED IF adsResponse IS NOT PROVIDED.

**`adsResponse`** *(string)*  
response in VMAP/VAST/VPAID form. REQUIRED IF adTagUrl IS NOT PROVIDED.

**`adLabel`** *(string)*  
Translation for text: "Advertisement". Default: "Advertisement"

**`adsRenderingSettings`** *(Object)*  
[IMA SDK ad rendering settings](https://developers.google.com/interactive-media-ads/docs/sdks/html5/v3/apis#ima.AdsRenderingSettings)

**`autoPlayAdBreaks`** *(boolean)*  
Autoplay ads. Default: true

**`contribAdsSettings`** *(Object)*  
settings for [contrib-ads plugin](http://videojs.github.io/videojs-contrib-ads/integrator/options.html).

**`debug`** *(boolean)*  
contrib-ads debug log. Default: false

**`disableFlashAds`** *(boolean)*  
Disables flash ads. Default: IMA SDK default

**`disableCustomPlaybackForIOS10Plus`** *(boolean)*  
Enables inline playback on iOS 10+. Requires playsinline attribute on video tag. Default: false

**`forceNonLinearFullSlot`** *(boolean)*  
Renders non linear ad as linear fullslot. Default: false

**`locale`** *(string)*  
Sets locale based on [ISO 639-1 (two-letter) or ISO 639-2 (three-letter) code](http://www.loc.gov/standards/iso639-2/php/English_list.php). Default: 'en'

**`nonLinearWidth`** *(number)*  
Sets width of non-linear ads. Default: width of content player

**`nonLinearHeight`** *(number)*  
Sets height of non-linear ads. Default: 1/3 of content player height

**`numRedirects`** *(number)*  
Maximum number of VAST redirects. Default: IMA SDK default

**`ofLabel`** *(string)*  
Translation for text "of" (e.g. "1 of 2"). Default: of"

**`showControlsForJSAds`** (boolean)  
Enables controls for VPAID JavaScript ads. Default: true

**`showCountdown`** *(boolean)*  
Enables countdown timer. Default: true

**`timeout`** *(number)*  
contrib-ads hard timeout for loading preroll/postroll ads. Default: 5000

**`vpaidMode`** *(VpaidMode)*  
[google.ima.ImaSdkSettings.VpaidMode](//developers.google.com/interactive-media-ads/docs/sdks/html5/v3/apis#ima.ImaSdkSettings.VpaidMode). Default: ENABLED


Disabled ad autoplay
--------------------

Timing of ad playback is handled by IMA SDK. If autoplayAdBreaks is set to false,
this feature is turned off and is up to you when you play the ad
(once adBreakReady is triggered).

1. Set ```autoPlayAdBreaks``` to false
2. Listen and play on adBreakReady ```player.ima.on('adBreakReady', player.ima.play)```

About timeouts
--------------

This integration use hard timeout 5s. If ad is not loaded within given time,
IMA silently skips current ad and resumes content playback. You can adjust this
timeout by `timeout` setting. As IMA SDK supports only one timeout value, 
different preroll/postroll timeouts are not supported in this plugin. 
Default: `timeout = 5000`, `adsRenderingSettings.loadVideoTimeout = timeout`.