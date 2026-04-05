// お楽しみアンケートの自動回答
const DELAY_MS = 300;

function getNextButton() {
  return document.querySelector('input.btn.btn-success[value*="次"]');
}

function groupByName(inputs) {
  const groups = {};
  inputs.forEach((input) => {
    if (!groups[input.name]) groups[input.name] = [];
    groups[input.name].push(input);
  });
  return groups;
}

// 全選択防止のためにcheckboxの場合は処理分ける
function groupByParent(inputs) {
  const groups = {};
  inputs.forEach((input) => {
    const parent = input.closest("ul, .form-group, .question") ?? document.body;
    const key = parent.id || parent.className;
    if (!groups[key]) groups[key] = [];
    groups[key].push(input);
  });
  return groups;
}

function selectRandomInputs() {
  const radioGroups = groupByName([...document.querySelectorAll('input[type="radio"]')]);
  const checkboxGroups = groupByParent([...document.querySelectorAll('input[type="checkbox"]')]);

  [...Object.values(radioGroups), ...Object.values(checkboxGroups)].forEach((group) => {
    const picked = group[Math.floor(Math.random() * group.length)];
    picked.checked = true;
    picked.dispatchEvent(new Event("change", { bubbles: true }));
  });
}

// 応募券獲得コードの入力
function fillApplicationCode() {
  const codes = Array.from(document.querySelectorAll('span[style*="color: #ff0000"]'))
    .map((s) => s.textContent.trim())
    .filter((t) => /^\d+$/.test(t));

  if (codes.length < 3) return;

  ["bp_a1", "bp_a2", "bp_a3"].forEach((name, i) => {
    const select = document.querySelector(`select[name="${name}"]`);
    if (select) select.value = codes[i];
  });
}

function tabClose() {
  chrome.runtime.sendMessage({ type: "CLOSE_TAB" });
}

function autoAnswer() {
  const nextBtn = getNextButton();

  if (!nextBtn) {
    tabClose();
    return;
  }

  selectRandomInputs();
  fillApplicationCode();

  setTimeout(() => {
    nextBtn.click();
    setTimeout(autoAnswer, DELAY_MS);
  }, DELAY_MS);
}

window.addEventListener("load", () => {
  setTimeout(autoAnswer, DELAY_MS);
});