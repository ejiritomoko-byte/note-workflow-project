const STORAGE_KEY = "note-trend-research-v1";
const PROFILE_STORAGE_KEY = "note-trend-profile-v1";

const PROFILE_PRESETS = {
  moco: {
    noteTheme: "教育×AI×心理学を、保護者向けにやさしく整理するnote",
    targetReader: "中学受験や家庭学習に悩む保護者、AIを家庭学習にどう使うか迷っている親",
    monetizeTarget: "有料note、教育用テンプレート、比較ガイド",
    strengths: "教育学の視点、保護者目線、AI活用の実例、心理的ハードルを下げる説明"
  },
  failure: {
    noteTheme: "起業前に立ち止まるための、失敗ベースの起業判断note",
    targetReader: "これから起業したい人、ビジコン参加者、勢いで始めて苦しくなりたくない人",
    monetizeTarget: "有料note、判断チェックリスト、壁打ち相談",
    strengths: "子育て関連での起業経験、失敗からの学び、固定費や撤退ラインまで踏み込めること"
  }
};

const LIVE_SOURCES = [
  {
    key: "moco_edu_note",
    url: "https://note.com/moco_edu_note",
    author: "moco 教育×AI×心理学",
    sourceType: "popular",
    category: "教育・AI",
    tags: ["中学受験", "家庭学習", "教育とAI"],
    sourceLabel: "自動取得 moco_edu_note"
  },
  {
    key: "learnfromfailure",
    url: "https://note.com/learnfromfailure",
    author: "失敗から学ぶ起業",
    sourceType: "popular",
    category: "起業判断",
    tags: ["起業", "失敗から学ぶ", "ビジコン"],
    sourceLabel: "自動取得 learnfromfailure"
  },
  {
    key: "note_official",
    url: "https://note.com/info",
    author: "note公式",
    sourceType: "official",
    category: "公式発表",
    tags: ["note公式", "お知らせ", "企画"],
    sourceLabel: "自動取得 note公式"
  }
];

const SOURCE_LABELS = {
  popular: "人気記事",
  hashtag: "ハッシュタグ観測",
  official: "公式発表"
};

const STATUS_LABELS = {
  watch: "ウォッチ中",
  validated: "確認済み",
  idea: "企画化したい"
};

const DEFAULT_ITEMS = [
  {
    id: crypto.randomUUID(),
    title: "noteで記事を見つけてもらうための、ハッシュタグの考え方",
    sourceType: "hashtag",
    status: "validated",
    observedAt: "2026-04-19",
    publishedAt: "2025-10-19",
    likes: 298,
    comments: 0,
    author: "のび太郎",
    category: "note運用",
    tags: ["ハッシュタグ戦略", "note運用", "見つけてもらう"],
    url: "https://note.com/hashtag/%E3%83%8F%E3%83%83%E3%82%B7%E3%83%A5%E3%82%BF%E3%82%B0%E6%88%A6%E7%95%A5",
    summary: "ハッシュタグ戦略系の一覧で高スキ。How-to系で、見つけてもらうという即効性のある便益が前面に出ている。",
    takeaway: "運用ノウハウは『読まれる理由』を明言すると強い。抽象論ではなく、発見導線をテーマにすると企画化しやすい。",
    sourceLabel: "note ハッシュタグ一覧"
  },
  {
    id: crypto.randomUUID(),
    title: "note適正なハッシュタグの数、付け方",
    sourceType: "hashtag",
    status: "watch",
    observedAt: "2026-04-19",
    publishedAt: "2026-03-29",
    likes: 447,
    comments: 0,
    author: "スマイル7",
    category: "note運用",
    tags: ["ハッシュタグ", "アクセスアップ", "情報発信"],
    url: "https://note.com/hashtag/%E3%83%8F%E3%83%83%E3%82%B7%E3%83%A5%E3%82%BF%E3%82%B0",
    summary: "かなりストレートなタイトルでも、悩みをそのまま答える形なら高反応。初心者の検索意図に寄せた構成が効いていそう。",
    takeaway: "『最適な数』『付け方』のような具体ワードは強い。初心者向けの断定系タイトルを増やす価値あり。",
    sourceLabel: "note ハッシュタグ一覧"
  },
  {
    id: crypto.randomUUID(),
    title: "『読めば読むほど、自分にぴったり』が見つかるnoteへ。記事をおすすめするしくみをリニューアルしました！",
    sourceType: "official",
    status: "validated",
    observedAt: "2026-04-19",
    publishedAt: "2026-02-01",
    likes: 0,
    comments: 0,
    author: "note公式",
    category: "プロダクト変更",
    tags: ["おすすめ", "アルゴリズム", "発見性"],
    url: "https://note.com/info/m/m39abc74d7d13",
    summary: "おすすめロジックのリニューアル告知。発見性に関わる変更は、記事設計とタグ戦略に直結するので要監視。",
    takeaway: "おすすめ面の変化があるときは、タグ、導入文、初速反応に関わる仮説を立てて検証したい。",
    sourceLabel: "note公式 お知らせ"
  },
  {
    id: crypto.randomUUID(),
    title: "今年も開催！『創作大賞2026』の募集を4/8に開始します",
    sourceType: "official",
    status: "watch",
    observedAt: "2026-04-19",
    publishedAt: "2026-03-03",
    likes: 0,
    comments: 0,
    author: "note公式",
    category: "イベント",
    tags: ["創作大賞", "募集開始", "特集"],
    url: "https://note.com/info",
    summary: "公式企画は投稿テーマの山をつくりやすい。周辺ジャンルの記事も伸びやすくなる可能性がある。",
    takeaway: "大きな公式企画が出た直後は、直接参加記事だけでなく、攻略・感想・準備系の周辺企画も候補になる。",
    sourceLabel: "note公式"
  },
  {
    id: crypto.randomUUID(),
    title: "あなたのレビューがnoteの映画ランキングをつくる！ 2026年も『#映画感想文』を募集します",
    sourceType: "official",
    status: "idea",
    observedAt: "2026-04-19",
    publishedAt: "2026-03-11",
    likes: 0,
    comments: 0,
    author: "note公式",
    category: "お題企画",
    tags: ["映画感想文", "ランキング", "レビュー"],
    url: "https://note.com/info",
    summary: "公式のお題企画は読者の参加導線がはっきりしている。ランキング化や募集形式は投稿モチベーションを上げやすい。",
    takeaway: "自分のテーマでも『募集』『ランキング』『みんなの投稿』の構図を借りると広がりを作りやすい。",
    sourceLabel: "note公式"
  },
  {
    id: crypto.randomUUID(),
    title: "フォロワー0から始めたnote×AI×SNS戦略｜収益化までのリアル記録",
    sourceType: "popular",
    status: "watch",
    observedAt: "2026-04-19",
    publishedAt: "2026-04-18",
    likes: 13,
    comments: 0,
    author: "Note_Writer",
    category: "AI・発信",
    tags: ["AI", "SNS戦略", "収益化", "実体験"],
    url: "https://note.com/hashtag/2026%E5%B9%B4",
    summary: "直近投稿でも、AI×実体験×収益化のセットは引き続き強い。再現性よりリアル記録が前に出ている。",
    takeaway: "実体験フォーマットを使うなら、数字の変化と失敗談を入れると差別化しやすい。",
    sourceLabel: "人気記事一覧"
  }
];

