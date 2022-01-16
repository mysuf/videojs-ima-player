import videojs from "video.js";

const RemainingTimeDisplay = videojs.getComponent("RemainingTimeDisplay");
const TimeDisplay = videojs.getComponent("TimeDisplay");

class ImaRemainingTimeDisplay extends RemainingTimeDisplay {
	// modified version of TimeDisplay method

	createEl() {
		// prefix "-" in later versions of vjs7
		// we need to call grandparent
		return TimeDisplay.prototype.createEl.call(this);
	}

	updateTextNode_() {
		if (!this.contentEl_) {
			return;
		}

		while (this.contentEl_.firstChild) {
			this.contentEl_.removeChild(this.contentEl_.firstChild);
		}

		this.textNode_ = document.createTextNode(
			this.getRemainingTimeLabel() +
				(this.formattedTime_ || "-0:00").replace("-", "")
		);
		this.contentEl_.appendChild(this.textNode_);
	}

	getRemainingTimeLabel() {
		let podCount = ": ";
		if (this.player_.totalAds > 1) {
			podCount = ` (${this.player_.adPosition} ${this.options_.ofLabel} ${this.player_.totalAds}): `;
		}
		return this.options_.adLabel + podCount;
	}
}

videojs.registerComponent("imaRemainingTimeDisplay", ImaRemainingTimeDisplay);
