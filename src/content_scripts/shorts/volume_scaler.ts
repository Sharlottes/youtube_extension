import { crawlElements } from "../../utils/crawlElements";
import { observeURL } from "../../utils/observeURL";

const volumeIconCache = new DOMParser()
  .parseFromString(
    `
  <svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%">
    <path 
      class="ytp-svg-fill ytp-svg-volume-animation-speaker" 
      clip-path="url(#ytp-svg-volume-animation-mask)" 
      d="M8,21 L12,21 L17,26 L17,10 L12,15 L8,15 L8,21 Z M19,14 L19,22 C20.48,21.32 21.5,19.77 21.5,18 C21.5,16.26 20.48,14.74 19,14 Z" 
      fill="#fff" 
      id="ytp-id-15"
    >
    </path>
  </svg>
`,
    "text/html"
  )
  .getElementsByTagName("svg")[0];

enum SoundSvgPathD {
  None = "m 21.48,17.98 c 0,-1.77 -1.02,-3.29 -2.5,-4.03 v 2.21 l 2.45,2.45 c .03,-0.2 .05,-0.41 .05,-0.63 z m 2.5,0 c 0,.94 -0.2,1.82 -0.54,2.64 l 1.51,1.51 c .66,-1.24 1.03,-2.65 1.03,-4.15 0,-4.28 -2.99,-7.86 -7,-8.76 v 2.05 c 2.89,.86 5,3.54 5,6.71 z M 9.25,8.98 l -1.27,1.26 4.72,4.73 H 7.98 v 6 H 11.98 l 5,5 v -6.73 l 4.25,4.25 c -0.67,.52 -1.42,.93 -2.25,1.18 v 2.06 c 1.38,-0.31 2.63,-0.95 3.69,-1.81 l 2.04,2.05 1.27,-1.27 -9,-9 -7.72,-7.72 z m 7.72,.99 -2.09,2.08 2.09,2.09 V 9.98 z",
  Smol = "M8,21 L12,21 L17,26 L17,10 L12,15 L8,15 L8,21 Z M19,14 L19,22 C20.48,21.32 21.5,19.77 21.5,18 C21.5,16.26 20.48,14.74 19,14 Z",
  Big = "M8,21 L12,21 L17,26 L17,10 L12,15 L8,15 L8,21 Z M19,14 L19,22 C20.48,21.32 21.5,19.77 21.5,18 C21.5,16.26 20.48,14.74 19,14 ZM19,11.29 C21.89,12.15 24,14.83 24,18 C24,21.17 21.89,23.85 19,24.71 L19,26.77 C23.01,25.86 26,22.28 26,18 C26,13.72 23.01,10.14 19,9.23 L19,11.29 Z",
}

function createVolumeController(volumeButton: HTMLButtonElement) {
  const parent = volumeButton.parentElement?.parentElement!;
  const rangeInput = document.createElement("input");
  rangeInput.type = "range";
  rangeInput.min = "0";
  rangeInput.max = "1";
  rangeInput.step = "0.01";
  // @ts-ignore
  rangeInput.style = ";pointer-events:all;margin-left:auto;";
  const lastChild = parent.lastChild!;
  parent.replaceChild(rangeInput, lastChild);
  parent.appendChild(volumeButton);
  return rangeInput;
}

function start() {
  crawlElements(
    {
      name: "volumeButton",
      selector:
        "ytd-reel-video-renderer[is-active] .player-controls > ytd-shorts-player-controls > yt-icon-button:nth-of-type(2) > button",
      is: HTMLButtonElement,
      isValid: (e) => Boolean(e.parentElement?.parentElement),
      retryOptions: { mute: true, max_try: 100 },
    },
    {
      name: "video",
      selector: "ytd-reel-video-renderer[is-active] video",
      is: HTMLVideoElement,
      retryOptions: { mute: true, max_try: 100 },
    }
  ).then(({ video, volumeButton }) => {
    const volumeIcon = volumeIconCache.cloneNode(true) as Element;
    volumeButton.removeChild(volumeButton.firstElementChild!);
    volumeButton.appendChild(volumeIcon);
    //@ts-ignore
    volumeButton.style = ";pointer-events:all;width:24px;";

    let lastRangeInputValue = 0,
      lastRangeInputValueBeforeZero = 0;
    function updateVolume(volume: number) {
      video.volume = volume;
      rangeInput.value = String(volume);
      if (video.volume == 0) {
        volumeIcon.querySelector("path")?.setAttribute("d", SoundSvgPathD.None);
      } else if (
        (lastRangeInputValue == 0 && video.volume < 0.5) ||
        (lastRangeInputValue >= 0.5 && video.volume < 0.5)
      ) {
        volumeIcon.querySelector("path")?.setAttribute("d", SoundSvgPathD.Smol);
      } else if (lastRangeInputValue <= 0.5 && video.volume > 0.5) {
        volumeIcon.querySelector("path")?.setAttribute("d", SoundSvgPathD.Big);
      }
      lastRangeInputValue = volume;
      if (volume != 0) lastRangeInputValueBeforeZero = volume;
    }

    const rangeInput = createVolumeController(volumeButton);
    volumeButton.addEventListener("click", () => {
      updateVolume(
        rangeInput.value == "0" ? (lastRangeInputValueBeforeZero <= 0.1 ? 1 : lastRangeInputValueBeforeZero) : 0
      );
    });
    rangeInput.addEventListener("input", () => updateVolume(parseFloat(rangeInput.value)));
    updateVolume(video.volume);
  });
}

start();
observeURL(start);
