/* 
version: 2026.10.13
https://github.com/RCMD-empire/auto-group
@rcmd
*/

// Verdict strings
const verdicts = {
  added: "ADDED",
  already_member: "ALREADY MEMBER",
  domain_excl_triggered: "DOMAIN EXCLUDED",
  email_sent: "EMAILED"
}

function addUserToGoogleGroup(groupEmail, userEmail)
{
  try {
  const res = GroupGate.addToGroup(groupEmail,userEmail);
  return res;
  } catch (e)
  {
    return e;
  }
}

function spreadsheetExtractor(parameters) 
{
  let emailColumn = parameters.emailColumn;
  let checkboxColumn = parameters.checkboxColumn;
  let settingsheetName= parameters.settingsheetName;
  let workingsheetName= parameters.workingsheetName;
  let startRowCellName = parameters.startRowCellName;
  let groupEmailToAdd = parameters.groupEmailToAdd;
  let condition = parameters.condition;
  let domain_exclusion = parameters.domain_exclusion;
  let verdictColumn = parameters.verdictColumn;
  let email_groupfeedback_config = parameters.email_groupfeedback_config;
  
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

        //if the checkbox is undifined, nonexistent, or just false -> it's our turn to procced.
        if (condition == null ||  condition.answer == conditionGivenAnswer)
        {
          //email check
          emailCell = workingsheet.getRange(row,emailColumn);
          Logger.log("email Selection: %s",emailCell.getA1Notation());
          email = emailCell.getValue();
          Logger.log("Email is: %s",email);

          // get verdict-cell
          let verdictCell;
          if (verdictColumn)
          {
            verdictCell= workingsheet.getRange(row,verdictColumn);
            Logger.log("Verdict cell selection: "+verdictCell.getA1Notation());
          }

          // email address domain exclusion (if null, then ignore)
          let isDomainExcl = domainExcl(domain_exclusion, email)
          if (!isDomainExcl)
          // passed domain exclusion as well
          {
            //Group API func
            var response = addUserToGoogleGroup(groupEmailToAdd, email);
            Logger.log("ResponseCode: "+response.status_code);
            Logger.log("DEBUG: "+ response)

            // need to leave a mark if succeded
            if (response.status_code == 200) 
            {
              Logger.log('Added '+email+' email to the '+groupEmailToAdd+' group.')
              checkboxCell.setValue(true);
              setVerdict(verdictCell, verdicts.added);
              sendEmail(
              email_groupfeedback_config,
              email,
              email_groupfeedback_config.email_templates.welcome,
              verdictCell);
              addedCount++;
            } else if (response.status_code == 409) // already member?
            {
              Logger.log('Already member!');
              //TODO: SET STATUS, SEND EMAIL
              setVerdict(verdictCell, verdicts.already_member);
              sendEmail(
              email_groupfeedback_config,
              email,
              email_groupfeedback_config.email_templates.alreadyMember,
              verdictCell);
            }
          }
          else
            //domain exclusion, (already logged)
          {
            setVerdict(verdictCell,verdicts.domain_excl_triggered);
            sendEmail(
              email_groupfeedback_config,
              email,
              email_groupfeedback_config.email_templates.domainExc,
              verdictCell)
          }
          
        }
	    }
      row++;
    } while (row <= workingsheet.getLastRow()) //if we reached the end, so theres nothing left in cells, then stop.

    // write back our counter to know where we left the game.
    startRowCell.setValue(row);
    console.log('Added '+addedCount+' email(s) to the '+groupEmailToAdd+' group.');
  }
  else
  {
    Logger.log("No new input");
  }
  return addedCount;
}

// Condition to add to the group. Returns 1 if the answer matches the condition or null the whole. Returns 0 if it enabled but does not match.
function checkAnswerCondition(condition,conditionGivenAnswer)
{
  if (condition != null)
  {
    Logger.log("ConditionAnswer: "+conditionGivenAnswer);
    if (condition.answer == conditionGivenAnswer)
    {
      Logger.log('Condition met!')
      return 1
    }
    else
    {
      Logger.log('Condition failed!')
      return 0
    }
  }
  else
  {
    Logger.log('Condition-answers are ignored!')
    return 1
  }
}

// domain excl return 1 if triggered, and return 0 if not triggered the exclusion domain. Ignore returns 0.
function domainExcl(domain_exclusion,email)
{
  if (domain_exclusion)
  {
    let domain = email.toString().split('@')[1];
    if (domain.includes(domain_exclusion))
    { 
      Logger.log('Domain excl triggered for: ',domain)
      return true
    }
    else 
    {
      Logger.log('Domain excl passed!')
      return false
    }
  
  } else
  {
    Logger.log('Domain exclusion ignored')
    return false
  }
}

function setVerdict(verdictCell, verdict_str)
{
  if (verdictCell)
  {
    verdictCell.setValue(verdict_str);
    Logger.log("Verdict recorded in the cell!")
  } else
  {
    Logger.log("Verdict recording ignored!")
  }
  
}


function sendEmail(email_groupfeedback_config, recepient, email_template, verdictCell) {
  Logger.log("DEBUG TEXT  "+ JSON.stringify(email_template))
  if (email_groupfeedback_config != null)
  {
    GmailApp.createDraft(recepient, email_template.subject, email_template.body,{ replyTo: email_groupfeedback_config.replyTo, htmlBody: email_template.htmlbody} )
    Logger.log('Email feedback sent to: '+recepient)
    if (!verdictCell)
    {
      verdictCell.setValue(verdictCell.getValue+", "+verdicts.email_sent)
    }
  } else 
  {
    Logger.log('Email feedback ignored')
  }
}