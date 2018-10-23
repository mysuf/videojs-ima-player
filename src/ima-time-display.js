
import videojs from 'video.js';

const RemainingTimeDisplay = videojs.getComponent('RemainingTimeDisplay');

class ImaRemainingTimeDisplay extends RemainingTimeDisplay {
	// modified version of TimeDisplay method
	updateTextNode_() {
		if (!this.contentEl_) {
			return;
		}

		while (this.contentEl_.firstChild) {
			this.contentEl_.removeChild(this.contentEl_.firstChild);
		}

		this.textNode_ = document.createTextNode(this.getRemainingTimeLabel() + (this.formattedTime_||'-0:00').substr(1));
		this.contentEl_.appendChild(this.textNode_);
	}

	getRemainingTimeLabel() {
		let podCount = ': ';
		if (this.player_.totalAds > 1) {
			podCount = ` (${this.player_.adPosition} ${this.options_.ofLabel} ${this.player_.totalAds}): `;
		}
		return this.options_.adLabel + podCount;
	}
}

videojs.registerComponent('imaRemainingTimeDisplay', ImaRemainingTimeDisplay);
