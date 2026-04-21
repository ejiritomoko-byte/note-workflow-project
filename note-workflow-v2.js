const STORAGE_KEY = "note-workflow-app-v3";

const STATUS_LABELS = ["新規", "リライト", "下書き", "公開済み"];
const GOAL_LABELS = {
  rewrite: "リライトする",
  draft: "下書きをする",
  check: "チェックする"
};
const PROMPT_TYPE_LABELS = {
  paid: "有料note用",
  search: "検索流入用",
  rewrite: "リライト特化用"
};

const STATUS_ORDER = {
  "リライト": 0,
  "新規": 1,
  "下書き": 2,
  "公開済み": 3
};

const seedItems = [
  {
    id: crypto.randomUUID(),
    title: "家庭学習に使える『自分専用の学習アプリ』をAIで作ってみた",
    account: "moco_edu_note",
    status: "リライト",
    body: "有料化の主力候補。無料部分でも完成イメージと使い道をもっと見せて、プロンプトや詳しい手順は有料側に寄せたい。",
    mainKeyword: "家庭学習 AI アプリ",
    subKeywords: "ChatGPT, 学習アプリ, 保護者, 小学生, 自作アプリ",
    searchVolume: "未確認",
    source: "https://note.com/moco_edu_note/n/nbd0f988a5c61",
    targetAi: "ChatGPT",
    aiGoal: "rewrite",
    promptType: "paid",
    additions: "",
    removals: "",
    toneChanges: "",
    extraRequests: "",
    needImagePrompt: "yes"
  },
  {
    id: crypto.randomUUID(),
    title: "家庭学習でAIをどう使えば親がラクになるか",
    account: "moco_edu_note",
    status: "新規",
    body: "『親がわかる・ラクする』という軸に合う新規記事候補。",
    mainKeyword: "家庭学習 AI",
    subKeywords: "保護者, ChatGPT, 家庭学習サポート, 効率化",
    searchVolume: "未確認",
    source: "",
    targetAi: "ChatGPT",
    aiGoal: "draft",
    promptType: "search",
    additions: "",
    removals: "",
    toneChanges: "",
    extraRequests: "",
    needImagePrompt: "yes"
  }
];

const reviewChecklist = [
  "タイトルで何の記事かわかるか",
  "無料部分だけで続きを読みたくなるか",
  "キーワードが不自然なく入っているか",
  "削る部分と足す部分が整理できているか"
];

let state = {
  items: loadItems(),
  selectedId: null,
  filters: {
    search: "",
    status: "all"
  },
  currentStep: 1
};

const articleList = document.getElementById("articleList");
const form = document.getElementById("itemForm");
const requestForm = document.getElementById("requestForm");
const statsGrid = document.getElementById("statsGrid");
const promptOutput = document.getElementById("promptOutput");
const imagePromptOutput = document.getElementById("imagePromptOutput");
const currentIdLabel = document.getElementById("currentIdLabel");
const reviewList = document.getElementById("reviewChecklist");
const copyPromptBtn = document.getElementById("copyPromptBtn");
const copyImagePromptBtn = document.getElementById("copyImagePromptBtn");
const captureUrlInput = document.getElementById("captureUrlInput");
const captureMemoInput = document.getElementById("captureMemoInput");

init();

function init() {
  if (!state.selectedId && state.items.length > 0) {
    state.selectedId = state.items[0].id;
  }

  bindEvents();
  renderChecklist();
  renderAll();
}

function loadItems() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return structuredClone(seedItems);
  }

  try {
    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      return structuredClone(seedItems);
    }
    return parsed.map(normalizeItem);
  } catch (error) {
    return structuredClone(seedItems);
  }
}

function normalizeItem(item) {
  return {
    id: item.id || crypto.randomUUID(),
    title: String(item.title || "新しい記事"),
    account: item.account === "learnfromfailure" ? "learnfromfailure" : "moco_edu_note",
    status: STATUS_LABELS.includes(item.status) ? item.status : "新規",
    body: String(item.body || ""),
    mainKeyword: String(item.mainKeyword || ""),
    subKeywords: String(item.subKeywords || ""),
    searchVolume: String(item.searchVolume || ""),
    source: String(item.source || ""),
    targetAi: item.targetAi === "Claude" ? "Claude" : "ChatGPT",
    aiGoal: GOAL_LABELS[item.aiGoal] ? item.aiGoal : "rewrite",
    promptType: PROMPT_TYPE_LABELS[item.promptType] ? item.promptType : "paid",
    additions: String(item.additions || ""),
    removals: String(item.removals || ""),
    toneChanges: String(item.toneChanges || ""),
    extraRequests: String(item.extraRequests || ""),
    needImagePrompt: item.needImagePrompt === "no" ? "no" : "yes"
  };
}

