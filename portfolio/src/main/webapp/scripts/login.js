/**
 * Shows feedback on login status
 */
async function showCommentFeedback() {
  try {
    const response = await fetch('/check-login-status');
    const user = await response.json();
    if (user.map.loggedIn) {
      const emailAddress = user.map.email; 
      const name = emailAddress.substring(0, emailAddress.indexOf('@')); 
      document.getElementById('login-feedback').innerText = `Hello ${name}! Now that you're logged in, feel free to leave a comment.`; 
    } else {
      document.getElementById('login-feedback').innerText = 'Please log in to leave a comment.'; 
    }
  } catch {
    alert('Failed to fetch login status.'); 
  }

}

/**
 * Changes button text to reflect whether user should log in or out
 */
async function updateLoginStatusOnButton() {
  const loginButton = document.getElementById('login-button'); 
  try {
    const response = await fetch('/check-login-status');
    const user = await response.json(); 
    if (user.map.loggedIn) {
      loginButton.innerText = "Log out";
    } else {
      loginButton.innerText = "Log in";
    }
  } catch {
    loginButton.innerText = "Log in"; 
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