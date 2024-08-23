import "chromedriver";
import "geckodriver";

export default [
  {
    name: "chrome-local",
    server: "", //local
    capabilities: {
      browserName: "chrome",
      chromeOptions: { args: ["--headless"] },
    },
  },
  {
    name: "firefox-local",
    server: "", //local
    capabilities: {
      browserName: "firefox",
      "moz:firefoxOptions": { args: ["-headless"] },
    },
  },
];
