import videojs from "video.js";

const Button = videojs.getComponent("Button");

class SkipButton extends Button {
	constructor(player, options) {
		super(player, {
			controlText: options.skipLabel || "Skip Ad",
			className: "vjs-ima-skip-button vjs-hidden",
		});
		this.active = false;

		if (!options.skipTime || options.skipTime < 5) {
			return;
		}

		this.on(player, "timeupdate", () => {
			if (!this.active && player.currentTime() > options.skipTime) {
				this.removeClass("vjs-hidden");
				this.active = true;
			}
		});

		this.on(player, google.ima.AdEvent.Type.COMPLETE, () => {
			this.active = false;
			this.addClass("vjs-hidden");
		});

		this.on("click", () => {
			this.active = false;
			this.addClass("vjs-hidden");
			player.ima.forceSkip();
		});
	}
}

videojs.registerComponent("SkipButton", SkipButton);
