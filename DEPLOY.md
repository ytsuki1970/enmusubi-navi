# 縁結びナビ — 公開（デプロイ）ガイド

静的サイトなので、**この `enmusubi-navi` フォルダをそのままアップロード**すれば公開できます。
ビルド作業は不要です（`build-*.py` / `build-sitemap.mjs` は素材生成用のローカルツール）。

---

## 1. 公開する（Netlify・最速＝ドラッグ&ドロップ）

1. https://app.netlify.com/drop を開く（無料アカウント作成）
2. **`enmusubi-navi` フォルダ**をブラウザにドラッグ＆ドロップ
3. 数十秒で `https://〇〇〇.netlify.app` の公開URLが発行されます（HTTPS自動）

> 継続的に更新するなら、GitHubにこのフォルダを置いて Netlify と連携（Push＝自動公開）するのが便利です。

### Cloudflare Pages / さくらのレンタルサーバ等でも可
いずれも「静的ファイルを置くだけ」。公開ディレクトリ＝`enmusubi-navi` の中身。

---

## 2. 独自ドメインを接続する

1. ドメインを取得（お名前.com / ムームードメイン / Cloudflare 等）。例：`enmusubi-navi.jp`
2. Netlify → Site → **Domain management → Add a custom domain**
3. 表示される指示どおりにDNSを設定（Netlify DNSに移すか、取得元で A / CNAME レコードを設定）
4. SSL証明書はNetlifyが自動発行

---

## 3. ★ドメイン確定後の置換（重要・1か所の文字列を一括置換）

仮ドメイン **`https://enmusubi-navi.jp`** を実ドメインに置き換えます。

- 全HTML（OGP・canonical）内の `https://enmusubi-navi.jp` → 実ドメイン
- `robots.txt` の Sitemap 行
- `build-sitemap.mjs` の `const DOMAIN` を書き換え → **再生成**：
  ```
  node build-sitemap.mjs
  ```
  （`sitemap.xml` が実ドメインで作り直されます）

> エディタの「フォルダ内一括置換」で `https://enmusubi-navi.jp` を検索→置換するのが簡単です。

---

## 4. 公開後のSEO仕上げ

1. **Google Search Console**（https://search.google.com/search-console）にサイト登録
   → 「サイトマップ」に `sitemap.xml` を送信
2. **OGP表示の確認**：
   - X（Twitter）: https://cards-dev.twitter.com/validator
   - Facebook: https://developers.facebook.com/tools/debug/
   - LINE: タイムラインにURLを貼って確認
3. 必要なら Google Analytics / Search Console の計測タグを各HTMLの `<head>` に追加

---

## 5. 更新フロー（公開後）

- イベント／スポンサーを更新したら（`assets/js/data.js`）、全HTMLの `?v=` 番号を +1（[UPDATE_GUIDE.md](UPDATE_GUIDE.md) 参照）
- データを増やしたら `node build-sitemap.mjs` で sitemap を作り直し → 再アップロード
- 毎月の自動更新タスク（`enmusubi-navi-monthly-update`）がデータ追記を補助

---

## 補足：公開に不要なファイル（害はないが除外推奨）

git/GitHub経由で公開する場合は `.gitignore` 等で下記を除外すると綺麗です（ドラッグ&ドロップ公開ならそのままでも問題ありません）：

```
build-ogp.py
build-favicon.py
build-sitemap.mjs
serve.json
*.md (README/UPDATE_GUIDE/DEPLOY など内部資料)
.claude/
```

> OGP画像・アイコンを作り直したいとき：`python build-ogp.py` / `python build-favicon.py`
