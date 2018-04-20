
require('chromedriver');
require('geckodriver');

var browsers = [
  {
    name: 'chrome-local',
    server: '', //local
    capabilities: {
      'browserName' : 'chrome',
      'chromeOptions' : {args: ['--headless']}
    }
  },
  {
    name: 'firefox-local',
    server: '', //local
    capabilities: {
      'browserName' : 'firefox',
      'moz:firefoxOptions' : {args: ['-headless']}
    }
  }
];

exports.browsers = browsers;
