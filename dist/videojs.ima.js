(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('video.js'), require('videojs-contrib-ads')) :
	typeof define === 'function' && define.amd ? define(['video.js', 'videojs-contrib-ads'], factory) :
	(global = global || self, factory(global.videojs));
}(this, function (videojs) { 'use strict';

	videojs = videojs && videojs.hasOwnProperty('default') ? videojs['default'] : videojs;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
	  return typeof obj;
	} : function (obj) {
	  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	};

	var classCallCheck = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

	var createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();

	var get = function get(object, property, receiver) {
	  if (object === null) object = Function.prototype;
	  var desc = Object.getOwnPropertyDescriptor(object, property);

	  if (desc === undefined) {
	    var parent = Object.getPrototypeOf(object);

	    if (parent === null) {
	      return undefined;
	    } else {
	      return get(parent, property, receiver);
	    }
	  } else if ("value" in desc) {
	    return desc.value;
	  } else {
	    var getter = desc.get;

	    if (getter === undefined) {
	      return undefined;
	    }

	    return getter.call(receiver);
	  }
	};

	var inherits = function (subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	  }

	  subClass.prototype = Object.create(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	};

	var possibleConstructorReturn = function (self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return call && (typeof call === "object" || typeof call === "function") ? call : self;
	};

	var RemainingTimeDisplay = videojs.getComponent('RemainingTimeDisplay');
	var TimeDisplay = videojs.getComponent('TimeDisplay');

	var ImaRemainingTimeDisplay = function (_RemainingTimeDisplay) {
		inherits(ImaRemainingTimeDisplay, _RemainingTimeDisplay);

		function ImaRemainingTimeDisplay() {
			classCallCheck(this, ImaRemainingTimeDisplay);
			return possibleConstructorReturn(this, (ImaRemainingTimeDisplay.__proto__ || Object.getPrototypeOf(ImaRemainingTimeDisplay)).apply(this, arguments));
		}

		createClass(ImaRemainingTimeDisplay, [{
			key: 'createEl',

			// modified version of TimeDisplay method

			value: function createEl() {
				// prefix "-" in later versions of vjs7
				// we need to call grandparent
				return TimeDisplay.prototype.createEl.call(this);
			}
		}, {
			key: 'updateTextNode_',
			value: function updateTextNode_() {
				if (!this.contentEl_) {
					return;
				}

				while (this.contentEl_.firstChild) {
					this.contentEl_.removeChild(this.contentEl_.firstChild);
				}

				this.textNode_ = document.createTextNode(this.getRemainingTimeLabel() + (this.formattedTime_ || '-0:00').replace("-", ""));
				this.contentEl_.appendChild(this.textNode_);
			}
		}, {
			key: 'getRemainingTimeLabel',
			value: function getRemainingTimeLabel() {
				var podCount = ': ';
				if (this.player_.totalAds > 1) {
					podCount = ' (' + this.player_.adPosition + ' ' + this.options_.ofLabel + ' ' + this.player_.totalAds + '): ';
				}
				return this.options_.adLabel + podCount;
			}
		}]);
		return ImaRemainingTimeDisplay;
	}(RemainingTimeDisplay);

	videojs.registerComponent('imaRemainingTimeDisplay', ImaRemainingTimeDisplay);

	var version = "0.4.9";

	var Tech = videojs.getTech('Tech');

	var Ima = function (_Tech) {
		inherits(Ima, _Tech);

		function Ima(options, ready) {
			classCallCheck(this, Ima);

			var _this = possibleConstructorReturn(this, (Ima.__proto__ || Object.getPrototypeOf(Ima)).call(this, options, ready));

			_this.contentTracker = {
				previousTime: 0,
				currentTime: 0,
				duration: 0,
				seeking: false
			};

			_this.currentAd = null;
			_this.source = options.source;
			_this.adDisplayContainer = null;
			_this.adsLoader = null;
			_this.adsManager = null;
			_this.width = 0;
			_this.heght = 0;
			_this.screenMode = "";

			// initialized later via handleLateInit_ method
			// called by ImaPlayer
			return _this;
		}

		/* DEFAULT IMA SOURCE OPTIONS */

		createClass(Ima, [{
			key: 'mergeWithDefaults',
			value: function mergeWithDefaults(options) {
				var gis = google.ima.settings;
				return Object.assign({
					showControlsForJSAds: true,
					locale: gis.getLocale(),
					disableFlashAds: gis.getDisableFlashAds(),
					disableCustomPlaybackForIOS10Plus: videojs.browser.IS_IOS,
					numRedirects: gis.getNumRedirects(),
					autoPlayAdBreaks: true,
					vpaidMode: google.ima.ImaSdkSettings.VpaidMode.ENABLED,
					adTagUrl: '',
					adsResponse: '',
					forceNonLinearFullSlot: false,
					nonLinearWidth: 0,
					nonLinearHeight: 0,
					adWillAutoPlay: false,
					adWillAutoMuted: false,
					showCountdown: true,
					adsRenderingSettings: {
						loadVideoTimeout: options.timeout || 5000
					}
				}, options);
			}

			/* THESE ARE Tech's OVERRIDEN METHODS */

		}, {
			key: 'createEl',
			value: function createEl() {
				var divWrapper = document.createElement('div');
				divWrapper.className = 'vjs-tech ima-ad-container';
				divWrapper.id = this.options_.playerId + '-ad-container';

				return divWrapper;
			}
		}, {
			key: 'controls',
			value: function controls() {
				return false;
			}
		}, {
			key: 'poster',
			value: function poster() {
				return null;
			}
		}, {
			key: 'setPoster',
			value: function setPoster() {}
		}, {
			key: 'src',
			value: function src(source) {
				this.setSource(source);
				return this.source;
			}
		}, {
			key: 'currentSrc',
			value: function currentSrc() {
				return this.source.adTagUrl || this.source.adResponse || '';
			}
		}, {
			key: 'setSource',
			value: function setSource(source, init) {
				if (!source || (typeof source === 'undefined' ? 'undefined' : _typeof(source)) !== 'object') {
					return;
				}

				this.source = this.mergeWithDefaults(source);
				if (!init) this.reset();
				this.trigger('loadstart'); // resets player classes

				if (!this.source.adTagUrl && !this.source.adResponse) {
					// if no ads are provided we left tech reseted
					// and let content know that no ads will be played
					if (init) this.triggerReady();
					this.trigger('adsready');
					return;
				}

				this.isReady_ = false;
				this.trigger('waiting');
				this.initAdContainer();
				this.requestAds();
			}
		}, {
			key: 'autoplay',
			value: function autoplay() {
				return this.source && this.source.autoPlayAdBreaks;
			}
		}, {
			key: 'setAutoplay',
			value: function setAutoplay() {}
		}, {
			key: 'loop',
			value: function loop() {
				return false;
			}
		}, {
			key: 'setLoop',
			value: function setLoop() {}
		}, {
			key: 'play',
			value: function play() {
				// state order dispatching
				if (!this.isReady_) {
					console.warn('Ads warning: ads not ready to play yet.');
					return;
				}

				if (!this.adsManager || this.ended()) {
					console.warn('Ads warning: No ads.');
					return;
				}

				if (!this.contentHasStarted_) {
					console.warn('Ads warning: content must be playing.');
					return;
				}

				if (this.isLinearAd() && this.paused()) {
					this.adsManager.resume();
					return;
				}

				if (!this.hasStarted_ || !this.autoplay()) {
					this.start();
					return;
				}
			}
		}, {
			key: 'pause',
			value: function pause() {
				if (this.isLinearAd() && !this.paused()) {
					this.adsManager.pause();
				}
			}
		}, {
			key: 'paused',
			value: function paused() {
				return !!this.paused_;
			}
		}, {
			key: 'currentTime',
			value: function currentTime() {
				var currentTime = this.adsManager ? this.duration() - this.adsManager.getRemainingTime() : 0;
				return currentTime > 0 ? currentTime : 0;
			}
		}, {
			key: 'setCurrentTime',
			value: function setCurrentTime() {}
		}, {
			key: 'seeking',
			value: function seeking() {
				return false;
			}
		}, {
			key: 'seekable',
			value: function seekable() {
				return videojs.createTimeRange();
			}
		}, {
			key: 'playbackRate',
			value: function playbackRate() {
				return 1.0;
			}
		}, {
			key: 'duration',
			value: function duration() {
				return this.currentAd && this.currentAd.getDuration() > 0 ? this.currentAd.getDuration() : 0;
			}
		}, {
			key: 'ended',
			value: function ended() {
				return !!this.ended_;
			}
		}, {
			key: 'volume',
			value: function volume() {
				return this.adsManager ? this.adsManager.getVolume() : 0;
			}
		}, {
			key: 'setVolume',
			value: function setVolume(vol) {
				this.volume_ = vol;
				this.adsManager && this.adsManager.setVolume(vol) || '';
			}
		}, {
			key: 'muted',
			value: function muted() {
				return !!this.muted_;
			}
		}, {
			key: 'setMuted',
			value: function setMuted(mute) {
				if (!this.adsManager) return;

				this.adsManager.setVolume(!mute && this.volume_ ? this.volume_ : 0);
				this.muted_ = !!mute;
			}
		}, {
			key: 'buffered',
			value: function buffered() {
				return videojs.createTimeRange(0, this.currentTime());
			}
		}, {
			key: 'supportsFullScreen',
			value: function supportsFullScreen() {
				return true;
			}
		}, {
			key: 'preload',
			value: function preload() {}
		}, {
			key: 'load',
			value: function load() {}
		}, {
			key: 'reset',
			value: function reset() {
				if (this.adsManager) {
					//Dispose of the IMA SDK
					this.adsManager.stop();
					this.adsManager.destroy();
					this.adsManager = null;
				}
				if (!this.contentCompleted_) {
					this.onContentCompleted();
				}
				this.err = null;
				this.currentAd = null;
				this.muted_ = false;
				this.ended_ = false;
				this.paused_ = false;
				this.contentTracker.previousTime = 0;
				this.contentTracker.currentTime = 0;
				this.contentTracker.duration = 0;
				this.contentTracker.seeking = false;
				this.adsLoader && this.adsLoader.destroy() || '';
				this.adsLoader = null;
				this.adDisplayContainer && this.adDisplayContainer.destroy() || '';
				this.adDisplayContainer = null;
			}
		}, {
			key: 'dispose',
			value: function dispose() {
				this.reset(true);
				this.player_ = null; // allow object to be GCed

				//Needs to be called after the IMA SDK is destroyed, otherwise there will be a null reference exception
				get(Ima.prototype.__proto__ || Object.getPrototypeOf(Ima.prototype), 'dispose', this).call(this);
			}

			/* THESE METHODS ARE CALLED DURING SOURCE INITIALIZATION */

		}, {
			key: 'handleLateInit_',
			value: function handleLateInit_(contentInfo) {
				this.player_ = contentInfo.imaPlayer;
				this.source.contentMediaElement = contentInfo.mediaElement;
				this.source.adWillAutoPlay = contentInfo.autoplay;
				this.source.adWillPlayMuted = contentInfo.muted;
				this.resize(contentInfo);
				this.setSource(this.source, true);
			}
		}, {
			key: 'initAdContainer',
			value: function initAdContainer() {
				this.adDisplayContainer = new google.ima.AdDisplayContainer(this.el_, this.source.contentMediaElement);
				this.setAdsLoader();
			}
		}, {
			key: 'setScreenMode',
			value: function setScreenMode(isFullscreen) {
				this.screenMode = isFullscreen ? google.ima.ViewMode.FULLSCREEN : google.ima.ViewMode.NORMAL;
			}
		}, {
			key: 'setAdsLoader',
			value: function setAdsLoader() {
				this.adsLoader = new google.ima.AdsLoader(this.adDisplayContainer);
				this.adsLoader.getSettings().setLocale(this.source.locale);
				this.adsLoader.getSettings().setDisableFlashAds(this.source.disableFlashAds);
				this.adsLoader.getSettings().setDisableCustomPlaybackForIOS10Plus(this.source.disableCustomPlaybackForIOS10Plus);
				this.adsLoader.getSettings().setVpaidMode(this.source.vpaidMode);
				this.adsLoader.getSettings().setNumRedirects(this.source.numRedirects);
				this.adsLoader.getSettings().setPlayerType('videojs-ima-player');
				this.adsLoader.getSettings().setPlayerVersion(version);
				this.adsLoader.getSettings().setAutoPlayAdBreaks(this.source.autoPlayAdBreaks);

				this.adsLoader.addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, this.onAdEvent.bind(this, this.onAdsManagerLoaded), false);
				this.adsLoader.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, this.onAdEvent.bind(this, this.onAdsLoaderError), false);
			}
		}, {
			key: 'requestAds',
			value: function requestAds() {
				if (!this.source.adTagUrl && !this.source.adsResponse) {
					return;
				}
				var adsRequest = new google.ima.AdsRequest();
				if (this.source.adTagUrl) {
					adsRequest.adTagUrl = this.source.adTagUrl;
				} else {
					adsRequest.adsResponse = this.source.adsResponse;
				}
				adsRequest.forceNonLinearFullSlot = this.source.forceNonLinearFullSlot;
				adsRequest.linearAdSlotWidth = this.width;
				adsRequest.linearAdSlotHeight = this.height;
				adsRequest.nonLinearAdSlotWidth = this.source.nonLinearWidth || adsRequest.linearAdSlotWidth;
				adsRequest.nonLinearAdSlotHeight = this.source.nonLinearHeight || adsRequest.linearAdSlotHeight / 3;
				adsRequest.setAdWillAutoPlay(this.source.adWillAutoPlay);
				adsRequest.setAdWillPlayMuted(this.source.adWillPlayMuted);
				this.adsLoader.requestAds(adsRequest);
			}
		}, {
			key: 'setAdsManager',
			value: function setAdsManager(e) {
				this.adsRenderingSettings = new google.ima.AdsRenderingSettings();
				// this should be handled by contrib ads statefullnes
				//this.adsRenderingSettings.restoreCustomPlaybackStateOnAdBreakComplete = true;
				Object.assign(this.adsRenderingSettings, this.source.adsRenderingSettings || {});

				this.adsManager = e.getAdsManager(this.contentTracker, this.adsRenderingSettings);

				this.adsManager.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, this.onAdEvent.bind(this, this.onAdError));
				this.adsManager.addEventListener(google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED, this.onAdEvent.bind(this, this.onContentPauseRequested));
				this.adsManager.addEventListener(google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED, this.onAdEvent.bind(this, this.onContentResumeRequested));
				this.adsManager.addEventListener(google.ima.AdEvent.Type.ALL_ADS_COMPLETED, this.onAdEvent.bind(this, this.onAllAdsCompleted));
				this.adsManager.addEventListener(google.ima.AdEvent.Type.LOADED, this.onAdEvent.bind(this, this.onAdLoaded));
				this.adsManager.addEventListener(google.ima.AdEvent.Type.STARTED, this.onAdEvent.bind(this, this.onAdStarted));
				this.adsManager.addEventListener(google.ima.AdEvent.Type.CLICK, this.onAdEvent.bind(this, this.onAdClick));
				this.adsManager.addEventListener(google.ima.AdEvent.Type.COMPLETE, this.onAdEvent.bind(this, this.onAdComplete));
				this.adsManager.addEventListener(google.ima.AdEvent.Type.SKIPPED, this.onAdEvent.bind(this, this.onAdSkipped));
				this.adsManager.addEventListener(google.ima.AdEvent.Type.PAUSED,
				// we wont mix player's pause event with this
				this.onAdPaused.bind(this));
				this.adsManager.addEventListener(google.ima.AdEvent.Type.RESUMED, this.onAdEvent.bind(this, this.onAdResumed));
				this.adsManager.addEventListener(google.ima.AdEvent.Type.VOLUME_CHANGED, this.onAdEvent.bind(this, this.onVolumeChanged));
				this.adsManager.addEventListener(google.ima.AdEvent.Type.VOLUME_MUTED, this.onAdEvent.bind(this, this.onVolumeMuted));

				// additional events retriggered to ima player
				this.adsManager.addEventListener(google.ima.AdEvent.Type.AD_BREAK_READY, this.onAdEvent.bind(this, null));
				this.adsManager.addEventListener(google.ima.AdEvent.Type.AD_METADATA, this.onAdEvent.bind(this, null));
				this.adsManager.addEventListener(google.ima.AdEvent.Type.FIRST_QUARTILE, this.onAdEvent.bind(this, null));
				this.adsManager.addEventListener(google.ima.AdEvent.Type.IMPRESSION, this.onAdEvent.bind(this, null));
				this.adsManager.addEventListener(google.ima.AdEvent.Type.INTERACTION, this.onAdEvent.bind(this, null));
				this.adsManager.addEventListener(google.ima.AdEvent.Type.LINEAR_CHANGED, this.onAdEvent.bind(this, null));
				this.adsManager.addEventListener(google.ima.AdEvent.Type.LOG, this.onAdEvent.bind(this, null));
				this.adsManager.addEventListener(google.ima.AdEvent.Type.SKIPPABLE_STATE_CHANGED, this.onAdEvent.bind(this, null));
				this.adsManager.addEventListener(google.ima.AdEvent.Type.MIDPOINT, this.onAdEvent.bind(this, null));
				this.adsManager.addEventListener(google.ima.AdEvent.Type.THIRD_QUARTILE, this.onAdEvent.bind(this, null));
				this.adsManager.addEventListener(google.ima.AdEvent.Type.USER_CLOSE, this.onAdEvent.bind(this, null));

				this.triggerReady();
			}
		}, {
			key: 'initAdsManager',
			value: function initAdsManager() {
				try {
					this.adsManager.init(this.width, this.height, this.screenMode);
					this.adsManager.setVolume(this.volume());
					this.adDisplayContainer.initialize();
					this.adDisplayContainer.initialized = true;
				} catch (adError) {
					this.onAdError(adError);
				}
			}
		}, {
			key: 'start',
			value: function start() {
				if (this.currentAd) {
					console.war('Ad warning: ad is already playing');
					return;
				}

				if (!this.hasStarted_) {
					this.triggerHasStartedEvents();
				}

				try {
					this.adsManager.start();
				} catch (e) {
					this.onAdError(e);
				}
			}

			/* TRIGGER HELPER */

		}, {
			key: 'triggerHasStartedEvents',
			value: function triggerHasStartedEvents() {
				this.trigger('canplay');
				this.trigger('loadedmetadata');
				this.trigger('volumechange');
				this.trigger('firstplay');
				this.trigger('play');
				this.trigger('playing');
			}

			/* THESE CUSTOM METHODS ARE CALLED DIRECTLY BY PLAYER */

		}, {
			key: 'preroll',
			value: function preroll() {
				this.contentHasStarted_ = true;
				if (this.adsManager) {
					this.initAdsManager();
					this.autoplay() && this.play() || '';
				}
			}
		}, {
			key: 'postroll',
			value: function postroll() {
				if (!this.contentCompleted_) {
					this.contentCompleted_ = true;
					this.onContentCompleted();
				}
			}
		}, {
			key: 'resize',
			value: function resize(dimensions) {
				this.width = dimensions.fullscreen ? window.screen.width : dimensions.width;
				this.height = dimensions.fullscreen ? window.screen.height : dimensions.height;
				this.setScreenMode(dimensions.fullscreen);
				if (this.adsManager) {
					this.adsManager.resize(this.width, this.height, this.screenMode);
					this.trigger('resize');
				}
			}

			/* THESE EVENT METHODS MOSTLY HANDLES ADS MANAGER */

		}, {
			key: 'onOptionsChanged',
			value: function onOptionsChanged(options) {
				if (options) {
					this.options_ = Object.assign(this.source, options);
				}
			}
		}, {
			key: 'onAdsLoaderError',
			value: function onAdsLoaderError(e) {
				this.onAdError(e, 'AdsLoader');
			}
		}, {
			key: 'onAdError',
			value: function onAdError(e, source) {
				var type = (source || 'Ad') + ' error: ';
				var msg = e.getError !== undefined ? e.getError().getMessage() : e.stack;
				console.warn('VIDEOJS: ' + type + msg);
				this.trigger('adserror');
			}
		}, {
			key: 'onAdsManagerLoaded',
			value: function onAdsManagerLoaded(e) {
				this.setAdsManager(e);
				this.trigger('adsready', this.adsManager.getCuePoints());
			}
		}, {
			key: 'onAdLoaded',
			value: function onAdLoaded(e) {
				this.currentAd = e.getAd();

				var adPosition = 0,
				    totalAds = 0;

				if (this.currentAd.getAdPodInfo && this.currentAd.getAdPodInfo()) {
					adPosition = this.currentAd.getAdPodInfo().getAdPosition();
					totalAds = this.currentAd.getAdPodInfo().getTotalAds();
				}
				this.trigger('adchange', {
					adPosition: adPosition,
					totalAds: totalAds
				});

				this.isLinearAd() ? this.onLinearAdLoaded() : this.onNonLinearAdLoaded();
			}
		}, {
			key: 'onLinearAdLoaded',
			value: function onLinearAdLoaded() {
				this.trigger('waiting');
				this.trigger('ratechange');
				this.trigger('durationchange');
			}
		}, {
			key: 'onNonLinearAdLoaded',
			value: function onNonLinearAdLoaded() {}
		}, {
			key: 'onContentPauseRequested',
			value: function onContentPauseRequested() {
				var isJSAd = this.currentAd && this.currentAd.getContentType() === 'application/javascript';
				this.trigger('linearadstarted', !isJSAd || this.source.showControlsForJSAds);
				this.trigger('waiting');
			}
		}, {
			key: 'onContentResumeRequested',
			value: function onContentResumeRequested() {
				// skip sdk nopostroll/nopreroll calls, we have our own
				this.trigger('linearadended');
			}
		}, {
			key: 'onAdStarted',
			value: function onAdStarted() {
				this.isLinearAd() ? this.onLinearAdStarted() : this.onNonLinearStarted();
			}
		}, {
			key: 'onLinearAdStarted',
			value: function onLinearAdStarted() {
				this.trigger('playing');
			}
		}, {
			key: 'onNonLinearStarted',
			value: function onNonLinearStarted() {
				this.trigger('nonlinearadstarted');
			}
		}, {
			key: 'onAdSkipped',
			value: function onAdSkipped() {
				if (this.paused()) {
					this.onAdResumed();
				}
				this.onAdComplete();
			}
		}, {
			key: 'onAdComplete',
			value: function onAdComplete() {
				this.isLinearAd() ? this.onLinearAdEnded() : this.onNonLinearAdEnded();
				this.currentAd = null;
			}
		}, {
			key: 'onLinearAdEnded',
			value: function onLinearAdEnded() {}
		}, {
			key: 'onNonLinearAdEnded',
			value: function onNonLinearAdEnded() {
				this.trigger('nonlinearadended');
			}
		}, {
			key: 'onAllAdsCompleted',
			value: function onAllAdsCompleted() {
				this.ended_ = true;
				this.trigger('ended');
				this.reset();
			}
		}, {
			key: 'onAdPaused',
			value: function onAdPaused() {
				this.paused_ = true;
				this.trigger('pause');
			}
		}, {
			key: 'onAdResumed',
			value: function onAdResumed() {
				this.paused_ = false;
				this.trigger('play');
			}
		}, {
			key: 'onAdClick',
			value: function onAdClick() {
				this.pause();
			}
		}, {
			key: 'onVolumeChanged',
			value: function onVolumeChanged() {
				this.trigger('volumechange');
			}
		}, {
			key: 'onVolumeMuted',
			value: function onVolumeMuted() {
				this.trigger('volumechange');
			}
		}, {
			key: 'onContentCompleted',
			value: function onContentCompleted() {
				this.adsLoader && this.adsLoader.contentComplete() || '';
			}
		}, {
			key: 'onAdEvent',
			value: function onAdEvent(callback, e) {
				this.player_.trigger(e);
				if (typeof callback === "function") {
					callback.call(this, e);
				}
			}

			// only helper shortcut method

		}, {
			key: 'isLinearAd',
			value: function isLinearAd() {
				return this.adsManager && this.currentAd && this.currentAd.isLinear();
			}
		}]);
		return Ima;
	}(Tech);

	Ima.isSupported = function () {
		return true;
	};

	Ima.canPlaySource = function (source) {
		return this.canPlayType(source);
	};

	Ima.canPlayType = function (source) {
		return source && source.type === 'video/ima';
	};

	videojs.registerTech('Ima', Ima);

	var Player = videojs.getComponent('Player');

	// Player is subclass of Component so is usable as part of parent player
	// plus is fully customizable and independent from content player

	var ImaPlayer = function (_Player) {
		inherits(ImaPlayer, _Player);

		function ImaPlayer(contentPlayer, options) {
			classCallCheck(this, ImaPlayer);

			// serve tag placeholder to player

			var adPlayerContainer = document.createElement('div');
			adPlayerContainer.id = contentPlayer.id_ + '_ima';
			adPlayerContainer.className = "vjs-ima video-js";

			options.src = options.adTagUrl || options.adsResponse || 'placeholder';
			options.type = 'video/ima';

			// sets basic player
			// passes src placeholder to tech
			// sets customized remaining time component

			var _this = possibleConstructorReturn(this, (ImaPlayer.__proto__ || Object.getPrototypeOf(ImaPlayer)).call(this, adPlayerContainer, {
				controls: false,
				sources: [options],
				techOrder: ["ima"],
				controlBar: {
					imaRemainingTimeDisplay: {
						adLabel: options.adLabel || 'Advertisement',
						ofLabel: options.ofLabel || 'of'
					},
					children: ['playToggle', 'volumePanel', 'imaRemainingTimeDisplay', 'progressControl', 'customControlSpacer', 'fullscreenToggle']
				},
				children: ['mediaLoader', 'loadingSpinner', 'controlBar', 'errorDisplay']
			}));

			_this.resizeType = contentPlayer.resizeManager ? 'playerresize' : ['resize', 'fullscreenchange'];

			_this.hide();

			// remove it from exposed players in case that somebody
			// would manipulate with them globally
			Player.players[_this.id_] = null;

			_this.imaOptions = options;

			// through events we have these values up to date
			// and exposed for component imaRemainingTimeDisplay
			_this.adPosition = 0;
			_this.totalAds = 0;
			_this.adsReadyTriggered = false;
			_this.noPreroll = false;
			_this.noPostroll = false;

			// we wont toggle content player controls if controls disabled
			_this.contentControlsDisabled = !contentPlayer.controls();
			_this.contentPlayer = contentPlayer;

			_this.isMobile = videojs.browser.IS_IOS || videojs.browser.IS_ANDROID;
			if (_this.isMobile) _this.addClass('vjs-ima-mobile');

			_this.setRemainingTimeVisibility();
			_this.trackContentEvents();

			// wait a tick to get content info
			_this.setTimeout(function () {
				_this.tech_.handleLateInit_({
					imaPlayer: _this,
					mediaElement: _this.getContentTechElement(),
					width: contentPlayer.currentWidth(),
					height: contentPlayer.currentHeight(),
					fullscreen: contentPlayer.isFullscreen(),
					autoplay: contentPlayer.autoplay(),
					muted: contentPlayer.muted()
				});
			});

			_this.contentPlayer.ready(_this.handleContentResize_.bind(_this));
			return _this;
		}

		// OVERRIDES default method
		// we want aditional events on loadTech


		createClass(ImaPlayer, [{
			key: 'loadTech_',
			value: function loadTech_(techName, source) {
				get(ImaPlayer.prototype.__proto__ || Object.getPrototypeOf(ImaPlayer.prototype), 'loadTech_', this).call(this, techName, source);
				this.trackImaEvents();
			}

			// OVERRIDES default method
			// calls api through contentPlayer

		}, {
			key: 'requestFullscreen',
			value: function requestFullscreen() {
				if (!this.contentPlayer.isFullscreen()) {
					this.contentPlayer.requestFullscreen();
				}
			}

			// OVERRIDES default method
			// calls api through contentPlayer

		}, {
			key: 'exitFullscreen',
			value: function exitFullscreen() {
				if (this.contentPlayer.isFullscreen()) {
					this.contentPlayer.exitFullscreen();
				}
			}

			// OVERRIDES default method
			// we wont reset waiting on timeupdate
			// because tracker must run also during ads

		}, {
			key: 'handleTechWaiting_',
			value: function handleTechWaiting_() {
				this.addClass('vjs-waiting');
				this.trigger('waiting');
			}

			// OVERRIDES default method
			// there are aditional jobs that needs to be done

		}, {
			key: 'reset',
			value: function reset() {
				this.setContentPlayerToDefault();
				this.noPreroll = false;
				this.noPostroll = false;
				get(ImaPlayer.prototype.__proto__ || Object.getPrototypeOf(ImaPlayer.prototype), 'reset', this).call(this);
				this.handleTechAdsReady_();
			}

			/* THESE METHODS ARE PART OF TECH INITIALIZATION */

		}, {
			key: 'trackContentEvents',
			value: function trackContentEvents() {
				this.on(this.contentPlayer, 'seek', this.handleContentSeek_);
				this.on(this.contentPlayer, 'seekend', this.handleContentSeekEnd_);
				this.on(this.contentPlayer, 'durationchange', this.handleContentDurationChange_);
				this.on(this.contentPlayer, 'timeupdate', this.handleContentTimeUpdate_);
				this.on(this.contentPlayer, this.resizeType, this.handleContentResize_);
				this.on(this.contentPlayer, 'contentupdate', this.handleContentChanged_);
				this.on(this.contentPlayer, 'readyforpreroll', this.handleContentReadyForPreroll_);
				this.on(this.contentPlayer, 'readyforpostroll', this.handleContentReadyForPostroll_);
			}
		}, {
			key: 'trackImaEvents',
			value: function trackImaEvents() {
				// these events are removed together with tech
				this.on(this.tech_, 'adsready', this.handleTechAdsReady_);
				this.on(this.tech_, 'adchange', this.handleTechAdChange_);
				this.on(this.tech_, 'linearadstarted', this.handleTechLinearAdStarted_);
				this.on(this.tech_, 'linearadended', this.handleTechLinearAdEnded_);
				this.on(this.tech_, 'nonlinearadstarted', this.handleTechNonLinearAdStarted_);
				this.on(this.tech_, 'nonlinearadended', this.handleTechNonLinearAdEnded_);
				this.on(this.tech_, 'adserror', this.handleTechAdsError_);
			}
		}, {
			key: 'setContentPlayerToDefault',
			value: function setContentPlayerToDefault() {
				this.handleTechLinearAdEnded_();
				this.handleTechNonLinearAdEnded_();
			}
		}, {
			key: 'getContentTechElement',
			value: function getContentTechElement() {
				if (this.contentPlayer.techName_ !== "Html5" && !this.contentPlayer.tech_.el_.canPlayType) {
					this.contentPlayer.tech_.el_.canPlayType = function () {
						return false;
					};
				}
				return this.contentPlayer.tech_.el_;
			}
		}, {
			key: 'setRemainingTimeVisibility',
			value: function setRemainingTimeVisibility() {
				if (this.imaOptions.showCountdown === false) {
					this.controlBar.imaRemainingTimeDisplay.hide();
					return;
				}
				this.controlBar.imaRemainingTimeDisplay.show();
			}

			/* IMA PLAYER METHODS USABLE FROM GLOBAL SPACE (PUBLIC) */

		}, {
			key: 'updateOptions',
			value: function updateOptions(options) {
				if (this.imaOptions && options) {
					Object.assign(this.imaOptions, options);
				}

				// force next call player.src to reset contrib-ads
				// even if source is the same
				this.contentPlayer.ads.contentSrc = "";
			}

			/* THESE METHODS CONTROLS CONTENT PLAYER */

		}, {
			key: 'resumeContent',
			value: function resumeContent() {
				if (!this.contentEnded) {
					this.contentPlayer.play();
				}
			}
		}, {
			key: 'pauseContent',
			value: function pauseContent() {
				if (!this.contentEnded) {
					this.contentPlayer.pause();
				}
			}
		}, {
			key: 'setContentControls',
			value: function setContentControls(bool) {
				if (!this.contentControlsDisabled) {
					this.contentPlayer.controls(bool);
				}
			}
		}, {
			key: 'skipLinearAdMode',
			value: function skipLinearAdMode() {
				if (this.contentPlayer.ads.isWaitingForAdBreak()) {
					this.contentPlayer.ads.skipLinearAdMode();
				}
			}

			/* THESE METHODS HANDLES CONTENT PLAYER */

		}, {
			key: 'handleContentReadyForPreroll_',
			value: function handleContentReadyForPreroll_() {
				if (this.noPreroll) {
					this.skipLinearAdMode();
				}
				this.techCall_('preroll');
				this.noPreroll = true;
			}
		}, {
			key: 'handleContentReadyForPostroll_',
			value: function handleContentReadyForPostroll_() {
				// triggers only once per source
				if (this.noPostroll) {
					this.skipLinearAdMode();
				}
				if (!this.contentEnded) {
					this.contentEnded = true;
					this.techCall_('postroll');
				}
				this.noPostroll = true;
			}
		}, {
			key: 'handleContentChanged_',
			value: function handleContentChanged_() {
				this.setContentPlayerToDefault();
				this.contentEnded = false;
				this.noPreroll = false;
				this.noPostroll = false;
				this.adsReadyTriggered = false;
				this.imaOptions.contentMediaElement = this.getContentTechElement();
				this.src(this.imaOptions);
				this.setRemainingTimeVisibility();
			}
		}, {
			key: 'handleContentTimeUpdate_',
			value: function handleContentTimeUpdate_() {
				var _this2 = this;

				this.ready(function () {
					_this2.tech_.contentTracker.previousTime = _this2.tech_.contentTracker.currentTime;
					_this2.tech_.contentTracker.currentTime = _this2.contentPlayer.currentTime();
				});
			}
		}, {
			key: 'handleContentResize_',
			value: function handleContentResize_() {
				this.isFullscreen(this.contentPlayer.isFullscreen());
				this.techCall_('resize', {
					width: this.contentPlayer.currentWidth(),
					height: this.contentPlayer.currentHeight(),
					fullscreen: this.isFullscreen()
				});
			}
		}, {
			key: 'handleContentDurationChange_',
			value: function handleContentDurationChange_() {
				var _this3 = this;

				this.ready(function () {
					_this3.tech_.contentTracker.duration = _this3.contentPlayer.duration();
				});
			}
		}, {
			key: 'handleContentSeek_',
			value: function handleContentSeek_() {
				var _this4 = this;

				this.ready(function () {
					_this4.tech_.contentTracker.seeking = true;
				});
			}
		}, {
			key: 'handleContentSeekEnd_',
			value: function handleContentSeekEnd_() {
				var _this5 = this;

				this.ready(function () {
					_this5.tech_.contentTracker.seeking = false;
				});
			}

			/* THESE METHODS HANDLES IMA TECH */

		}, {
			key: 'handleTechAdsReady_',
			value: function handleTechAdsReady_(e, cuePoints) {
				this.noPreroll = !cuePoints;
				this.noPostroll = !cuePoints || !cuePoints.includes(-1);
				if (!this.adsReadyTriggered) {
					this.adsReadyTriggered = true;
					this.contentPlayer.trigger('adsready');
				}
			}
		}, {
			key: 'handleTechAdChange_',
			value: function handleTechAdChange_(e, adPodInfo) {
				this.adPosition = adPodInfo.adPosition;
				this.totalAds = adPodInfo.totalAds;
			}
		}, {
			key: 'handleTechLinearAdStarted_',
			value: function handleTechLinearAdStarted_(e, isControlsAllowed) {
				if (this.contentPlayer.ads.inAdBreak()) {
					return;
				}

				this.volume(this.contentPlayer.volume());
				this.muted(this.contentPlayer.muted());
				this.contentPlayer.ads.startLinearAdMode();
				this.contentPlayer.trigger('ads-ad-started');
				this.setContentControls(false);
				this.controls(isControlsAllowed);
				this.pauseContent();
				this.show();
			}
		}, {
			key: 'handleTechLinearAdEnded_',
			value: function handleTechLinearAdEnded_() {
				if (!this.contentPlayer.ads.inAdBreak()) {
					// covers silent errors like skippable on IOS
					this.skipLinearAdMode();
					return;
				}

				this.contentPlayer.volume(this.volume());
				this.contentPlayer.muted(this.muted());
				this.contentPlayer.ads.endLinearAdMode();
				this.controls(false);
				this.setContentControls(true);
				this.hide();
				this.resumeContent();
			}
		}, {
			key: 'handleTechNonLinearAdStarted_',
			value: function handleTechNonLinearAdStarted_() {
				this.controls(false);
				this.contentPlayer.addClass('non-linear-ad');
				this.show();
			}
		}, {
			key: 'handleTechNonLinearAdEnded_',
			value: function handleTechNonLinearAdEnded_() {
				this.contentPlayer.removeClass('non-linear-ad');
				this.hide();
			}
		}, {
			key: 'handleTechAdsError_',
			value: function handleTechAdsError_() {
				this.hide();
				this.removeClass('waiting');
				this.reset();
			}
		}]);
		return ImaPlayer;
	}(Player);

	// registers player as normal component


	videojs.registerComponent('imaPlayer', ImaPlayer);

	// basic plugin is enough for this purpose
	videojs.registerPlugin('ima', function (options) {
		// inits contrib-ads asap if not initialized yet
		if (!this.ads) {
			console.error("ima-player error: contrib-ads must be registered on player.");
			return;
		}

		if (typeof this.ads === "function") {
			this.ads(Object.assign({
				debug: options.debug || false,
				timeout: options.timeout || 5000
			}, options.contribAdsSettings || {}));
		}

		this.ima = this.addChild('imaPlayer', options);
	});

}));
