# 縁結びナビ（En-musubi Navi）

全国47都道府県（8地方区分）の **自治体・地方銀行・公的団体** が主催する婚活イベントと、
各都道府県の公式結婚支援センターをまとめる情報サイト。
情報提供・集客と、広告／アフィリエイト収益化を両立する構成です。

## 使い方（ローカル確認）

`index.html` をブラウザで開くだけで動きます（ビルド不要の静的サイト）。
※ ファイルを直接開いても `data.js` を `<script>` で読み込む構成なので動作します。

## 公開（デプロイ）

このフォルダをそのまま静的ホスティングに置けば公開できます。手順は **[DEPLOY.md](DEPLOY.md)** を参照。

公開準備として用意済み：
- **OGP/Twitterカード**：全ページに設定（画像 `assets/img/ogp.png` 1200×630）
- **ファビコン/アプリアイコン**：`assets/img/favicon.svg` ほか／`site.webmanifest`
- **sitemap.xml**（142URL）＋ **robots.txt**
- **netlify.toml**（キャッシュ設定）＋ **404.html**
- 素材生成ツール：`build-ogp.py` / `build-favicon.py`（要Pillow）、`build-sitemap.mjs`（要Node）
- ⚠️ 仮ドメイン `https://enmusubi-navi.jp` を使用中。**本ドメイン確定後に一括置換＋sitemap再生成**（→ DEPLOY.md 手順3）

## ページ構成

| ファイル | 役割 |
|---|---|
| `index.html` | トップ（ヒーロー・検索・注目イベント・県別・コラム） |
| `events.html` | イベント一覧（県／主催／こだわり／キーワードで絞り込み） |
| `prefecture.html` | 県から探す（`?pref=fukuoka` で県別表示） |
| `event.html` | イベント詳細（`?id=fko-001`） |
| `columns.html` | コラム一覧（カテゴリ絞り込み） |
| `column.html` | コラム詳細（`?id=col-001`／アフィリ枠あり） |
| `about.html` | サイト紹介・免責事項 |
| `post.html` | 主催者向け掲載依頼フォーム（デモ） |

## データの更新（ここだけ触ればOK）

`assets/js/data.js` の以下を編集すると全ページに反映されます。

- `DATA_UPDATED` … データ更新日（各ページの注意書きに表示）
- `PREFECTURES` … 県マスタ（色・キャッチ・公式センター名/URL）
- `EVENTS` … イベント（`orgType`・`source`・`applyUrl` 等）
- `COLUMNS` … コラム（`affiliate: true` でPR枠表示）

### `orgType`（主催種別）の値
| 値 | 表示 | 意味 |
|---|---|---|
| `center` | 県センター | 県の結婚支援センター主催（公的） |
| `city` | 自治体 | 市町村・県の主催（公的） |
| `public` | 公的団体 | 商工会議所・JA等（公的） |
| `partner` | 公認・掲載 | 公式センターが掲載・公認する民間主催 |

> 収録データは **2026年6月6日時点** で各県の公式サイトに公開されていた実イベント。
> 各 `EVENTS` には `source`（情報元URL）と `applyUrl`（申込先）を実URLで格納済み。

## 公式窓口（全国47都道府県・実在）

全47都道府県の公式結婚支援センター／窓口を `data.js` の `PREFECTURES[].center / centerUrl` に収録済み。
県別ページ（`prefecture.html?pref=tokyo` 等）で各県の公式窓口リンクを表示します。
イベントは現在 九州中心（22件）。他エリアは順次追加（[UPDATE_GUIDE.md](UPDATE_GUIDE.md) 参照）。

### 参考：九州・沖縄エリアの窓口

- 福岡：ふく♥こい https://kekkon-ouen.pref.fukuoka.lg.jp/
- 佐賀：さが出会いサポートセンター https://www.sagadeai.com/
- 長崎：あいたか https://konkatu-nagasaki.net/ ／ ながさきめぐりあい https://www.meguriai-nagasaki.jp/
- 熊本：くまもと出会いサポートセンター（Kumarry）https://www.msc-kumamoto.jp/
- 大分：OITAえんむす部 https://oita-enmusubu.com/
- 宮崎：みやざき結婚サポートセンター https://www.miyazakikekkon.com/
- 鹿児島：かごしま出会いサポートセンター https://www.msc-kagoshima.jp/

