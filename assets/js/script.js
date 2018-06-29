class Applet {
	constructor(){
		const form = document.querySelector('form#mixer');
		this.tracks = [];
		form.addEventListener('submit', (e) => {
			e.preventDefault();
			this.handleSubmit(e);
		});
		
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
				document.getElementById(`${i}`).setAttribute('id', i - 1);
				document.getElementById(`${i}`).setAttribute('id', i - 1);
				document.getElementById(`${i}`).setAttribute('id', i - 1);
			}	
		}
		document.getElementById('-1').parentNode.removeChild(document.getElementById('-1'));
		
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
			this.tracks[img.id].name ? this.unfillIcon(img, name) : this.fillIcon(img, name);
		});
		img.addEventListener('mouseout', (e) => {
			// When del / fav is true, fill icon; when false, unfill icon
			this.tracks[img.id].name ? this.fillIcon(img, name) : this.unfillIcon(img, name);
		});
		img.addEventListener('click', (e) => {
			this.tracks[img.id].name = this.tracks[img.id].name ? false : true;
			if (name == 'del') {this.deleteTrack(img.id);}
		});
		element.appendChild(img);
	}
	
	renderProperty(name, value) {
		//const type = name == 'fav' || name == 'del' ? 'img' : 'td';
		const element = document.createElement('td');
		element.classList.add(name);
		if (name != 'del' && name != 'fav') {
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
		// Initialize playlist
		if (document.querySelector('#mixName').textContent == "") {
			document.querySelector('#mixName').textContent = `My Mix [${this.getSeason()}]`;
			this.burnButton();
		}
		
		const f = e.target;
	
		// Create track object
		const track = {
			id: this.tracks.length,
			fav: false,
			del: false,
			artist: f.artist.value,
			title: f.title.value,
		}
		this.tracks.push(track);
		
		const item = this.renderItem(track);

		const table = document.querySelector('#tabe');
		table.appendChild(item);
	
		// Reset for next input
		f.reset();
		f.artist.focus();
	}
	
	getSeason() {
		const seasons = ['Winter', 'Spring', 'Summer', 'Fall'];
		const date = new Date();
		return `${seasons[date.getMonth() % 3]} \'${date.getFullYear().toString().slice(-2)}`;
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