import { delay } from "./delay";

export interface RetryIntervalOptions {
  max_try?: number;
  mute?: boolean;
}
export const retryInterval = (
  callback: () => Promise<void>,
  ms: number,
  { max_try = 10, mute = false }: RetryIntervalOptions = { max_try: 10, mute: false }
) =>
  new Promise<void>(async (res, rej) => {
    for (let i = 0; i < max_try; i++) {
      try {
        await callback();
        res();
        return;
      } catch (e) {
        if (!mute) console.error(e);
        await delay(ms);
      }
    }
    rej("interval try timeout!");
  });
