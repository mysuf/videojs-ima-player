
import './css/videojs.ima.css';

import videojs from 'video.js';
import 'videojs-contrib-ads';
import './ima-player.js';

const registerPlugin = videojs.registerPlugin || videojs.plugin;
// basic plugin is enough for this purpose
registerPlugin('ima', function(options) {
	// inits contrib-ads asap
	this.ads(Object.assign({
		debug: options.debug||false,
		timeout: options.timeout||5000
	}, options.contribAdsSettings || {}));

	this.ima = this.addChild('imaPlayer', options);
});