let state = {
  items: loadItems(),
  profile: loadProfile(),
  selectedId: null,
  refreshMeta: {
    insights: "",
    feed: ""
  },
  filters: {
    search: "",
    sourceType: "all",
    status: "all",
    sort: "likes"
  }
};

const statsGrid = document.getElementById("statsGrid");
const themeTokens = document.getElementById("themeTokens");
const tagTokens = document.getElementById("tagTokens");
const patternList = document.getElementById("patternList");
const observationList = document.getElementById("observationList");
const searchInput = document.getElementById("searchInput");
const sourceFilter = document.getElementById("sourceFilter");
const statusFilter = document.getElementById("statusFilter");
const sortSelect = document.getElementById("sortSelect");
const officialList = document.getElementById("officialList");
const watchlist = document.getElementById("watchlist");
const form = document.getElementById("observationForm");
const selectedMeta = document.getElementById("selectedMeta");
const selectedIdLabel = document.getElementById("selectedIdLabel");
const importInput = document.getElementById("importInput");
const opportunityScore = document.getElementById("opportunityScore");
const opportunityLabel = document.getElementById("opportunityLabel");
const opportunitySignals = document.getElementById("opportunitySignals");
const readerPersona = document.getElementById("readerPersona");
const valuePromise = document.getElementById("valuePromise");
const salesAngle = document.getElementById("salesAngle");
const productPath = document.getElementById("productPath");
const articlePlanOutput = document.getElementById("articlePlanOutput");
const monetizationOutput = document.getElementById("monetizationOutput");
const profileForm = document.getElementById("profileForm");
const growthDirection = document.getElementById("growthDirection");
const contentFocus = document.getElementById("contentFocus");
const monetizeFocus = document.getElementById("monetizeFocus");
const nextMove = document.getElementById("nextMove");
const themeIdeasOutput = document.getElementById("themeIdeasOutput");
const keywordIdeasOutput = document.getElementById("keywordIdeasOutput");
const growthPlanOutput = document.getElementById("growthPlanOutput");
const insightRefreshLabel = document.getElementById("insightRefreshLabel");
const feedRefreshLabel = document.getElementById("feedRefreshLabel");
const fetchStatusLabel = document.getElementById("fetchStatusLabel");
const summaryField = form.elements.namedItem("summary");
const takeawayField = form.elements.namedItem("takeaway");

init();

function init() {
  if (!state.selectedId && state.items.length > 0) {
    state.selectedId = state.items[0].id;
  }

  bindEvents();
  markRefresh("insights");
  markRefresh("feed");
  renderAll();
}

function loadItems() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return structuredClone(DEFAULT_ITEMS);
  }

  try {
    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      return structuredClone(DEFAULT_ITEMS);
    }
    return parsed.map(normalizeItem);
  } catch (error) {
    return structuredClone(DEFAULT_ITEMS);
  }
}

function loadProfile() {
  const stored = localStorage.getItem(PROFILE_STORAGE_KEY);
  if (!stored) {
    return makeDefaultProfile();
  }

  try {
    return normalizeProfile(JSON.parse(stored));
  } catch (error) {
    return makeDefaultProfile();
  }
}

function normalizeItem(item) {
  return {
    id: item.id || crypto.randomUUID(),
    title: String(item.title || "無題の観測"),
    sourceType: SOURCE_LABELS[item.sourceType] ? item.sourceType : "popular",
    status: STATUS_LABELS[item.status] ? item.status : "watch",
    observedAt: normalizeDate(item.observedAt),
    publishedAt: normalizeDate(item.publishedAt),
    likes: normalizeNumber(item.likes),
    comments: normalizeNumber(item.comments),
    author: String(item.author || ""),
    category: String(item.category || ""),
    tags: normalizeTags(item.tags),
    url: String(item.url || ""),
    summary: String(item.summary || ""),
    takeaway: String(item.takeaway || ""),
    sourceLabel: String(item.sourceLabel || "")
  };
}

function normalizeProfile(profile) {
  return {
    noteTheme: String(profile.noteTheme || "AIを使った記事作成と発信改善"),
    targetReader: String(profile.targetReader || "noteを書きたいけれど、何を書けば読まれるか迷っている人"),
    monetizeTarget: String(profile.monetizeTarget || "有料noteとテンプレート"),
    strengths: String(profile.strengths || "実体験ベースで説明できること、AIツールの活用例を出せること")
  };
}

function makeDefaultProfile() {
  return normalizeProfile({});
}

function normalizeDate(value) {
  const text = String(value || "").trim();
  return /^\d{4}-\d{2}-\d{2}$/.test(text) ? text : "";
}

function normalizeNumber(value) {
  const numeric = Number(value);
  return Number.isFinite(numeric) && numeric >= 0 ? Math.round(numeric) : 0;
}

function normalizeTags(value) {
  if (Array.isArray(value)) {
    return value.map((tag) => String(tag).trim()).filter(Boolean);
  }

  return String(value || "")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function saveItems() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
}

function saveProfile() {
  localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(state.profile));
}

function bindEvents() {
  searchInput.addEventListener("input", (event) => {
    state.filters.search = event.target.value.trim().toLowerCase();
    renderObservationList();
  });

  sourceFilter.addEventListener("change", (event) => {
    state.filters.sourceType = event.target.value;
    renderObservationList();
  });

  statusFilter.addEventListener("change", (event) => {
    state.filters.status = event.target.value;
    renderObservationList();
  });

  sortSelect.addEventListener("change", (event) => {
    state.filters.sort = event.target.value;
    renderObservationList();
  });

  bindButtonAction("newObservationBtn", () => {
    createNewObservation();
    return "新しい観測を追加しました。";
  });

  bindButtonAction("fetchLatestBtn", async () => {
    await fetchLatestSources();
    return null;
  }, "最新データを取得中です...");

  bindButtonAction("duplicateBtn", () => {
    const selected = getSelectedItem();
    if (!selected) {
      return "複製する観測がありません。";
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
    return "観測を複製しました。";
  });

  bindButtonAction("deleteBtn", () => {
    const selected = getSelectedItem();
    if (!selected) {
      return "削除する観測がありません。";
    }

    state.items = state.items.filter((item) => item.id !== selected.id);
    state.selectedId = getFilteredItems()[0]?.id || state.items[0]?.id || null;
    saveItems();
    renderAll();
    return "観測を削除しました。";
  });

  bindButtonAction("exportBtn", () => {
    exportItems();
    return "JSONを書き出しました。";
  });

  bindButtonAction("importBtn", () => {
    importInput.click();
    return "読み込むJSONを選択してください。";
  });

  importInput.addEventListener("change", importItems);

  bindButtonAction("resetBtn", () => {
    state.items = structuredClone(DEFAULT_ITEMS);
    state.selectedId = state.items[0]?.id || null;
    saveItems();
    markRefresh("insights");
    markRefresh("feed");
    renderAll();
    return "サンプルデータに戻しました。";
  });

  bindButtonAction("refreshInsightsBtn", () => {
    refreshInsights();
    return "今見えていることを更新しました。";
  });

  bindButtonAction("refreshFeedBtn", () => {
    refreshFeed();
    return "観測フィードを更新しました。";
  });

  bindButtonAction("saveProfileBtn", () => {
    syncProfileFromForm();
    saveProfile();
    renderPersonalGuidance();
    return "プロフィール設定を保存しました。";
  });

  bindButtonAction("presetMocoBtn", () => {
    applyProfilePreset("moco");
    return "moco_edu_note 用の設定に切り替えました。";
  });

  bindButtonAction("presetFailureBtn", () => {
    applyProfilePreset("failure");
    return "learnfromfailure 用の設定に切り替えました。";
  });

  bindButtonAction("copyArticlePlanBtn", () => {
    copyTextWithFeedback(articlePlanOutput.value);
    return "記事企画をコピーしました。";
  });

  bindButtonAction("copyMonetizationBtn", () => {
    copyTextWithFeedback(monetizationOutput.value);
    return "収益化プランをコピーしました。";
  });

  bindButtonAction("copyThemeIdeasBtn", () => {
    copyTextWithFeedback(themeIdeasOutput.value);
    return "タイトル案をコピーしました。";
  });

  bindButtonAction("copyKeywordsBtn", () => {
    copyTextWithFeedback(keywordIdeasOutput.value);
    return "キーワードをコピーしました。";
  });

  bindButtonAction("copyGrowthPlanBtn", () => {
    copyTextWithFeedback(growthPlanOutput.value);
    return "育成プランをコピーしました。";
  });

  bindButtonAction("draftSummaryBtn", () => {
    const selected = getDraftContextItem();
    if (!selected) {
      return "要約に使う観測がありません。";
    }
    summaryField.value = buildObservationSummary(selected);
    return "要約の叩き台を作成しました。";
  });

  bindButtonAction("draftTakeawayBtn", () => {
    const selected = getDraftContextItem();
    if (!selected) {
      return "気づきに使う観測がありません。";
    }
    takeawayField.value = buildObservationTakeaway(selected, state.profile);
    return "気づきの叩き台を作成しました。";
  });

  profileForm.addEventListener("input", () => {
    syncProfileFromForm();
    renderPersonalGuidance();
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!syncSelectedItemFromForm()) {
      return;
    }
    markRefresh("insights");
    markRefresh("feed");
    renderAll();
  });
}

