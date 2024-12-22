import { PlaywrightCrawler } from "crawlee";

const crawler = new PlaywrightCrawler({
  // 是否开启 headless
  // headless: false,
  requestHandler: async ({ page }) => {
    // 等待文章元素加载完成
    ///await page.waitForSelector(".new_ui_offer");
    await page.waitForTimeout(2000);

    // 执行 script 获取文章链接
    const categoryTexts = await page.$$eval(".new_ui_offer", (els) => {
      // 获取文章链接和文章名称
      return els.map((el) => {
        return {
          url: el.querySelector("a")?.getAttribute("href"),
          name: el.querySelector(".offer-title span")?.firstChild?.textContent,
        };
      });
    });
    categoryTexts.forEach((text, i) => {
      console.log(`文章${i + 1}: ${JSON.stringify(text, undefined, 2)}\n`);
    });
  },
});

const url =
  "https://p4psearch.1688.com/page.html?hpageId=old-sem-pc-list&keywords=%E9%81%BF%E5%AD%95%E5%A5%97+&cosite=360jj&location=landing_t4&trackid=88574167300665472729259&spm=a2638t.b_30496503.szyx_head.submit&keywordid=50140517916&bt=&exp=pcCpxGuessExp%3AB&ptid=hrd713c22cfd14b5";

// 前端热榜链接
crawler.run([url]);
