import { crawlElements } from "../../utils/crawlElements";

crawlElements(
  {
    name: "video",
    selector: "video",
    is: HTMLVideoElement,
  },
  {
    name: "progressBar",
    selector: "#progress-bar",
    is: HTMLElement,
  },
  {
    name: "progressBarBackgroundLine",
    selector: "#progress-bar-line",
    is: HTMLElement,
  },
  {
    name: "progressBarLine",
    selector: "#progress-bar > .progress-bar-played",
    is: HTMLElement,
  }
).then(({ video, progressBarBackgroundLine, progressBarLine }) => {
  let prog = 0.5;
  video.currentTime = video.duration * prog;
  progressBarBackgroundLine.setAttribute("aria-valuenow", String(prog * 100));
  progressBarLine.style.transform = `scaleX(${prog})`;
});
