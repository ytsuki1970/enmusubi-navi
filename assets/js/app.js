/* =====================================================================
   縁結び九州 — 共通ロジック（描画・絞り込み・ユーティリティ）
   各ページの末尾でこの関数群を呼び出します。
   ===================================================================== */

/* ---- ユーティリティ ------------------------------------------------- */
const $  = (sel, el = document) => el.querySelector(sel);
const $$ = (sel, el = document) => [...el.querySelectorAll(sel)];

function getParam(name) {
  return new URLSearchParams(location.search).get(name);
}

function prefBy(key) {
  return PREFECTURES.find(p => p.key === key) || { name: "九州", color: "#C0392B", roma: "Kyushu", catch: "" };
}

const WEEK = ["日", "月", "火", "水", "木", "金", "土"];
function fmtDate(iso) {
  const d = new Date(iso + "T00:00:00");
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日(${WEEK[d.getDay()]})`;
}
function fmtShort(iso) {
  const d = new Date(iso + "T00:00:00");
  return { m: d.getMonth() + 1, d: d.getDate(), w: WEEK[d.getDay()] };
}
function isPast(iso) {
  return new Date(iso + "T23:59:59") < new Date();
}
function daysLeft(iso) {
  const ms = new Date(iso + "T23:59:59") - new Date();
  return Math.ceil(ms / 86400000);
}

/* ---- イベントカード（一覧で使用）----------------------------------- */
function eventCard(ev) {
  const p = prefBy(ev.pref);
  const org = ORG_TYPES[ev.orgType] || { label: "" };
  const ongoing = !!ev.ongoing;
  const dl = ev.deadline ? daysLeft(ev.deadline) : null;
  const soon = !ongoing && dl !== null && dl >= 0 && dl <= 7;
  const past = !ongoing && isPast(ev.date);

  const dateBlock = ongoing
    ? `<div class="ev-card__date ev-card__date--ongoing"><span class="ev-card__ongoing">通年</span><span class="ev-card__ongoing-sub">随時</span></div>`
    : (() => { const s = fmtShort(ev.date); return `<div class="ev-card__date">
      <span class="ev-card__m">${s.m}<small>月</small></span>
      <span class="ev-card__d">${s.d}</span>
      <span class="ev-card__w">${s.w}</span>
    </div>`; })();

  return `
  <a class="ev-card${past ? " is-past" : ""}" href="event.html?id=${ev.id}" style="--pref:${p.color}">
    ${dateBlock}
    <div class="ev-card__body">
      <div class="ev-card__tags">
        <span class="chip chip--${ev.orgType}">${org.label}</span>
        <span class="chip chip--pref">${p.name}</span>
        ${ongoing ? `<span class="chip chip--ongoing">常設・随時</span>` : ""}
        ${soon ? `<span class="chip chip--soon">締切まで${dl}日</span>` : ""}
        ${past ? `<span class="chip chip--past">受付終了</span>` : ""}
      </div>
      <h3 class="ev-card__title">${ev.title}</h3>
      <p class="ev-card__sum">${ev.summary}</p>
      <div class="ev-card__meta">
        <span>📍 ${ev.city}</span>
        <span>👤 ${ev.target}</span>
      </div>
    </div>
    <span class="ev-card__go" aria-hidden="true">→</span>
  </a>`;
}

/* ---- コラムカード --------------------------------------------------- */
function columnCard(c) {
  return `
  <a class="col-card" href="column.html?id=${c.id}">
    <span class="col-card__cat">${c.category}</span>
    <h3 class="col-card__title">${c.title}</h3>
    <p class="col-card__ex">${c.excerpt}</p>
    <span class="col-card__date">${fmtDate(c.date)}</span>
  </a>`;
}

/* ---- エリア・県カード描画 ----------------------------------------- */
function eventCountByPref(key) { return EVENTS.filter(e => e.pref === key).length; }

function prefCardHTML(p) {
  const n = eventCountByPref(p.key);
  return `<a class="pref-card" href="prefecture.html?pref=${p.key}" style="--c:${p.color}">
    <span class="pref-card__roma">${p.roma}</span>
    <span class="pref-card__name">${p.name}</span>
    <span class="pref-card__catch">${p.catch}</span>
    <span class="pref-card__count"><span class="num">${n}</span> 件 →</span>
  </a>`;
}

/* 県別ページ：エリアごとにセクション分けして全47都道府県を表示 */
function regionSectionsHTML() {
  return REGIONS.map(r => {
    const prefs = PREFECTURES.filter(p => p.region === r.key);
    return `<section class="region-block" id="region-${r.key}">
      <h3 class="region-head" style="--c:${r.color}"><span>${r.name}</span><small>${prefs.length}都道府県</small></h3>
      <div class="pref-grid">${prefs.map(prefCardHTML).join("")}</div>
    </section>`;
  }).join("");
}

/* トップページ：8エリアのカード（件数つき）→ 県別ページの該当エリアへ */
function regionCardsHTML() {
  return REGIONS.map(r => {
    const prefs = PREFECTURES.filter(p => p.region === r.key);
    const ev = EVENTS.filter(e => prefs.some(p => p.key === e.pref)).length;
    const roma = r.key.charAt(0).toUpperCase() + r.key.slice(1);
    return `<a class="pref-card" href="prefecture.html#region-${r.key}" style="--c:${r.color}">
      <span class="pref-card__roma">${roma}</span>
      <span class="pref-card__name">${r.name}</span>
      <span class="pref-card__catch">${prefs.length}都道府県</span>
      <span class="pref-card__count"><span class="num">${ev}</span> 件のイベント →</span>
    </a>`;
  }).join("");
}

/* 県セレクト用：エリアでoptgroup分けしたoptionsを生成 */
function prefOptionsHTML() {
  return REGIONS.map(r => {
    const prefs = PREFECTURES.filter(p => p.region === r.key);
    return `<optgroup label="${r.name}">${prefs.map(p => `<option value="${p.key}">${p.name}</option>`).join("")}</optgroup>`;
  }).join("");
}

/* ---- 並び替え：開催が近い順 → 常設 → 受付終了 ---------------------- */
function eventRank(e) { if (e.ongoing) return 1; return isPast(e.date) ? 2 : 0; }
function byDateUpcoming(a, b) {
  const ra = eventRank(a), rb = eventRank(b);
  if (ra !== rb) return ra - rb;
  if (ra === 1) return 0;                 // 常設どうしは順序維持
  return a.date.localeCompare(b.date);
}

/* ---- スポンサー枠の描画 -------------------------------------------
   非営利・ボランティア運営のため、スポンサー／広告枠は使用しません。
   SPONSORS が空のあいだは何も表示しません（募集CTAも出しません）。  */
function sponsorHTML(slot) {
  const all = (typeof SPONSORS !== "undefined" ? SPONSORS : []);
  const list = all.filter(s => !s.slot || s.slot === slot);
  if (!list.length) return "";
  return list.map(s => `
    <a class="sponsor-card${slot === "rail" ? " sponsor-card--rail" : ""}" href="${s.url}" target="_blank" rel="sponsored noopener">
      <span class="sponsor-card__pr">PR</span>
      ${s.image ? `<img class="sponsor-card__img" src="${s.image}" alt="${s.name}">` : ""}
      <b class="sponsor-card__name">${s.name}</b>
      ${s.category ? `<span class="sponsor-card__cat">${s.category}</span>` : ""}
      ${s.text ? `<span class="sponsor-card__text">${s.text}</span>` : ""}
    </a>`).join("");
}
/* 静的に置いた [data-sponsor][data-slot] を埋める（ページ読込時） */
function initSponsors() {
  $$("[data-sponsor]").forEach(el => { el.outerHTML = sponsorHTML(el.getAttribute("data-slot") || "lead"); });
}

/* ---- 共通ナビ：現在ページをハイライト ------------------------------ */
function markActiveNav() {
  const here = location.pathname.split("/").pop() || "index.html";
  $$(".site-nav a").forEach(a => {
    if (a.getAttribute("href") === here) a.classList.add("is-active");
  });
}

/* ---- モバイルメニュー開閉 ------------------------------------------ */
function initMenu() {
  const btn = $(".nav-toggle");
  const nav = $(".site-nav");
  if (!btn || !nav) return;
  btn.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    btn.setAttribute("aria-expanded", open);
  });
}

/* ---- 年号フッター -------------------------------------------------- */
function setYear() {
  const el = $("#year");
  if (el) el.textContent = new Date().getFullYear();
}

/* ---- スクロール出現アニメ ------------------------------------------ */
function initReveal() {
  const els = $$("[data-reveal]");
  if (!els.length || !("IntersectionObserver" in window)) {
    els.forEach(e => e.classList.add("is-in"));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
    });
  }, { threshold: 0.12 });
  els.forEach(e => io.observe(e));
}

/* ---- 全ページ共通初期化 -------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  markActiveNav();
  initMenu();
  setYear();
  initReveal();
  initSponsors();
});
