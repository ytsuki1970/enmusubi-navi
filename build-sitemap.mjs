// sitemap.xml を data.js から自動生成。 実行: node build-sitemap.mjs
// ★公開ドメインが決まったら DOMAIN を書き換えて再実行してください。
import fs from "fs";

const DOMAIN = "https://ytsuki1970.github.io/enmusubi-navi";
const today = new Date().toISOString().slice(0, 10);

const src = fs.readFileSync("assets/js/data.js", "utf8");
const { EVENTS, PREFECTURES, COLUMNS } = new Function(
  src + "; return { EVENTS, PREFECTURES, COLUMNS };"
)();

const urls = [];
const add = (path, priority, changefreq) => urls.push({ path, priority, changefreq });

add("/", "1.0", "daily");
add("/events.html", "0.9", "daily");
add("/prefecture.html", "0.8", "weekly");
add("/columns.html", "0.6", "weekly");
add("/about.html", "0.4", "monthly");
add("/post.html", "0.4", "monthly");
PREFECTURES.forEach((p) => add(`/prefecture.html?pref=${p.key}`, "0.7", "weekly"));
EVENTS.forEach((e) => add(`/event.html?id=${e.id}`, "0.6", "weekly"));
COLUMNS.forEach((c) => add(`/column.html?id=${c.id}`, "0.5", "monthly"));

const esc = (s) => s.replace(/&/g, "&amp;");
const body = urls
  .map(
    (u) =>
      `  <url>\n    <loc>${DOMAIN}${esc(u.path)}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`
  )
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
fs.writeFileSync("sitemap.xml", xml);
console.log(`sitemap.xml generated: ${urls.length} URLs (domain: ${DOMAIN})`);
