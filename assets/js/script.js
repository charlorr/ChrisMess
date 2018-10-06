class Applet {
    constructor(){
        const form = document.querySelector('form#mixer');
        
        this.tracks = [];
        this.load();

        form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSubmit(e);
                });

    }

    save() {
        // Store tracks in el local storage
        localStorage.setItem('tracks', JSON.stringify(this.tracks));
    }

    load() {
        // Load tracks from local storage
        const tracks = JSON.parse(localStorage.getItem('tracks'));
        
        if (tracks) {
            // Add each track to the UI
            tracks.forEach(track => this.addTrack(track));
        }
    }
    
    addTrack(track) {
        this.tracks.push(track);

        const item = this.renderItem(track);

        // Add it to the DOMMMMM
        const table = document.querySelector('#tabe');
        table.appendChild(item);
    }

    toSpans() {
        alert('This feature is currently under construction :)');
    }

    burnButton() {
        const burn = document.createElement('button');
        burn.textContent = "Burn it!";
        burn.classList.add('burn');
        burn.addEventListener('click', (e) => {
                // Load image
                // Overlay formatted text
                this.toSpans();
                });
        document.querySelector('.mix').appendChild(burn);
    }

    deleteTrack(id) {
        this.tracks.splice(id, 1);
        document.getElementById(id).setAttribute('id', '-1');
        // Adjust indexes
        if (id != this.tracks.length) {
            var element = {};
            for (var i = parseInt(id) + 1; i < this.tracks.length + 1; i++) {
                for (let j = 0; j < 3; j++) {
                    document.getElementById(`${i}`).setAttribute('id', i - 1);
                }
            }	
        }
        document.getElementById('-1').parentNode.removeChild(document.getElementById('-1'));
        this.save();
    }

    fillIcon(img, name) {
        img.setAttribute('src', name == 'del' ? 'assets/img/delete.svg' : 'assets/img/star.svg');
    }

    unfillIcon(img, name) {
        img.setAttribute('src', name == 'del' ? 'assets/img/delete_outline.svg' : 'assets/img/star_border.svg');
    }

    insertImg(element, name) {
        const img = document.createElement('img');
        img.classList.add(name);
        img.setAttribute('src', name == 'del' ? 'assets/img/delete_outline.svg' : 'assets/img/star_border.svg');
        img.setAttribute('alt', name == 'del' ? 'delete' : 'favorite');
        img.setAttribute('id', this.tracks.length - 1);

        img.addEventListener('mouseover', (e) => {
                // When del / fav is true, unfill icon; when false, fill icon
                this.tracks[img.id][name] ? this.unfillIcon(img, name) : this.fillIcon(img, name);
                });
        img.addEventListener('mouseout', (e) => {
                // When del / fav is true, fill icon; when false, unfill icon
                this.tracks[img.id][name] ? this.fillIcon(img, name) : this.unfillIcon(img, name);
                });
        img.addEventListener('click', (e) => {
                this.tracks[img.id][name] = this.tracks[img.id][name] ? false : true;
                if (name == 'del') {this.deleteTrack(img.id);}
                console.log(this.tracks);
                });
        element.appendChild(img);
    }

    renderProperty(name, value) {
        //const type = name == 'fav' || name == 'del' ? 'img' : 'td';
        const element = document.createElement('td');
        element.classList.add(name);
        if (name == 'sp1' || name == 'sp2') {
            element.textContent = '';
        } else if (name != 'del' && name != 'fav') {
            element.textContent = value;
        } else {
            this.insertImg(element, name);
        }
        return element;
    }

    renderItem(track) {
        const item = document.createElement('tr');
        item.setAttribute('id', this.tracks.length - 1);
        item.classList.add('track');

        // Add divider to spans to be added
        const props = Object.keys(track);
        //props.splice(props.indexOf('title'), 0, 'divider');
        props.forEach((propName) => {
            //const value = propName == 'divider' ? '~' : track[propName];
            if (propName != 'id') {
                const element = this.renderProperty(propName, track[propName]);
                item.appendChild(element);	
            }
        });
        return item;
    } 

    handleSubmit(e) {
        const f = e.target;

        // If nothing is entered, don't do nuthin'
        if (f.artist.value == '' && f.title.value == '') {
            return;
        }

        // Fill out both boxes biiiiitch
        if (f.artist.value == '' || f.title.value == '') {
            const empty = f.artist.value == '' ? f.artist : f.title;
            const stringSub = f.artist.value == '' ? 'n artist' : ' song title';
            alert(`Please enter a${stringSub} before submitting`);
            empty.focus();
            return;
        }

        // Initialize playlist
        if (document.querySelector('#mixName').textContent == "") {
            document.querySelector('#mixName').textContent = `My Mix [${this.getSeason()}]`;

            // Render 'burn it' button
            this.burnButton();
            this.loadHeader();
       }

        // Create track object
        const track = {
            id: this.tracks.length,
            fav: false,
            del: false,
            artist: f.artist.value,
            title: f.title.value,
        }
        this.addTrack(track);
        this.save();

        // Reset for next input
        f.reset();
        f.artist.focus();
    }

    loadHeader() {
        const header = {
            id: -2,
            sp1: false,
            sp2: false,
            artist: 'Artist',
            title: 'Title',
        }
        document.querySelector('#tabe').appendChild(this.renderItem(header));
 
    }

    getSeason() {
        const seasons = ['Winter', 'Spring', 'Summer', 'Fall', 'Winter'];
        const date = new Date();
        const month = date.getMonth();
        return `${seasons[(month + 1) / 3]} \'${date.getFullYear().toString().slice(-2)}`;
    }
}

const app = new Applet();

/* OLD CODE

   sourceImg(element, source) {
//document.querySelector('.del').src = source;
element.setAttribute('src', source);
element.setAttribute('alt', name == 'del' ? 'delete' : 'favorite');
}

renderProperty(name, value) {
const type = name == 'fav' || name == 'del' ? 'img' : 'td';
const element = document.createElement(type);
element.classList.add(name);
if (type == 'td') {
element.textContent = value;
} else {
this.sourceImg(element, name == 'del' ? 'assets/img/sharp-delete_outline-24px.svg' : 'assets/img/sharp-star_border-24px.svg');
}
return element;
}

renderItem(track) {
const item = document.createElement('tr');
item.classList.add('track');

// Add divider to spans to be added
const props = Object.keys(track);
//props.splice(props.indexOf('title'), 0, 'divider');
props.forEach((propName) => {
//const value = propName == 'divider' ? '~' : track[propName];
const element = this.renderProperty(propName, track[propName]);
item.appendChild(element);
});
return item;
} 
 */
