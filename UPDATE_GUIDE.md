# 縁結びナビ — 月次データ更新ガイド

> 全国47都道府県版。各県の公式窓口URLは `assets/js/data.js` の `PREFECTURES[].centerUrl` に収録済み。
> 下記の巡回先リンク集は九州中心（実証済み）。他エリアは各県 centerUrl を起点に同じ要領で巡回・追加してください。

イベント情報は鮮度が命。**月1回（毎月1日が目安）** に下記を巡回して
`assets/js/data.js` の `EVENTS` を更新してください。所要 15〜30分。

---

## 更新の手順（5ステップ）

1. `data.js` 冒頭の `DATA_UPDATED` を当日の日付に変更（例 `"2026-07-01"`）。
   - ★あわせて、全HTMLの `<script src="assets/js/data.js?v=2">` と `app.js?v=2` の **`v=` の数字を +1**（例 `v=3`）に。これで再訪問者にも更新が反映されます（キャッシュ対策）。
2. 下の「巡回先リンク集」を順に開き、**新しい公的イベント**を探す。
3. 各イベントの**詳細ページ**を開き、参加費・定員・締切・会場住所を確認。
4. `EVENTS` 配列に追記（フォーマットは既存イベントをコピーして書き換え）。
5. ブラウザで `index.html` を開いて表示確認 → 公開先へアップロード。

> 過去日のイベントは**自動で「受付終了」表示**になります。削除は任意（履歴として残してもOK。件数を絞りたい時だけ削除）。

---

## 巡回先リンク集（7県の公式イベント情報）

| 県 | 公式イベント一覧ページ |
|---|---|
| 福岡 | https://kekkon-ouen.pref.fukuoka.lg.jp/fukuoka/event/ ／ https://fuku-koi.jp/ ／ 地銀連携：https://junoall.org/ ＋ 筑邦銀行公式X https://x.com/chikuho_bank （ちくごJUNOALL婚活マッチングの次回回） |
| 佐賀 | https://saga-kosodate.jp/deai/events/ ／ 自治体主催のみ → https://saga-kosodate.jp/deai/events/index/sponsorship:0 |
| 長崎 | https://www.meguriai-nagasaki.jp/events/ ／ https://konkatu-nagasaki.net/event |
| 熊本 | https://www.msc-kumamoto.jp/event/ |
| 大分 | https://oita-enmusubu.com/event/ |
| 宮崎 | https://www.miyazakikekkon.com/event/ ／ https://kodomoseisaku.pref.miyazaki.lg.jp/marriage/ |
| 鹿児島 | https://www.msc-kagoshima.jp/event/ ／ http://www.pref.kagoshima.jp/ab14/kenko-fukushi/kodomo/shoshika/deai-event2.html |

### 公的イベントの見分け方（最重要・公的のみ掲載）
このサイトは**公的主催の婚活イベントだけ**を載せる方針です。県のポータルは民間主催イベントも掲載しているため、`organizer`（主催者）を必ず確認し、**民間主催は載せない**でください。

掲載してよい `orgType`（公的のみ）：
- `center` … 県の結婚支援センター直営（例：くまもと出会いサポートセンター、TOKYOふたりSTORY、あいマリ）
- `city` … 都道府県・市区町村主催（例：宮崎市、唐津市、上毛町、大垣市）
- `public` … 商工会議所・JA・法人会・社会福祉協議会・NPO法人・県の出会い応援事業の直営（例：大分商工会議所、JAふくおか八女、河北町社協）
- `bank` … 地方銀行の連携・支援（例：筑邦銀行が支援するJUNOALL、大分銀行）。バッジ「地銀連携」

**掲載しない（民間主催）**：営利の婚活事業者・街コン業者・結婚相談所・個人運営の「○○応援隊」「協賛団体」「××社」「Love company」等が主催のもの。県ポータルに"掲載・連携"とあっても、主催が民間なら除外。
> ※ 旧 `partner`（公認・掲載）区分は廃止しました（民間主催イベントは載せない方針）。

---

## 監視対象リスト（次回日程が出たら追加したい有力プログラム）

2026年6月時点で「実在するが次回日程が未公表」の優良プログラム。毎月チェックして、日程が出たらEVENTSに追加する。

### 地方銀行（地銀連携 `bank`）
- **筑邦銀行 × JUNOALL**（久留米）… https://junoall.org/ ／ https://x.com/chikuho_bank ※掲載済み・次回回を更新
- **西日本シティ銀行「婚活 with Itoshima」**（糸島支店内・糸島市連携）… 婚活パーティー計画中。https://blog.ncbank.co.jp/posts/802/
- **大分銀行 婚活パーティー**（フリーマガジン「スマイル」共催・中津市共催）… 単発開催。https://www.oitabank.co.jp/news/
- ※佐賀銀行・南日本銀行はIBJ提携の「取引先向け結婚相談所開業支援」(BtoB)で一般向けイベントなし。

