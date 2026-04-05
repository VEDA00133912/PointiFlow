// 毎日クリックの回収
const DELAY_MS = 300;
const RELOAD_DELAY_MS = 1000;

function getTargetButtons() {
    return Array.from(document.querySelector(".go_btn"))
    .filter((btn) => btn.textCotent.includes("クリックで1pt"));
}

function clickButton(btn) {
    btn.closest("a")?.dispatchEvent(
        new MouseEvent("click", { bubbles: true, cancelable: true, view: window })
    );
}

// 0.3秒ごとにリンク開いていく
function cllickAll(targets, index = 0) {
    if (index >= targets.length) {
        setTimeout(() => location.reload(), RELOAD_DELAY_MS);
        return;
    }

    clickButton(targets[index]);
    setTimeout(() => cllickAll(targets, index +1), DELAY_MS);
}

function autoDailyClick() {
    const targets = getTargetButtons();
    if (targets.length) cllickAll(targets);
}

window.addEventListener("load", () => {
    setTimeout(autoDailyClick, DELAY_MS);
})

