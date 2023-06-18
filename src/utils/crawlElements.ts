import { RetryIntervalOptions, retryInterval } from "./retryInterval";

// thanks for @andjsrk to solve multi `crawlElement` type issue
type Crawl<Name extends string, Result extends Element, All extends boolean> = {
  name: Name;
  selector: string;
  is?: new (...args: any) => Result;
  isValid?: ((element: Result) => boolean) | { vaildator: (element: Result) => boolean; errorMessage: string };
  all?: All;
  retryOptions?: RetryIntervalOptions;
};
type AllPropDefault = false;
type AnyCrawl = Crawl<any, any, any>;
type FoldResult = Record<string, Element | Array<Element>>;
type FoldCrawl<Acc extends FoldResult, C extends AnyCrawl> = C extends Crawl<
  infer Name extends string,
  infer E extends Element,
  infer All extends boolean
>
  ? Acc & {
      [_ in Name]: (boolean extends All ? AllPropDefault : All) extends true ? Array<E> : E;
    }
  : never;
type FoldCrawls<Items extends Array<AnyCrawl>, Acc extends FoldResult = {}> = Items extends [
  infer First extends AnyCrawl,
  ...infer Rest extends Array<AnyCrawl>
]
  ? FoldCrawls<Rest, FoldCrawl<Acc, First>>
  : Acc;

export async function crawlElements<const Crawls extends Array<AnyCrawl>>(
  ...crawls: [...Crawls]
): Promise<FoldCrawls<Crawls>> {
  const elementRes = {} as Record<string, Element | Element[]>;

  for (const crawl of crawls) {
    const validation = (elem: any) => {
      if (crawl.isValid) {
        if (typeof crawl.isValid === "function") {
          if (!crawl.isValid(elem)) throw new Error(`the ${crawl.name} element is invalid!`);
        } else {
          if (!crawl.isValid.vaildator(elem)) throw new Error(crawl.isValid.errorMessage);
        }
      }
    };

    await retryInterval(
      async () => {
        if (crawl.all) {
          const elements = Array.from(document.querySelectorAll(crawl.selector));
          if (elements.length == 0) throw new Error(`cannot find any ${crawl.name} by selector: ${crawl.selector}`);
          validation(elements);

          elementRes[crawl.name] = elements;
        } else {
          const element = document.querySelector(crawl.selector);
          if (!element) throw new Error(`cannot find ${crawl.name} by selector: ${crawl.selector}`);
          validation(element);

          elementRes[crawl.name] = element;
        }
      },
      500,
      crawl.retryOptions
    );
  }

  return elementRes as any;
}
