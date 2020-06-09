/**
 * Shows feedback on login status
 */
async function showCommentFeedback() {
  const response = await fetch('/create-new-comment');
  const loginStatus = await response.text();
  document.getElementById('login-feedback').innerText = loginStatus;
}

/**
 * Changes button text to reflect whether user should log in or out
 */
async function updateLoginStatusOnButton() {
  const response = await fetch('/check-login-status');
  const loginStatus = await response.text();
  // const loginButton = document.getElementById('login-button');
  document.getElementById('login-button').innerText = loginStatus;
}

/**
 * Redirect the user to the login page 
 */
async function redirectToLoginPage() {
  const response = await fetch('/login');
  const loginStatus = await response.text();
  window.location.replace("/login");
}

