const SUBGENRES = ['Body Horror', 'Slasher', 'Monster', 'Paranormal', 'Psychological Thriller'];
const optionsContainer = document.getElementById('options-container');
google.charts.load('current', {'packages':['corechart']});

/*
 * Creates and adds individual option elements to the DOM
 */ 
function createSurvey() {
  for (const optionName of SUBGENRES) {
    let option = document.createElement('input');
    option.setAttribute('type', 'radio'); 
    option.setAttribute('name', 'option');
    option.setAttribute('value', optionName);
    let optionLabel = document.createElement('label');
    optionLabel.setAttribute('for', optionName);
    optionLabel.textContent = optionName; 
    optionsContainer.appendChild(option); 
    optionsContainer.appendChild(optionLabel); 
  }
}

/*
 * Get the user's reponse to the survey
 */  
function getUserResponse() {
  let options = document.getElementsByName('option'); 
  for (const option of options) {
    if (option.checked) {
      addVote(option.value);
      return;  
    }
  }
}

/*
 * Add the user's vote to the database 
 */ 
function addVote(option) {
  const params = new URLSearchParams(); 
  params.append('subgenre', option); 
  fetch('/survey', {
    method: 'POST',
    body: params
  }).catch(err => {
    alert('There was an error trying to add your vote. Try checking your internet connection and refreshing the page.'); 
  });
  drawChart(); 
}

/*
 * Fetches subgenre data and uses it to create a chart. 
 */
async function drawChart() {
  try {
    const response = await fetch('/survey');
    const surveyResponse = await response.json(); 
    const data = new google.visualization.DataTable();
    data.addColumn('string', 'Subgenre');
    data.addColumn('number', 'Votes'); 
    Object.keys(surveyResponse).forEach((subgenre) => {
      data.addRow([subgenre, surveyResponse[subgenre]]);
    });
    let options = { 
      title: 'Favorite Horror Subgenre',
      width: 600,
      height: 450,
      colors: ['#c74343', '#92323c', '#515076', '#39354f', '#aea9cc', '#aea9cc']
    };
    let chart = new google.visualization.PieChart(document.getElementById('piechart'));
    chart.draw(data, options);
  } catch {
    alert('There was an error trying to draw the results chart. Please check your internet connection and try refreshing the page.'); 
  }
}

createSurvey();
drawChart();