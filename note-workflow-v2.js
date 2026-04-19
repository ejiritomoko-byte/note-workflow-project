const STORAGE_KEY = "note-workflow-app-v2";

const TYPE_LABELS = {
  new: "新規記事",
  rewrite: "リライト"
};

const GOAL_LABELS = {
  draft: "下書きを作る",
  clarity: "わかりやすくする",
  humanize: "AIっぽさを減らす",
  opinion: "意見を強める",
  rewrite: "リライトする"
};

const PRIORITY_ORDER = { 高: 0, 中: 1, 低: 2 };
const TYPE_ORDER = { rewrite: 0, new: 1 };

const LEGACY_TYPE_MAP = {
  new: "new",
  draft: "new",
  comparison: "new",
  rewrite: "rewrite"
};

const LEGACY_STATUS_MAP = {
  Idea: "ネタ",
  Drafting: "下書き中",
  Polishing: "整え中",
  Rewrite: "リライト中",
  Ready: "公開OK",
  "ネタ": "ネタ",
  "下書き中": "下書き中",
  "整え中": "整え中",
  "リライト中": "リライト中",
  "公開OK": "公開OK"
};

const LEGACY_PRIORITY_MAP = {
  High: "高",
  Medium: "中",
  Low: "低",
  "高": "高",
  "中": "中",
  "低": "低"
};

const LEGACY_GOAL_MAP = {
  "first-draft": "draft",
  draft: "draft",
  "clarity-pass": "clarity",
  clarity: "clarity",
  "humanize-pass": "humanize",
  humanize: "humanize",
  "opinion-pass": "opinion",
  opinion: "opinion",
  "rewrite-pass": "rewrite",
  rewrite: "rewrite"
};

