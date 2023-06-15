import { delay } from "./delay";

export const retryInterval = async (
  callback: () => Promise<void>,
  ms: number,
  max_try = 10
) => {
  for (let i = 0; i < max_try; i++) {
    try {
      await callback();
      return;
    } catch (e) {
      console.error(e);
      await delay(ms);
    }
  }
  console.error("interval try timeout!");
};
