/**
 * Uses arrow functions to fetch and display greeting from the data servlet.
 */
function getRandomGreeting() {
  fetch('/data').then(response => response.text()).then((quote) => {
    document.getElementById('greeting').innerText = quote;
  });
}