function bindButtonAction(id, handler, pendingMessage = "", errorMessage = "ボタン処理に失敗しました。") {
  const button = document.getElementById(id);
  if (!button) {
    return;
  }

  button.addEventListener("click", async () => {
    const wasDisabled = button.disabled;
    button.disabled = true;

    if (pendingMessage) {
      setAppStatus(pendingMessage);
    }

    try {
      const message = await handler();
      if (message) {
        setAppStatus(message);
      }
    } catch (error) {
      setAppStatus(errorMessage);
      console.error(error);
    } finally {
      button.disabled = wasDisabled;
    }
  });
}

function renderAll() {
  syncFilterControls();
  renderStats();
  renderObservationList();
  renderForm();
  renderOfficialList();
  renderWatchlist();
  renderStrategy();
  renderProfileForm();
  renderPersonalGuidance();
  renderRefreshMeta();
}

function syncFilterControls() {
  searchInput.value = state.filters.search;
  sourceFilter.value = state.filters.sourceType;
  statusFilter.value = state.filters.status;
  sortSelect.value = state.filters.sort;
}

function renderRefreshMeta() {
  insightRefreshLabel.textContent = state.refreshMeta.insights || "未更新";
  feedRefreshLabel.textContent = state.refreshMeta.feed || "未更新";
}

function renderStats() {
  const items = state.items;
  const totalLikes = items.reduce((sum, item) => sum + item.likes, 0);
  const trackedThemes = uniqueCount(items.map((item) => item.category).filter(Boolean));
  const avgLikes = items.length ? Math.round(totalLikes / items.length) : 0;

  const stats = [
    { label: "観測件数", value: items.length, note: "人気記事と公式発表の合計" },
    { label: "総スキ数", value: totalLikes, note: "人気記事・ハッシュタグ観測分" },
    { label: "追跡テーマ数", value: trackedThemes, note: "カテゴリのユニーク数" },
    { label: "平均スキ", value: avgLikes, note: "観測全体の平均" }
  ];

  statsGrid.innerHTML = stats.map((stat) => `
    <article class="stat-card">
      <span>${escapeHtml(stat.label)}</span>
      <strong>${stat.value}</strong>
      <span>${escapeHtml(stat.note)}</span>
    </article>
  `).join("");

  themeTokens.innerHTML = buildTokenMarkup(countOccurrences(items.map((item) => item.category), 5));
  tagTokens.innerHTML = buildTokenMarkup(countOccurrences(items.flatMap((item) => item.tags), 8));
  patternList.innerHTML = inferPatterns(items).map((item) => `<li>${escapeHtml(item)}</li>`).join("");
}

function renderObservationList() {
  const items = getFilteredItems();

  observationList.innerHTML = items.length
    ? items.map((item) => renderObservationCard(item)).join("")
    : '<div class="empty-state">条件に合う観測がありません。</div>';

  observationList.querySelectorAll("[data-id]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedId = button.dataset.id;
      renderForm();
      renderObservationList();
    });
  });
}

function renderObservationCard(item) {
  const activeClass = item.id === state.selectedId ? "active" : "";
  const summary = item.summary || item.takeaway || "要約メモはまだありません。";
  const tags = item.tags.slice(0, 3).map((tag) => `<span class="chip">${escapeHtml(tag)}</span>`).join("");
  const metric = item.sourceType === "official" ? "公式" : `${item.likes} スキ`;

  return `
    <button class="card-item ${activeClass}" type="button" data-id="${item.id}">
      <div class="card-title-row">
        <div>
          <h3>${escapeHtml(item.title)}</h3>
          <p class="card-meta">${escapeHtml(item.author || "著者未設定")} / ${escapeHtml(SOURCE_LABELS[item.sourceType])}</p>
        </div>
        <span class="metric">${escapeHtml(metric)}</span>
      </div>
      <div class="meta-row">
        <span class="chip ${item.sourceType}">${escapeHtml(SOURCE_LABELS[item.sourceType])}</span>
        <span class="chip ${item.status === "idea" ? "idea" : ""}">${escapeHtml(STATUS_LABELS[item.status])}</span>
        ${item.category ? `<span class="chip">${escapeHtml(item.category)}</span>` : ""}
        ${tags}
      </div>
      <p class="card-summary">${escapeHtml(excerpt(item.summary || item.takeaway, 120))}</p>
    </button>
  `;
}

function renderForm() {
  const item = getSelectedItem();

  if (!item) {
    selectedMeta.textContent = "項目を選ぶと詳細が出ます。";
    selectedIdLabel.textContent = "";
    form.reset();
    renderStrategy();
    return;
  }

  selectedMeta.textContent = `${SOURCE_LABELS[item.sourceType]} / ${STATUS_LABELS[item.status]} / ${item.author || "著者未設定"}`;
  selectedIdLabel.textContent = `ID: ${item.id.slice(0, 8)}`;

  for (const [key, value] of Object.entries(item)) {
    const field = form.elements.namedItem(key);
    if (!field || !("value" in field)) {
      continue;
    }

    field.value = Array.isArray(value) ? value.join(", ") : value ?? "";
  }

  renderStrategy();
}

