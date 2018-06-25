function changeText() {
    const text = document.querySelector('#second');
    text.textContent = 'They\'re the season for the reason.';
}

const button = document.querySelector('button');

button.addEventListener('click', changeText);