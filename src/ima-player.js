
import './ima-time-display.js';
import './ima-tech.js';

const Player = videojs.getComponent('Player');

// Player is subclass of Component so is usable as part of parent player
// plus is fully customizable and independent from content player
class ImaPlayer extends Player {
	constructor(contentPlayer, options) {
		// serve tag placeholder to player

		const adPlayerContainer = document.createElement('div');
		adPlayerContainer.id = contentPlayer.id_ + '_ima';
		adPlayerContainer.className = "vjs-ima video-js";

		options.src = options.adTagUrl||options.adsResponse||'placeholder';
		options.type = 'video/ima';

		// volumeMenuButton as v5 fallback
		const volumePanel = videojs.getComponent('volumePanel') ? 
			'volumePanel' : 'volumeMenuButton'

		// sets basic player
		// passes src placeholder to tech
		// sets customized remaining time component
		super(adPlayerContainer, {
			controls: false,
			sources: [options],
			techOrder: ["ima"],
			controlBar: {
				imaRemainingTimeDisplay: {
					adLabel: options.adLabel||'Advertisement',
					ofLabel: options.ofLabel||'of'
				},
				children: [
					'playToggle',
					volumePanel,
					'imaRemainingTimeDisplay',
					'progressControl',
					'customControlSpacer',
					'fullscreenToggle'
				],
			},
			children: [
				'mediaLoader',
				'loadingSpinner',
				'controlBar',
				'errorDisplay'
			]
		});

		this.hide();

		// remove it from exposed players in case that somebody
		// would manipulate with them globally
		Player.players[this.id_] = null;

		this.imaOptions = options;

		// through events we have these values up to date
		// and exposed for component imaRemainingTimeDisplay
		this.adPosition = 0;
		this.totalAds = 0;

		// we wont toggle content player controls if controls disabled
		this.contentControlsDisabled = !contentPlayer.controls();
		this.contentPlayer = contentPlayer;

		this.isMobile = videojs.browser.IS_IOS || videojs.browser.IS_ANDROID;
		if (this.isMobile) this.addClass('vjs-ima-mobile');

		this.trackContentEvents();

		// wait a tick to get content info
		this.setTimeout(() => {
			this.tech_.handleLateInit_({
				imaPlayer: this,
				mediaElement: contentPlayer.tech_.el_,
				width: contentPlayer.currentWidth(),
				height: contentPlayer.currentHeight(),
				fullscreen: contentPlayer.isFullscreen()
			});
		});
	}

	// OVERRIDES default method
	// we want aditional events on loadTech
	loadTech_(techName, source) {
		super.loadTech_.call(this, techName, source);
		this.trackImaEvents();
	}

	// OVERRIDES default method
	// calls api through contentPlayer
	requestFullscreen() {
		if (!this.contentPlayer.isFullscreen()) {
			this.contentPlayer.requestFullscreen();
		}
	}

	// OVERRIDES default method
	// calls api through contentPlayer
	exitFullscreen() {
		if (this.contentPlayer.isFullscreen()) {
			this.contentPlayer.exitFullscreen();
		}		
	}

	// OVERRIDES default method
	// we wont reset waiting on timeupdate
	// because tracker must run also during ads
	handleTechWaiting_() {
		this.addClass('vjs-waiting');
		this.trigger('waiting');	
	}

	// OVERRIDES default method
	// there are aditional jobs that needs to be done
	reset() {
		this.setContentPlayerToDefault();
		super.reset.call(this);
		this.handleTechNoAds_();
	}

	/* THESE METHODS ARE PART OF TECH INITIALIZATION */

	trackContentEvents() {
		this.on(this.contentPlayer, 'seek', this.handleContentSeek_);
		this.on(this.contentPlayer, 'seekend', this.handleContentSeekEnd_);
		this.on(this.contentPlayer, 'durationchange', this.handleContentDurationChange_);
		this.on(this.contentPlayer, 'timeupdate', this.handleContentTimeUpdate_);
		this.on(this.contentPlayer, ['resize', 'fullscreenchange'], this.handleContentResize_);
		this.on(this.contentPlayer, 'contentchanged', this.handleContentChanged_);
		this.on(this.contentPlayer, 'readyforpreroll', this.handleContentReadyForPreroll_);
		this.on(this.contentPlayer, 'contentended', this.handleContentReadyForPostroll_);
	}

	trackImaEvents() {
		// these events are removed together with tech
		this.on(this.tech_, 'noads', this.handleTechNoAds_)
		this.on(this.tech_, 'adsmanagerloaded', this.handleTechAdsManagerLoaded_);
		this.on(this.tech_, 'adchange', this.handleTechAdChange_);
		this.on(this.tech_, 'linearadstarted', this.handleTechLinearAdStarted_);
		this.on(this.tech_, 'linearadended', this.handleTechLinearAdEnded_);
		this.on(this.tech_, 'nonlinearadstarted', this.handleTechNonLinearAdStarted_);
		this.on(this.tech_, 'nonlinearadended', this.handleTechNonLinearAdEnded_);
		this.on(this.tech_, 'adserror', this.handleTechAdsError_);
	}

	setContentPlayerToDefault() {
		this.offNoPreroll();
		this.offNoPostroll();
		this.handleTechLinearAdEnded_();
		this.handleTechNonLinearAdEnded_();
	}

