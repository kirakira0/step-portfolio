/**
 * Changes the number of comments visible on the page
 */
const numberOfCommentsForm = document.querySelector("#number-comments"); 
numberOfCommentsForm.addEventListener('change', e => {
  const commentsContainer = document.getElementById('comment-display');
  commentsContainer.innerHTML = ""; 
  var limit = numberOfCommentsForm.value; 
  fetch(`/list-comments?limit=${limit}`).then(response => response.json()).then((comments) => {
    comments.forEach((comment) => {
      displayComment(comment); 
    }) 
  }).catch(err => {
      alert("Error in network call."); 
  })
})

function postComment() {
	fetch('/list-comments').then(response => response.json()).then((comments) => {
    comments.forEach((comment) => {
      displayComment(comment); 
    }) 
  }).catch(err => {
      alert("Error in network call."); 
  })
}

/**
 * Adds a comment element to the DOM
 */
function displayComment(comment) {
	const commentsContainer = document.getElementById('comment-display');
  // create the comment element
	const commentElement = document.createElement('div');
  // converts timestamp to readable string
  const date = new Date(comment.timestamp).toDateString();
  const time = millisToTime(comment.timestamp);
  commentElement.innerText = `${comment.username} [${time} ${date}]\n${comment.content}`; 
	commentsContainer.appendChild(commentElement);
  // create the delete button 
	const deleteButtonElement = document.createElement('button');
  deleteButtonElement.innerText = 'Delete';
  deleteButtonElement.addEventListener('click', () => {
	  deleteComment(comment); // deletes the comment from datastore 
    commentElement.remove(); // remove the comment from the DOM.
  });
  commentElement.appendChild(deleteButtonElement);
}

/**
 * Sends a POST request to the /delete-comment-data URL 
 */
function deleteComment(comment) {
  const params = new URLSearchParams(); 
  params.append('id', comment.id);
  fetch('/delete-comment', {method: 'POST', body: params}).catch(err => {
      alert("Error in network call."); 
  })
}

/**
 * Converts timestamp in milliseconds to a readable string value
 */
function millisToTime(timestamp) {
  seconds = Math.floor((timestamp / 1000) % 60),
  minutes = Math.floor((timestamp / (1000 * 60)) % 60),
  hours = Math.floor((timestamp / (1000 * 60 * 60)) % 24);
  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;
  return hours + ":" + minutes + ":" + seconds;
}