const seedItems = [
  {
    id: crypto.randomUUID(),
    title: "家庭学習に使える『自分専用の学習アプリ』をAIで作ってみた",
    account: "moco_edu_note",
    type: "rewrite",
    status: "リライト中",
    priority: "高",
    due: "最優先",
    body: "有料化の主力候補。無料部分でも完成イメージと使い道をもっと見せて、プロンプトや詳しい手順は有料側に寄せたい。",
    mainKeyword: "家庭学習 AI アプリ",
    subKeywords: "ChatGPT, 学習アプリ, 保護者, 小学生, 自作アプリ",
    searchVolume: "未確認",
    competition: "中",
    titleIdeas: "AIで家庭学習アプリを自作してみた\n保護者向け、自分専用の学習アプリをAIで作る方法",
    headingIdeas: "1. なぜ家庭学習アプリを自作するのか\n2. 実際に作ったアプリの例\n3. 無料でできる範囲\n4. 有料版で広がること",
    source: "https://note.com/moco_edu_note/n/nbd0f988a5c61",
    nextAction: "タイトルをベネフィット型に直して、無料部分と有料部分の境界を整理する。",
    targetAi: "ChatGPT",
    aiGoal: "rewrite",
    archived: false
  },
  {
    id: crypto.randomUUID(),
    title: "中学受験の国語に使えるAIはどれ？",
    account: "moco_edu_note",
    type: "rewrite",
    status: "リライト中",
    priority: "高",
    due: "今週中",
    body: "比較の結論をもっと前に出したい。『結局どれに課金すればいいのか』が一目でわかる形にしたい。",
    mainKeyword: "中学受験 国語 AI",
    subKeywords: "ChatGPT, Claude, 比較, 保護者, 家庭学習",
    searchVolume: "未確認",
    competition: "中〜強",
    titleIdeas: "中学受験の国語に使えるAIはどれ？\n中学受験の国語に強いAIを比較してみた",
    headingIdeas: "1. 国語でAIを使うときの注意点\n2. 比較したAI\n3. 結論\n4. 課金するならどれか",
    source: "https://note.com/moco_edu_note/n/n2e4b937c23fc",
    nextAction: "タイトルを結論型に変えて、比較表とおすすめの使い分けを再構成する。",
    targetAi: "Claude",
    aiGoal: "rewrite",
    archived: false
  },
  {
    id: crypto.randomUUID(),
    title: "子どもの『考える力』を引き出す、たった3つの習慣",
    account: "moco_edu_note",
    type: "rewrite",
    status: "整え中",
    priority: "中",
    due: "",
    body: "無料集客の柱にしたい記事。読者の悩みにもっと寄せて、関連記事への導線を強くしたい。",
    mainKeyword: "考える力 子ども",
    subKeywords: "家庭学習, 思考力, 保護者, 勉強習慣",
    searchVolume: "未確認",
    competition: "中",
    titleIdeas: "子どもの考える力を引き出す3つの習慣\n考えない子にしないために親ができること",
    headingIdeas: "1. なぜ考えなくなるのか\n2. 思考を止める環境\n3. 家庭でできること\n4. 3つの習慣",
    source: "https://note.com/moco_edu_note/n/ne661a9271f55",
    nextAction: "冒頭に『言われたことしかやらない』『途中式を書かない』など具体悩みを追加する。",
    targetAi: "ChatGPT",
    aiGoal: "clarity",
    archived: false
  },
  {
    id: crypto.randomUUID(),
    title: "ビジコンで書かされる『3年後のプラン』は、なぜ事業の判断を狂わせるのか",
    account: "learnfromfailure",
    type: "rewrite",
    status: "リライト中",
    priority: "中",
    due: "",
    body: "切り口は良いが、読者対象をもう少し絞りたい。『初めてビジコンに出る人』向けに寄せると強くなる。",
    mainKeyword: "ビジコン 起業",
    subKeywords: "ビジネスコンテスト, 事業計画, 起業前, 失敗談",
    searchVolume: "未確認",
    competition: "中",
    titleIdeas: "初めてビジコンに出る前に確認してほしいこと\n3年後のプランが事業判断を狂わせる理由",
    headingIdeas: "1. なぜ出る前に止まってほしいのか\n2. 実際に見た違和感\n3. 締切の罠\n4. 出る前の確認項目",
    source: "https://note.com/learnfromfailure",
    nextAction: "冒頭に『誰向けか』を明確にして、実体験の損失を先に出す。",
    targetAi: "Claude",
    aiGoal: "rewrite",
    archived: false
  },
  {
    id: crypto.randomUUID(),
    title: "家庭学習でAIをどう使えば親がラクになるか",
    account: "moco_edu_note",
    type: "new",
    status: "ネタ",
    priority: "高",
    due: "",
    body: "『親がわかる・ラクする』という軸に合う新規記事候補。",
    mainKeyword: "家庭学習 AI",
    subKeywords: "保護者, ChatGPT, 家庭学習サポート, 効率化",
    searchVolume: "未確認",
    competition: "中",
    titleIdeas: "家庭学習でAIを使うと親はどこまでラクになる？\n保護者がAIを使うべき理由",
    headingIdeas: "1. 親がしんどいポイント\n2. AIで減らせる作業\n3. 丸投げにしない使い方\n4. まず試す手順",
    source: "moco_edu_note の新規記事候補",
    nextAction: "記事タイトル案を3つ出して、無料記事にするか決める。",
    targetAi: "ChatGPT",
    aiGoal: "draft",
    archived: false
  }
];

const reviewChecklist = [
  "タイトルで何の記事かわかるか",
  "本文に読者の悩みが入っているか",
  "次にやることが1行で書けているか",
  "参照URLや元記事が残っているか"
];

let state = {
  items: loadItems(),
  selectedId: null,
  filters: {
    search: "",
    type: "all",
    status: "all",
    priority: "all"
  }
};