function renderOfficialList() {
  const items = state.items
    .filter((item) => item.sourceType === "official")
    .sort((a, b) => compareByDate(b.publishedAt, a.publishedAt))
    .slice(0, 4);

  officialList.innerHTML = items.length
    ? items.map((item) => renderMiniItem(item)).join("")
    : '<div class="empty-state">公式発表はまだありません。</div>';
}

function renderWatchlist() {
  const items = state.items
    .filter((item) => item.sourceType !== "official")
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 4);

  watchlist.innerHTML = items.length
    ? items.map((item) => renderMiniItem(item)).join("")
    : '<div class="empty-state">ウォッチ候補はまだありません。</div>';
}

function renderMiniItem(item) {
  const subline = item.sourceType === "official"
    ? `${item.publishedAt || "日付未設定"} / ${item.sourceLabel || "note公式"}`
    : `${item.likes} スキ / ${item.category || "カテゴリ未設定"}`;

  return `
    <article class="mini-item">
      <h3>${escapeHtml(item.title)}</h3>
      <p class="mini-meta">${escapeHtml(subline)}</p>
      <p class="mini-summary">${escapeHtml(excerpt(item.takeaway || item.summary, 100))}</p>
      ${item.url ? `<p class="mini-meta"><a href="${escapeHtml(item.url)}" target="_blank" rel="noreferrer">元ページを開く</a></p>` : ""}
    </article>
  `;
}

function getFilteredItems() {
  return state.items
    .filter((item) => {
      const haystack = [
        item.title,
        item.author,
        item.category,
        item.summary,
        item.takeaway,
        item.sourceLabel,
        item.tags.join(" ")
      ].join(" ").toLowerCase();

      const matchesSearch = !state.filters.search || haystack.includes(state.filters.search);
      const matchesSource = state.filters.sourceType === "all" || item.sourceType === state.filters.sourceType;
      const matchesStatus = state.filters.status === "all" || item.status === state.filters.status;

      return matchesSearch && matchesSource && matchesStatus;
    })
    .sort(compareItems);
}

function compareItems(a, b) {
  if (state.filters.sort === "newest") {
    return compareByDate(b.observedAt || b.publishedAt, a.observedAt || a.publishedAt) || b.likes - a.likes;
  }

  if (state.filters.sort === "official") {
    if (a.sourceType === "official" && b.sourceType !== "official") {
      return -1;
    }
    if (a.sourceType !== "official" && b.sourceType === "official") {
      return 1;
    }
    return compareByDate(b.publishedAt || b.observedAt, a.publishedAt || a.observedAt) || b.likes - a.likes;
  }

  return b.likes - a.likes || compareByDate(b.observedAt || b.publishedAt, a.observedAt || a.publishedAt);
}

function compareByDate(a, b) {
  return String(a || "").localeCompare(String(b || ""));
}

function getSelectedItem() {
  return state.items.find((item) => item.id === state.selectedId) || null;
}

function makeEmptyItem() {
  return {
    id: crypto.randomUUID(),
    title: "新しい観測",
    sourceType: "popular",
    status: "watch",
    observedAt: todayLocalDate(),
    publishedAt: "",
    likes: 0,
    comments: 0,
    author: "",
    category: "",
    tags: [],
    url: "",
    summary: "",
    takeaway: "",
    sourceLabel: ""
  };
}

function renderProfileForm() {
  for (const [key, value] of Object.entries(state.profile)) {
    const field = profileForm.elements.namedItem(key);
    if (field && "value" in field) {
      field.value = value ?? "";
    }
  }
}

function syncProfileFromForm() {
  const formData = new FormData(profileForm);
  state.profile = normalizeProfile({
    noteTheme: formData.get("noteTheme"),
    targetReader: formData.get("targetReader"),
    monetizeTarget: formData.get("monetizeTarget"),
    strengths: formData.get("strengths")
  });
}

function syncSelectedItemFromForm() {
  const selected = getSelectedItem();
  if (!selected) {
    return false;
  }

  const titleField = form.elements.namedItem("title");
  const titleValue = String(titleField?.value || "").trim();
  if (!titleValue) {
    return false;
  }

  const formData = new FormData(form);
  const updated = normalizeItem({
    ...selected,
    title: formData.get("title"),
    sourceType: formData.get("sourceType"),
    status: formData.get("status"),
    observedAt: formData.get("observedAt"),
    publishedAt: formData.get("publishedAt"),
    likes: formData.get("likes"),
    comments: formData.get("comments"),
    author: formData.get("author"),
    category: formData.get("category"),
    tags: formData.get("tags"),
    url: formData.get("url"),
    summary: formData.get("summary"),
    takeaway: formData.get("takeaway"),
    sourceLabel: formData.get("sourceLabel")
  });

  state.items = state.items.map((item) => item.id === updated.id ? updated : item);
  saveItems();
  return true;
}

function getDraftContextItem() {
  const selected = getSelectedItem();
  if (!selected) {
    return null;
  }

  const formData = new FormData(form);
  return normalizeItem({
    ...selected,
    title: formData.get("title"),
    sourceType: formData.get("sourceType"),
    status: formData.get("status"),
    observedAt: formData.get("observedAt"),
    publishedAt: formData.get("publishedAt"),
    likes: formData.get("likes"),
    comments: formData.get("comments"),
    author: formData.get("author"),
    category: formData.get("category"),
    tags: formData.get("tags"),
    url: formData.get("url"),
    summary: formData.get("summary"),
    takeaway: formData.get("takeaway"),
    sourceLabel: formData.get("sourceLabel")
  });
}

function createNewObservation() {
  const item = makeEmptyItem();
  state.items.unshift(item);
  state.selectedId = item.id;
  clearFeedFilters();
  saveItems();
  markRefresh("feed");
  renderAll();
}

function clearFeedFilters() {
  state.filters.search = "";
  state.filters.sourceType = "all";
  state.filters.status = "all";
  state.filters.sort = "newest";
}

function applyProfilePreset(presetKey) {
  state.profile = normalizeProfile(PROFILE_PRESETS[presetKey] || makeDefaultProfile());
  saveProfile();
  renderProfileForm();
  renderPersonalGuidance();
}

function refreshInsights() {
  syncProfileFromForm();
  saveProfile();
  syncSelectedItemFromForm();
  markRefresh("insights");
  renderStats();
  renderStrategy();
  renderPersonalGuidance();
  renderRefreshMeta();
}

function refreshFeed() {
  syncSelectedItemFromForm();
  markRefresh("feed");
  renderObservationList();
  renderForm();
  renderOfficialList();
  renderWatchlist();
  renderRefreshMeta();
}

async function fetchLatestSources() {
  setAppStatus("最新データを取得中です...");

  try {
    syncSelectedItemFromForm();

    const results = await Promise.allSettled(
      LIVE_SOURCES.map((source) => fetchSourceItems(source))
    );

    const fetchedItems = results.flatMap((result) =>
      result.status === "fulfilled" ? result.value : []
    );

    if (!fetchedItems.length) {
      setAppStatus("最新取得に失敗しました。外部取得がブロックされている可能性があります。");
      return;
    }

    mergeFetchedItems(fetchedItems);
    saveItems();
    markRefresh("insights");
    markRefresh("feed");
    renderAll();
    setAppStatus(`${fetchedItems.length} 件の最新候補を取り込みました。`);
  } catch (error) {
    setAppStatus("最新取得に失敗しました。時間をおいて再度試してください。");
  }
}

