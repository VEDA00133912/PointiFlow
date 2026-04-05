// magazineページで記事開くやつ。開いたのは要素消していく
const OPEN_INTERVAL_MS = 2000;

function getArticleLinks() {
  return Array.from(document.querySelectorAll("#link_list li a"));
}

function openNextArticle() {
  const links = getArticleLinks();

  // リンクなくなったら次ページに行く
  if (links.length === 0) {
    goNextPage();
    return;
  }

  const link = links[0];
  const url = link.href;
  link.closest("li")?.remove();

  chrome.runtime.sendMessage({ action: "openTab", url });
  setTimeout(openNextArticle, OPEN_INTERVAL_MS);
}

function goNextPage() {
  const nextBtn = document.querySelector(".pager .next");

  if (nextBtn?.href) {
    window.location.href = nextBtn.href;
  } else {
    console.log("全ページ処理完了");
  }
}

window.addEventListener("load", () => {
  setTimeout(openNextArticle, OPEN_INTERVAL_MS);
});