### 自治体の継続事業（次回日程に注目）
- 北九州市「コミュ✩ラボ」 https://www.city.kitakyushu.lg.jp/ko-katei/11901090.html
- 久留米市「ほとめき♡ときめき婚活」 https://www.city.kurume.fukuoka.jp/1060manabi/2010kosodate/3250ouenjigyou/
- 長崎市「ときめきナガサキ」 https://tokimeki-nagasaki.jp/
- 諫早市「恋バス諫早／いさはや♥プロジェクト」 https://www.city.isahaya.nagasaki.jp/soshiki/37/15372.html
- 大村市婚活サポートセンター（ながさきめぐりあい掲載）
- 大分市「ときめき出会いプロジェクト（トキメキラボ）」 https://oita-tokimeki.com/
- 宮崎市「みや恋」（年7回程度） https://www.city.miyazaki.miyazaki.jp/education/marriage/329010.html
- 都城市「縁結びプロジェクト」 https://www.city.miyakonojo.miyazaki.jp/site/konkatsu/
- 大隅de縁結び（大隅5町連携・ボウリングコン等） https://www.town.kinko.lg.jp/seisaku-h/konkatsu20252.html
- くま鉄LOVEコン（球磨郡9町村「LOVEくま」） 湯前町企画観光課
- 鹿児島・霧島市/日置市「出張登録・閲覧会」（※登録会。婚活パーティーではない点に注意）

> 検索のコツ：日本のローカル情報は **Yahoo! Japan検索（WebFetch で `https://search.yahoo.co.jp/search?p=…`）** が強い。標準のWeb検索（英語圏中心）では取りこぼす。

## EVENTS の書き方（テンプレ）

```js
{
  id: "県prefix-YYYYMMDD-slug",   // 例 fko-20260801-bbq（重複しない一意のID）
  title: "イベント名",
  pref: "fukuoka",                 // fukuoka/saga/nagasaki/kumamoto/oita/miyazaki/kagoshima
  city: "市区町村名",
  organizer: "主催者名（正式名称）",
  orgType: "center",              // center/city/public/partner
  date: "2026-08-01",             // YYYY-MM-DD（並び替えと受付終了判定に使用）
  // ↑ 日程が決まっていない常設窓口・拠点・不定期開催は date:"" にして ongoing:true を付ける
  //   （カードが「通年・随時」表示になり、受付終了にならない。例：地銀の相談窓口）
  time: "14:00〜16:00（受付13:30〜）",
  venue: "会場名（住所）",
  target: "対象年齢・条件",
  fee: "参加費（不明なら「公式サイトでご確認ください」）",
  capacity: "定員（不明なら「公式サイトでご確認ください」）",
  ratio: "1:1",                   // 不明なら "—"
  deadline: "2026-07-25",         // 申込締切（無ければ ""）
  tags: ["タグ1", "タグ2"],        // 検索の絞り込みに使用
  summary: "一覧カード用の短い紹介（1〜2文）",
  body: "詳細ページ用の説明文",
  applyUrl: "https://申込先URL",
  source: "https://情報元URL",     // 詳細ページに「情報元」リンクとして表示
  featured: false,                // true でトップページの「注目」に出る
},
```

---

## AIに任せる場合（コピペ用プロンプト）

Claude Code で `kyushu-konkatsu` を開き、以下を貼り付ければ半自動で更新できます：

```
UPDATE_GUIDE.md の巡回先リンク集を順に確認し、各県の公式イベント情報ページから
2026年◯月以降に開催される「公的主催（center/city/public）」の婚活イベントを集めて、
assets/js/data.js の EVENTS に追記してください。各イベントは詳細ページまで開いて
参加費・定員・締切・会場住所を実数値で埋め、source と applyUrl は実URLを入れること。
民間主催イベントは orgType: "partner" として区別。過去日のイベントは残してOK。
最後に DATA_UPDATED を今日の日付に更新し、ブラウザ表示も確認してください。
```

---

## チェックリスト（更新後）

- [ ] `DATA_UPDATED` を更新した
- [ ] 新規イベントの `id` が重複していない
- [ ] `date` が `YYYY-MM-DD` 形式
- [ ] `orgType` が4種のいずれか
- [ ] `applyUrl` / `source` が実在URL
- [ ] ブラウザでトップ・県別・詳細ページが正しく表示される
