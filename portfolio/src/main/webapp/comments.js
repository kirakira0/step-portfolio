/**
 * 
 */
//TODO: CHANGE NAME
// const form = document.getElementById('form'); 
// form.addEventListener('submit', e => {
// 	e.preventDefault(); 
// 	postComment(); 
// }); 

function postComment() {
	fetch('/data').then(response => response.json()).then((comments) => {
		// comments is an object, not a string, so we have to reference its fields to create HTML content
		const commentsContainer = document.getElementById('comment-display');
		if (comments === null) {
		  commentsContainer.innerHTML = "No comments yet!";
		} else {
		  commentsContainer.innerHTML = comments;
		}
	}); 
}