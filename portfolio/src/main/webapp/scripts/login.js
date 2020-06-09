/**
 * Shows feedback on login status
 */
async function showCommentFeedback() {
  try {
    const response = await fetch('/create-new-comment');
    const loginStatus = await response.text();
    document.getElementById('login-feedback').innerText = loginStatus;
  } catch {
    alert('Failed to fetch login status.'); 
  }

}

/**
 * Changes button text to reflect whether user should log in or out
 */
async function updateLoginStatusOnButton() {
  try {
    const response = await fetch('/check-login-status');
    const loginStatus = await response.text();
    document.getElementById('login-button').innerText = loginStatus;
  } catch {
    document.getElementById('login-button').innerText = "Log in/out"; 
  }
}

/**
 * Redirect the user to the login page 
 */
async function redirectToLoginPage() {
  try {
    const response = await fetch('/login');
    const loginStatus = await response.text();
    window.location.replace("/login");
  } catch {
    alert('Failed to load login page.'); 
  }
}