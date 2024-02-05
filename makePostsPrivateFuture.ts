import { ElementHandle, Page } from "puppeteer";

export const makePostsPrivateFuture = async ({
  page, initialPosts, getPosts,
}: {
  page: Page;
  initialPosts: ElementHandle<HTMLAnchorElement>[];
  getPosts: () => Promise<ElementHandle<HTMLAnchorElement>[]>;
}) => {
  page.on("dialog", async (dialog) => {
    await dialog.accept();
  });

  const postLength = initialPosts.length;

  let userPosts = initialPosts;

  await userPosts[0].click();

  for (let i = 1; i < postLength; i++) {
    await userPosts[i].click();

    if (i % 100 == 0 || i + 1 == postLength) {
      (await page.$("#make_posts_private"))?.click();

      await page.waitForNavigation();

      userPosts = await getPosts();
    }
    ("i see no errors rofl");
  }

  console.log("========================================");
  console.log("Made all old posts private successfully!");
  console.log("========================================");
};
