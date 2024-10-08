import puppeteer, { Browser } from "puppeteer";

const browsers = [] as Browser[];
export const closeBrowsers = () =>
  browsers.forEach((browser) => browser.close());

const fakePromise = (timer: number) =>
  new Promise((resolve) => setTimeout(() => resolve(true), timer));
export const sendTweet = async (cookies: any, content: string) => {
  const browser = await puppeteer.launch({
    executablePath: "/usr/bin/chromium-browser",
    args: [
      "--disable-gpu",
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--no-zygote",
    ],
  });
  browsers.push(browser);
  const page = (await browser.pages())[0];
  await page.setCookie(...cookies);

  await page.goto("https://x.com/home?lang=tr");

  await page.setViewport({ width: 1080, height: 1024 });
  const tweetField = "[data-testid='tweetTextarea_0']";
  await page.waitForSelector(tweetField);
  await page.click(tweetField);
  await page.locator(tweetField).fill(content);

  await fakePromise(1000);
  const buttonField =
    "[data-testid='tweetButtonInline']:not([aria-disabled='true'])";
  await page.waitForSelector(buttonField);
  await page.click(buttonField);
  await browser.close();
  return true;
};
