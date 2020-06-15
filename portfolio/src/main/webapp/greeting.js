/**
 * Uses arrow functions to fetch and display greeting from the data servlet.
 */
function getFirstGreeting() {
  fetch('/data').then(response => response.json()).then((greetings) => {
    // greetings is an object, not a string, so we have to reference its fields to create HTML content
    const greetingsListElement = document.getElementById('greeting');
    greetingsListElement.innerHTML = greetings[0];
  }); 

}