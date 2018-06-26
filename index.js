const changeText = function() {
    clickMe.textContent = ":)";
}

const add = function(e) {
    e.preventDefault();
    const f = e.target;

    const artist = f.artist.value;
    const title = f.title.value;
    const track = document.createElement('li');
    track.textContent = artist;
    list.appendChild(track);
}
// Some constants
const form = document.querySelector('form');
const list = document.querySelector('#list');

// Lonely button functionality
const clickMe = document.querySelector('button');
clickMe.addEventListener('click', changeText);

// Add to mix button functionality
const addButton = document.querySelector('#submit');
addButton.addEventListener('click', add);
