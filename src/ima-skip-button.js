import videojs from "video.js";

const Component = videojs.getComponent("Component");

class SkipButton extends Component {
	constructor(player, options) {
		super(player, options);
		this.active = false;
		this.resetState();

		if (
			!google?.ima ||
			typeof options.skipTime !== "number" ||
			isNaN(options.skipTime)
		) {
			return;
		}

		this.on(player, google.ima.AdEvent.Type.COMPLETE, () => {
			this.resetState();
		});

		this.on(player, "timeupdate", () => {
			if (this.isForcedSkipEnabled()) {
				this.active = true;
				this.removeClass("vjs-hidden");
			}
		});

		this.on("click", () => {
			this.resetState();
			player.techCall_("forceSkip");
		});
	}

	isForcedSkipEnabled() {
		const player = this.player();
		const currentAdSkipOffset =
			player.tech_?.currentAd?.getSkipTimeOffset() ?? -1;
		// fix videojs or browser bug where currentTime() on init shows greater value than duration itself
		const currentTime = player.currentTime();
		const duration = player.duration();
		return (
			!this.active &&
			(currentAdSkipOffset < 0 ||
				currentAdSkipOffset > this.options_.skipTime) &&
			currentTime &&
			duration &&
			currentTime < duration &&
			duration - this.options_.skipTime > 5 &&
			currentTime > this.options_.skipTime
		);
	}

	resetState() {
		this.active = false;
		this.addClass("vjs-hidden");
	}

	createEl() {
		return super.createEl.call(
			this,
			"button",
			{
				className: "vjs-ima-skip-button",
				textContent: this.options_.skipLabel || "Skip Ad",
			},
			{
				"aria-live": "off",
				"aria-atomic": "true",
			}
		);
	}
}

videojs.registerComponent("skipButton", SkipButton);
