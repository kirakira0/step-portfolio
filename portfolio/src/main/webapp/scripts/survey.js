google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

const subgenres = ['Body Horror', 'Slasher', 'Monster', 'Paranormal', 'Psychological Thriller'];

/*
 * Fetches subgenre data and uses it to create a chart. 
 */
async function drawChart() {
  const response = await fetch('/survey');
  const surveyResponse = await response.json(); 
  const data = new google.visualization.DataTable();
  data.addColumn('string', 'Subgenre');
  data.addColumn('number', 'Votes'); 
  Object.keys(surveyResponse).forEach((subgenre) => {
    data.addRow([subgenre, surveyResponse[subgenre]]);
  });

  let options = { title: 'Favorite Horror Subgenre' };
  let chart = new google.visualization.PieChart(document.getElementById('piechart'));
  chart.draw(data, options);
}


// function drawChart() {

//   let options = { title: 'Favorite Horror Subgenre' };
//   let chart = new google.visualization.PieChart(document.getElementById('piechart'));
//   chart.draw(data, options);
// }


/** Fetches color data and uses it to create a chart. */
function DRAW() {
  fetch('/color-data').then(response => response.json())
  .then((colorVotes) => {
    const data = new google.visualization.DataTable();
    data.addColumn('string', 'Color');
    data.addColumn('number', 'Votes');
    Object.keys(colorVotes).forEach((color) => {
      data.addRow([color, colorVotes[color]]);
    });

    const options = {
      'title': 'Favorite Colors',
      'width':600,
      'height':500
    };

    const chart = new google.visualization.ColumnChart(
        document.getElementById('chart-container'));
    chart.draw(data, options);
  });
}


const optionsContainer = document.getElementById('options-container');
createSurvey();

/*
 * Creates and adds individual option elements to the DOM
 */ 
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
  option.setAttribute('name', 'option');
  option.setAttribute('value', optionName);
  let optionLabel = document.createElement('label');
  optionLabel.setAttribute('for', optionName);
  optionLabel.textContent = optionName; 
  optionsContainer.appendChild(option); 
  optionsContainer.appendChild(optionLabel); 
}

//HANDLE BUTTON CLICK 
function CLICK() {
  let options = document.getElementsByName('option'); 
  for (const option of options) {
    if (option.checked) {
      addVote(option.value); 
    }
  }
}

function addVote(option) {
  const params = new URLSearchParams(); 
  params.append('subgenre', option); 
  console.log('Params:' + params); 
  fetch('/survey', {
    method: 'POST',
    body: params
  })
  drawChart(); 
}