// This is the template for this script to use.
// this 'parameter' object need to give to the spreadsheet extractor
/* 
version: 2025.01.23
https://github.com/RCMD-empire/auto-group
@rcmd
*/
const parameters = {
emailColumn: 2,
checkboxColumn : 3,
settingsheetName: 'Autogroup script',
workingsheetName: 'Form answers',
startRowCellName : 'B1',
groupEmailToAdd : "test@example.com",
//optional: delete if you dont need
condition: 
  {
    column: 4,
    answer: "yes"
  }
}

function useAutoGroup() {

var addedCounts = spreadsheetExtractor(parameters);
//ping("recepient@example.com", parameters);
}