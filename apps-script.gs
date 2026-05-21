const SHEET_NAME = "表單回應";

// 欄位標題會在工作表第一列自動建立，順序需與 appendRow 的資料順序一致。
const HEADERS = [
  "時間戳記",
  "公司名稱",
  "統一編號",
  "產業別",
  "公司人數",
  "聯絡人姓名",
  "職稱",
  "聯絡電話",
  "Email",
  "公司所在地",
  "優先導入AI部門",
  "其他欲導入部門",
  "AI使用經驗",
  "目前使用中的AI工具",
  "主要想改善的工作項目",
  "目前最耗時的工作",
  "是否有重複性高任務",
  "希望AI協助內容",
  "是否已有明確SOP",
  "工作流程紀錄位置",
  "是否已有可整理資料",
  "資料是否分散不同系統",
  "希望優先整理資料類型",
  "目前主要管理痛點",
  "最想優先解決的前三項問題",
  "痛點對公司造成的影響",
  "是否希望顧問診斷",
  "目前最需要的服務",
  "預計導入時程",
  "是否已有預算規劃",
  "希望合作方式",
  "補充說明",
  "是否同意個資使用",
  "來源頁面",
  "前端送出時間"
];

function doGet(e) {
  return createJsonResponse({
    status: "ok",
    message: "AI Management Empowerment Center form endpoint is running."
  });
}

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    const sheet = getOrCreateResponseSheet();

    ensureHeaderRow(sheet);

    sheet.appendRow([
      new Date(),
      valueOf(payload, "company_name"),
      valueOf(payload, "tax_id"),
      valueOf(payload, "industry"),
      valueOf(payload, "company_size"),
      valueOf(payload, "contact_name"),
      valueOf(payload, "job_title"),
      valueOf(payload, "phone"),
      valueOf(payload, "email"),
      valueOf(payload, "location"),
      valueOf(payload, "priority_departments"),
      valueOf(payload, "other_departments"),
      valueOf(payload, "ai_experience"),
      valueOf(payload, "current_ai_tools"),
      valueOf(payload, "work_items"),
      valueOf(payload, "time_consuming_tasks"),
      valueOf(payload, "has_repetitive_tasks"),
      valueOf(payload, "ai_assistance_needs"),
      valueOf(payload, "has_sop"),
      valueOf(payload, "workflow_records"),
      valueOf(payload, "has_existing_documents"),
      valueOf(payload, "data_scattered"),
      valueOf(payload, "priority_data_types"),
      valueOf(payload, "pain_points"),
      valueOf(payload, "top_three_issues"),
      valueOf(payload, "business_impacts"),
      valueOf(payload, "consultant_diagnosis"),
      valueOf(payload, "needed_service"),
      valueOf(payload, "implementation_timeline"),
      valueOf(payload, "budget_status"),
      valueOf(payload, "cooperation_types"),
      valueOf(payload, "additional_notes"),
      valueOf(payload, "privacy_agreement"),
      valueOf(payload, "source_page"),
      valueOf(payload, "submitted_at_client")
    ]);

    return createJsonResponse({
      status: "success",
      message: "資料已成功寫入 Google Sheet"
    });
  } catch (error) {
    return createJsonResponse({
      status: "error",
      message: error.toString()
    });
  }
}

// 取得目前 Apps Script 綁定的試算表，並確保有指定名稱的工作表。
function getOrCreateResponseSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }

  return sheet;
}

// 若第一列尚未有欄位標題，便自動寫入欄位名稱。
function ensureHeaderRow(sheet) {
  const firstCell = sheet.getRange(1, 1).getValue();

  if (!firstCell) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    sheet.setFrozenRows(1);
  }
}

// 避免缺漏欄位造成錯誤，沒有資料時統一寫入空字串。
function valueOf(payload, key) {
  return payload && payload[key] !== undefined && payload[key] !== null ? payload[key] : "";
}

function createJsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
