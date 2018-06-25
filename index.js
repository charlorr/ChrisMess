function changeText() {
    const text = document.querySelector('#second');
    text.textContent = 'They\'re the season for the reason.';
}

function sub() {
    const title = document.querySelector('#first');
    const text = document.querySelector('#box').value;
    title.textContent = text;
}

const button = document.querySelector('#change');

button.addEventListener('click', changeText);

const submit = document.querySelector('#submit');

submit.addEventListener('click', sub);