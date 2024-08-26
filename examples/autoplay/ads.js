const video = document.getElementById("content_video");
// ads skippable ads support to IOS
videojs.browser.IS_IOS ? video.setAttribute("playsinline", "") : "";
const isMobile = videojs.browser.IS_IOS || videojs.browser.IS_ANDROID;

const player = videojs("content_video", {
	muted: video.muted || (video.autoplay && isMobile),
});

player.ima({
	debug: true,
	adTagUrl:
		"http://pubads.g.doubleclick.net/gampad/ads?sz=640x480&" +
		"iu=/124319096/external/ad_rule_samples&ciu_szs=300x250&ad_rule=1&" +
		"impl=s&gdfp_req=1&env=vp&output=xml_vmap1&unviewed_position_start=1&" +
		"cust_params=sample_ar%3Dpremidpostpod%26deployment%3Dgmf-js&cmsid=496&" +
		"vid=short_onecue&correlator=",
});
