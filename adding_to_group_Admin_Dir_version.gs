/* 
NOT IN USE
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
