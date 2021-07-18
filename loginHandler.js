console.log('it works');

const email = document.querySelector('.email');
const password = document.querySelector('.password');
const submit = document.querySelector('.submit');
const messageDom = document.querySelector('.msg');

function updateMessage(value){
    messageDom.textContent = value;
    return;
}

submit.addEventListener('click', (e) => {
    e.preventDefault();

    let data = {
        email: email.value,
        password: password.value,
    }


    fetch('http://localhost:3090/users/login', {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
        console.log('Success:', data);
        updateMessage(data.msg)
        window.localStorage.setItem('USER', data.user.id);
        window.location.href = `/profile`;
        
        })
        .catch((error) => {
        console.error('Error:', error);
        });
});





