import videojs from "video.js";
import "./ima-time-display.js";
import "./ima-tech.js";

const Player = videojs.getComponent("Player");

// Player is subclass of Component so is usable as part of parent player
// plus is fully customizable and independent from content player
class ImaPlayer extends Player {
	constructor(contentPlayer, options) {
		// serve tag placeholder to player

		const adPlayerContainer = document.createElement("div");
		adPlayerContainer.id = contentPlayer.id_ + "_ima";
		adPlayerContainer.className = "vjs-ima video-js";

		options.src = options.adTagUrl || options.adsResponse || "placeholder";
		options.type = "video/ima";

		// sets basic player
		// passes src placeholder to tech
		// sets customized remaining time component
		super(adPlayerContainer, {
			controls: false,
			sources: [options],
			techOrder: ["ima"],
			controlBar: {
				imaRemainingTimeDisplay: {
					adLabel: options.adLabel || "Advertisement",
					ofLabel: options.ofLabel || "of",
				},
				children: [
					"playToggle",
					"volumePanel",
					"imaRemainingTimeDisplay",
					"progressControl",
					"customControlSpacer",
					"fullscreenToggle",
				],
			},
			children: [
				"mediaLoader",
				"loadingSpinner",
				"controlBar",
				"errorDisplay",
			],
		});

		this.resizeType = contentPlayer.resizeManager
			? "playerresize"
			: ["resize", "fullscreenchange"];

		this.hide();

		// remove it from exposed players in case that somebody
		// would manipulate with them globally
		Player.players[this.id_] = null;

		this.imaOptions = options;

		// through events we have these values up to date
		// and exposed for component imaRemainingTimeDisplay
		this.adPosition = 0;
		this.totalAds = 0;
		this.adsReadyTriggered = false;
		this.noPreroll = false;
		this.noPostroll = false;
		this.contentHasStarted_ = false;

		// we wont toggle content player controls if controls disabled
		this.contentControlsDisabled = !contentPlayer.controls();
		this.contentPlayer = contentPlayer;

		this.isMobile = videojs.browser.IS_IOS || videojs.browser.IS_ANDROID;
		if (this.isMobile) this.addClass("vjs-ima-mobile");

		this.setRemainingTimeVisibility();
		this.trackContentEvents();

		// wait a tick to get content info
		contentPlayer.ready(() => {
			const mediaElement = this.getContentTechElement();
			if (!mediaElement) {
				return;
			}
			this.tech_.handleLateInit_({
				imaPlayer: this,
				mediaElement,
				width: contentPlayer.currentWidth(),
				height: contentPlayer.currentHeight(),
				volume: contentPlayer.volume(),
				fullscreen: contentPlayer.isFullscreen(),
				autoplay: contentPlayer.autoplay(),
				muted: contentPlayer.muted(),
			});
			this.handleContentResize_();
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
		this.addClass("vjs-waiting");
		this.trigger("waiting");
	}

	// OVERRIDES default method
	// there are aditional jobs that needs to be done
	reset() {
		this.setContentPlayerToDefault();
		this.noPreroll = false;
		this.noPostroll = false;
		super.reset.call(this);
		this.handleTechAdsReady_();
	}

	/* THESE METHODS ARE PART OF TECH INITIALIZATION */

	trackContentEvents() {
		this.on(this.contentPlayer, "seek", this.handleContentSeek_);
		this.on(this.contentPlayer, "seeked", this.handleContentSeeked_);
		this.on(
			this.contentPlayer,
			"durationchange",
			this.handleContentDurationChange_
		);
		this.on(
			this.contentPlayer,
			"timeupdate",
			this.handleContentTimeUpdate_
		);
		this.on(this.contentPlayer, this.resizeType, this.handleContentResize_);
		this.on(
			this.contentPlayer,
			"contentupdate",
			this.handleContentChanged_
		);
		this.on(
			this.contentPlayer,
			"readyforpreroll",
			this.handleContentReadyForPreroll_
		);
		this.on(
			this.contentPlayer,
			"readyforpostroll",
			this.handleContentReadyForPostroll_
		);
	}

	trackImaEvents() {
		// these events are removed together with tech
		this.on(this.tech_, "adsready", this.handleTechAdsReady_);
		this.on(this.tech_, "adchange", this.handleTechAdChange_);
		this.on(this.tech_, "linearadstarted", this.handleTechLinearAdStarted_);
		this.on(this.tech_, "linearadended", this.handleTechLinearAdEnded_);
		this.on(
			this.tech_,
			"nonlinearadstarted",
			this.handleTechNonLinearAdStarted_
		);
		this.on(
			this.tech_,
			"nonlinearadended",
			this.handleTechNonLinearAdEnded_
		);
		this.on(this.tech_, "adserror", this.handleTechAdsError_);
	}

	setContentPlayerToDefault() {
		this.handleTechLinearAdEnded_();
		this.handleTechNonLinearAdEnded_();
	}

	getContentTechElement() {
		if (!this.contentPlayer.tech_ || !this.contentPlayer.tech_.el_) {
			return;
		}
		if (this.contentPlayer.techName_ !== "Html5") {
			["canPlayType", "play", "pause"].forEach((method) => {
				if (!this.contentPlayer.tech_.el_[method]) {
					this.contentPlayer.tech_.el_[method] = () => false;
				}
			});
		}
		return this.contentPlayer.tech_.el_;
	}

	setRemainingTimeVisibility() {
		if (this.imaOptions.showCountdown === false) {
			this.controlBar.imaRemainingTimeDisplay.hide();
			return;
		}
		this.controlBar.imaRemainingTimeDisplay.show();
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
		if (this.contentHasStarted_ && !this.contentEnded) {
			this.contentPlayer.play();
		}
	}

	pauseContent() {
		if (this.contentHasStarted_ && !this.contentEnded) {
			this.contentPlayer.pause();
		}
	}

	setContentControls(bool) {
		if (!this.contentControlsDisabled) {
			this.contentPlayer.controls(bool);
		}
	}

	skipLinearAdMode() {
		if (this.contentPlayer.ads.isWaitingForAdBreak()) {
			this.contentPlayer.ads.skipLinearAdMode();
		}
	}

	/* THESE METHODS HANDLES CONTENT PLAYER */

	handleContentReadyForPreroll_() {
		this.contentHasStarted_ = true;
		if (this.noPreroll) {
			this.skipLinearAdMode();
		}
		this.techCall_("preroll");
		this.noPreroll = true;
	}

	handleContentReadyForPostroll_() {
		// triggers only once per source
		if (this.noPostroll) {
			this.skipLinearAdMode();
		}
		if (!this.contentEnded) {
			this.contentEnded = true;
			this.techCall_("postroll");
		}
		this.noPostroll = true;
	}

	handleContentChanged_() {
		this.setContentPlayerToDefault();
		this.imaOptions.contentMediaElement = this.getContentTechElement();
		if (!this.imaOptions.contentMediaElement) {
			return;
		}
		this.contentEnded = false;
		this.noPreroll = false;
		this.noPostroll = false;
		this.adsReadyTriggered = false;
		this.src(this.imaOptions);
		this.setRemainingTimeVisibility();
	}

	handleContentTimeUpdate_() {
		this.ready(() => {
			this.tech_.contentTracker.previousTime =
				this.tech_.contentTracker.currentTime;
			this.tech_.contentTracker.currentTime =
				this.contentPlayer.currentTime();
		});
	}

	handleContentResize_() {
		this.isFullscreen(this.contentPlayer.isFullscreen());
		this.techCall_("resize", {
			width: this.contentPlayer.currentWidth(),
			height: this.contentPlayer.currentHeight(),
			fullscreen: this.isFullscreen(),
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

	handleContentSeeked_() {
		this.ready(() => {
			this.tech_.contentTracker.seeking = false;
		});
	}

	/* THESE METHODS HANDLES IMA TECH */

	handleTechAdsReady_(e, cuePoints) {
		this.noPreroll = !cuePoints;
		this.noPostroll = !cuePoints || !cuePoints.includes(-1);
		if (!this.adsReadyTriggered) {
			this.adsReadyTriggered = true;
			this.contentPlayer.trigger("adsready");
		}
	}

	handleTechAdChange_(e, adPodInfo) {
		this.adPosition = adPodInfo.adPosition;
		this.totalAds = adPodInfo.totalAds;
	}

	handleTechLinearAdStarted_(e, isControlsAllowed) {
		if (this.contentPlayer.ads.inAdBreak()) {
			return;
		}

		this.volume(this.contentPlayer.volume());
		this.muted(this.contentPlayer.muted());
		this.contentPlayer.ads.startLinearAdMode();
		this.contentPlayer.trigger("ads-ad-started");
		this.setContentControls(false);
		this.controls(isControlsAllowed);
		this.pauseContent();
		this.show();
	}

	handleTechLinearAdEnded_() {
		if (this.contentPlayer.ads.inAdBreak()) {
			this.contentPlayer.volume(this.volume());
			this.contentPlayer.muted(this.muted());
			this.contentPlayer.ads.endLinearAdMode();
		} else {
			// covers silent errors like skippable on IOS
			this.skipLinearAdMode();
		}

		this.controls(false);
		this.setContentControls(true);
		this.hide();
		this.resumeContent();
	}

	handleTechNonLinearAdStarted_() {
		if (!this.contentPlayer.ads.inAdBreak()) {
			this.skipLinearAdMode();
		}
		this.controls(false);
		this.contentPlayer.addClass("non-linear-ad");
		this.show();
	}

	handleTechNonLinearAdEnded_() {
		this.contentPlayer.removeClass("non-linear-ad");
		this.hide();
	}

	handleTechAdsError_() {
		this.hide();
		this.removeClass("waiting");
		this.reset();
	}
}

// registers player as normal component
videojs.registerComponent("imaPlayer", ImaPlayer);