function saveItems() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
}

function bindEvents() {
  document.getElementById("searchInput").addEventListener("input", (event) => {
    state.filters.search = event.target.value.trim().toLowerCase();
    renderArticleList();
  });

  document.getElementById("statusFilter").addEventListener("change", (event) => {
    state.filters.status = event.target.value;
    renderArticleList();
  });

  document.getElementById("newItemBtn").addEventListener("click", () => {
    const item = makeEmptyItem();
    state.items.unshift(item);
    state.selectedId = item.id;
    state.currentStep = 1;
    saveItems();
    renderAll();
  });

  document.getElementById("captureUrlBtn").addEventListener("click", captureUrlAsItem);
  document.getElementById("duplicateBtn").addEventListener("click", duplicateSelectedItem);
  document.getElementById("saveDraftBtn").addEventListener("click", () => updateSelectedStatus("下書き"));
  document.getElementById("markDoneBtn").addEventListener("click", () => updateSelectedStatus("公開済み"));
  document.getElementById("goStepTwoBtn").addEventListener("click", () => {
    persistItemForm();
    setStep(2);
  });
  document.getElementById("backToStepOneBtn").addEventListener("click", () => setStep(1));
  document.getElementById("backToStepTwoBtn").addEventListener("click", () => setStep(2));

  document.getElementById("stepOneTab").addEventListener("click", () => setStep(1));
  document.getElementById("stepTwoTab").addEventListener("click", () => setStep(2));
  document.getElementById("stepThreeTab").addEventListener("click", () => setStep(3));

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    persistItemForm();
    renderAll();
  });

  requestForm.addEventListener("submit", (event) => {
    event.preventDefault();
    persistRequestForm();
    setStep(3);
  });

  form.addEventListener("input", syncOutputsFromForms);
  form.addEventListener("change", syncOutputsFromForms);
  requestForm.addEventListener("input", syncOutputsFromForms);
  requestForm.addEventListener("change", syncOutputsFromForms);

  copyPromptBtn.addEventListener("click", () => copyTextWithFeedback(promptOutput.value || "", copyPromptBtn, promptOutput));
  copyImagePromptBtn.addEventListener("click", () => copyTextWithFeedback(imagePromptOutput.value || "", copyImagePromptBtn, imagePromptOutput));
}

function renderAll() {
  renderStats();
  renderArticleList();
  renderForms();
  renderStep();
}

function renderStats() {
  const stats = [
    { label: "記事数", value: state.items.length, note: "保存中の全記事" },
    { label: "新規", value: countByStatus("新規"), note: "新しく作る記事" },
    { label: "リライト", value: countByStatus("リライト"), note: "見直し中の記事" },
    { label: "下書き", value: countByStatus("下書き"), note: "編集中の本文" }
  ];

  statsGrid.innerHTML = stats.map((stat) => `
    <article class="stat-card">
      <span>${escapeHtml(stat.label)}</span>
      <strong>${stat.value}</strong>
      <span>${escapeHtml(stat.note)}</span>
    </article>
  `).join("");
}

function countByStatus(status) {
  return state.items.filter((item) => item.status === status).length;
}

function renderArticleList() {
  const items = getFilteredItems();
  articleList.innerHTML = items.length
    ? items.map((item) => renderListCard(item)).join("")
    : '<div class="card-item">該当する記事はありません。</div>';

  articleList.querySelectorAll(".card-item[data-id]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedId = button.dataset.id;
      renderAll();
    });
  });
}

function renderListCard(item) {
  const activeClass = item.id === state.selectedId ? "active" : "";
  const preview = excerptText(item.body, 80) || "まだ本文メモがありません。";

  return `
    <button class="card-item ${activeClass}" type="button" data-id="${item.id}">
      <div class="card-top">
        <h4>${escapeHtml(item.title)}</h4>
      </div>
      <div class="meta-row">
        <span class="chip ${accountChipClass(item.account)}">${escapeHtml(item.account)}</span>
        <span class="chip">${escapeHtml(item.status)}</span>
      </div>
      <p class="card-next">${escapeHtml(preview)}</p>
    </button>
  `;
}

function renderForms() {
  const item = getSelectedItem();
  currentIdLabel.textContent = item ? `ID: ${item.id.slice(0, 8)}` : "";

  if (!item) {
    form.reset();
    requestForm.reset();
    promptOutput.value = "";
    imagePromptOutput.value = "";
    return;
  }

  setFormValues(form, item);
  setFormValues(requestForm, item);
  syncOutputsFromForms();
}

