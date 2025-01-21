Auto-Group script
- written in Google AppScript
- Need a G. Form for input
- linked with G. Spreadsheet
- the script must tied to the Spreadsheet
- configure the Spreadsheet correctly (check the template code and the template excel file)

Tech. Background
- not working with free groups (@googlegroups.com)
- need a Google Workspace Group.
- need "Group Admin" group priviledges

Use-cases (script modify security matter)
- Get an admin user
- have all script-abled document on the admin's own Drive
- share only View access to the Nessesary users
- if needed, get a Form-Clearer to maintain the data and not risking the script modification.
- Test it before using in 'production'

Project OAuth Scopes
- See, edit, create, and delete all your Google Sheets spreadsheets	https://www.googleapis.com/auth/spreadsheets
- Connect to an external service	https://www.googleapis.com/auth/script.external_request
- View and manage the provisioning of users on your domain	https://www.googleapis.com/auth/admin.directory.user
- Allow this application to run when you are not present	https://www.googleapis.com/auth/script.scriptapp
- View and manage the provisioning of groups on your domain	https://www.googleapis.com/auth/admin.directory.group