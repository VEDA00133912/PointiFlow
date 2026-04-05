// 記事開いたときにスタンプ自動で回収するやつ
const DELAY_MS = 300;

const BUTTON_ACTIONS = [
    {
        match: "続きを読む",
        action: (btn) => safeClick(btn),
    },
    {
        match: "スタンプをゲットする",
        action: (btn) => safeClick(btn),
    },
    {
        match: "付与済み",
        action: () => tabClose(),
    },
    {
        match: "記事一覧へ戻る",
        action: () => tabClose(),
    }
];

function autoProcess() {
    const btn = document.querySelector(".go_btn");
    if (!btn) return;

    const text = btn.textContent.trim();
    const matched = BUTTON_ACTIONS.find(({ match }) => text.includes(match));

    if (matched) {
        setTimeout(() => matched.action(btn), DELAY_MS);
    }
}

function safeClick(btn) {
    if (btn.hasAttribute("onclick")) {
        btn.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
    } else {
        btn.click();
    }
}

function tabClose() {
    chrome.runtime.sendMessage({ type: "CLOSE_TAB" });
}

window.addEventListener("load", () => {
    setTimeout(autoProcess, DELAY_MS);
});