import { crawlElements } from "../../utils/crawlElements";
import { delay } from "../../utils/delay";

crawlElements({
  name: "video",
  selector: "video",
  is: HTMLVideoElement,
}).then(({ video }) => {
  let prog = 0.5;
  video.currentTime = video.duration * prog;
});