function setFormValues(targetForm, item) {
  for (const [key, value] of Object.entries(item)) {
    const field = targetForm.elements.namedItem(key);
    if (field && "value" in field) {
      field.value = value ?? "";
    }
  }
}

function setStep(step) {
  state.currentStep = step;
  renderStep();
}

function renderStep() {
  const tabs = [
    document.getElementById("stepOneTab"),
    document.getElementById("stepTwoTab"),
    document.getElementById("stepThreeTab")
  ];
  const views = [
    document.getElementById("stepOneView"),
    document.getElementById("stepTwoView"),
    document.getElementById("stepThreeView")
  ];

  tabs.forEach((tab, index) => {
    tab.classList.toggle("active", index + 1 === state.currentStep);
  });

  views.forEach((view, index) => {
    view.classList.toggle("active", index + 1 === state.currentStep);
  });
}

function persistItemForm() {
  const selected = getSelectedItem();
  if (!selected) {
    return;
  }

  const formData = new FormData(form);
  const updated = normalizeItem({
    ...selected,
    title: formData.get("title"),
    account: formData.get("account"),
    status: formData.get("status"),
    body: formData.get("body"),
    mainKeyword: formData.get("mainKeyword"),
    subKeywords: formData.get("subKeywords"),
    searchVolume: formData.get("searchVolume"),
    source: formData.get("source"),
    targetAi: formData.get("targetAi")
  });

  state.items = state.items.map((item) => item.id === updated.id ? { ...item, ...updated } : item);
  saveItems();
}

function persistRequestForm() {
  const selected = getSelectedItem();
  if (!selected) {
    return;
  }

  const formData = new FormData(requestForm);
  const updated = normalizeItem({
    ...selected,
    aiGoal: formData.get("aiGoal"),
    promptType: formData.get("promptType"),
    additions: formData.get("additions"),
    removals: formData.get("removals"),
    toneChanges: formData.get("toneChanges"),
    extraRequests: formData.get("extraRequests"),
    needImagePrompt: formData.get("needImagePrompt")
  });

  state.items = state.items.map((item) => item.id === updated.id ? { ...item, ...updated } : item);
  saveItems();
  syncOutputsFromForms();
}

function syncOutputsFromForms() {
  const draftItem = readCurrentDraft();
  if (!draftItem) {
    promptOutput.value = "";
    imagePromptOutput.value = "";
    return;
  }

  promptOutput.value = buildPrompt(draftItem);
  imagePromptOutput.value = draftItem.targetAi === "ChatGPT" && draftItem.needImagePrompt === "yes"
    ? buildImagePrompt(draftItem)
    : "画像生成が不要、または ChatGPT 以外を選んでいるため表示していません。";
}

function readCurrentDraft() {
  const title = String(form.elements.namedItem("title")?.value || "");
  if (!title) {
    return null;
  }

  return normalizeItem({
    id: getSelectedItem()?.id || crypto.randomUUID(),
    title,
    account: String(form.elements.namedItem("account")?.value || "moco_edu_note"),
    status: String(form.elements.namedItem("status")?.value || "新規"),
    body: String(form.elements.namedItem("body")?.value || ""),
    mainKeyword: String(form.elements.namedItem("mainKeyword")?.value || ""),
    subKeywords: String(form.elements.namedItem("subKeywords")?.value || ""),
    searchVolume: String(form.elements.namedItem("searchVolume")?.value || ""),
    source: String(form.elements.namedItem("source")?.value || ""),
    targetAi: String(form.elements.namedItem("targetAi")?.value || "ChatGPT"),
    aiGoal: String(requestForm.elements.namedItem("aiGoal")?.value || "rewrite"),
    promptType: String(requestForm.elements.namedItem("promptType")?.value || "paid"),
    additions: String(requestForm.elements.namedItem("additions")?.value || ""),
    removals: String(requestForm.elements.namedItem("removals")?.value || ""),
    toneChanges: String(requestForm.elements.namedItem("toneChanges")?.value || ""),
    extraRequests: String(requestForm.elements.namedItem("extraRequests")?.value || ""),
    needImagePrompt: String(requestForm.elements.namedItem("needImagePrompt")?.value || "yes")
  });
}

function getSelectedItem() {
  return state.items.find((item) => item.id === state.selectedId) || null;
}

