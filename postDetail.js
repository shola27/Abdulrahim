var postId = window.localStorage.getItem('postId');
const postDetail = document.querySelector('.post-detail');
const myComment = document.querySelector('.create-comment')
const commentBtn = document.querySelector('.commentBtn')
const comments = document.querySelector('.comments')
console.log(postId)

fetch(`http://localhost:3090/users/get-single-post/?id=${postId}`, {
        method: 'GET', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        })
        .then(response => response.json())
        .then(data => {
         data = data.result   
        console.log(data);

        html1 = ` <h2>${data.User.firstName}</h2>
        <p class="content">${data.content}</p>
        <h2>comments</h2>
        `
        data.Comments.map(comment => {
            html2 = `<li>${comment.content}</li>`
            comments.insertAdjacentHTML('afterbegin',html2)
            
        })
       
        postDetail.insertAdjacentHTML('beforeend', html1)


        })
        .catch((error) => {
        console.error('Error:', error);
});

commentBtn.addEventListener('click', () => {
    console.log({
        postId: postId,
        content: myComment.value
    })
    fetch('http://localhost:3090/users/make-comment', {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        
        body: JSON.stringify({
            postId: postId,
            content: myComment.value
        }),
        })
        .then(response => response.json())
        .then(data => {
        console.log(data);
        data = data.result

        comments.innerHTML = ''
        data.map(comment => {
            const html = `<li>${comment.content}</li>`
            comments.insertAdjacentHTML('afterbegin',html)
        })
        
        })
        .catch((error) => {
        console.error('Error:', error);
        });
});
