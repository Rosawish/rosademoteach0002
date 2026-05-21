const SPREADSHEET_ID = "1OyTnDIlLJ04xHGhIqMqCMUS2F9YTG6uirm1DTz_4w";
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
    sheet.appendRow(buildResponseRow(payload));

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

// 可在 Apps Script 編輯器中手動執行，用來確認 Sheet ID、授權與寫入權限是否正常。
function testWriteToSheet() {
  const sheet = getOrCreateResponseSheet();
  const payload = {
    company_name: "測試公司",
    tax_id: "00000000",
    industry: "其他",
    company_size: "1–10人",
    contact_name: "測試聯絡人",
    job_title: "測試職稱",
    phone: "0912345678",
    email: "test@example.com",
    location: "測試地點",
    priority_departments: "資訊部門",
    other_departments: "",
    ai_experience: "個人零星使用",
    current_ai_tools: "測試工具",
    work_items: "資料整理與報表產出",
    time_consuming_tasks: "測試最耗時工作",
    has_repetitive_tasks: "是",
    ai_assistance_needs: "自動整理資料",
    has_sop: "有部分SOP",
    workflow_records: "Google Sheet",
    has_existing_documents: "有部分資料",
    data_scattered: "不確定",
    priority_data_types: "SOP文件",
    pain_points: "資料分散，查找不易",
    top_three_issues: "測試問題一、測試問題二、測試問題三",
    business_impacts: "工作效率下降",
    consultant_diagnosis: "可以先提供建議方案",
    needed_service: "尚不確定，需要顧問協助判斷",
    implementation_timeline: "尚在評估",
    budget_status: "需協助評估",
    cooperation_types: "顧問診斷",
    additional_notes: "這是 testWriteToSheet() 產生的測試資料。",
    privacy_agreement: "同意",
    source_page: "Apps Script testWriteToSheet",
    submitted_at_client: new Date().toISOString()
  };

  ensureHeaderRow(sheet);
  sheet.appendRow(buildResponseRow(payload));
}

// 依照 Google Sheet 欄位順序整理每一列資料。
function buildResponseRow(payload) {
  return [
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
  ];
}

// 取得指定的 Google Sheet，並確保有指定名稱的工作表。
function getOrCreateResponseSheet() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
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