	/* IMA PLAYER METHODS USABLE FROM GLOBAL SPACE (PUBLIC) */

	updateOptions(options) {
		if (this.imaOptions && options) {
			Object.assign(this.imaOptions, options);
		}

		// force next call player.src to reset contrib-ads
		// even if source is the same
		this.contentPlayer.ads.contentSrc = "";
	}

	/* THESE METHODS CONTROLS CONTENT PLAYER */

	resumeContent() {
		if (!this.contentEnded) {
			this.contentPlayer.play();
		}
	}

	pauseContent() {
		if (!this.contentEnded) {
			this.contentPlayer.pause();
		}
	}

	setContentControls(bool) {
		if (!this.contentControlsDisabled) {
			this.contentPlayer.controls(bool);
		}
	}

	/* THESE METHODS HANDLES CONTENT PLAYER */

	handleContentReadyForPreroll_() {
		this.techCall_('preroll');
	}

	handleContentReadyForPostroll_() {
		// triggers only once per source
		if (!this.contentEnded) {
			this.contentEnded = true;
			this.techCall_('postroll');
		}
	}

	handleContentChanged_() {
		this.setContentPlayerToDefault();
		this.contentEnded = false;
		this.src(this.imaOptions);
	}

	handleContentTimeUpdate_() {
		this.ready(() => {
			this.tech_.contentTracker.previousTime = this.tech_.contentTracker.currentTime;
			this.tech_.contentTracker.currentTime = this.contentPlayer.currentTime();
		});
	}

	handleContentResize_() {
		this.isFullscreen(this.contentPlayer.isFullscreen());
		this.techCall_('resize',{
			width: this.contentPlayer.currentWidth(),
			height: this.contentPlayer.currentHeight(),
			fullscreen: this.isFullscreen()
		});
	}

	handleContentDurationChange_() {
		this.ready(() => {
			this.tech_.contentTracker.duration = this.contentPlayer.duration();
		});
	}

	handleContentSeek_() {
		this.ready(() => {
			this.tech_.contentTracker.seeking = true;
		});
	}

	handleContentSeekEnd_() {
		this.ready(() => {
			this.tech_.contentTracker.seeking = false;
		});
	}

	/* THESE METHODS HANDLES IMA TECH */

	handleTechNoAds_() {
		this.onNoPreroll();
		this.onNoPostroll();
	}

	handleTechAdsManagerLoaded_(e, cuePoints) {
		!cuePoints.includes(0) ? this.onNoPreroll() : '';
		!cuePoints.includes(-1) ? this.onNoPostroll() : '';
		this.contentPlayer.trigger('adsready');
	}

	handleTechAdChange_(e, adPodInfo) {
		this.adPosition = adPodInfo.adPosition;
		this.totalAds = adPodInfo.totalAds;
	}

	handleTechLinearAdStarted_(e, isControlsAllowed) {
		if (this.contentPlayer.ads.inAdBreak()) {
			return;
		}

		this.contentPlayer.ads.startLinearAdMode();
		this.volume(this.contentPlayer.volume());
		this.muted(this.contentPlayer.muted());
		this.setContentControls(false);
		this.controls(isControlsAllowed);
		this.pauseContent();
		this.show();
	}

	handleTechLinearAdEnded_() {
		if (!this.contentPlayer.ads.inAdBreak()) {
			return;
		}

		this.contentPlayer.ads.endLinearAdMode();
		this.contentPlayer.volume(this.volume());
		this.contentPlayer.muted(this.muted());
		this.controls(false);
		this.setContentControls(true);
		this.hide();
		this.resumeContent();
	}

	handleTechNonLinearAdStarted_() {
		this.controls(false);
		this.addClass('non-linear');
		this.show();
	}

	handleTechNonLinearAdEnded_() {
		this.removeClass('non-linear');
		this.hide();
	}

	handleTechAdsError_() {
		this.hide();
		this.removeClass('waiting');
		this.reset();
	}

	/* THESE METHODS HANDLES CONTRIB-ADS */
	// handles contrib-ads nopreroll/nopostroll events
	// instead of build-in IMA SDK contentResumeRequested logic

	onNoPreroll() {
		// IMA SDK triggers contentResumeRequested when no preroll/postroll
		// contrib-ads are missing check for adtimeout window
		// this is stupid but no way atm
		if (this.contentPlayer.hasStarted()) {
			if (this.contentPlayer.hasClass('vjs-ad-loading')) {
				this.contentPlayer.ads.skipLinearAdMode();
			}
			return;
		}
		this.one(this.contentPlayer, 'play', this.triggerNoPreroll);	
	}

	offNoPreroll() {
		this.off(this.contentPlayer, 'play', this.triggerNoPreroll);
	}

	onNoPostroll() {
		if (!this.contentEnded) {
			this.one(this.contentPlayer, 'contentended', this.triggerNoPostroll);
		}
	}

	offNoPostroll() {
		this.off(this.contentPlayer, 'contentended', this.triggerNoPostroll);
	}

	triggerNoPreroll() {
		this.contentPlayer.trigger('nopreroll');
	}

	triggerNoPostroll() {
		this.contentPlayer.trigger('nopostroll');
	}
}

// registers player as normal component
videojs.registerComponent('imaPlayer', ImaPlayer);
