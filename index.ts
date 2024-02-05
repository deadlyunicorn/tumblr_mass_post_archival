import puppeteer from "puppeteer";
import readline from "readline";

import { getUsernameFuture } from "./getUsernameFuture";
import { getSpeedFuture } from "./getSpeedFuture";
import { getUserPostsFuture } from "./getUserPostsFuture";
import { makePostsPrivateFuture } from "./makePostsPrivateFuture";

const main = async () => {

  const scanner = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const username = await getUsernameFuture({
    scanner: scanner,
  });

  const browser = await puppeteer.launch({
    headless: false,
    userDataDir: "/tmp/tumblr_mass_post_archival",
  });

  const page = await browser.newPage();
  await page.goto(`https://www.tumblr.com/mega-editor/published/${username}`);

  let scrollPeriodInMs: number = await getSpeedFuture({
    scanner: scanner,
  });

  const initialPosts = await getUserPostsFuture({
    page: page,
    scrollPeriodInMs: scrollPeriodInMs,
  });

  await makePostsPrivateFuture({
    page,
    initialPosts,
    getPosts: () =>
      getUserPostsFuture({
        page: page,
        scrollPeriodInMs: scrollPeriodInMs,
      }),
  });

  await browser.close();
};

main();
process.exitCode = 1;