function getFilteredItems() {
  return state.items
    .filter((item) => {
      const haystack = [
        item.title,
        item.body,
        item.mainKeyword,
        item.subKeywords,
        item.source
      ].join(" ").toLowerCase();

      const matchesSearch = !state.filters.search || haystack.includes(state.filters.search);
      const matchesStatus = state.filters.status === "all" || item.status === state.filters.status;

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (STATUS_ORDER[a.status] !== STATUS_ORDER[b.status]) {
        return STATUS_ORDER[a.status] - STATUS_ORDER[b.status];
      }
      return a.title.localeCompare(b.title, "ja");
    });
}

function duplicateSelectedItem() {
  const selected = getSelectedItem();
  if (!selected) {
    return;
  }

  const duplicate = {
    ...structuredClone(selected),
    id: crypto.randomUUID(),
    title: `${selected.title}（複製）`
  };

  state.items.unshift(duplicate);
  state.selectedId = duplicate.id;
  saveItems();
  renderAll();
}

function updateSelectedStatus(status) {
  const selected = getSelectedItem();
  if (!selected) {
    return;
  }

  state.items = state.items.map((item) =>
    item.id === selected.id ? { ...item, status } : item
  );
  saveItems();
  renderAll();
}

function captureUrlAsItem() {
  const rawUrl = String(captureUrlInput.value || "").trim();
  const memo = String(captureMemoInput.value || "").trim();
  if (!rawUrl) {
    return;
  }

  const item = makeEmptyItem();
  item.status = "リライト";
  item.source = rawUrl;
  item.body = memo;
  item.title = guessTitleFromUrl(rawUrl);
  item.account = rawUrl.includes("learnfromfailure") ? "learnfromfailure" : "moco_edu_note";

  state.items.unshift(item);
  state.selectedId = item.id;
  saveItems();
  renderAll();

  captureUrlInput.value = "";
  captureMemoInput.value = "";
}

function makeEmptyItem() {
  return {
    id: crypto.randomUUID(),
    title: "新しい記事",
    account: "moco_edu_note",
    status: "新規",
    body: "",
    mainKeyword: "",
    subKeywords: "",
    searchVolume: "",
    source: "",
    targetAi: "ChatGPT",
    aiGoal: "rewrite",
    promptType: "paid",
    additions: "",
    removals: "",
    toneChanges: "",
    extraRequests: "",
    needImagePrompt: "yes"
  };
}

function guessTitleFromUrl(url) {
  try {
    const parsed = new URL(url);
    const lastPath = parsed.pathname.split("/").filter(Boolean).pop() || "新しい記事";
    return `URL追加: ${lastPath}`;
  } catch (error) {
    return "URL追加: リライト候補";
  }
}

function buildPrompt(item) {
  return [
    `以下の note 記事について、${GOAL_LABELS[item.aiGoal]}のを手伝ってください。`,
    ...buildPromptIntro(item),
    "",
    `タイトル: ${item.title}`,
    `アカウント: ${item.account}`,
    `状態: ${item.status}`,
    item.mainKeyword ? `狙うキーワード: ${item.mainKeyword}` : "",
    item.subKeywords ? `関連キーワード: ${item.subKeywords}` : "",
    item.searchVolume ? `検索ボリューム: ${item.searchVolume}` : "",
    "",
    "本文・メモ:",
    item.body || "未入力",
    "",
    "元記事URL:",
    item.source || "未入力",
    "",
    "追加したい内容:",
    item.additions || "未入力",
    "",
    "削除したい内容:",
    item.removals || "未入力",
    "",
    "表現を変えたい箇所:",
    item.toneChanges || "未入力",
    "",
    "その他依頼:",
    item.extraRequests || "未入力",
    "",
    "やってほしいこと:",
    ...buildPromptTasks(item)
  ].join("\n");
}

function buildPromptIntro(item) {
  if (item.aiGoal === "draft") {
    return [
      "狙うキーワードを不自然にならない範囲でタイトル・見出し・冒頭に反映してください。",
      "メインキーワードは H1、関連キーワードは H2 や H3 に自然に配置してください。"
    ];
  }

  if (item.aiGoal === "check") {
    return [
      "本文をいきなり書き換えるより、弱いところや改善ポイントを先に点検してください。",
      "特に、導入・キーワードの入り方・H1/H2/H3 への配置・無料部分の引き・有料へのつながりを見てください。"
    ];
  }

  if (item.promptType === "search") {
    return [
      "狙うキーワードを不自然にならない範囲でタイトル・見出し・冒頭に反映してください。",
      "メインキーワードは H1、関連キーワードは H2 や H3 に自然に配置してください。",
      "検索で入ってきた読者が、冒頭で離脱しない流れに整えてください。"
    ];
  }

  if (item.promptType === "rewrite") {
    return [
      "本文の良さや元記事の温度感は残しつつ、読みにくい部分だけを丁寧に直してください。",
      "導入、結論、見出し、段落の流れを優先的に改善してください。"
    ];
  }

  return [
    "無料部分で『続きを読みたい』『買いたい』と思える流れに整えてください。",
    "狙うキーワードは不自然にならない範囲でタイトルや見出しに反映してください。",
    "メインキーワードは H1、関連キーワードは H2 や H3 に自然に配置してください。"
  ];
}

