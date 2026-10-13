/*
GroupGate Service (with custom library) version
GroupGate thin-client made by Áron Falus
version: 2026.10.13.
Backend project repo: https://github.com/ESN-Hungary/group-gate
*/
function invokeGroupGateService(groupEmail,userEmail) {
  try {
  const res = GroupGate.addToGroup(groupEmail,userEmail);
  return res;
  } catch (e)
  {
    return e;
  }
}
// ---------------------------------------------------------------------------
/* 
Admin Directory (API query) version
version: 2025.01.22
https://github.com/RCMD-empire/auto-group
@rcmd

Code 409: member already exist
COde 403: no Admin SDK
Code 200: successfully added
*/
function addUserToGoogleGroup_viaQuery(groupEmail, userEmail) {
  //groupEmail = "test@yourdomain.com"; // Replace with your group's email address
  //userEmail = "teszt@example.com"; // Replace with the user's email to add
  
  const url = `https://admin.googleapis.com/admin/directory/v1/groups/${groupEmail}/members`;
  
  const payload = {
    email: userEmail,
    role: "MEMBER" // Possible roles: MEMBER, MANAGER, OWNER
  };
  
  const options = {
    method: "post",
    contentType: "application/json",
    headers: {
      Authorization: `Bearer ${ScriptApp.getOAuthToken()}`
    },
    payload: JSON.stringify(payload)
  };
  let responseCode;
  try {
    const response = UrlFetchApp.fetch(url, options);
    responseCode= response.getResponseCode();
    Logger.log(response.getResponseCode());
    Logger.log("User added successfully: " + response.getContentText());
    return response.getResponseCode();
  } catch (e) {
    Logger.log("Failed to add user: " + e.message);
    return -1
  }
}
// ---------------------------------------------------------------------------

/* 
Admin Directory (library) version
version: 2025.01.22
https://github.com/RCMD-empire/auto-group
@rcmd
*/
function addUserToGoogleGroup_viaLibrary(groupEmail, userEmail) {
  //groupEmail = "test@yourdomain.com"; // Replace with your group's email address
  //userEmail = "teszt@example.com"; // Replace with the user's email to add

  // Add user to the group
  AdminDirectory.Members.insert({
    email: userEmail,
    role: "MEMBER" // You can also use "OWNER" or "MANAGER"
  }, groupEmail);

  Logger.log(`User ${userEmail} has been added to the group ${groupEmail}`);
}
