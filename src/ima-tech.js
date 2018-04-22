
import pkg from '../package.json';

const Tech = videojs.getTech('Tech');

class Ima extends Tech {
	constructor(options, ready) {
		super(options, ready);

		this.contentTracker = {
			previousTime: 0,
			currentTime: 0,
			duration: 0,
			seeking: false
		};

		this.currentAd = null;
		this.source = options.source;
		this.contentMediaElement = null;
		this.adDisplayContainer = null;
		this.adsLoader = null;
		this.adsManager = null;
		this.width = 0;
		this.heght = 0;
		this.screenMode = "";

		// initialized later via handleLateInit_ method
		// called by ImaPlayer
	}

	/* DEFAULT IMA SOURCE OPTIONS */

	mergeWithDefaults(options) {
		var gis = google.ima.settings;
		var source = Object.assign({
			fullReset: false,
			showControlsForJSAds: true,
			locale: gis.getLocale(),
			disableFlashAds: gis.getDisableFlashAds(),
			disableCustomPlaybackForIOS10Plus: gis.getDisableCustomPlaybackForIOS10Plus(),
			numRedirects: gis.getNumRedirects(),
			autoPlayAdBreaks: true,
			vpaidMode: google.ima.ImaSdkSettings.VpaidMode.ENABLED,
			vpaidAllowed: true,
			adTagUrl: '',
			adsResponse: '',
			forceNonLinearFullSlot: false,
			nonLinearWidth: 0,
			nonLinearHeight: 0,
			adWillAutoPlay: false,
			adWillAutoMuted: false,
			showCountdown: true,
			adsRenderingSettings: {
				loadVideoTimeout: 5000
			},
		}, options);
		source.vpaidMode = !source.vpaidAllowed ? 
			google.ima.ImaSdkSettings.VpaidMode.DISABLED : source.vpaidMode;

		// Set SDK settings from plugin settings.
		/* eslint no-undef: 'error' */
		/* global google */
		google.ima.settings.setLocale(source.locale);
		google.ima.settings.setDisableFlashAds(source.disableFlashAds);
		google.ima.settings.setDisableCustomPlaybackForIOS10Plus(source.disableCustomPlaybackForIOS10Plus);
		return source;
	}

	/* THESE ARE Tech's OVERRIDEN METHODS */

	createEl() {
		var divWrapper = document.createElement('div');
		divWrapper.className = 'vjs-tech ima-ad-container';
		divWrapper.id = this.options_.playerId + '-ad-container';

		return divWrapper;
	}

	controls() {
		return false;
	}

	poster() {
		return null;
	}

	setPoster() {}

	src(source) {
		this.setSource(source);
		return this.source;
	}

	currentSrc() {
		return this.source.adTagUrl||this.source.adResponse||'';
	}

	setSource(source, init) {
		if (!source || typeof source !== 'object') {
			return;
		}

		if (!init) this.reset();

		this.trigger('loadstart'); // resets player classes

		if (!source.adTagUrl && !source.adResponse) {
			// if no ads are provided we left tech reseted
			// and let content know that no ads will be played
			init ? this.triggerReady() : '';
			this.trigger('noads');
			return;
		}

		this.isReady_ = false;
		this.trigger('waiting');
		this.source = this.mergeWithDefaults(source);
		if (!this.adsLoader) {
			this.initAdContainer();
		}
		this.requestAds();
	}

	autoplay() {
		return this.source && this.source.autoPlayAdBreaks;
	}

	setAutoplay() {}

	loop() {
		return false;
	}

	setLoop() {}

