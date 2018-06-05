
var browsers = require('./content/capabilities');

browsers.browsers.forEach(function(browser) {

    describe('Basic Tests ' + browser.name, function() {

    this.timeout(0);
    this.slow(15000);

    var webdriver = require('selenium-webdriver'),
        until = webdriver.until;
        By = webdriver.By;

    var driver;

    before(async function() {
      driver = await new webdriver.Builder()
            .forBrowser(browser.capabilities.browserName)
            .usingServer(browser.server)
            .withCapabilities(browser.capabilities)
            .build();
      return driver;
    });

    after(async function() {
      await driver.quit();
    });

    it( 'Displays ad UI ' + browser.name, async function(){
      await driver.get('http://localhost:8000/test/webdriver/index.html?ad=linear');
      let log = await driver.findElement(By.id('log'));
      await driver.wait(until.elementTextContains(log, 'ready'), 10000);
      await driver.findElement(By.id('content_video')).click();
      await driver.wait(until.elementTextContains(log, 'start'), 10000);
      await driver.wait(until.elementIsVisible(driver.findElement(
        By.css('#content_video_ima .vjs-control-bar'))), 10000);
    });

    it( 'Hides ad player when ad ends ' + browser.name, async function(){
      await driver.get('http://localhost:8000/test/webdriver/index.html?ad=linear');
      let log = await driver.findElement(By.id('log'));
      await driver.wait(until.elementTextContains(log, 'ready'), 10000);
      await driver.findElement(By.id('content_video')).click();
      await driver.wait(until.elementTextContains(log, 'start'), 10000);
      await driver.wait(until.elementIsNotVisible(driver.findElement(
        By.id('content_video_ima'))), 14000);
      await driver.sleep();
    });

    it( 'Plays content when ad ends ' + browser.name, async function(){
      await driver.get('http://localhost:8000/test/webdriver/index.html?ad=linear');
      let log = await driver.findElement(By.id('log'));
      await driver.wait(until.elementTextContains(log, 'ready'), 10000);
      await driver.findElement(By.id('content_video')).click();
      await driver.wait(until.elementTextContains(log, 'start'), 10000);
      await driver.wait(until.elementIsNotVisible(driver.findElement(
        By.id('content_video_ima'))), 14000);
      await driver.wait(until.elementTextContains(log, 'playing'), 10000);
      await driver.sleep();
    });

    it( 'Displays skip ad button ' + browser.name, async function(){
      await driver.get('http://localhost:8000/test/webdriver/index.html?ad=skippable');
      let log = await driver.findElement(By.id('log'));
      await driver.wait(until.elementTextContains(log, 'ready'), 10000);
      await driver.findElement(By.id('content_video')).click();
      await driver.wait(until.elementTextContains(log, 'start'), 10000);
      await driver.switchTo().frame(driver.findElement(
        By.css('#content_video_ima-ad-container > div:nth-child(1) > iframe')));
      let skipButton = await driver.findElement(
        By.css('body > div.videoAdUi > div.videoAdUiSkipContainer.html5-stop-propagation > button'));
      await driver.wait(until.elementIsVisible(skipButton), 10000);
      await driver.sleep();
    });

     it( 'VMAP: Preroll ' + browser.name, async function(){
      await driver.get('http://localhost:8000/test/webdriver/index.html?ad=vmap_preroll');
      let log = await driver.findElement(By.id('log'));
      await driver.wait(until.elementTextContains(log, 'ready'), 10000);
      await driver.findElement(By.id('content_video')).click();
      await driver.wait(until.elementTextContains(log, 'start'), 10000);
      await driver.wait(until.elementIsVisible(driver.findElement(
        By.id('content_video_ima-ad-container'))), 10000);
      await driver.sleep();
    });

    it( 'VMAP: Midroll ' + browser.name, async function(){
      await driver.get('http://localhost:8000/test/webdriver/index.html?ad=vmap_midroll');
      let log = await driver.findElement(By.id('log'));
      await driver.wait(until.elementTextContains(log, 'ready'), 10000);
      await driver.findElement(By.id('content_video')).click();
      await driver.wait(until.elementIsVisible(driver.findElement(
        By.id('content_video_ima-ad-container'))), 10000);
      await driver.sleep();
    });

    it( 'Nonlinear ' + browser.name, async function(){
      await driver.get('http://localhost:8000/test/webdriver/index.html?ad=nonlinear');
      let log = await driver.findElement(By.id('log'));
      await driver.wait(until.elementTextContains(log, 'ready'), 10000);
      await driver.findElement(By.id('content_video')).click();
      await driver.wait(until.elementTextContains(log, 'start'), 10000);
      await driver.switchTo().frame(driver.findElement(
        By.css('#content_video_ima-ad-container > div:nth-child(1) > iframe')));
      await driver.wait(until.elementIsVisible(driver.findElement(
        By.id('GDFP'))), 10000);
      await driver.sleep();
    });

    it( 'Handles ad error 303: wrappers ' + browser.name, async function(){
      await driver.get('http://localhost:8000/test/webdriver/index.html?ad=error_303');
      let log = await driver.findElement(By.id('log'));
      await driver.wait(until.elementTextContains(log, '303'), 10000);
      await driver.sleep();
    });
  });
});