const form = document.getElementById("itemForm");
const board = document.getElementById("board");
const statsGrid = document.getElementById("statsGrid");
const promptOutput = document.getElementById("promptOutput");
const currentIdLabel = document.getElementById("currentIdLabel");
const reviewList = document.getElementById("reviewChecklist");

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
    title: String(item.title || "新しい項目"),
    account: item.account === "learnfromfailure" ? "learnfromfailure" : "moco_edu_note",
    type: LEGACY_TYPE_MAP[item.type] || "new",
    status: LEGACY_STATUS_MAP[item.status] || "ネタ",
    priority: LEGACY_PRIORITY_MAP[item.priority] || "中",
    due: String(item.due || ""),
    body: String(item.body || item.summary || ""),
    mainKeyword: String(item.mainKeyword || ""),
    subKeywords: String(item.subKeywords || ""),
    searchVolume: String(item.searchVolume || ""),
    competition: String(item.competition || ""),
    titleIdeas: String(item.titleIdeas || ""),
    headingIdeas: String(item.headingIdeas || ""),
    source: String(item.source || ""),
    nextAction: String(item.nextAction || ""),
    targetAi: item.targetAi === "Claude" ? "Claude" : "ChatGPT",
    aiGoal: LEGACY_GOAL_MAP[item.aiGoal] || "draft",
    archived: Boolean(item.archived)
  };
}

function saveItems() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
}

function bindEvents() {
  document.getElementById("searchInput").addEventListener("input", (event) => {
    state.filters.search = event.target.value.trim().toLowerCase();
    renderBoard();
  });

  document.getElementById("typeFilter").addEventListener("change", (event) => {
    state.filters.type = event.target.value;
    renderBoard();
  });

  document.getElementById("statusFilter").addEventListener("change", (event) => {
    state.filters.status = event.target.value;
    renderBoard();
  });

  document.getElementById("priorityFilter").addEventListener("change", (event) => {
    state.filters.priority = event.target.value;
    renderBoard();
  });

  document.getElementById("newItemBtn").addEventListener("click", () => {
    const newItem = makeEmptyItem();
    state.items.unshift(newItem);
    state.selectedId = newItem.id;
    saveItems();
    renderAll();
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const selected = getSelectedItem();
    if (!selected) {
      return;
    }

    const formData = new FormData(form);
    const updated = normalizeItem({
      ...selected,
      title: formData.get("title"),
      account: formData.get("account"),
      type: formData.get("type"),
      status: formData.get("status"),
      priority: formData.get("priority"),
      due: formData.get("due"),
      body: formData.get("body"),
      mainKeyword: formData.get("mainKeyword"),
      subKeywords: formData.get("subKeywords"),
      searchVolume: formData.get("searchVolume"),
      competition: formData.get("competition"),
      titleIdeas: formData.get("titleIdeas"),
      headingIdeas: formData.get("headingIdeas"),
      source: formData.get("source"),
      nextAction: formData.get("nextAction"),
      targetAi: formData.get("targetAi"),
      aiGoal: formData.get("aiGoal")
    });

    state.items = state.items.map((item) => item.id === updated.id ? updated : item);
    saveItems();
    renderAll();
  });

  document.getElementById("duplicateBtn").addEventListener("click", () => {
    const selected = getSelectedItem();
    if (!selected) {
      return;
    }

    const duplicate = {
      ...structuredClone(selected),
      id: crypto.randomUUID(),
      title: `${selected.title}（複製）`,
      archived: false
    };
    state.items.unshift(duplicate);
    state.selectedId = duplicate.id;
    saveItems();
    renderAll();
  });

  document.getElementById("archiveBtn").addEventListener("click", () => {
    const selected = getSelectedItem();
    if (!selected) {
      return;
    }

    state.items = state.items.map((item) =>
      item.id === selected.id
        ? { ...item, archived: true, status: "公開OK", nextAction: "対応完了" }
        : item
    );

    state.selectedId = getFilteredItems()[0]?.id || null;
    saveItems();
    renderAll();
  });

  document.getElementById("resetBtn").addEventListener("click", () => {
    state.items = structuredClone(seedItems);
    state.selectedId = state.items[0]?.id || null;
    saveItems();
    renderAll();
  });

  document.getElementById("exportBtn").addEventListener("click", () => {
    const blob = new Blob([JSON.stringify(state.items, null, 2)], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "note-workflow-items.json";
    link.click();
    URL.revokeObjectURL(link.href);
  });

  form.addEventListener("input", syncPromptFromForm);
  form.addEventListener("change", syncPromptFromForm);
}

function renderAll() {
  renderStats();
  renderBoard();
  renderForm();
}

function renderChecklist() {
  reviewList.innerHTML = reviewChecklist.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
}

function renderStats() {
  const activeItems = state.items.filter((item) => !item.archived);
  const stats = [
    { label: "運用中の記事", value: activeItems.length, note: "完了扱い以外" },
    { label: "新規記事", value: activeItems.filter((item) => item.type === "new").length, note: "新しく書く候補" },
    { label: "リライト", value: activeItems.filter((item) => item.type === "rewrite").length, note: "直したい記事" },
    { label: "優先度 高", value: activeItems.filter((item) => item.priority === "高").length, note: "先に手をつける候補" }
  ];

  statsGrid.innerHTML = stats.map((stat) => `
    <article class="stat-card">
      <span>${escapeHtml(stat.label)}</span>
      <strong>${stat.value}</strong>
      <span>${escapeHtml(stat.note)}</span>
    </article>
  `).join("");
}

function renderBoard() {
  const filtered = getFilteredItems();

  board.innerHTML = filtered.length
    ? filtered.map((item) => renderCard(item)).join("")
    : '<div class="card-item">該当する項目はありません。</div>';

  board.querySelectorAll(".card-item[data-id]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedId = button.dataset.id;
      renderAll();
    });
  });
}