async function fetchSourceItems(source) {
  const html = await fetchSourceHtml(source.url);
  const parsed = parseLatestItemsFromHtml(html, source);
  return parsed.slice(0, source.sourceType === "official" ? 6 : 8);
}

async function fetchSourceHtml(url) {
  const proxies = [
    `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
    `https://r.jina.ai/http://${url.replace(/^https?:\/\//, "")}`
  ];

  for (const proxyUrl of proxies) {
    try {
      const response = await fetch(proxyUrl);
      if (!response.ok) {
        continue;
      }
      const text = await response.text();
      if (text && text.length > 200) {
        return text;
      }
    } catch (error) {
      // try next proxy
    }
  }

  throw new Error(`Unable to fetch ${url}`);
}

function parseLatestItemsFromHtml(html, source) {
  if (html.trim().startsWith("Title:")) {
    return parseJinaTextItems(html, source);
  }

  const doc = new DOMParser().parseFromString(html, "text/html");
  const anchors = [...doc.querySelectorAll('a[href*="/n/"]')];
  const seen = new Set();
  const items = [];

  anchors.forEach((anchor) => {
    const href = anchor.href;
    const title = normalizeWhitespace(anchor.textContent);
    if (!href || !title || title.length < 8) {
      return;
    }
    if (seen.has(href) || seen.has(title)) {
      return;
    }

    const surroundingText = normalizeWhitespace(anchor.parentElement?.textContent || anchor.closest("article")?.textContent || "");
    const publishedAt = extractPublishedDate(surroundingText);

    seen.add(href);
    seen.add(title);
    items.push(makeFetchedItem(source, {
      title,
      url: href,
      publishedAt
    }));
  });

  return items;
}

