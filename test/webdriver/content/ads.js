const onAdErrorEvent = function (event) {
	console.log(event);
};

const adTags = {
	linear: "https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/single_ad_samples&sz=640x480&cust_params=sample_ct%3Dlinear&ciu_szs=300x250%2C728x90&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator=",
	skippable:
		"https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/single_preroll_skippable&sz=640x480&ciu_szs=300x250%2C728x90&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator=",
	vmap_preroll:
		"https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/vmap_ad_samples&sz=640x480&cust_params=sample_ar%3Dpreonly&ciu_szs=300x250%2C728x90&gdfp_req=1&ad_rule=1&output=vmap&unviewed_position_start=1&env=vp&impl=s&correlator=",
	vmap_postroll:
		"https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/vmap_ad_samples&sz=640x480&cust_params=sample_ar%3Dpostonly&ciu_szs=300x250&gdfp_req=1&ad_rule=1&output=vmap&unviewed_position_start=1&env=vp&impl=s&correlator=",
	nonlinear:
		"https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/nonlinear_ad_samples&sz=480x70&cust_params=sample_ct%3Dnonlinear&ciu_szs=300x250%2C728x90&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator=",
	error_303:
		"https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/single_ad_samples&sz=640x480&cust_params=sample_ct%3Dredirecterror&ciu_szs=300x250%2C728x90&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator=",
};

const searchParams = new URLSearchParams(location.search);
const adTagName = searchParams.get("ad");
const player = videojs("content_video");

player.ima({
	disableFlagAds: true,
	adTagUrl: adTags[adTagName],
});

player.ready(function () {
	const log = document.getElementById("log");
	log.innerHTML += "ready<br>";
});

const events = [
	google.ima.AdErrorEvent.Type.AD_ERROR,
	google.ima.AdEvent.Type.STARTED,
];

for (let index = 0; index < events.length; index++) {
	player.ima.on(events[index], function (event) {
		const log = document.getElementById("log");
		const isImaError = event.type === google.ima.AdErrorEvent.Type.AD_ERROR;
		const msg = isImaError
			? event.getError !== undefined
				? event.getError().getVastErrorCode()
				: event.stack
			: event.type;
		log.innerHTML += msg + "<br>";
	});
}

player.on("playing", function (event) {
	const log = document.getElementById("log");
	log.innerHTML += event.type + "<br>";
});
