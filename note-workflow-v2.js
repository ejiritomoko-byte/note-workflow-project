const STORAGE_KEY = "note-workflow-app-v2";

const TYPE_LABELS = {
  new: "新規記事",
  rewrite: "リライト"
};

const BUCKET_LABELS = {
  "new-creation": "新規記事作成",
  "rewrite-candidate": "リライト候補",
  "publish-priority": "公開優先",
  "draft-stock": "下書き保管"
};

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

const PRIORITY_ORDER = { 高: 0, 中: 1, 低: 2 };
const TYPE_ORDER = { rewrite: 0, new: 1 };
const BUCKET_ORDER = {
  "publish-priority": 0,
  "rewrite-candidate": 1,
  "new-creation": 2,
  "draft-stock": 3
};

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
  "clarity-pass": "check",
  clarity: "check",
  "humanize-pass": "check",
  humanize: "check",
  "opinion-pass": "check",
  opinion: "check",
  "rewrite-pass": "rewrite",
  rewrite: "rewrite",
  check: "check"
};

const LEGACY_PROMPT_TYPE_MAP = {
  paid: "paid",
  search: "search",
  rewrite: "rewrite"
};

const LEGACY_BUCKET_MAP = {
  "new-creation": "new-creation",
  "rewrite-candidate": "rewrite-candidate",
  "publish-priority": "publish-priority",
  "draft-stock": "draft-stock"
};

const seedItems = [
  {
    id: crypto.randomUUID(),
    title: "家庭学習に使える『自分専用の学習アプリ』をAIで作ってみた",
    account: "moco_edu_note",
    bucket: "publish-priority",
    type: "rewrite",
    status: "リライト中",
    priority: "高",
    due: "最優先",
    body: "有料化の主力候補。無料部分でも完成イメージと使い道をもっと見せて、プロンプトや詳しい手順は有料側に寄せたい。",
    mainKeyword: "家庭学習 AI アプリ",
    subKeywords: "ChatGPT, 学習アプリ, 保護者, 小学生, 自作アプリ",
    searchVolume: "未確認",
    source: "https://note.com/moco_edu_note/n/nbd0f988a5c61",
    targetAi: "ChatGPT",
    aiGoal: "rewrite",
    promptType: "paid",
    archived: false
  },
  {
    id: crypto.randomUUID(),
    title: "中学受験の国語に使えるAIはどれ？",
    account: "moco_edu_note",
    bucket: "publish-priority",
    type: "rewrite",
    status: "リライト中",
    priority: "高",
    due: "今週中",
    body: "比較の結論をもっと前に出したい。『結局どれに課金すればいいのか』が一目でわかる形にしたい。",
    mainKeyword: "中学受験 国語 AI",
    subKeywords: "ChatGPT, Claude, 比較, 保護者, 家庭学習",
    searchVolume: "未確認",
    source: "https://note.com/moco_edu_note/n/n2e4b937c23fc",
    targetAi: "Claude",
    aiGoal: "rewrite",
    promptType: "paid",
    archived: false
  },
  {
    id: crypto.randomUUID(),
    title: "子どもの『考える力』を引き出す、たった3つの習慣",
    account: "moco_edu_note",
    bucket: "rewrite-candidate",
    type: "rewrite",
    status: "整え中",
    priority: "中",
    due: "",
    body: "無料集客の柱にしたい記事。読者の悩みにもっと寄せて、関連記事への導線を強くしたい。",
    mainKeyword: "考える力 子ども",
    subKeywords: "家庭学習, 思考力, 保護者, 勉強習慣",
    searchVolume: "未確認",
    source: "https://note.com/moco_edu_note/n/ne661a9271f55",
    targetAi: "ChatGPT",
    aiGoal: "check",
    promptType: "search",
    archived: false
  },
  {
    id: crypto.randomUUID(),
    title: "ビジコンで書かされる『3年後のプラン』は、なぜ事業の判断を狂わせるのか",
    account: "learnfromfailure",
    bucket: "rewrite-candidate",
    type: "rewrite",
    status: "リライト中",
    priority: "中",
    due: "",
    body: "切り口は良いが、読者対象をもう少し絞りたい。『初めてビジコンに出る人』向けに寄せると強くなる。",
    mainKeyword: "ビジコン 起業",
    subKeywords: "ビジネスコンテスト, 事業計画, 起業前, 失敗談",
    searchVolume: "未確認",
    source: "https://note.com/learnfromfailure",
    targetAi: "Claude",
    aiGoal: "rewrite",
    promptType: "rewrite",
    archived: false
  },
  {
    id: crypto.randomUUID(),
    title: "家庭学習でAIをどう使えば親がラクになるか",
    account: "moco_edu_note",
    bucket: "new-creation",
    type: "new",
    status: "ネタ",
    priority: "高",
    due: "",
    body: "『親がわかる・ラクする』という軸に合う新規記事候補。",
    mainKeyword: "家庭学習 AI",
    subKeywords: "保護者, ChatGPT, 家庭学習サポート, 効率化",
    searchVolume: "未確認",
    source: "moco_edu_note の新規記事候補",
    targetAi: "ChatGPT",
    aiGoal: "draft",
    promptType: "search",
    archived: false
  }
];

