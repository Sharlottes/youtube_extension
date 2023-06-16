import { retryInterval } from "./retryInterval";

type ElementCrawlType<ST extends string> = {
  name: ST;
  selector: string;
  all?: boolean;
};

export async function crawlElements<T extends string>(...crawls: ElementCrawlType<T>[]) {
  const elementRes = {} as Record<T, Element>;
  for (const crawl of crawls) {
    await retryInterval(async () => {
      if (crawl.all) {
        const elements = Array.from(document.querySelectorAll(crawl.selector));
        if (elements.length == 0) throw new Error(`cannot find any ${crawl.name} by selector: ${crawl.selector}`);
        elementRes[crawl.name] = elements as unknown as Element;
      } else {
        const element = document.querySelector(crawl.selector);
        if (!element) throw new Error(`cannot find ${crawl.name} by selector: ${crawl.selector}`);
        elementRes[crawl.name] = element;
      }
    }, 1000);
  }

  return elementRes;
}