function parseJinaTextItems(text, source) {
  const lines = text.split("\n").map((line) => line.trim()).filter(Boolean);
  const items = [];
  const seen = new Set();

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    if (!line.startsWith("### ")) {
      continue;
    }

    const title = normalizeWhitespace(line.replace(/^###\s+/, ""));
    if (!title || title.length < 8 || seen.has(title)) {
      continue;
    }

    const neighborhood = lines.slice(index, index + 6).join(" ");
    const publishedAt = extractPublishedDate(neighborhood);
    const url = "";

    seen.add(title);
    items.push(makeFetchedItem(source, {
      title,
      url,
      publishedAt
    }));
  }

  return items;
}

function makeFetchedItem(source, partial) {
  return normalizeItem({
    id: crypto.randomUUID(),
    title: partial.title,
    sourceType: source.sourceType,
    status: "watch",
    observedAt: todayLocalDate(),
    publishedAt: partial.publishedAt,
    likes: 0,
    comments: 0,
    author: source.author,
    category: source.category,
    tags: source.tags,
    url: partial.url,
    summary: "最新取得で追加した候補です。内容を確認して要約と気づきを追記してください。",
    takeaway: "この候補が自分のnoteテーマにどうつながるかを判断する。",
    sourceLabel: source.sourceLabel
  });
}

function mergeFetchedItems(fetchedItems) {
  const existingMap = new Map(
    state.items.map((item) => [item.url || `${item.author}::${item.title}`, item])
  );

  fetchedItems.forEach((item) => {
    const key = item.url || `${item.author}::${item.title}`;
    const existing = existingMap.get(key);

    if (existing) {
      Object.assign(existing, {
        publishedAt: item.publishedAt || existing.publishedAt,
        observedAt: todayLocalDate(),
        sourceLabel: item.sourceLabel,
        category: item.category || existing.category,
        tags: item.tags?.length ? item.tags : existing.tags
      });
      return;
    }

    state.items.unshift(item);
    existingMap.set(key, item);
  });
}

function renderStrategy() {
  const item = getSelectedItem();

  if (!item) {
    opportunityScore.textContent = "0";
    opportunityLabel.textContent = "観測を選ぶと判定します";
    opportunitySignals.innerHTML = "<li>まだ分析対象がありません。</li>";
    readerPersona.textContent = "";
    valuePromise.textContent = "";
    salesAngle.textContent = "";
    productPath.textContent = "";
    articlePlanOutput.value = "";
    monetizationOutput.value = "";
    return;
  }

  const strategy = buildStrategy(item);

  opportunityScore.textContent = String(strategy.score);
  opportunityLabel.textContent = strategy.scoreLabel;
  opportunitySignals.innerHTML = strategy.signals.map((signal) => `<li>${escapeHtml(signal)}</li>`).join("");
  readerPersona.textContent = strategy.persona;
  valuePromise.textContent = strategy.promise;
  salesAngle.textContent = strategy.salesAngle;
  productPath.textContent = strategy.productPath;
  articlePlanOutput.value = buildArticlePlan(item, strategy);
  monetizationOutput.value = buildMonetizationPlan(item, strategy);
}

function renderPersonalGuidance() {
  const selected = getSelectedItem();
  const guidance = buildPersonalGuidance(state.profile, selected, state.items);

  growthDirection.textContent = guidance.direction;
  contentFocus.textContent = guidance.contentFocus;
  monetizeFocus.textContent = guidance.monetizeFocus;
  nextMove.textContent = guidance.nextMove;
  themeIdeasOutput.value = guidance.themeIdeas;
  keywordIdeasOutput.value = guidance.keywords;
  growthPlanOutput.value = guidance.growthPlan;
}

function buildPersonalGuidance(profile, selectedItem, items) {
  const topCategories = countOccurrences(items.map((item) => item.category), 3).map(([label]) => label);
  const topTags = countOccurrences(items.flatMap((item) => item.tags), 4).map(([label]) => label);
  const selectedBase = selectedItem?.category || selectedItem?.tags[0] || topCategories[0] || profile.noteTheme;
  const matchedAngle = topTags[0] || topCategories[1] || "実体験";
  const direction = `${profile.noteTheme} を軸にしつつ、${selectedBase} と ${matchedAngle} を交差させて「自分の読者向けに翻訳する記事」を増やす方針です。`;
  const contentFocus = `${profile.targetReader} に向けて、まずは「悩みが明確で、すぐ試せる」記事を増やすのが有効です。特に ${selectedBase} の初心者向け整理記事は相性が良いです。`;
  const monetizeFocus = `${profile.monetizeTarget} を売るなら、無料記事では結論と一部の実践例まで見せて、続きでテンプレート・手順・具体例を販売する形が合います。`;
  const nextMove = `次は ${selectedBase} に関する無料記事を3本、比較的近い切り口で並べて、反応が良いタイトルを有料noteに展開するのがおすすめです。`;

  return {
    direction,
    contentFocus,
    monetizeFocus,
    nextMove,
    themeIdeas: buildThemeIdeas(profile, selectedItem, topCategories, topTags),
    keywords: buildKeywordIdeas(profile, selectedItem, topCategories, topTags),
    growthPlan: buildGrowthPlan(profile, selectedItem, selectedBase, topTags)
  };
}

function buildThemeIdeas(profile, selectedItem, topCategories, topTags) {
  const anchors = [
    selectedItem?.title || "",
    selectedItem?.category || "",
    ...topCategories,
    ...topTags,
    profile.noteTheme
  ].filter(Boolean);

  const base = profile.noteTheme || "note運用";
  const reader = profile.targetReader || "初心者";
  const monetization = profile.monetizeTarget || "有料note";
  const uniqueAnchors = [...new Set(anchors)].slice(0, 4);

  const ideas = suggestPersonalizedIdeas(profile, selectedItem, uniqueAnchors, base, reader, monetization);

  return ideas.map((idea, index) => `${index + 1}. ${idea}`).join("\n");
}

function suggestPersonalizedIdeas(profile, selectedItem, anchors, base, reader, monetization) {
  if (profile.noteTheme.includes("教育") || profile.noteTheme.includes("保護者")) {
    return [
      `中学受験を考え始めた保護者向けに、${anchors[0] || "AI活用"}をやさしく整理する`,
      `家庭学習でAIを使うときに、親が先に知っておきたいこと`,
      `「${selectedItem?.title || "家庭学習の悩み"}」をヒントに、保護者向けの記事へ落とし込む`,
      `子どもの考える力を邪魔しないAI活用の始め方`,
      `教育×AI×心理学で書くなら、${reader}が安心できる説明の型`,
      `${monetization}につなげるための、家庭学習チェックリスト記事`,
      `無料版と有料版のAIを、家庭学習目線でどう比較するか`,
      `親が「わかる」「ラクする」ための${base}タイトル案`
    ];
  }

  if (profile.noteTheme.includes("起業") || profile.noteTheme.includes("失敗")) {
    return [
      `起業前に「勢い」で決めないために、最初に確認したいこと`,
      `「${selectedItem?.title || "起業前の不安"}」を起点に、判断を狂わせないための記事を書く`,
      `ビジコンに出る前に、事業の軸より先に見たいポイント`,
      `固定費と撤退ラインを曖昧にしたまま起業すると苦しくなる理由`,
      `${reader}向けに、経験ベースで問い直す${base}のタイトル案`,
      `${monetization}につなげる、起業判断チェックリスト記事`,
      `「ほんとに起業してもいいんですか？」に答えるための3視点`,
      `失敗から学ぶ起業noteで信頼を取る、実体験ベースの記事テーマ`
    ];
  }

  return [
    `${reader}向けにやさしく整理する${base}の始め方`,
    `${base}で遠回りしないために最初に見直したいこと`,
    `${anchors[0] || base}を自分のnoteテーマに変える考え方`,
    `${anchors[1] || base}と${anchors[2] || "実体験"}を掛け合わせた記事タイトル案`,
    `${monetization}につなげやすい${base}の無料記事テーマ`,
    `${reader}が保存したくなる${base}のチェックリスト記事`,
    `${selectedItem ? `「${selectedItem.title}」` : "最近の人気記事"}を見て、自分のnoteで書くべきテーマ`,
    `${profile.strengths ? `自分の強みである「${excerpt(profile.strengths, 24)}」を活かす` : "自分の強みを活かす"}${base}記事`
  ];
}

function buildGrowthPlan(profile, selectedItem, selectedBase, topTags) {
  const reference = selectedItem?.title || "直近の人気観測";
  const supportingTag = topTags[0] || "実体験";

  return [
    `目的: ${profile.noteTheme} を軸に、自分のnoteを育てて ${profile.monetizeTarget} につなげる。`,
    "",
    "おすすめ運用:",
    `1. ${reference} を参考に、${selectedBase} の無料記事を3本並べる`,
    `2. 3本のうち最も反応が良い切り口を、有料note向けの本命テーマにする`,
    `3. 各記事で ${supportingTag} を入れて、抽象論だけにしない`,
    `4. 記事末尾で ${profile.monetizeTarget} への導線を毎回同じ型で置く`,
    "",
    "無料記事で見せるもの:",
    "悩みの整理、最初の一歩、失敗しやすい点、簡単な実例",
    "",
    "有料で売るもの:",
    "テンプレート、チェックリスト、具体例、作業手順、比較表",
    "",
    "まず書くと良い記事:",
    `・${selectedBase} を初心者向けに分解した記事`,
    `・${selectedBase} と ${supportingTag} を組み合わせた実例記事`,
    `・${profile.monetizeTarget} につながる問題提起記事`
  ].join("\n");
}

function buildObservationSummary(item) {
  const sourceLabel = SOURCE_LABELS[item.sourceType];
  const likeLine = item.sourceType === "official"
    ? "公式発表として、企画や機能変更の流れを把握する材料になる。"
    : item.likes > 0
      ? `${item.likes}スキの反応があり、一定の需要が見えている。`
      : "まだ反応数は未確認だが、切り口の検証候補になる。";
  const categoryLine = item.category
    ? `${item.category}の文脈で読まれやすいテーマとして整理できる。`
    : "テーマの文脈を補足すると、読み手に伝わりやすくなる。";
  const tagLine = item.tags.length
    ? `特に ${item.tags.slice(0, 3).join("、")} の切り口が前面に出ている。`
    : "タグや切り口を補うと、なぜ刺さるかが見えやすくなる。";

  return [
    `${item.title} は ${sourceLabel} として観測した候補。`,
    likeLine,
    categoryLine,
    tagLine,
    "読み手の悩みを具体化しつつ、すぐ試せる形に落としている点が強みになりやすい。"
  ].join(" ");
}

function buildObservationTakeaway(item, profile) {
  const reader = profile.targetReader || "自分の読者";
  const monetization = profile.monetizeTarget || "有料note";
  const base = item.category || item.tags[0] || "このテーマ";
  const angle = item.tags[1] || "実例";

  return [
    `${reader} に向けては、${base} をもっとやさしく整理した切り口にすると相性が良さそう。`,
    `${angle} を入れると抽象論だけにならず、保存したくなる記事にしやすい。`,
    `無料記事では悩み整理と最初の一歩まで見せて、続きで ${monetization} につなげる流れが作れそう。`
  ].join(" ");
}

function buildKeywordIdeas(profile, selectedItem, topCategories, topTags) {
  const reader = profile.targetReader || "初心者";
  const baseTheme = selectedItem?.category || topCategories[0] || profile.noteTheme || "note運用";
  const focusTag = selectedItem?.tags[0] || topTags[0] || "実体験";
  const helperTag = selectedItem?.tags[1] || topTags[1] || "比較";
  const monetize = profile.monetizeTarget || "有料note";

  const keywords = suggestPersonalizedKeywords(profile, {
    reader,
    baseTheme,
    focusTag,
    helperTag,
    monetize,
    selectedTitle: selectedItem?.title || ""
  });

  return [
    "主軸キーワード:",
    ...keywords.primary.map((keyword, index) => `${index + 1}. ${keyword}`),
    "",
    "組み合わせキーワード:",
    ...keywords.secondary.map((keyword, index) => `${index + 1}. ${keyword}`),
    "",
    "ハッシュタグ候補:",
    ...keywords.tags.map((keyword, index) => `${index + 1}. #${keyword}`)
  ].join("\n");
}

function suggestPersonalizedKeywords(profile, context) {
  if (profile.noteTheme.includes("教育") || profile.noteTheme.includes("保護者")) {
    return {
      primary: [
        "中学受験 AI",
        "家庭学習 AI",
        "保護者 AI 活用",
        "考える力 家庭学習"
      ],
      secondary: [
        `${context.baseTheme} 初心者`,
        `${context.focusTag} 親向け`,
        "無料版 有料版 比較",
        "子ども AI 使い方"
      ],
      tags: [
        "中学受験",
        "家庭学習",
        "教育とAI",
        "保護者向け",
        "学び"
      ]
    };
  }

  if (profile.noteTheme.includes("起業") || profile.noteTheme.includes("失敗")) {
    return {
      primary: [
        "起業 失敗",
        "起業前 チェック",
        "ビジコン 事業計画",
        "撤退ライン 起業"
      ],
      secondary: [
        `${context.baseTheme} 実体験`,
        `${context.focusTag} 判断ミス`,
        "固定費 起業前",
        "起業 判断基準"
      ],
      tags: [
        "起業準備",
        "失敗から学ぶ",
        "ビジコン",
        "事業判断",
        "実体験"
      ]
    };
  }

  return {
    primary: [
      `${context.baseTheme}`,
      `${context.baseTheme} ${context.reader}`,
      `${context.focusTag} 始め方`,
      `${context.baseTheme} コツ`
    ],
    secondary: [
      `${context.helperTag} 比較`,
      `${context.baseTheme} 実例`,
      `${context.monetize} 導線`,
      `${context.baseTheme} 失敗`
    ],
    tags: [
      context.baseTheme.replaceAll(" ", ""),
      context.focusTag.replaceAll(" ", ""),
      "note運用",
      "情報発信",
      "学び"
    ]
  };
}

function buildStrategy(item) {
  let score = 45;
  const signals = [];

  if (item.likes >= 300) {
    score += 20;
    signals.push("スキ数が高く、テーマの需要が見えています。");
  } else if (item.likes >= 100) {
    score += 12;
    signals.push("一定以上の反応があり、切り口に需要があります。");
  } else if (item.likes > 0) {
    score += 6;
    signals.push("反応は小さめですが、切り口の検証材料にはなります。");
  }

  if (item.sourceType === "official") {
    score += 18;
    signals.push("note公式の流れに乗せられるため、企画タイミングが作りやすいです。");
  }

  if (containsAny(item, ["AI", "収益化", "SNS戦略", "note運用", "ハッシュタグ"])) {
    score += 14;
    signals.push("ノウハウ・改善・収益系の文脈があり、有料化や商品導線と相性が良いです。");
  }

  if (containsAny(item, ["実体験", "リアル記録", "失敗"])) {
    score += 10;
    signals.push("実体験型に寄せやすく、読者の信頼を取りやすいテーマです。");
  }

  if (item.sourceType === "hashtag") {
    score += 8;
    signals.push("検索意図が比較的はっきりしているため、タイトル設計に落とし込みやすいです。");
  }

  score = Math.min(score, 100);

  return {
    score,
    scoreLabel: score >= 80 ? "すぐ記事化したい強テーマ" : score >= 65 ? "十分狙えるテーマ" : "検証しながら育てたいテーマ",
    signals,
    persona: inferPersona(item),
    promise: inferPromise(item),
    salesAngle: inferSalesAngle(item),
    productPath: inferProductPath(item)
  };
}

function inferPersona(item) {
  if (containsAny(item, ["ハッシュタグ", "note運用", "見つけてもらう"])) {
    return "note初心者から中級者。記事を書いているのに読まれず、導線改善を急ぎたい人。";
  }

  if (containsAny(item, ["AI", "収益化", "SNS戦略"])) {
    return "副業や情報発信を始めた人。AIを使って記事作成から収益化まで早く回したい人。";
  }

  if (item.sourceType === "official") {
    return "noteの動きを見て企画タイミングを合わせたい発信者。特集やお題を活かしたい人。";
  }

  return "テーマに関心はあるが、どう記事にすれば読まれるか迷っている人。";
}

function inferPromise(item) {
  if (containsAny(item, ["ハッシュタグ", "見つけてもらう"])) {
    return "読まれない原因を減らし、見つけてもらえる記事設計に変えられること。";
  }

  if (containsAny(item, ["AI", "収益化"])) {
    return "記事ネタを増やしつつ、無料記事から収益化導線まで一気につなげられること。";
  }

  if (item.sourceType === "official") {
    return "公式の流れを踏まえて、今出すべき記事テーマを外さず選べること。";
  }

  return "流行を自分向けに翻訳し、企画と実行の迷いを減らせること。";
}

function inferSalesAngle(item) {
  if (containsAny(item, ["ハッシュタグ", "note運用"])) {
    return "無料記事で課題を言語化し、有料記事やテンプレートで『設定例』『実践チェックリスト』を売る形。";
  }

  if (containsAny(item, ["AI", "収益化", "SNS戦略"])) {
    return "無料記事で実例を見せ、続きは有料note、プロンプト集、個別相談に導く形。";
  }

  if (item.sourceType === "official") {
    return "公式テーマに便乗した無料記事で流入を取り、実践ノウハウや事例集を有料で深掘りする形。";
  }

  return "無料記事で共感を取り、実践ステップやテンプレートを有料に分ける形。";
}

function inferProductPath(item) {
  if (containsAny(item, ["ハッシュタグ", "note運用"])) {
    return "無料記事 → 有料note『タグ設計の型』 → 記事設計テンプレート販売";
  }

  if (containsAny(item, ["AI", "収益化"])) {
    return "無料記事 → 有料note『収益化の手順』 → プロンプト集 or コンサル";
  }

  if (item.sourceType === "official") {
    return "公式関連の無料記事 → 参加準備ガイドの有料note → 継続講座や添削";
  }

  return "無料記事 → 有料note → テンプレートや小さなサービス販売";
}

function buildArticlePlan(item, strategy) {
  const titles = suggestTitles(item);
  const hooks = suggestHooks(item);

  return [
    `題材: ${item.title}`,
    `狙う読者: ${strategy.persona}`,
    `提供価値: ${strategy.promise}`,
    "",
    "タイトル案:",
    ...titles.map((title, index) => `${index + 1}. ${title}`),
    "",
    "導入でつかむこと:",
    ...hooks.map((hook, index) => `${index + 1}. ${hook}`),
    "",
    "構成案:",
    "1. いま何が起きているか",
    `2. なぜこのテーマが刺さっているか: ${item.summary || "観測メモを言語化する"}`,
    `3. 自分の読者に置き換える: ${item.takeaway || "読者にどう役立つかを具体化する"}`,
    "4. 今すぐできる実践ステップを3つ出す",
    "5. 有料パートで深掘りする内容を予告する",
    "",
    "有料につなぐポイント:",
    strategy.salesAngle,
    "",
    "CTA:",
    `続きでは ${suggestPaidOffer(item)} をまとめます。必要なら有料版で具体例とテンプレートまで見せます。`
  ].join("\n");
}

function buildMonetizationPlan(item, strategy) {
  const freeLead = suggestFreeLead(item);
  const paidOffer = suggestPaidOffer(item);
  const upsell = suggestUpsell(item);

  return [
    `題材: ${item.title}`,
    `機会スコア: ${strategy.score} / 100`,
    "",
    "無料記事の役割:",
    freeLead,
    "",
    "有料noteの売り物:",
    paidOffer,
    "",
    "売りやすい価格帯の考え方:",
    "500円から1,500円の小さめ商品で反応を確認し、反応が良ければ事例追加版やテンプレート付き版を作る。",
    "",
    "販売導線:",
    `1. 無料記事で問題提起と一部解決を出す`,
    `2. 有料noteで ${paidOffer}`,
    `3. 最後に ${upsell} へつなぐ`,
    "",
    "次に検証すること:",
    "タイトルのクリック率、保存したくなる実例の有無、無料パートから有料導線への自然さを確認する。"
  ].join("\n");
}

function suggestTitles(item) {
  const base = item.category || item.tags[0] || "note運用";

  if (containsAny(item, ["ハッシュタグ", "note運用"])) {
    return [
      `noteで読まれる人がやっている${base}の考え方`,
      `note初心者が最初に見直したい${base}の設計`,
      `読まれないnoteを変える${base}の基本`
    ];
  }

  if (containsAny(item, ["AI", "収益化"])) {
    return [
      `AIで記事作成を回しながら収益化につなげる方法`,
      `フォロワーが少なくてもできる${base}の始め方`,
      `無料記事から有料noteへつなぐ${base}の作り方`
    ];
  }

  if (item.sourceType === "official") {
    return [
      `note公式の動きから考える、今書くべき記事テーマ`,
      `${item.title}から逆算するnote企画の作り方`,
      `note公式の流れに乗って記事を伸ばす考え方`
    ];
  }

  return [
    `${item.title}を見て考えた、今狙うべき記事企画`,
    `最近伸びている話題を記事ネタに変える方法`,
    `流行を自分の発信テーマに変える考え方`
  ];
}

function suggestHooks(item) {
  return [
    `「${item.category || item.tags[0] || "このテーマ"}を書いても読まれない」と感じている人は多いはずです。`,
    `実際に反応が集まっている観測として「${item.title}」があります。`,
    `この観測をそのまま真似るのではなく、自分の読者向けに翻訳すると企画として強くなります。`
  ];
}

function suggestFreeLead(item) {
  if (item.sourceType === "official") {
    return "公式発表の要点を整理し、読者が今どう動けばよいかを無料で明確にする。";
  }

  if (containsAny(item, ["ハッシュタグ", "note運用"])) {
    return "よくある失敗と改善の方向性を無料で示し、読者に『自分も直せそう』と思わせる。";
  }

  return "流行テーマを分解し、読者が今すぐ一歩動ける状態まで無料で持っていく。";
}

function suggestPaidOffer(item) {
  if (containsAny(item, ["ハッシュタグ", "note運用"])) {
    return "タグの決め方、タイトル例、導入文テンプレート、改善チェックリストをセットで渡す。";
  }

  if (containsAny(item, ["AI", "収益化"])) {
    return "記事量産の流れ、使うプロンプト、収益化までの導線設計、実例つきの手順書を売る。";
  }

  if (item.sourceType === "official") {
    return "公式テーマに合わせた企画案、書き出し例、参加準備テンプレートをまとめて売る。";
  }

  return "実践手順、テンプレート、具体例をまとめた小さな実用ガイドを売る。";
}

function suggestUpsell(item) {
  if (containsAny(item, ["AI", "収益化"])) {
    return "プロンプト集、添削、個別相談";
  }

  if (containsAny(item, ["ハッシュタグ", "note運用"])) {
    return "記事設計テンプレート、添削サービス";
  }

  return "テンプレート販売や継続サポート";
}

function containsAny(item, keywords) {
  const haystack = [
    item.title,
    item.category,
    item.summary,
    item.takeaway,
    item.tags.join(" ")
  ].join(" ");

  return keywords.some((keyword) => haystack.includes(keyword));
}

async function copyTextWithFeedback(text) {
  if (!text.trim()) {
    return;
  }

  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
    const helper = document.createElement("textarea");
    helper.value = text;
    helper.setAttribute("readonly", "");
    helper.style.position = "fixed";
    helper.style.top = "-9999px";
    document.body.appendChild(helper);
    helper.select();
    document.execCommand("copy");
    document.body.removeChild(helper);
  }
}