const reviewChecklist = [
  "タイトルで何の記事かわかるか",
  "本文に読者の悩みが入っているか",
  "キーワードが自然に入っているか",
  "参照URLや元記事が残っているか"
];

let state = {
  items: loadItems(),
  selectedId: null,
  filters: {
    search: "",
    bucket: "all",
    type: "all",
    status: "all",
    priority: "all"
  }
};

const form = document.getElementById("itemForm");
const board = document.getElementById("board");
const statsGrid = document.getElementById("statsGrid");
const promptOutput = document.getElementById("promptOutput");
const imagePromptOutput = document.getElementById("imagePromptOutput");
const currentIdLabel = document.getElementById("currentIdLabel");
const reviewList = document.getElementById("reviewChecklist");
const copyPromptBtn = document.getElementById("copyPromptBtn");
const copyImagePromptBtn = document.getElementById("copyImagePromptBtn");
const captureUrlInput = document.getElementById("captureUrlInput");
const captureMemoInput = document.getElementById("captureMemoInput");
const captureBucketSelect = document.getElementById("captureBucketSelect");

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
    bucket: LEGACY_BUCKET_MAP[item.bucket] || (item.type === "rewrite" ? "rewrite-candidate" : "new-creation"),
    type: LEGACY_TYPE_MAP[item.type] || "new",
    status: LEGACY_STATUS_MAP[item.status] || "ネタ",
    priority: LEGACY_PRIORITY_MAP[item.priority] || "中",
    due: String(item.due || ""),
    body: String(item.body || item.summary || ""),
    mainKeyword: String(item.mainKeyword || ""),
    subKeywords: String(item.subKeywords || ""),
    searchVolume: String(item.searchVolume || ""),
    source: String(item.source || ""),
    targetAi: item.targetAi === "Claude" ? "Claude" : "ChatGPT",
    aiGoal: LEGACY_GOAL_MAP[item.aiGoal] || "rewrite",
    promptType: LEGACY_PROMPT_TYPE_MAP[item.promptType] || "paid",
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

  document.getElementById("bucketFilter").addEventListener("change", (event) => {
    state.filters.bucket = event.target.value;
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
      bucket: formData.get("bucket"),
      type: formData.get("type"),
      status: formData.get("status"),
      priority: formData.get("priority"),
      due: formData.get("due"),
      body: formData.get("body"),
      mainKeyword: formData.get("mainKeyword"),
      subKeywords: formData.get("subKeywords"),
      searchVolume: formData.get("searchVolume"),
      source: formData.get("source"),
      targetAi: formData.get("targetAi"),
      aiGoal: formData.get("aiGoal"),
      promptType: formData.get("promptType")
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

  document.getElementById("saveDraftBtn").addEventListener("click", () => {
    const selected = getSelectedItem();
    if (!selected) {
      return;
    }

    state.items = state.items.map((item) =>
      item.id === selected.id
        ? { ...item, bucket: "draft-stock", status: "下書き中" }
        : item
    );

    saveItems();
    renderAll();
  });

  document.getElementById("markDoneBtn").addEventListener("click", () => {
    const selected = getSelectedItem();
    if (!selected) {
      return;
    }

    state.items = state.items.map((item) =>
      item.id === selected.id
        ? { ...item, status: "公開OK" }
        : item
    );

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
  copyPromptBtn.addEventListener("click", () => copyTextWithFeedback(promptOutput.value || "", copyPromptBtn, promptOutput));
  copyImagePromptBtn.addEventListener("click", () => copyTextWithFeedback(imagePromptOutput.value || "", copyImagePromptBtn, imagePromptOutput));
  document.getElementById("captureUrlBtn").addEventListener("click", captureUrlAsItem);
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
    { label: "新規記事作成", value: activeItems.filter((item) => item.bucket === "new-creation").length, note: "新しく作る記事" },
    { label: "リライト候補", value: activeItems.filter((item) => item.bucket === "rewrite-candidate").length, note: "見直したい記事" },
    { label: "公開優先", value: activeItems.filter((item) => item.bucket === "publish-priority").length, note: "先に公開したい記事" },
    { label: "下書き保管", value: activeItems.filter((item) => item.bucket === "draft-stock").length, note: "途中まで書けている記事" }
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
  const preview = excerptText(item.body, 100) || "まだメモがありません。";
  const dueLine = item.due ? `締切: ${item.due}` : "締切: 未設定";

  return `
    <button class="card-item ${activeClass}" type="button" data-id="${item.id}">
      <div class="card-top">
        <h4>${escapeHtml(item.title)}</h4>
        <span class="priority-badge ${priorityClassName(item.priority)}">${escapeHtml(item.priority)}</span>
      </div>
      <div class="meta-row">
        <span class="chip ${accountChipClass(item.account)}">${escapeHtml(item.account)}</span>
        <span class="chip">${escapeHtml(BUCKET_LABELS[item.bucket])}</span>
        <span class="chip">${escapeHtml(TYPE_LABELS[item.type])}</span>
        <span class="chip">${escapeHtml(item.status)}</span>
        <span class="chip">${escapeHtml(item.targetAi)}</span>
        <span class="chip">${escapeHtml(PROMPT_TYPE_LABELS[item.promptType])}</span>
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
    imagePromptOutput.value = "";
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

      const haystack = [
        item.title,
        item.body,
        item.source,
        item.mainKeyword,
        item.subKeywords,
        item.searchVolume
      ].join(" ").toLowerCase();

      const matchesSearch = !state.filters.search || haystack.includes(state.filters.search);
      const matchesBucket = state.filters.bucket === "all" || item.bucket === state.filters.bucket;
      const matchesType = state.filters.type === "all" || item.type === state.filters.type;
      const matchesStatus = state.filters.status === "all" || item.status === state.filters.status;
      const matchesPriority = state.filters.priority === "all" || item.priority === state.filters.priority;

      return matchesSearch && matchesBucket && matchesType && matchesStatus && matchesPriority;
    })
    .sort(compareItems);
}

function compareItems(a, b) {
  if (BUCKET_ORDER[a.bucket] !== BUCKET_ORDER[b.bucket]) {
    return BUCKET_ORDER[a.bucket] - BUCKET_ORDER[b.bucket];
  }
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
    bucket: "new-creation",
    type: "new",
    status: "ネタ",
    priority: "中",
    due: "",
    body: "",
    mainKeyword: "",
    subKeywords: "",
    searchVolume: "",
    source: "",
    targetAi: "ChatGPT",
    aiGoal: "rewrite",
    promptType: "paid",
    archived: false
  };
}

function captureUrlAsItem() {
  const rawUrl = String(captureUrlInput.value || "").trim();
  const memo = String(captureMemoInput.value || "").trim();
  if (!rawUrl) {
    return;
  }

  const item = makeEmptyItem();
  item.type = "rewrite";
  item.status = "ネタ";
  item.bucket = captureBucketSelect.value || "rewrite-candidate";
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

function guessTitleFromUrl(url) {
  try {
    const parsed = new URL(url);
    const lastPath = parsed.pathname.split("/").filter(Boolean).pop() || "新しい項目";
    return `URL追加: ${lastPath}`;
  } catch (error) {
    return "URL追加: リライト候補";
  }
}

function buildPrompt(item) {
  return [
    `以下の note 記事について、${GOAL_LABELS[item.aiGoal]}のを手伝ってください。`,
    ...buildPromptIntro(item.promptType, item.aiGoal),
    "",
    `タイトル: ${item.title}`,
    `アカウント: ${item.account}`,
    `管理カテゴリ: ${BUCKET_LABELS[item.bucket]}`,
    `種別: ${TYPE_LABELS[item.type]}`,
    `進み具合: ${item.status}`,
    `プロンプトの型: ${PROMPT_TYPE_LABELS[item.promptType]}`,
    item.mainKeyword ? `狙うキーワード: ${item.mainKeyword}` : "",
    item.subKeywords ? `関連キーワード: ${item.subKeywords}` : "",
    item.searchVolume ? `検索ボリューム: ${item.searchVolume}` : "",
    "",
    "本文・メモ:",
    item.body || "未入力",
    "",
    "参照URL・元記事:",
    item.source || "未入力",
    "",
    "やってほしいこと:",
    ...buildPromptTasks(item.promptType, item.aiGoal, item),
    "",
    "必要なら、タイトル案と見出し案もあわせて提案してください。"
  ].join("\n");
}

function buildPromptIntro(promptType, aiGoal) {
  if (aiGoal === "draft") {
    return [
      "狙うキーワードを不自然にならない範囲でタイトル・見出し・冒頭に反映してください。",
      "メインキーワードは H1、関連キーワードは H2 や H3 に自然に配置してください。",
      "note 記事として読みやすい下書きの骨組みを作ってください。",
      "タイトル案や見出し案は、必要に応じて提案してください。"
    ];
  }

  if (aiGoal === "check") {
    return [
      "本文をいきなり書き換えるより、弱いところや改善ポイントを先に点検してください。",
      "特に、導入・キーワードの入り方・H1/H2/H3 への配置・無料部分の引き・有料へのつながりを見てください。",
      "必要なら、直した方がよいタイトル案や見出し案も提案してください。"
    ];
  }

  if (promptType === "search") {
    return [
      "狙うキーワードを不自然にならない範囲でタイトル・見出し・冒頭に反映してください。",
      "メインキーワードは H1、関連キーワードは H2 や H3 に自然に配置してください。",
      "検索で入ってきた読者が、冒頭で離脱しない流れに整えてください。",
      "本文の良さを残しつつ、検索意図にすぐ答える構成にしてください。"
    ];
  }

  if (promptType === "rewrite") {
    return [
      "本文の良さや元記事の温度感は残しつつ、読みにくい部分だけを丁寧に直してください。",
      "導入、結論、見出し、段落の流れを優先的に改善してください。",
      "弱い説明や飛んでいる論点があれば自然につなぎ直してください。"
    ];
  }

  return [
    "特に、無料部分で『続きを読みたい』『買いたい』と思える流れに整えてください。",
    "狙うキーワードは不自然にならない範囲でタイトルや見出しに反映してください。",
    "メインキーワードは H1、関連キーワードは H2 や H3 に自然に配置してください。",
    "本文の良さは残しつつ、有料部分へ自然につながる構成にしてください。"
  ];
}

function buildPromptTasks(promptType, aiGoal, item) {
  const competitionTask = item.mainKeyword || item.subKeywords || item.searchVolume
    ? "このキーワードで戦えそうか、切り口を変えた方がよいかも判断してください。"
    : "このテーマが戦えそうかどうかもあわせて判断してください。";

  if (aiGoal === "draft") {
    return [
      "1. note 記事の下書きを作ってください。",
      "2. 読みやすい構成と見出しを提案してください。",
      "3. 冒頭で興味を引く導入を入れてください。",
      `4. ${competitionTask}`
    ];
  }

  if (aiGoal === "check") {
    return [
      "1. 改善が必要な点を優先順位つきで挙げてください。",
      "2. タイトル・導入・見出し・無料部分・有料導線を点検してください。",
      "3. 必要なら、直すべきタイトル案や見出し案を提案してください。",
      `4. ${competitionTask}`
    ];
  }

  if (promptType === "search") {
    return [
      "1. タイトル案を3つ出してください。",
      "2. 検索意図に合う見出し構成に組み直してください。",
      "3. 冒頭3行を離脱しにくい形に書き換えてください。",
      `4. ${competitionTask}`
    ];
  }

  if (promptType === "rewrite") {
    return [
      "1. 読みやすい形にリライトしてください。",
      "2. 必要ならタイトル案を3つ出してください。",
      "3. 必要なら見出し構成を組み直してください。",
      `4. ${competitionTask}`
    ];
  }

  return [
    "1. 読みやすく、買いたくなる流れにリライトしてください。",
    "2. 必要ならタイトル案を3つ出してください。",
    "3. 必要なら見出し構成を組み直してください。",
    "4. 無料部分でどこまで見せて、どこから先を有料にするとよいか提案してください。",
    `5. ${competitionTask}`
  ];
}

function buildImagePrompt(item) {
  const style = item.account === "learnfromfailure"
    ? "落ち着いた、知的で少し緊張感のある note サムネイル"
    : "やわらかく信頼感があり、保護者が読みたくなる note サムネイル";

  return [
    "note のメイン画像を作りたいです。",
    `雰囲気は「${style}」にしてください。`,
    "ChatGPT の画像生成でそのまま使える、具体的でわかりやすい指示にしてください。",
    item.mainKeyword ? `メインキーワードは「${item.mainKeyword}」です。` : "",
    item.subKeywords ? `関連キーワードは「${item.subKeywords}」です。` : "",
    `記事タイトルは「${item.title}」です。`,
    `記事の種別は「${TYPE_LABELS[item.type]}」、進み具合は「${item.status}」です。`,
    "",
    "画像の要件:",
    "1. スマホで見ても内容が伝わる構図にする",
    "2. 文字を入れるなら短く、読みやすくする",
    "3. note のサムネイルとして自然で、安っぽくしない",
    "4. 記事内容とずれないビジュアルにする",
    "",
    "記事メモ:",
    item.body || "未入力",
    "",
    "この条件に合う画像生成プロンプトを、日本語でそのまま使える形で作成してください。"
  ].filter(Boolean).join("\n");
}

function syncPromptFromForm() {
  const title = String(form.elements.namedItem("title")?.value || "");
  if (!title) {
    promptOutput.value = "";
    imagePromptOutput.value = "";
    return;
  }

  const draftItem = normalizeItem({
    id: getSelectedItem()?.id || crypto.randomUUID(),
    title,
    account: String(form.elements.namedItem("account")?.value || "moco_edu_note"),
    bucket: String(form.elements.namedItem("bucket")?.value || "new-creation"),
    type: String(form.elements.namedItem("type")?.value || "new"),
    status: String(form.elements.namedItem("status")?.value || "ネタ"),
    priority: String(form.elements.namedItem("priority")?.value || "中"),
    due: String(form.elements.namedItem("due")?.value || ""),
    body: String(form.elements.namedItem("body")?.value || ""),
    mainKeyword: String(form.elements.namedItem("mainKeyword")?.value || ""),
    subKeywords: String(form.elements.namedItem("subKeywords")?.value || ""),
    searchVolume: String(form.elements.namedItem("searchVolume")?.value || ""),
    source: String(form.elements.namedItem("source")?.value || ""),
    targetAi: String(form.elements.namedItem("targetAi")?.value || "ChatGPT"),
    aiGoal: String(form.elements.namedItem("aiGoal")?.value || "rewrite"),
    promptType: String(form.elements.namedItem("promptType")?.value || "paid")
  });

  promptOutput.value = buildPrompt(draftItem);
  imagePromptOutput.value = draftItem.targetAi === "ChatGPT"
    ? buildImagePrompt(draftItem)
    : "ChatGPT を選ぶと、ここにメイン画像用のプロンプトが表示されます。";
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
  helper.setSelectionRange(0, helper.value.length);

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
