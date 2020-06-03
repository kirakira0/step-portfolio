/**
 * Fetches and posts user comments 
 */
function postComment() {
	fetch('/data').then(response => response.json()).then((comments) => {
		const commentsContainer = document.getElementById('comment-display');
		if (comments === null) {
		  commentsContainer.innerHTML = "No comments yet!";
		} else {
        comments.forEach((comment) => {
						createCommentElement(commentsContainer, comment); 
          })
        }
	}); 
}

function createCommentElement(commentsContainer, comment) {
	// create comment
	const commentElement = document.createElement('div');
	commentElement.innerText = comment;
	commentsContainer.appendChild(commentElement);
	// create delete button
	const deleteButtonElement = document.createElement('button');
  deleteButtonElement.innerText = 'Delete';
  deleteButtonElement.addEventListener('click', () => {
    // Deletes the comment from datastore 
		deleteComment(comment);
    // Remove the comment from the DOM.
    commentElement.remove();
  });
  commentElement.appendChild(deleteButtonElement);
}

/**
 * Sends a DELETE request to the /data URL 
 */
function deleteComment(comment) {
	const params = new URLSearchParams();
  params.append('id', comment.id);
  fetch('/data', {method: 'DELETE', body: params});
}