function renderCard(item) {
  const activeClass = item.id === state.selectedId ? "active" : "";
  const preview = item.nextAction || excerptText(item.body, 100) || "まだメモがありません。";
  const dueLine = item.due ? `締切: ${item.due}` : "締切: 未設定";

  return `
    <button class="card-item ${activeClass}" type="button" data-id="${item.id}">
      <div class="card-top">
        <h4>${escapeHtml(item.title)}</h4>
        <span class="priority-badge ${priorityClassName(item.priority)}">${escapeHtml(item.priority)}</span>
      </div>
      <div class="meta-row">
        <span class="chip ${accountChipClass(item.account)}">${escapeHtml(item.account)}</span>
        <span class="chip">${escapeHtml(TYPE_LABELS[item.type])}</span>
        <span class="chip">${escapeHtml(item.status)}</span>
        <span class="chip">${escapeHtml(item.targetAi)}</span>
        ${item.mainKeyword ? `<span class="chip">${escapeHtml(item.mainKeyword)}</span>` : ""}
      </div>
      <p class="card-next">${escapeHtml(preview)}</p>
      <div class="card-footer">
        <span>${escapeHtml(dueLine)}</span>
        <span>${escapeHtml(GOAL_LABELS[item.aiGoal])}</span>
      </div>
    </button>
  `;
}

function renderForm() {
  const item = getSelectedItem();
  currentIdLabel.textContent = item ? `ID: ${item.id.slice(0, 8)}` : "";

  if (!item) {
    form.reset();
    promptOutput.value = "";
    return;
  }

  for (const [key, value] of Object.entries(item)) {
    const field = form.elements.namedItem(key);
    if (field && "value" in field) {
      field.value = value ?? "";
    }
  }

  syncPromptFromForm();
}

function getSelectedItem() {
  return state.items.find((item) => item.id === state.selectedId) || null;
}

function getFilteredItems() {
  return state.items
    .filter((item) => {
      if (item.archived) {
        return false;
      }

      const haystack = [item.title, item.body, item.source, item.nextAction].join(" ").toLowerCase();
      const keywordText = [item.mainKeyword, item.subKeywords, item.titleIdeas, item.headingIdeas, item.searchVolume, item.competition].join(" ").toLowerCase();
      const matchesSearch = !state.filters.search || haystack.includes(state.filters.search) || keywordText.includes(state.filters.search);
      const matchesType = state.filters.type === "all" || item.type === state.filters.type;
      const matchesStatus = state.filters.status === "all" || item.status === state.filters.status;
      const matchesPriority = state.filters.priority === "all" || item.priority === state.filters.priority;

      return matchesSearch && matchesType && matchesStatus && matchesPriority;
    })
    .sort(compareItems);
}

function compareItems(a, b) {
  if (PRIORITY_ORDER[a.priority] !== PRIORITY_ORDER[b.priority]) {
    return PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
  }
  if (TYPE_ORDER[a.type] !== TYPE_ORDER[b.type]) {
    return TYPE_ORDER[a.type] - TYPE_ORDER[b.type];
  }
  return a.title.localeCompare(b.title, "ja");
}

