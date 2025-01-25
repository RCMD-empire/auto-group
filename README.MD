Auto-Group script

A script for Google Groups to automatise the membership to the specific group. Its good if you have some kind of membership, and need a Google Form to answer some qquestions, then automatically add them to the group.

Tech. Background
- written in Google AppScript
- Need a G. Form for input
- linked with G. Spreadsheet
- the script must tied to the Spreadsheet
- configure the Spreadsheet correctly (check the template code and the template excel file)
- not working with free groups (@googlegroups.com)
- need a Google Workspace Group.
- need "Group Admin" group priviledges

Use-cases (script modify security matter)
- Get an admin user
- have all script-abled document on the admin's own Drive
- share only View access to the Nessesary users

Recommendation
- If you use this multiple times, then
- Put the base code to an independent Script Project,
- link it to each Spreadsheet's srcipts editor as a library,
- in there, just use the orifinal script template, configure it,
- and call the Base code's function.
- if needed, get a [Form-Clearer](https://github.com/RCMD-empire/clear-by-form) to maintain the data and not risking the script modification.
- Test it before using in 'production'
- Deploy the scripts for do not get it modified accidently.

Project OAuth Scopes
- See, edit, create, and delete all your Google Sheets spreadsheets	https://www.googleapis.com/auth/spreadsheets
- Connect to an external service	https://www.googleapis.com/auth/script.external_request
- Read, compose, send, and permanently delete all your email from Gmail	https://mail.google.com/
- View and manage the provisioning of groups on your domain	https://www.googleapis.com/auth/admin.directory.group