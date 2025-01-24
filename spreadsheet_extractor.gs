/* 
version: 2025.01.24
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
  let condition = parameters.condition;
  
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
  let addedCount = 0;
  
  // if nothing new, then dont do anything.
  if (workingsheet.getLastRow() >= startRow)
  {
    // condition
    if (condition != null)
    {Logger.log("Condition need to be '"+condition.answer+"' on the "+condition.column+". column.")} 
    else {Logger.log("No condition needs to check")}

    let row = startRow;
    let conditionGivenAnswer, checkboxCell, isDone,emailCell,email;
    do
    {
      //checkbox check
      checkboxCell = workingsheet.getRange(row,checkboxColumn);
      Logger.log("checkbox Selection: %s",checkboxCell.getA1Notation());
      isDone = checkboxCell.getValue();
      Logger.log("Checkbox is %s",isDone);
      //if the row is already proccessed, theres nothing to do. Jump next!
      if (isDone != true)
      {
          //get condition answer
        if (condition != null)
        {
          conditionGivenAnswer = workingsheet.getRange(row,condition.column).getValue();
          Logger.log("ConditionAnswer: "+conditionGivenAnswer);
        }

        //if the checkbox is undifined, nonexistent, or just false -> it's our turn to precced.
        if (condition == null ||  condition.answer == conditionGivenAnswer)
        {
          //email check
          emailCell = workingsheet.getRange(row,emailColumn);
          Logger.log("email Selection: %s",emailCell.getA1Notation());
          email = emailCell.getValue();
          Logger.log("Email is: %s",email);

          var response = addUserToGoogleGroup(groupEmailToAdd, email);
          Logger.log("ResponseCode: "+response);

          // need to leave a mark if succeded
          if (response == 200) 
          {
            checkboxCell.setValue(true);
            addedCount++;
          }
        }
      }
      row++;
    } while (row <= workingsheet.getLastRow()) //if we reached the end, so theres nothing left in cells, then stop.

    // write back our counter to know where we left the game.
    startRowCell.setValue(row);
    console.log('Added '+addedCount+' email to the '+groupEmailToAdd+' group.');
  }
  else
  {
    Logger.log("No new input");
  }
  return addedCount;
}