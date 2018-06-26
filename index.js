const changeText = function() {
	clickMe.textContent = ":)";
}

const addTrack = function(e) {
    e.preventDefault();
    const f = e.target;
    const artist = f.artist.value;
    const title = f.title.value;
    const track = document.createElement('li');
    track.textContent = artist;
    list.appendChild(track);
}
// Some constants
const form = document.querySelector('form#mixer');
const list = document.querySelector('#list');

// Lonely button functionality
const clickMe = document.querySelector('button');
clickMe.addEventListener('click', changeText);

// Add to mix button functionality
form.addEventListener('submit', addTrack);
