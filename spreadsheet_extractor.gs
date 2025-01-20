function spreadsheetExtractor(parameters) {
  let emailColumn = parameters.emailColumn;
  let checkboxColumn = parameters.checkboxColumn;
  let settingsheetName= parameters.settingsheetName;
  let workingsheetName= parameters.workingsheetName;
  let startRowCellName = parameters.startRowCellName;
  let groupEmailToAdd = parameters.groupEmailToAdd;
  

  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheets = spreadsheet.getSheets();

  for (const sheet of sheets) 
  { console.log('name: %s, ID: %s',sheet.getName(),sheet.getSheetId()) }
  
  let settingsSheet = spreadsheet.getSheetByName(settingsheetName);
  let workingsheet= spreadsheet.getSheetByName(workingsheetName);
  if (!workingsheet) {
    throw new Error('Sheet '+workingsheetName+' not found!');
  }
  if (!settingsSheet) {
    throw new Error('Sheet '+settingsheetName+' not found!');
  }
  let startRowCell = settingsSheet.getRange(startRowCellName);
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
      var response = addUserToGoogleGroup(groupEmailToAdd, email);
      Logger.log(response);

      if (response == 200) 
      {
        checkboxCell.setValue(true);
      }
      checkboxCell = sheetselection.getRange(selection.getRow() +1, checkboxColumn);
    }
    
    
  } while (isDone != "" || email != "")
  startRowCell.setValue(checkboxCell.getRow());
}