function makeEmptyItem() {
  return {
    id: crypto.randomUUID(),
    title: "新しい項目",
    account: "moco_edu_note",
    type: "new",
    status: "ネタ",
    priority: "中",
    due: "",
    body: "",
    mainKeyword: "",
    subKeywords: "",
    searchVolume: "",
    competition: "",
    titleIdeas: "",
    headingIdeas: "",
    source: "",
    nextAction: "",
    targetAi: "ChatGPT",
    aiGoal: "draft",
    archived: false
  };
}

function buildPrompt(item) {
  return [
    `以下の note 記事について、${GOAL_LABELS[item.aiGoal]}のを手伝ってください。`,
    "特に、無料部分で『続きを読みたい』『買いたい』と思える流れに整えてください。",
    "狙うキーワードは不自然にならない範囲でタイトルや見出しに反映してください。",
    "本文の良さは残しつつ、読みにくい部分、弱い導入、伝わりにくい見出しは改善してください。",
    "",
    `タイトル: ${item.title}`,
    `アカウント: ${item.account}`,
    `種別: ${TYPE_LABELS[item.type]}`,
    `進み具合: ${item.status}`,
    item.mainKeyword ? `狙うキーワード: ${item.mainKeyword}` : "",
    item.subKeywords ? `関連キーワード: ${item.subKeywords}` : "",
    item.searchVolume ? `検索ボリューム: ${item.searchVolume}` : "",
    item.competition ? `競合メモ: ${item.competition}` : "",
    "",
    "本文・メモ:",
    item.body || "未入力",
    "",
    "次にやること:",
    item.nextAction || "未入力",
    "",
    "タイトル案:",
    item.titleIdeas || "未入力",
    "",
    "見出し案:",
    item.headingIdeas || "未入力",
    "",
    "参照URL・元記事:",
    item.source || "未入力",
    "",
    "やってほしいこと:",
    "1. タイトル案を3つ出してください。",
    "2. 見出し構成を読みやすく組み直してください。",
    "3. 無料部分でどこまで見せて、どこから先を有料にするとよいか提案してください。",
    "4. 最後に、直す優先順位を3点だけ短くまとめてください。",
    "",
    "最後に、次に直すとよい点を短く教えてください。"
  ].join("\n");
}

function syncPromptFromForm() {
  const title = String(form.elements.namedItem("title")?.value || "");
  if (!title) {
    promptOutput.value = "";
    return;
  }

  const draftItem = normalizeItem({
    id: getSelectedItem()?.id || crypto.randomUUID(),
    title,
    account: String(form.elements.namedItem("account")?.value || "moco_edu_note"),
    type: String(form.elements.namedItem("type")?.value || "new"),
    status: String(form.elements.namedItem("status")?.value || "ネタ"),
    priority: String(form.elements.namedItem("priority")?.value || "中"),
    due: String(form.elements.namedItem("due")?.value || ""),
    body: String(form.elements.namedItem("body")?.value || ""),
    mainKeyword: String(form.elements.namedItem("mainKeyword")?.value || ""),
    subKeywords: String(form.elements.namedItem("subKeywords")?.value || ""),
    searchVolume: String(form.elements.namedItem("searchVolume")?.value || ""),
    competition: String(form.elements.namedItem("competition")?.value || ""),
    titleIdeas: String(form.elements.namedItem("titleIdeas")?.value || ""),
    headingIdeas: String(form.elements.namedItem("headingIdeas")?.value || ""),
    source: String(form.elements.namedItem("source")?.value || ""),
    nextAction: String(form.elements.namedItem("nextAction")?.value || ""),
    targetAi: String(form.elements.namedItem("targetAi")?.value || "ChatGPT"),
    aiGoal: String(form.elements.namedItem("aiGoal")?.value || "draft")
  });

  promptOutput.value = buildPrompt(draftItem);
}

function priorityClassName(priority) {
  if (priority === "高") {
    return "high";
  }
  if (priority === "低") {
    return "low";
  }
  return "medium";
}

function accountChipClass(account) {
  if (account === "learnfromfailure") {
    return "account-learn";
  }
  return "account-moco";
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
