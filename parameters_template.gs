// This is the template for this script to use.
// this 'parameter' object need to give to the spreadsheet extractor
/* 
version: 2025.01.22
https://github.com/RCMD-empire/auto-group
@rcmd
*/
const parameters = new Object();
parameters.emailColumn = 2;
parameters.checkboxColumn = 3;
parameters.settingsheetName= 'Autogroup script';
parameters.workingsheetName= 'Form answers';
parameters.startRowCellName = 'B1';
parameters.groupEmailToAdd = "test@obuda.esn.hu";

function useSpreadsheetExtractor() {

spreadsheetExtractor(parameters);
}