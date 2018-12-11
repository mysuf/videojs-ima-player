
import './css/videojs.ima.css';

import videojs from 'video.js';
import 'videojs-contrib-ads';
import './ima-player.js';

// basic plugin is enough for this purpose
videojs.registerPlugin('ima', function(options) {
	// inits contrib-ads asap if not initialized yet
	if (!this.ads) {
		console.error("ima-player error: contrib-ads must be registered on player.")
		return;
	}

	if (typeof this.ads === "function") {
		this.ads(Object.assign({
			debug: options.debug||false,
			timeout: options.timeout||5000
		}, options.contribAdsSettings || {}));
	}

	this.ima = this.addChild('imaPlayer', options);
});
