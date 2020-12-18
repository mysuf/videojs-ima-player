## 0.5.5

* fixed unresponsive volume ad controls with moatwrapper

## 0.5.4

* fixed another mute/volume mess

## 0.5.3

* fixed volume/mute bug after IMA SDK new release
* updated some packages

## 0.5.2

* removed poster to reduce size

## 0.5.1

* hotfix to prevent resume if content not started

## 0.5.0

* fixed resume after skippable on ios

## 0.4.9

* fixed timeout for preroll/postroll if no ads

## 0.4.8

* fixed vulnerabilities and tests

## 0.4.7

* check already initialized contrib-ads

## 0.4.6

* npm publish

## 0.4.5

* fixed vulnerability
* contentchanged -> contentupdate
* removed always true condition

## 0.4.4

* dropped videojs v5 support
* added support from v6.0.1 (v6.0.0 does not use setSource by mw)
* fixed mute icon

## 0.4.3

* another resize fixes

## 0.4.2

* fixed ima triggering resize 

## 0.4.1

* fixed vulnerabilities

## 0.4.0

* improved bundling
* added examples to npm
* added global videojs import

## 0.3.9

* removed prerollScheduled as it broke unscheduled ads

## 0.3.8

* fixed resize handling

## 0.3.7

* videojs up to v7
* upgraded geckodriver, webdriver, etc
* added playbackRate tech method
* more tests, fixed too fast webdriver click by ready event

## 0.3.6

* initial resize bound to content player
* added ima volume events to handle bar properly
* changed command order of start/end linear ad to fix undefined content player

## 0.3.5

* fixed initial dimensions
* fixed ima corner case where currentAd is not defined

## 0.3.4

* fixed timeout default value

## 0.3.3

* sorted timeouts
* README about timeouts

## 0.3.2

* autoplay and muted state passed to IMA SDK
* added autoplay example

## 0.3.1

* fixed contrib-ads loading spinner
* fixed tooltip's z-index when non-linear ad is playing

## 0.3.0

* fixed tech triggering internal adsready event

## 0.2.9

* fixed missing adsready after reset

## 0.2.8

* simplified nopreroll/nopostroll logic
* covers also silent ima errors like skippable on IOS

## 0.2.7

* fixed content tech change
* removed useless code

## 0.2.6

* fixed content tech element reference when content changes
* removed unsafe fullReset, now it fully resets always
* fixed contrib-ads loading-spinner bug

## 0.2.5

* implemented isWaitingForAdBreak() method
* updated contrib-ads dependency 

## 0.2.4

* npm version

## 0.2.3

* fixed remainingTime layer index

## 0.2.2

* added showCountdown feature, removed allowVpaid option

## 0.2.1

* reset playToggle when ad skipped when paused

## 0.2.0

* fixed wrong order of tech's play method

## 0.1.9

* prevented ads-loading spinner from content player

## 0.1.8

* added v5 volumebar

## 0.1.7

* npm version

## 0.1.6

* added videojs v5 support

## 0.1.0

* Initial release.