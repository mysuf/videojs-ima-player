const onAdErrorEvent = function (event) {
	console.log(event);
};

const adTags = {
	linear: "http://localhost:8000/test/webdriver/content/canned_ads/linear.xml",
	skippable:
		"http://localhost:8000/test/webdriver/content/canned_ads/" +
		"skippable_linear.xml",
	vmap_preroll:
		"http://localhost:8000/test/webdriver/content/canned_ads/" +
		"vmap_preroll.xml",
	vmap_midroll:
		"http://localhost:8000/test/webdriver/content/canned_ads/" +
		"vmap_midroll.xml",
	nonlinear:
		"http://localhost:8000/test/webdriver/content/canned_ads/" +
		"nonlinear.xml",
	error_303:
		"http://localhost:8000/test/webdriver/content/canned_ads/empty_wrapper.xml",
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
