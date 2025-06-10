/**************************************************************/
// Import all external constants & functions required
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-auth.js";
import { closeLightboxes } from "./ui.mjs";
export { fb_authCheck, fb_authCheck_then, fb_login, fb_logout }
/**************************************************************/

/**************************************************************/
// EXPORT FUNCTIONS
// List all the functions called by code or html outside of this module
/**************************************************************/

/**************************************************************/
// function fb_authCheck(manualCall)
// Written by Joshua Kessell-Haak, Term 1 2025
// Checks if there is a logged-in user.
// If there is a user, checks whether they are an admin or not via function fb_getadmin().
// Prints the logged-in user to the console if {variable manualCall} is true
/**************************************************************/

function fb_authCheck(manualCall) {
  const AUTH = getAuth();
    onAuthStateChanged(AUTH, (user) => {
        if (user) {
          if (manualCall) {
            console.log ("Current logged-in user: " + user.displayName)
          }
          window.user = user
        } else {
          if (manualCall) {
            console.log ("No current logged-in user.")
          }
          window.user = undefined
          window.location = "./index.html"
        }
    }, (error) => {
      console.warn("AUTHENTICATION CHECK ERROR: " + error.code + " - " + error.message)
    });
}

function fb_authCheck_then(nextFunc,manualCall) {
  const AUTH = getAuth();
    onAuthStateChanged(AUTH, (user) => {
        if (user) {
          if (manualCall) {
            console.log ("Current logged-in user: " + user.displayName)
          }
          window.user = user
        } else {
          if (manualCall) {
            console.log ("No current logged-in user.")
          }
          window.user = undefined
          window.location = "./index.html"
        }
        nextFunc(window.user)
    }, (error) => {
      console.warn("AUTHENTICATION CHECK ERROR: " + error.code + " - " + error.message)
      nextFunc("ERROR")
    });
}

/**************************************************************/
// function fb_login()
// Written by Joshua Kessell-Haak, Term 1 2025
// Logs the user into their account within the database via Google.
/**************************************************************/
function fb_login(google) {
  const AUTH = getAuth();
  if (google) {
    const PROVIDER = new GoogleAuthProvider();
    PROVIDER.setCustomParameters({
      prompt: 'select_account'
  });

  signInWithPopup(AUTH, PROVIDER).then((result) => {
    console.log("AUTHENTICATION SUCCESS - Logged in as user \"" + result.user.displayName + "\"")
    fb_authCheck(false);
    window.location = "./games.html"
  })
  .catch((error) => {
      console.warn("AUTHENTICATION ERROR: " + error.code + " - " + error.message)
      closeLightboxes();
      fb_authCheck(true);
  });
  }
};

/**************************************************************/
// function fb_logout()
// Written by Joshua Kessell-Haak, Term 1 2025
// Logs the user out.
/**************************************************************/
function fb_logout() {
  const AUTH = getAuth();
    signOut(AUTH).then(() => {
      window.user = undefined;
      console.log("Logout successful.");
      fb_authCheck(false);
      window.location = "./index.html"
    })
    .catch((error) => {
      console.warn("LOGOUT ERROR: " + error.message);
      fb_authCheck(true);
    });
}

window.fb_authCheck = fb_authCheck;
window.fb_login = fb_login;
window.fb_logout = fb_logout;

/**************************************************************/
// END OF CODE
/**************************************************************/