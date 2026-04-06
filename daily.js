// 毎日クリックの自動回収

const DELAY_MS = 300;
const RELOAD_DELAY_MS = 1000;

function getTargetButtons() {
  return Array.from(document.querySelectorAll(".go_btn"))
    .filter((btn) => btn.textContent.includes("クリックで1pt"));
}

function clickButton(btn) {
  btn.closest("a")?.dispatchEvent(
    new MouseEvent("click", { bubbles: true, cancelable: true, view: window })
  );
}

// 0.3秒ごとにリンク全部開いていく
function clickAll(targets, index = 0) {
  if (index >= targets.length) {
    setTimeout(() => location.reload(), RELOAD_DELAY_MS);
    return;
  }

  clickButton(targets[index]);
  setTimeout(() => clickAll(targets, index + 1), DELAY_MS);
}

function autoDailyClick() {
  const targets = getTargetButtons();
  if (targets.length) clickAll(targets);
}

window.addEventListener("load", () => {
  setTimeout(autoDailyClick, DELAY_MS);
});