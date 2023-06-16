import { delay } from "./delay";

export const retryInterval = (callback: () => Promise<void>, ms: number, max_try = 10) =>
  new Promise<void>(async (res, rej) => {
    for (let i = 0; i < max_try; i++) {
      try {
        await callback();
        res();
        return;
      } catch (e) {
        console.error(e);
        await delay(ms);
      }
    }
    rej("interval try timeout!");
  });
