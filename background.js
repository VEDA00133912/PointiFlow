// タブの開閉するやつ

chrome.runtime.onMessage.addListener((msg, sender) => {
  if (msg.type === "CLOSE_TAB") {
    const tabId = sender.tab?.id;
    if (!tabId) {
      console.warn("sender.tab.idの取得に失敗しました", sender);
      return;
    }
    chrome.tabs.remove(tabId).catch((err) => {
      console.error("タブを閉じることができませんでした", err);
    });
  }

  if (msg.action === "openTab" && msg.url) {
    chrome.tabs.create({ url: msg.url, active: false });
  }
});