## 定期更新（仕組み化済み）

- **更新手順書**：[UPDATE_GUIDE.md](UPDATE_GUIDE.md) に、7県の巡回先リンク・`EVENTS`の書き方・AI用コピペプロンプト・チェックリストをまとめています。
- **自動スケジュール**：Claude Code の予約タスク `kyushu-konkatsu-monthly-update` を登録済み（**毎月1日 9:00**）。アプリ起動中に自動でデータ更新を試みます。「Scheduled」から管理・手動実行（Run now）が可能。
  - 初回は一度「Run now」で実行し、Web取得などのツール許可を事前承認しておくと、以降の自動実行が止まりません。

## 運用メモ（重要）

- イベントは**日付が来ると自動で「受付終了」表示**になります（過去判定）。定期的に新しいイベントを追加してください。
- **地方銀行主催**の婚活は今回の調査では確認できませんでした（コード上は対応済み。見つかれば `orgType` を足して追加可能）。
- 各県センターのイベント一覧ページは **JS描画や会員ログインが必要**なものがあり、自動取得しづらい場合があります。`source` の公式ページを定期巡回して手動更新するのが確実です。

## 収益化（マネタイズ）

公的イベントは無料・中立で掲載し続け、その周辺の商業ニーズで稼ぐ設計です。

### ① 掲載プラン（[plan.html](plan.html)）
主催者・スポンサー向けの料金ページ兼・営業窓口。
- 公的機関＝無料／民間イベント＝スタンダード・注目枠・プレミアムの有料掲載
- 申込は [post.html](post.html)（掲載フォーム）へ誘導
- **要設定**：料金は「設定例」。実価格に合わせて plan.html を編集。

### ② 地域スポンサー枠
サイト内の枠（トップ・詳細サイド・記事内）は、契約スポンサーが無ければ自動で
**「スポンサー募集中」CTA**（→ plan.html#sponsor）になり、そのまま営業窓口として機能します。

- **スポンサーを追加する**：`assets/js/data.js` の `SPONSORS` 配列に1件足すだけ。
  ```js
  const SPONSORS = [
    { name:"〇〇写真スタジオ", category:"フォトスタジオ", slot:"rail",
      text:"お見合い・前撮り写真はおまかせ", url:"https://example.com", image:"" },
  ];
  ```
  `slot`：`"rail"`（サイド縦長）/ `"lead"`（横長）。`image` はロゴ画像パス（任意）。
  追加すると該当枠に「PR」付きで表示され、「募集中」CTAは自動で消えます。
- **要設定**：plan.html の問い合わせメール `info@example.com` をご自身のアドレスに変更。

### ③ その他（既存）
- **アフィリエイト**：`column.html` の `.aff-box`、`rel="sponsored"` リンク（街コン送客などイベント系がおすすめ）。
- **ステマ規制対応**：有料掲載・スポンサーは「PR」「公認・掲載」を必ず明示（実装済み）。

> データ/枠を更新したら、全HTMLの `?v=` 番号を +1 してキャッシュを更新（[UPDATE_GUIDE.md](UPDATE_GUIDE.md) 参照）。

## 本番化に向けた次のステップ（任意）

1. 実イベントのリサーチ＆データ投入
2. 掲載フォームを Google フォーム / Formspree 等に接続
3. 各ページを静的書き出し（SEO強化：現状は詳細/県別がJS描画）
4. 独自ドメイン取得・公開（Netlify / さくら等）、OGP画像・sitemap.xml 追加

## デザイン

- コンセプト：赤い糸（縁結び）× 和モダン・エディトリアル
- 配色：生成り × 朱赤 × 藍 ／ 書体：しっぽり明朝・Zen角ゴ・Fraunces
