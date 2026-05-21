# AI管理賦能中心網站

## 專案用途

這是一個可部署於 GitHub Pages 的單頁式網站，用於介紹 AI管理賦能中心服務，並收集企業AI導入需求盤點資料。

網站提供企業AI培訓、AI治理、AI Agent、工作流程AI化、知識庫建置與 AI Brain 決策中樞等服務說明，並透過表單將企業填寫內容送至 Google Apps Script，再寫入 Google Sheet。

## 檔案說明

- `index.html`：網站與表單前端。
- `apps-script.gs`：Google Apps Script 後台接收程式。
- `.nojekyll`：避免 GitHub Pages 使用 Jekyll 處理靜態檔案。

## 如何建立 Google Sheet

1. 建立一份新的 Google Sheet。
2. 將底部工作表命名為「表單回應」。
3. 不一定要手動建立欄位，`apps-script.gs` 會自動建立標題列。

## 如何建立 Google Apps Script

1. 在 Google Sheet 點選「擴充功能」→「Apps Script」。
2. 貼上 `apps-script.gs` 的內容。
3. 儲存專案。

## 如何部署為網頁應用程式

1. 點選「部署」→「新增部署作業」。
2. 類型選擇「網頁應用程式」。
3. 執行身分選「我」。
4. 存取權限選「任何人」。
5. 點選部署。
6. 完成 Google 授權。
7. 複製 Web App URL。

## 如何設定 index.html

1. 打開 `index.html`。
2. 找到：

   ```js
   const SCRIPT_URL = "PLACEHOLDER_GOOGLE_APPS_SCRIPT_WEB_APP_URL";
   ```

3. 將 `PLACEHOLDER_GOOGLE_APPS_SCRIPT_WEB_APP_URL` 替換為 Google Apps Script Web App URL。

## 如何啟用 GitHub Pages

1. 進入 GitHub repository。
2. 點選 Settings。
3. 點選 Pages。
4. Source 選擇 Deploy from a branch。
5. Branch 選擇 main。
6. Folder 選擇 `/root` 或 `/`。
7. Save。
8. 等待 GitHub Pages 產生網址。

## 如何測試

1. 開啟 GitHub Pages 網站。
2. 填寫表單。
3. 送出。
4. 回到 Google Sheet 檢查是否新增一列資料。

## 注意事項

- GitHub Pages 是靜態網站，不能直接儲存表單資料，因此需透過 Google Apps Script 寫入 Google Sheet。
- Google Apps Script Web App URL 若重新部署，可能需要更新 `index.html` 的 `SCRIPT_URL`。
- 若欄位有變更，需同步調整 `index.html` 與 `apps-script.gs`。
- 表單涉及企業聯絡資訊與個資，請勿公開 Google Sheet 權限。
