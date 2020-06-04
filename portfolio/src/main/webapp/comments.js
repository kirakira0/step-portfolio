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
  // TODO: CONVERT TIMESTAMP TO READABLE TIME
	commentElement.innerText = comment.username + " [" + comment.timestamp.toString() + "]\n" + comment.content + "\n"; 
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