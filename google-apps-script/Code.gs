// Only needed if you create the script at script.google.com instead of
// Extensions → Apps Script inside the spreadsheet.
// Paste the long ID from the Sheet URL:
// https://docs.google.com/spreadsheets/d/THIS_PART/edit
var SPREADSHEET_ID = "";

function getSpreadsheet() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  if (!spreadsheet && SPREADSHEET_ID) {
    spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  }
  if (!spreadsheet) {
    throw new Error(
      "Open this from the spreadsheet (Extensions → Apps Script), or set SPREADSHEET_ID."
    );
  }
  return spreadsheet;
}

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var spreadsheet = getSpreadsheet();
    var sheet = spreadsheet.getSheetByName("Subscribers");
    if (!sheet) {
      sheet = spreadsheet.insertSheet("Subscribers");
      sheet.appendRow([
        "Timestamp",
        "First name",
        "Last name",
        "Email",
        "List",
      ]);
    }
    sheet.appendRow([
      new Date(),
      data.firstName || "",
      data.lastName || "",
      data.email || "",
      data.list || "",
    ]);
    return ContentService.createTextOutput(
      JSON.stringify({ ok: true })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: String(error) })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
