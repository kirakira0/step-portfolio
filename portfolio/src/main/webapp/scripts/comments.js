/**
 * Fetches and posts user comments 
 */
 function postComment() {
	fetch('/data').then(response => response.json()).then((comments) => {
    comments.forEach((comment) => {
      createComment(comment); 
    }); 
  }); 
}

function createComment(comment) {
	const commentsContainer = document.getElementById('comment-display');
  // create the comment element
	const commentElement = document.createElement('div');
  // converts timstamp to readable string
  let date = new Date(comment.timestamp).toDateString();
  let time = millisToTime(comment.timestamp);
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
  // TODO: LIKE FEATURE ? 
}

/**
 * Sends a POST request to the /delete-comment-data URL 
 */
function deleteComment(comment) {
  const params = new URLSearchParams(); 
  params.append('id', comment.id);
  fetch('/delete-comment-data', {method: 'POST', body: params});
}

/**
 * Converts timestamp in milliseconds to a readable string value
 */
function millisToTime(timestamp) {
//   var milliseconds = parseInt((timestamp % 1000) / 100),
  seconds = Math.floor((timestamp / 1000) % 60),
  minutes = Math.floor((timestamp / (1000 * 60)) % 60),
  hours = Math.floor((timestamp / (1000 * 60 * 60)) % 24);
  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;
  return hours + ":" + minutes + ":" + seconds;
    // return hours + ":" + minutes + ":" + seconds + "." + milliseconds;

}