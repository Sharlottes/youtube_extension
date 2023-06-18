import { crawlElements } from "../utils/crawlElements";

const buttonStyleClasses =
  "yt-spec-button-shape-next yt-spec-button-shape-next--outline yt-spec-button-shape-next--mono yt-spec-button-shape-next--size-m";

function createPreviewCheckbox() {
  const copiedCheckbox: HTMLButtonElement & { checked?: boolean } = document.createElement("button");
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
    thumbnailImg.style = `z-index:99;position:absolute;bottom:0;${opened ? "display:block" : "display:none"}`;
  }

  const updatefulThumbnailImg: HTMLImageElement & {
    update: (opened: boolean) => void;
  } = Object.assign(thumbnailImg, { update });
  return updatefulThumbnailImg;
}

crawlElements(
  { name: "ownerContainer", selector: "#owner" },
  { name: "playerContainer", selector: "#ytd-player > #container", is: HTMLDivElement }
).then(({ ownerContainer, playerContainer }) => {
  const thumbnailImg = createThumbnailImg();
  playerContainer.appendChild(thumbnailImg);

  const checkbox = createPreviewCheckbox();
  //@ts-ignore
  checkbox.style = "margin-left:8px";
  checkbox.className = buttonStyleClasses.replace(/tonal|filled/, "outline");
  checkbox.addEventListener("click", () => {
    checkbox.checked = !checkbox.checked;
    checkbox.className = checkbox.className.replace(/outline|tonal/, checkbox.checked ? "tonal" : "outline");
    thumbnailImg.update(checkbox.checked);
  });
  //@ts-ignore
  ownerContainer.style += ";display:flex;";
  ownerContainer.appendChild(checkbox);
});
