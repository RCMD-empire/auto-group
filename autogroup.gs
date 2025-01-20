function onNewFormResponse() {
  let emailColumn = 2;
  let checkboxColumn = 3;
  

  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheets = spreadsheet.getSheets();

  for (const sheet of sheets) 
  { console.log('name: %s, ID: %s',sheet.getName(),sheet.getSheetId()) }
  
  let settingsSheet = spreadsheet.getSheetByName('Autogroup script');
  let workingsheet= spreadsheet.getSheetByName('Form answers');
  if (!workingsheet) {
    throw new Error('Sheet "Form answers" not found!');
  }
  if (!settingsSheet) {
    throw new Error('Sheet "Autogroup script" not found!');
  }
  let startRowCell = settingsSheet.getRange('B1');
  let startRow = startRowCell.getValue();
  Logger.log('settingsSheet startRow: %s',startRow);

  
  for (const sheet of sheets) 
  { console.log('name: %s, ID: %s',sheet.getName(),sheet.getSheetId()) }
  let sheetselection = SpreadsheetApp.setActiveSheet(spreadsheet.getSheetById(workingsheet.getSheetId()));
  
  var checkboxCell = sheetselection.getRange(startRow,checkboxColumn);
  do
  {
    selection = sheetselection.setActiveSelection(checkboxCell);
    Logger.log("checkbox Selection: %s",selection.getA1Notation());
    var isDone = selection.getValue();
    Logger.log("Checkbox is %s",isDone);
    if (isDone != true)
    {
      emailCell = sheetselection.getRange(selection.getRow(),emailColumn);
      selection = sheetselection.setActiveSelection(emailCell);
      Logger.log("email Selection: %s",selection.getA1Notation());
      var email = selection.getValue();
    Logger.log("Email is: %s",email);
    }
    if (email != "")
    {
      checkboxCell = sheetselection.getRange(selection.getRow() +1, checkboxColumn);
      
    }
    
  } while (isDone != "" || email != "")
  startRowCell.setValue(checkboxCell.getRow());
  
}