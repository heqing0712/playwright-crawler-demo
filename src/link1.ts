import { PlaywrightCrawler } from "crawlee";

const crawler = new PlaywrightCrawler({
  // 是否开启 headless
  // headless: false,
  requestHandler: async ({ page }) => {
    // 等待文章元素加载完成
    await page.waitForSelector(".article-item-link");

    // 执行 script 获取文章链接
    const categoryTexts = await page.$$eval(".article-item-link", (els) => {
      // 获取文章链接和文章名称
      return els.map((el) => {
        return {
          url: el.getAttribute("href"),
          name: el.querySelector(".article-detail")?.firstChild?.textContent,
        };
      });
    });
    categoryTexts.forEach((text, i) => {
      console.log(`文章${i + 1}: ${JSON.stringify(text, undefined, 2)}\n`);
    });
  },
});

// 前端热榜链接
crawler.run(["https://juejin.cn/hot/articles/6809637767543259144"]);
