export function observeURL(callback: (oldurl: string, newurl: string) => void) {
  let previousUrl = "";
  const documentObserver = new MutationObserver(function () {
    if (window.location.href !== previousUrl) {
      callback(previousUrl, window.location.href);
      previousUrl = window.location.href;
    }
  });
  documentObserver.observe(document, { subtree: true, childList: true });
}
