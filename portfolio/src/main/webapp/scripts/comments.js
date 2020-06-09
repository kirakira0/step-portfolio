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
    }); 
  }).catch(err => {
      alert("Error in network call."); 
  }) 
}

/**
 * Constructs comment element and adds it to the DOM
 */
function displayComment(comment) {

	const commentsContainer = document.getElementById('comment-display');
	const commentElement = document.createElement('div'); // create the comment element
  commentElement.setAttribute("id", "comment-element");
  
  const date = new Date(comment.timestamp).toDateString(); // converts timestamp to readable string
  const time = millisToTime(comment.timestamp);

  const username = document.createElement('p'); // username p 
  setChild(commentElement, username, "username", comment.username);
  const dateAndTime = document.createElement('p'); // timestamp p 
  setChild(commentElement, dateAndTime, "date-and-time", `${time} ${date}`); 
  const content = document.createElement('p'); // content p 
  setChild(commentElement, content, "content", comment.content);
  createDeleteButton(commentElement, comment); // delete button
	
  commentsContainer.appendChild(commentElement);

}

/**
 * Sets the child's id and text content and appends it to the parent
 */
function setChild(commentElement, elementName, id, content) {
  elementName.setAttribute("id", id);
  commentElement.appendChild(elementName);
  elementName.innerText = content; 
}

/**
 * Create delete button
 */
function createDeleteButton(commentElement, comment) {
	const deleteButtonElement = document.createElement('button');
  deleteButtonElement.innerText = 'Delete';
  deleteButtonElement.setAttribute("id", "delete-button");
  deleteButtonElement.setAttribute("class", "submit-button"); 
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