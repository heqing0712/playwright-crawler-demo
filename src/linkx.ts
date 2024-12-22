import { PuppeteerCrawler } from "crawlee";

const crawler = new PuppeteerCrawler({
  async requestHandler({ request, enqueueLinks, log }) {
    log.info(request.url);
    // Add all links from page to RequestQueue
    await enqueueLinks({
      globs: ["https://detail.1688.com/offer/*"],
    });
  },
  maxRequestsPerCrawl: 10, // Limitation for only 10 requests (do not use if you want to crawl all links)
});

const url =
  "https://p4psearch.1688.com/page.html?hpageId=old-sem-pc-list&keywords=%E9%81%BF%E5%AD%95%E5%A5%97+&cosite=360jj&location=landing_t4&trackid=88574167300665472729259&spm=a2638t.b_30496503.szyx_head.submit&keywordid=50140517916&bt=&exp=pcCpxGuessExp%3AB&ptid=hrd713c22cfd14b5";

// Run the crawler with initial request
await crawler.run([url]);
