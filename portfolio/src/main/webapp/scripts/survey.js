google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

const subgenres = ['Body Horror', 'Slasher', 'Monster', 'Paranormal', 'Psychological Thriller']; 

function drawChart() {
  let data = google.visualization.arrayToDataTable([
    ['Favorite Subgenre', 'Survey Participants'],
    [subgenres[0], 1],
    [subgenres[1], 2],
    [subgenres[2], 2],
    [subgenres[3], 6],
    [subgenres[4], 7]
  ]);
  let options = { title: 'Favorite Horror Subgenre' };
  let chart = new google.visualization.PieChart(document.getElementById('piechart'));
  chart.draw(data, options);
}

const optionsContainer = document.getElementById('options-container');

createSurvey(); 

function createSurvey() {
  for (const option of subgenres) {
    createSurveyOption(option); 
  }
}

/*
 * Creates and adds individual option elements to the DOM
 */ 
function createSurveyOption(optionName) {
  let option = document.createElement('input');
  option.setAttribute('type', 'radio'); 
  option.setAttribute('name', optionName.toLowerCase());
  option.setAttribute('value', 'slasher');
  let optionLabel = document.createElement('label');
  optionLabel.setAttribute('for', optionName.toLowerCase());
  optionLabel.textContent = optionName; 
  optionsContainer.appendChild(option); 
  optionsContainer.appendChild(optionLabel); 
}