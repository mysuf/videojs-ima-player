import { By, Browser, Builder, until } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js";
import firefox from "selenium-webdriver/firefox.js";

const chromeOptions = new chrome.Options();
chromeOptions.addArguments("--headless=new");
chromeOptions.addArguments("--mute-audio");

const firefoxOptions = new firefox.Options();
firefoxOptions.addArguments("-headless");

// TODO: firefox installed by snap on Ubuntu just doesn't work
[Browser.CHROME].forEach((browserName) => {
  describe("Basic Tests " + browserName, function () {
    this.timeout(0);
    this.slow(15000);

    let driver;

    before(async function () {
      driver = new Builder()
        .forBrowser(browserName)
        .setChromeOptions(chromeOptions)
        .setFirefoxOptions(firefoxOptions)
        //.usingServer("")
        .build();
      return driver;
    });

    after(async function () {
      return driver.quit();
    });

    it("Displays ad UI " + browserName, async function () {
      await driver.get(
        "http://localhost:8000/test/webdriver/index.html?ad=linear"
      );
      let log = await driver.findElement(By.id("log"));
      await driver.wait(until.elementTextContains(log, "ready"), 10000);
      await driver.findElement(By.id("content_video")).click();
      await driver.wait(until.elementTextContains(log, "start"), 10000);
      await driver.wait(
        until.elementIsVisible(
          driver.findElement(By.css("#content_video_ima .vjs-control-bar"))
        ),
        10000
      );
    });

    it("Hides ad player when ad ends " + browserName, async function () {
      await driver.get(
        "http://localhost:8000/test/webdriver/index.html?ad=linear"
      );
      let log = await driver.findElement(By.id("log"));
      await driver.wait(until.elementTextContains(log, "ready"), 10000);
      await driver.findElement(By.id("content_video")).click();
      await driver.wait(until.elementTextContains(log, "start"), 10000);
      await driver.wait(
        until.elementIsNotVisible(
          driver.findElement(By.id("content_video_ima"))
        ),
        14000
      );
      await driver.sleep();
    });

    it("Plays content when ad ends " + browserName, async function () {
      await driver.get(
        "http://localhost:8000/test/webdriver/index.html?ad=linear"
      );
      let log = await driver.findElement(By.id("log"));
      await driver.wait(until.elementTextContains(log, "ready"), 11000);
      await driver.findElement(By.id("content_video")).click();
      await driver.wait(until.elementTextContains(log, "start"), 11000);
      await driver.wait(
        until.elementIsNotVisible(
          driver.findElement(By.id("content_video_ima"))
        ),
        14000
      );
      await driver.wait(until.elementTextContains(log, "playing"), 1100);
      await driver.sleep();
    });

    it("Displays skip ad button " + browserName, async function () {
      await driver.get(
        "http://localhost:8000/test/webdriver/index.html?ad=skippable"
      );
      let log = await driver.findElement(By.id("log"));
      await driver.wait(until.elementTextContains(log, "ready"), 11000);
      await driver.findElement(By.id("content_video")).click();
      await driver.wait(until.elementTextContains(log, "start"), 11000);
      await driver
        .switchTo()
        .frame(
          driver.findElement(
            By.css(
              "#content_video_ima-ad-container > div:nth-child(1) > iframe"
            )
          )
        );
      let skipButton = await driver.findElement(
        By.css(
          "body > div.videoAdUi .videoAdUiSkipContainer.html5-stop-propagation > button"
        )
      );
      await driver.wait(until.elementIsVisible(skipButton), 11000);
      await driver.sleep();
    });

    it("VMAP: Preroll " + browserName, async function () {
      await driver.get(
        "http://localhost:8000/test/webdriver/index.html?ad=vmap_preroll"
      );
      let log = await driver.findElement(By.id("log"));
      await driver.wait(until.elementTextContains(log, "ready"), 11000);
      await driver.findElement(By.id("content_video")).click();
      await driver.wait(until.elementTextContains(log, "start"), 11000);
      await driver.wait(
        until.elementIsVisible(
          driver.findElement(By.id("content_video_ima-ad-container"))
        ),
        10000
      );
      await driver.sleep();
    });

    it("VMAP: Midroll " + browserName, async function () {
      await driver.get(
        "http://localhost:8000/test/webdriver/index.html?ad=vmap_postroll"
      );
      let log = await driver.findElement(By.id("log"));
      await driver.wait(until.elementTextContains(log, "ready"), 11000);
      await driver.findElement(By.id("content_video")).click();
      await driver.executeScript(
        "window.videojs.players.content_video.currentTime(58)"
      );
      await driver.wait(until.elementTextContains(log, "start"), 11000);
      await driver.wait(
        until.elementIsVisible(
          driver.findElement(By.id("content_video_ima-ad-container"))
        ),
        10000
      );
      await driver.sleep();
    });

    it("Nonlinear " + browserName, async function () {
      await driver.get(
        "http://localhost:8000/test/webdriver/index.html?ad=nonlinear"
      );
      let log = await driver.findElement(By.id("log"));
      await driver.wait(until.elementTextContains(log, "ready"), 11000);
      await driver.findElement(By.id("content_video")).click();
      await driver.wait(until.elementTextContains(log, "start"), 11000);
      await driver
        .switchTo()
        .frame(
          driver.findElement(
            By.css(
              "#content_video_ima-ad-container > div:nth-child(1) > iframe"
            )
          )
        );
      await driver.wait(
        until.elementIsVisible(
          driver.findElement(
            By.css("body .nonLinearContainer > .overlayContainer > img")
          )
        ),
        10000
      );
      await driver.sleep();
    });

    it("Handles ad error 303: wrappers " + browserName, async function () {
      await driver.get(
        "http://localhost:8000/test/webdriver/index.html?ad=error_303"
      );
      let log = await driver.findElement(By.id("log"));
      await driver.wait(until.elementTextContains(log, "303"), 11000);
      await driver.sleep();
    });
  });
});