function buildPromptTasks(item) {
  if (item.aiGoal === "draft") {
    return [
      "1. note 記事の下書きを作ってください。",
      "2. 必要ならタイトル案を3つ出してください。",
      "3. 必要なら見出し案を作ってください。",
      "4. 最後に、足した方がいい点を3つだけ教えてください。"
    ];
  }

  if (item.aiGoal === "check") {
    return [
      "1. 改善が必要な点を優先順位つきで挙げてください。",
      "2. 必要ならタイトル案や見出し案を提案してください。",
      "3. このテーマが戦えそうかも判断してください。"
    ];
  }

  if (item.promptType === "paid") {
    return [
      "1. リライトしてください。",
      "2. 必要ならタイトル案を3つ出してください。",
      "3. 必要なら見出し案を作ってください。",
      "4. 無料部分でどこまで見せて、どこから先を有料にするとよいか提案してください。"
    ];
  }

  if (item.promptType === "search") {
    return [
      "1. リライトしてください。",
      "2. 必要ならタイトル案を3つ出してください。",
      "3. 必要なら見出し案を作ってください。",
      "4. このキーワードで戦えそうかも判断してください。"
    ];
  }

  return [
    "1. リライトしてください。",
    "2. 必要ならタイトル案を3つ出してください。",
    "3. 必要なら見出し案を作ってください。",
    "4. 読みにくい箇所と改善優先順位を3つ教えてください。"
  ];
}

function buildImagePrompt(item) {
  return [
    "note のメイン画像を作りたいです。",
    item.account === "learnfromfailure"
      ? "落ち着いた、知的で少し緊張感のある note サムネイルにしてください。"
      : "やわらかく信頼感があり、保護者が読みたくなる note サムネイルにしてください。",
    "ChatGPT の画像生成でそのまま使える、具体的でわかりやすい指示にしてください。",
    item.mainKeyword ? `メインキーワードは「${item.mainKeyword}」です。` : "",
    item.subKeywords ? `関連キーワードは「${item.subKeywords}」です。` : "",
    `記事タイトルは「${item.title}」です。`,
    "",
    "画像の要件:",
    "1. スマホで見ても内容が伝わる構図にする",
    "2. 文字を入れるなら短く、読みやすくする",
    "3. note のサムネイルとして自然で、安っぽくしない",
    "4. 記事内容とずれないビジュアルにする"
  ].filter(Boolean).join("\n");
}

async function copyTextWithFeedback(text, button, target) {
  if (!text.trim()) {
    return;
  }

  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      showCopySuccess(button);
      return;
    }
  } catch (error) {
    // fallback
  }

  const helper = document.createElement("textarea");
  helper.value = text;
  helper.setAttribute("readonly", "");
  helper.style.position = "fixed";
  helper.style.top = "-9999px";
  helper.style.left = "-9999px";
  document.body.appendChild(helper);
  helper.focus();
  helper.select();

  try {
    const copied = document.execCommand("copy");
    if (copied) {
      showCopySuccess(button);
    } else {
      showCopyFailure(button, target);
    }
  } catch (error) {
    showCopyFailure(button, target);
  } finally {
    document.body.removeChild(helper);
  }
}

function showCopySuccess(button) {
  button.textContent = "コピー済み";
  setTimeout(() => {
    button.textContent = "全文コピー";
  }, 1500);
}

function showCopyFailure(button, target) {
  button.textContent = "手動でコピー";
  target.focus();
  target.select();
  setTimeout(() => {
    button.textContent = "全文コピー";
  }, 2000);
}

function accountChipClass(account) {
  return account === "learnfromfailure" ? "account-learn" : "account-moco";
}

function renderChecklist() {
  reviewList.innerHTML = reviewChecklist.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function excerptText(value, maxLength) {
  const text = String(value || "").replace(/\s+/g, " ").trim();
  if (!text) {
    return "";
  }
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
}
