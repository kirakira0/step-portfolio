/**
 * Changes welcome text and login button text based on user login status
 */
async function greetAccordingToLoginStatus() {
  try {
    const response = await fetch('/check-login-status');
    const user = await response.json();

    const welcomeText = document.getElementById('welcome-text'); 
    const loginButton = document.getElementById('login-button'); 

    if (user.map.loggedIn) {
      const emailAddress = user.map.email; 
      const name = emailAddress.substring(0, emailAddress.indexOf('@')); 
      document.getElementById('welcome-text').innerText = `Hello ${name}! ` + 
        "Now that you're logged in, feel free to leave a comment."; 
      loginButton.innerText = "Log out"; 
    } else {
      document.getElementById('welcome-text').innerText = "Welcome! Please log " +
        "in to leave a comment."; 
      loginButton.innerText = "Log in"; 
    }
  } catch {
    alert('Failed to fetch login status.'); 
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