	play() {
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

	pause() {
		if (this.isLinearAd() && !this.paused()) {
			this.adsManager.pause();
		}
	}

	paused() {
		return !!this.paused_;
	}

	currentTime() {
		let currentTime = this.adsManager ? this.duration() - this.adsManager.getRemainingTime(): 0;
		return currentTime > 0 ? currentTime : 0;
	}

	setCurrentTime() {}

	seeking () {
		return false;
	}

	seekable () {
		return videojs.createTimeRange();
	}

	duration() {
		return this.currentAd && this.currentAd.getDuration() > 0 ? 
			this.currentAd.getDuration() : 0;
	}

	ended() {
		return !!this.ended_;
	}

	volume() {
		return this.adsManager ? this.adsManager.getVolume() : 0;
	}

	setVolume(vol) {
		this.adsManager && this.adsManager.setVolume(vol) || '';
		this.volume_ = vol;
	}

	muted() {
		return !!this.muted_;
	}

	setMuted(mute) {
		if (!this.adsManager) return;

		this.adsManager.setVolume(!mute && this.volume_ ? this.volume_ : 0);
		this.muted_ = !!mute;

		this.setTimeout( function(){
			this.trigger('volumechange');
		}, 50);
	}

	buffered() {
		return videojs.createTimeRange(0, this.currentTime());
	}

	supportsFullScreen() {
		return true;
	}

	preload() {}
	load() {}

	reset(full) {
		full = full != undefined ? 
			full : this.source.fullReset;
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

		if (full) {
			this.adsLoader && this.adsLoader.destroy()||'';
			this.adsLoader = null;
			this.adDisplayContainer && this.adDisplayContainer.destroy()||'';
			this.adDisplayContainer = null;
		}
	}

	dispose() {
		this.reset(true);

		//Needs to be called after the IMA SDK is destroyed, otherwise there will be a null reference exception
		super.dispose.call(this);
	}

	/* THESE METHODS ARE CALLED DURING SOURCE INITIALIZATION */

	handleLateInit_(contentInfo) {
		this.player_ = contentInfo.imaPlayer;
		this.contentMediaElement = contentInfo.mediaElement;
		this.resize(contentInfo);
		this.setSource(this.options_.source, true);
	}

	initAdContainer() {
		this.adDisplayContainer = new google.ima.AdDisplayContainer(this.el_, this.contentMediaElement);
		this.setAdsLoader();
	}

	setScreenMode(isFullscreen) {
		this.screenMode = isFullscreen ?
			google.ima.ViewMode.FULLSCREEN : google.ima.ViewMode.NORMAL;
	}

	setAdsLoader() {
		this.adsLoader = new google.ima.AdsLoader(this.adDisplayContainer);
		this.adsLoader.getSettings().setVpaidMode(this.source.vpaidMode);
		this.adsLoader.getSettings().setLocale(this.source.locale);
		this.adsLoader.getSettings().setNumRedirects(this.source.numRedirects);
		this.adsLoader.getSettings().setPlayerType('videojs-ima-player');
		this.adsLoader.getSettings().setPlayerVersion(pkg.version);
		this.adsLoader.getSettings().setAutoPlayAdBreaks(this.source.autoPlayAdBreaks);

		this.adsLoader.addEventListener(
			google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, 
			this.onAdEvent.bind(this, this.onAdsManagerLoaded), 
			false);
		this.adsLoader.addEventListener(
			google.ima.AdErrorEvent.Type.AD_ERROR,
			this.onAdEvent.bind(this, this.onAdsLoaderError),
			false);
	}

	requestAds() {
		if (!this.source.adTagUrl && !this.source.adsResponse) {
			return;
		}
		const adsRequest = new google.ima.AdsRequest();
		if (this.source.adTagUrl) {
			adsRequest.adTagUrl = this.source.adTagUrl;
		} else {
			adsRequest.adsResponse = this.source.adsResponse;
		}
		adsRequest.forceNonLinearFullSlot = this.source.forceNonLinearFullSlot;
		adsRequest.linearAdSlotWidth = this.width;
		adsRequest.linearAdSlotHeight = this.height;
		adsRequest.nonLinearAdSlotWidth = this.source.nonLinearWidth || adsRequest.linearAdSlotWidth;
		adsRequest.nonLinearAdSlotHeight = this.source.nonLinearHeight || (adsRequest.linearAdSlotHeight / 3);
		adsRequest.setAdWillAutoPlay(this.source.adWillAutoPlay);
		adsRequest.setAdWillPlayMuted(this.source.adWillPlayMuted);
		this.adsLoader.requestAds(adsRequest);
	}

	setAdsManager(e) {
		this.adsRenderingSettings = new google.ima.AdsRenderingSettings();
		// this should be handled by contrib ads statefullnes
		//this.adsRenderingSettings.restoreCustomPlaybackStateOnAdBreakComplete = true;
		Object.assign(this.adsRenderingSettings, this.source.adsRenderingSettings||{});

		this.adsManager = e.getAdsManager(this.contentTracker, this.adsRenderingSettings);

		this.adsManager.addEventListener(
			google.ima.AdErrorEvent.Type.AD_ERROR,
			this.onAdEvent.bind(this, this.onAdError));
		this.adsManager.addEventListener(
			google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED,
			this.onAdEvent.bind(this, this.onContentPauseRequested));
		this.adsManager.addEventListener(
			google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED,
			this.onAdEvent.bind(this, this.onContentResumeRequested));
		this.adsManager.addEventListener(
			google.ima.AdEvent.Type.ALL_ADS_COMPLETED,
			this.onAdEvent.bind(this, this.onAllAdsCompleted));
		this.adsManager.addEventListener(
			google.ima.AdEvent.Type.LOADED,
			this.onAdEvent.bind(this, this.onAdLoaded));
		this.adsManager.addEventListener(
			google.ima.AdEvent.Type.STARTED,
			this.onAdEvent.bind(this, this.onAdStarted));
		this.adsManager.addEventListener(
			google.ima.AdEvent.Type.CLICK,
			this.onAdEvent.bind(this, this.onAdClick));
		this.adsManager.addEventListener(
			google.ima.AdEvent.Type.COMPLETE,
			this.onAdEvent.bind(this, this.onAdComplete));
		this.adsManager.addEventListener(
			google.ima.AdEvent.Type.SKIPPED,
			this.onAdEvent.bind(this, this.onAdSkipped));
		this.adsManager.addEventListener(
			google.ima.AdEvent.Type.PAUSED,
			// we wont mix player's pause event with this
			this.onAdPaused.bind(this));
		this.adsManager.addEventListener(
			google.ima.AdEvent.Type.RESUMED,
			this.onAdEvent.bind(this, this.onAdResumed));

		// additional events retriggered to ima player
		this.adsManager.addEventListener(
			google.ima.AdEvent.Type.AD_BREAK_READY,
			this.onAdEvent.bind(this, null));
		this.adsManager.addEventListener(
			google.ima.AdEvent.Type.AD_METADATA,
			this.onAdEvent.bind(this, null));
		this.adsManager.addEventListener(
			google.ima.AdEvent.Type.FIRST_QUARTILE,
			this.onAdEvent.bind(this, null));
		this.adsManager.addEventListener(
			google.ima.AdEvent.Type.IMPRESSION,
			this.onAdEvent.bind(this, null));
		this.adsManager.addEventListener(
			google.ima.AdEvent.Type.INTERACTION,
			this.onAdEvent.bind(this, null));
		this.adsManager.addEventListener(
			google.ima.AdEvent.Type.LINEAR_CHANGED,
			this.onAdEvent.bind(this, null));
		this.adsManager.addEventListener(
			google.ima.AdEvent.Type.LOG,
			this.onAdEvent.bind(this, null));
		this.adsManager.addEventListener(
			google.ima.AdEvent.Type.SKIPPABLE_STATE_CHANGED,
			this.onAdEvent.bind(this, null));
		this.adsManager.addEventListener(
			google.ima.AdEvent.Type.MIDPOINT,
			this.onAdEvent.bind(this, null));
		this.adsManager.addEventListener(
			google.ima.AdEvent.Type.THIRD_QUARTILE,
			this.onAdEvent.bind(this, null));
		this.adsManager.addEventListener(
			google.ima.AdEvent.Type.USER_CLOSE,
			this.onAdEvent.bind(this, null));

		this.triggerReady();
	}

	initAdsManager() {
		try {
			this.adsManager.init(this.width, this.height, this.screenMode);
			this.adsManager.setVolume(this.volume());
			if (!this.adDisplayContainerInitialized) {
				this.adDisplayContainer.initialize();
				this.adDisplayContainer.initialized = true;
			}
		} catch (adError) {
			this.onAdError(adError);
		}
	}

	start() {
		if (this.currentAd) {
			console.war('Ad warning: ad is already playing');
			return;
		}

		if (!this.hasStarted_) {
			this.triggerHasStartedEvents();
		}

		try {
			this.adsManager.start();
		} catch(e) {
			this.onAdError(e);
		}
	}

	/* TRIGGER HELPER */

	triggerHasStartedEvents() {
		this.trigger('canplay');
		this.trigger('loadedmetadata');
		this.trigger('firstplay');
		this.trigger('play');
		this.trigger('playing');
	}

	/* THESE CUSTOM METHODS ARE CALLED DIRECTLY BY PLAYER */

	preroll() {
		this.contentHasStarted_ = true;
		this.initAdsManager();
		this.autoplay() && this.play() || ''; 
	}

	postroll() {
		if (!this.contentCompleted_) {
			this.contentCompleted_ = true;
			this.onContentCompleted();
		}
	}

	resize(dimensions) {
		this.width = dimensions.fullscreen ? window.screen.width : dimensions.width;
		this.height = dimensions.fullscreen ? window.screen.height : dimensions.height;
		this.setScreenMode(dimensions.fullscreen);
		if (this.adsManager) {
			this.adsManager.resize(this.width, this.height,	this.screenMode);
		}
	}

	/* THESE EVENT METHODS MOSTLY HANDLES ADS MANAGER */

	onOptionsChanged(options) {
		if (options) {
			this.options_ = Object.assign(this.source, options);
		}
	}

	onAdsLoaderError(e) {
		this.onAdError(e, 'AdsLoader');
	}

	onAdError(e, source) {
		var type = (source || 'Ad') + ' error: ';
		var msg = e.getError !== undefined ?
			e.getError().getMessage() : e.stack;
		console.warn('VIDEOJS: ' + type + msg);
		this.trigger('adserror');
	}

	onAdsManagerLoaded(e) {
		this.setAdsManager(e);
		this.trigger('adsmanagerloaded', this.adsManager.getCuePoints());
	}

	onAdLoaded(e) {
		this.currentAd = e.getAd();

		let adPosition = 0,
			totalAds = 0;

		if (this.currentAd.getAdPodInfo && this.currentAd.getAdPodInfo()) {
			adPosition = this.currentAd.getAdPodInfo().getAdPosition();
			totalAds = this.currentAd.getAdPodInfo().getTotalAds();
		}
		this.trigger('adchange', {
			adPosition: adPosition,
			totalAds: totalAds
		});

		this.isLinearAd() ? 
			this.onLinearAdLoaded() : this.onNonLinearAdLoaded();
	}

	onLinearAdLoaded() {
		this.trigger('waiting');
		this.trigger('ratechange');
		this.trigger('durationchange');
	}

	onNonLinearAdLoaded() {}

	onContentPauseRequested() {
		var isJSAd = this.currentAd.getContentType() === 'application/javascript';
		this.trigger('linearadstarted', !isJSAd || this.source.showControlsForJSAds);
		this.trigger('waiting');
	}

	onContentResumeRequested() {
		// skip sdk nopostroll/nopreroll calls, we have our own
		this.trigger('linearadended');
	}

	onAdStarted() {
		this.isLinearAd() ?
			this.onLinearAdStarted() : this.onNonLinearStarted();
	}

	onLinearAdStarted() {
		this.trigger('playing');
	}

	onNonLinearStarted() {
		this.trigger('nonlinearadstarted');
	}

	onAdSkipped() {
		this.onAdComplete();
	}

	onAdComplete() {
		this.isLinearAd() ?
			this.onLinearAdEnded() : this.onNonLinearAdEnded();
		this.currentAd = null;
	}

	onLinearAdEnded() {}

	onNonLinearAdEnded() {
		this.trigger('nonlinearadended');
	}

	onAllAdsCompleted() {
		this.ended_ = true;
		this.trigger('ended');
		this.reset();
	}

	onAdPaused() {
		this.paused_ = true;
		this.trigger('pause');
	}

	onAdResumed() {
		this.paused_ = false;
		this.trigger('play');
	}

	onAdClick() {
		this.pause();
	}

	onContentCompleted() {
		this.adsLoader && this.adsLoader.contentComplete()||'';
	}

	onAdEvent(callback, e) {
		this.player_.trigger(e);
		if (typeof callback === "function") {
			callback.call(this, e);
		}
	}

	// only helper shortcut method
	isLinearAd() {
		return this.adsManager && this.currentAd && this.currentAd.isLinear();
	}
}

Ima.isSupported = function() {
	return true;
}

Ima.canPlaySource = function(source) {
	return this.canPlayType(source);
}

Ima.canPlayType = function(source) {
	return source && source.type === 'video/ima';
}

const registerTech  = videojs.registerTech || videojs.registerComponent;
registerTech('Ima', Ima);
