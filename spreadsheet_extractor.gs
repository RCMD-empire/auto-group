/* 
version: 2025.01.22
https://github.com/RCMD-empire/auto-group
@rcmd
*/
function spreadsheetExtractor(parameters) {
  let emailColumn = parameters.emailColumn;
  let checkboxColumn = parameters.checkboxColumn;
  let settingsheetName= parameters.settingsheetName;
  let workingsheetName= parameters.workingsheetName;
  let startRowCellName = parameters.startRowCellName;
  let groupEmailToAdd = parameters.groupEmailToAdd;
  
  // get the spreadsheet where from this function called
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheets = spreadsheet.getSheets();

  //Debug: sheets names
  for (const sheet of sheets) 
  { console.log('name: %s, ID: %s',sheet.getName(),sheet.getSheetId()) }
  
  //define the nessesary sheets
  let settingsSheet = spreadsheet.getSheetByName(settingsheetName);
  let workingsheet= spreadsheet.getSheetByName(workingsheetName);
  if (!workingsheet) {
    throw new Error('Sheet '+workingsheetName+' not found!');
  }
  if (!settingsSheet) {
    throw new Error('Sheet '+settingsheetName+' not found!');
  }

  //define the external counter
  let startRowCell = settingsSheet.getRange(startRowCellName);
  let startRow = startRowCell.getValue();
  Logger.log('settingsSheet startRow: %s',startRow);

  // setting the selection
  let sheetselection = SpreadsheetApp.setActiveSheet(spreadsheet.getSheetById(workingsheet.getSheetId()));
  
  // first define for the checkbox
  var checkboxCell = sheetselection.getRange(startRow,checkboxColumn);
  do
  {
    //checkbox check
    selection = sheetselection.setActiveSelection(checkboxCell);
    Logger.log("checkbox Selection: %s",selection.getA1Notation());
    var isDone = selection.getValue();
    Logger.log("Checkbox is %s",isDone);
    
    //if undifined, nonexistent, or just false -> it's our turn to precced.
    if (isDone != true)
    {
      //email check
      emailCell = sheetselection.getRange(selection.getRow(),emailColumn);
      selection = sheetselection.setActiveSelection(emailCell);
      Logger.log("email Selection: %s",selection.getA1Notation());
      var email = selection.getValue();
      Logger.log("Email is: %s",email);
    }

    //if the email is *something*, then we can try our magic
    if (email != "")
    {
      var response = addUserToGoogleGroup(groupEmailToAdd, email);
      Logger.log(response);

      // need to leave a mark if succeded
      if (response == 200) 
      {
        checkboxCell.setValue(true);
      }
      // if there was an email, then we did our best, so go on to the next.
      checkboxCell = sheetselection.getRange(selection.getRow() +1, checkboxColumn);
    }
    
    
  } while (isDone != "" || email != "") //if we reached the end, so theres nothing left in cells, then stop.

  // write back our counter to know where we left the game.
  startRowCell.setValue(checkboxCell.getRow());
}