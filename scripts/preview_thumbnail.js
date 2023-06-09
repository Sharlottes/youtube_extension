//@ts-check

/**
 * async delay
 * @param {number} ms delay in miliseconds
 * @returns Promise
 */
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

/**
 * retry N times
 * @param {() => Promise<void>} callback throwable async callback function
 * @param {number} ms interval delay in miliseconds
 * @param {number} [max_try=10] maximize try count, default 10
 * @returns Promise<void>
 */
const retryInterval = async (callback, ms, max_try = 10) => {
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

function createPreviewCheckbox() {
  /**
   * @type HTMLButtonElement & { checked?: boolean }
   */
  const copiedCheckbox = document.createElement("button");
  copiedCheckbox.innerText = "See Thumbnail";
  return copiedCheckbox;
}

function createThumbnailImg() {
  const thumbnailImg = document.createElement("img");
  function update(opened = false) {
    const videoId = document.URL.replace(/.*\?v=(.*)/g, "$1").split("&")[0];
    const thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
    thumbnailImg.setAttribute("src", thumbnailUrl);
    //@ts-ignore
    thumbnailImg.style = `position:absolute;bottom:0;${
      opened ? "display:block" : "display:none"
    }`;
  }

  /**
   * @type HTMLImageElement & { update: (opened: boolean) => void}
   */
  const updatefulThumbnailImg = Object.assign(thumbnailImg, { update });
  return updatefulThumbnailImg;
}

retryInterval(async () => {
  const ownerContainer = document.getElementById("owner");
  if (!ownerContainer) throw new Error("failed to get owner element");
  const justAButton = ownerContainer.getElementsByTagName("button")[0];
  if (!justAButton) throw new Error("failed to get button in owner element");
  const playerContainer = document.querySelector("#ytd-player > #container");
  if (!playerContainer)
    throw new Error("failed to get button in owner element");

  const thumbnailImg = createThumbnailImg();
  playerContainer.appendChild(thumbnailImg);

  const checkbox = createPreviewCheckbox();
  //@ts-ignore
  checkbox.style = "margin-left:8px";
  checkbox.className = justAButton.className.replace(
    /outline|tonal|filled/,
    checkbox.checked ? "tonal" : "outline"
  );
  checkbox.addEventListener("click", () => {
    checkbox.checked = !checkbox.checked;
    checkbox.className = checkbox.className.replace(
      /outline|tonal/,
      checkbox.checked ? "tonal" : "outline"
    );
    thumbnailImg.update(checkbox.checked);
  });
  //@ts-ignore
  ownerContainer.style += ";display:flex;";
  ownerContainer.appendChild(checkbox);
}, 1000);