function markRefresh(target) {
  const stamp = formatRefreshTime(new Date());
  if (target === "insights" || target === "feed") {
    state.refreshMeta[target] = `最終更新: ${stamp}`;
  }
}

function formatRefreshTime(date) {
  return new Intl.DateTimeFormat("ja-JP", {
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(date);
}

function normalizeWhitespace(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function extractPublishedDate(value) {
  const text = String(value || "");
  const exactDate = text.match(/\d{4}-\d{2}-\d{2}/);
  if (exactDate) {
    return exactDate[0];
  }

  const jpDate = text.match(/(\d{4})年(\d{1,2})月(\d{1,2})日/);
  if (jpDate) {
    const [, year, month, day] = jpDate;
    return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  }

  return "";
}

function todayLocalDate() {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  return new Date(now.getTime() - offset * 60000).toISOString().slice(0, 10);
}

function buildTokenMarkup(entries) {
  if (!entries.length) {
    return '<span class="empty-state">まだ十分な観測がありません。</span>';
  }

  return entries.map(([label, count]) => `
    <span class="token">
      <span>${escapeHtml(label)}</span>
      <strong>${count}</strong>
    </span>
  `).join("");
}

function countOccurrences(values, limit) {
  const map = new Map();

  values
    .map((value) => String(value || "").trim())
    .filter(Boolean)
    .forEach((value) => {
      map.set(value, (map.get(value) || 0) + 1);
    });

  return [...map.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "ja"))
    .slice(0, limit);
}

function uniqueCount(values) {
  return new Set(values.map((value) => String(value).trim()).filter(Boolean)).size;
}

function inferPatterns(items) {
  const highLikeItems = items.filter((item) => item.likes >= 50);
  const patterns = [];

  if (highLikeItems.some((item) => item.tags.includes("ハッシュタグ") || item.title.includes("ハッシュタグ"))) {
    patterns.push("ハッシュタグ最適化は引き続き強い切り口。『数』『付け方』『見つけてもらう』が特に相性が良いです。");
  }

  if (items.some((item) => item.tags.includes("実体験") || item.summary.includes("リアル記録"))) {
    patterns.push("AIや収益化系は、理論だけよりも実体験・変化ログ付きのほうが企画の説得力が上がりやすいです。");
  }

  if (items.some((item) => item.sourceType === "official")) {
    patterns.push("公式の募集企画や特集は、その周辺テーマまで含めて波を作るので、関連企画も一緒に見たいです。");
  }

  if (!patterns.length) {
    patterns.push("観測数が増えると傾向が安定します。まずは10件以上入れるのがおすすめです。");
  }

  return patterns;
}

function exportItems() {
  const blob = new Blob([JSON.stringify(state.items, null, 2)], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "note-trend-observations.json";
  link.click();
  URL.revokeObjectURL(link.href);
}

async function importItems(event) {
  const file = event.target.files?.[0];
  if (!file) {
    return;
  }

  try {
    const text = await file.text();
    const parsed = JSON.parse(text);
    if (!Array.isArray(parsed)) {
      throw new Error("JSON array required");
    }

    state.items = parsed.map(normalizeItem);
    state.selectedId = state.items[0]?.id || null;
    saveItems();
    renderAll();
    setAppStatus("JSONを読み込みました。");
  } catch (error) {
    window.alert("JSONの読み込みに失敗しました。配列形式のJSONを選んでください。");
  } finally {
    event.target.value = "";
  }
}

function excerpt(value, maxLength) {
  const text = String(value || "").replace(/\s+/g, " ").trim();
  if (!text) {
    return "";
  }

  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function setAppStatus(message) {
  fetchStatusLabel.textContent = message;
}
