const commentFormHandler = async function(event) {
    event.preventDefault();
  
    // const postId = document.querySelector('input[name="post-id"]').value;
    const postId = window.location.href.split("/")[4];
    const body = document.querySelector('textarea[name="comment-body"]').value;
  
  console.log(postId)

    if (body) {
      await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({
          postId,
          body
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      document.location.reload();
    }
  };
  
  document
    .querySelector('#new-comment-form')
    .addEventListener('submit', commentFormHandler);