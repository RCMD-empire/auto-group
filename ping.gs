/* 
version: 2025.01.23
https://github.com/RCMD-empire/clear-by-form
@rcmd
*/
function ping(submitteremail, parameters) {
	//init
	const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
	const workingsheet= spreadsheet.getSheetByName(parameters.workingsheetName);
	//email
  let recipient = submitteremail;
  let subject = "Ping - auto-group Script";
  let emailBody = `
    <h2>Pinged successfully!</h2>
    <p>Auto-Grouping in "${workingsheet.getName()}" sheet, adding emails to "${parameters.groupEmailToAdd}" group.</p>
    <p> Localated in <a href="${spreadsheet.getUrl()}" target="_blank">${spreadsheet.getName()}</a> Spreadsheet.</p>
    <p>by "Auto-Group" Script<br>@rcmd</p>
  `;
  // Send the email
  GmailApp.sendEmail(recipient, subject, "", { htmlBody: emailBody });
  
  console.log("Ping email sent successfully to "+submitteremail);
}
