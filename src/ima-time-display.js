import {formatTime} from 'video.js';

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

	updateContent(event) {
		// call default for v6
		if (super.updateTextNode_) {
			super.updateContent.call(this, event);
			return;
		}

		// custom fallback for v5
		if (!this.player_.duration()) {
			return;
		}

		var formattedTime = formatTime(this.player_.remainingTime());

		if (formattedTime !== this.formattedTime_) {
			this.formattedTime_ = formattedTime;
			this.contentEl_.innerHTML = `<span class="vjs-control-text">${this.localize('Remaining Time')}</span> 
				${this.getRemainingTimeLabel()}${formattedTime}`;
		}
	}
}

videojs.registerComponent('imaRemainingTimeDisplay', ImaRemainingTimeDisplay);
