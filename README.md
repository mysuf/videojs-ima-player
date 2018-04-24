# IMA plugin for Video.js

## Introduction
The customized IMA plugin for Video.js is alternative to official 
[IMA SDK integration](https://github.com/googleads/videojs-ima). 
Uses IMA SDK library to parse VAST/VPAID tag and manage ads.

## Features
- uses native videojs UI for ad playback
- is easy to use

## Requirements
- IMA SDK js binary loaded
- videojs v5.19.2 and greater(including v6) loaded
- videojs-contrib-ads v6 loaded

## Installation
```
npm install videojs-ima-player
```

## Simple example

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
    <script src="/path/to/video.v5.or.v6.js"></script>
    <script src="/path/to/videojs-contrib-ads.v6.js"></script>
    <script src="/path/to/videojs.ima.js"></script>
    <script>
      var player = videojs("content_video");
      player.ima({adTagUrl: 'YOUR_AD_TAG'});
    </script>
  </body>
</html>
```

## Methods (bound to player.ima)

`updateOptions({options})` -- sets new IMA options. This options is applied once content player source is changed. 
To prevent contrib-ads trigger contentchanged (i.e. switching quality), 
you have to set ``player.ads.contentSrc="new-source.mp4"`` before calling ``player.src("new-source.mp4")``.

Set ``fullReset: true`` if you are going to change one of these settings: ``vpaidMode``, ``numRedirects``, ``autoPlayAdBreaks``, ``locale``

`play()` -- call this method to play ad only when autoPlayAdBreaks is set to false and adBreakReady occurs. Otherwise resumes paused ad.


`pause()` -- pauses current ad.



## Additional settings

| Settings | Type | Description |
|----------|------|-------------|
| adTagUrl               | string       | REQUIRED IF adsResponse IS NOT PROVIDED A URL which returns a VAST, VMAP or ad rules,response. |
| adsResponse            | string       | REQUIRED IF adTagUrl IS NOT PROVIDED The VAST, VMAP, or ad rules response to use,in lieu of fetching one an ad tag. |
| adLabel                | string       | Replaces the "Advertisement" text in the ad label. Added for multilingual UI support. |
| adsRenderingSettings   | object       | JSON object with ads rendering settings as defined in the IMA SDK,Docs(1). |
| autoPlayAdBreaks       | boolean      | Whether or not to automatically play VMAP or ad rules ad breaks. Defaults,to true. |
| contribAdsSettings     | object       | Additional settings to be passed to the contrib-ads plugin(2), used by,this IMA plugin. |
| debug                  | boolean      | True to load the debug version of the plugin, false to load the non-debug version.,Defaults to false. |
| disableFlashAds        | boolean      | True to disable Flash ads - Flash ads will be considered an unsupported ad type. Defaults to false. |
| disableCustomPlaybackForIOS10Plus | boolean      | Sets whether to disable custom playback on iOS 10+ browsers. If true, ads will play inline if the content video is inline. Defaults to false. |
| forceNonLinearFullSlot | boolean      | True to force non-linear AdSense ads to render as linear fullslot.,If set, the content video will be paused and the non-linear text or image ad will be rendered as,fullslot. The content video will resume once the ad has been skipped or closed. |
| fullReset              | boolean      | Fully resets IMA SDK during contentchange. Usable when options differs deeply. |
| locale                 | string       | Locale for ad localization. This may be any,ISO 639-1 (two-letter) or ISO 639-2,(three-letter) code(3). Defaults to 'en'. |
| nonLinearWidth         | number       | Desired width of non-linear ads. Defaults to player width. |
| nonLinearHeight        | number       | Desired height for non-linear ads. Defaults to 1/3 player height. |
| numRedirects           | number       | Maximum number of VAST redirects before the subsequent redirects will be denied,,and the ad load aborted. The number of redirects directly affects latency and thus user experience.,This applies to all VAST wrapper ads. |
| ofLabel                | string       | Replaces the "of" text in the ad label. Added for multilingual UI support. |
| showControlsForJSAds   | boolean      | Whether or not to show the control bar for VPAID JavaScript ads. Defaults to true. |
| showCountdown          | boolean      | Whether or not to show the ad countdown timer. Defaults to true. |
| vpaidAllowed           | boolean      | (DEPRECATED, please use vpaidMode). |
| vpaidMode              | VpaidMode(4) | VPAID Mode. Defaults to ENABLED. This setting,overrides vpaidAllowed. |


(1) [IMA SDK Docs](//developers.google.com/interactive-media-ads/docs/sdks/html5/v3/apis)
<br />
(2) [contrib-ads plugin](//github.com/videojs/videojs-contrib-ads)
<br />
(3) [Valid locale codes](http://www.loc.gov/standards/iso639-2/php/English_list.php)
<br />
(4) [google.ima.ImaSdkSettings.VpaidMode](//developers.google.com/interactive-media-ads/docs/sdks/html5/v3/apis#ima.ImaSdkSettings.VpaidMode)

## Disabled ad autoplay
Normally, IMA SDK handles playing ads alone. If autoplayAdBreaks is set to false,
this feature is turned off and is up to you when you play the ad
(once adBreakReady is triggered).

1. Set ```autoPlayAdBreaks``` to false
2. Listen and play on adBreakReady ```player.ima.on('adBreakReady', player.ima.play)```
