import { Page } from "puppeteer";

export const getUserPostsFuture = async ({
  page,
  scrollPeriodInMs,
}: {
  page: Page;
  scrollPeriodInMs: number;
}) => {
  let previousHeight: number = 0;
  let failedCounter: number = 0;

  while (true) {

    const height: number = await page.evaluate(() => {
      const bodyHeight = document.body.scrollHeight;
      window.scrollBy(0, bodyHeight);
      return bodyHeight;
    });

    if (previousHeight == height) {
      failedCounter++;
    } else {
      previousHeight = height;
    }

    if (failedCounter === 3) break;

    await new Promise((res) => setTimeout(res, scrollPeriodInMs));
  }

  const postLinks = await page.$$('a[id^="post_"]');
  console.log(`Found ${postLinks.length} posts!`);
  return postLinks;
};
