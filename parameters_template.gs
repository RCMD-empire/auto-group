// This is the template for this script to use.
// this 'parameter' object need to give to the spreadsheet extractor
/* 
version: 2026.10.13.
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
//optional fields: delete if you dont need
condition: 
  {
    column: 4,
    answer: "yes"
  },
domain_exclusion: "exc.com",
verdictColumn: 5,
email_groupfeedback_config:
  {
    replyTo: "testuser+mlhandlers@example.com",
    email_templates: 
    // templates: welcome, domainExc, alreadyMember 
    // each consist of {subject, body, htmlbody}
    {
      welcome: getWelcomeEmailTemplate(),
      alreadyMember: getAlreadyMemberEmailTemplate(),
      domainExc: getDomainExcEmailTemplate()
    }
  }
}


function useAutoGroup() {

var addedCounts = spreadsheetExtractor(parameters);
//ping("recepient@example.com", parameters);
}