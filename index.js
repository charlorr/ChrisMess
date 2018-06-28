class Applet {
	constructor(){
		const form = document.querySelector('form#mixer');
		this.tracks = [];
		form.addEventListener('submit', (e) => {
			e.preventDefault();
			this.handleSubmit(e);
		});
		
	}
	
	renderProperty(name, value) {
		const span = document.createElement('span');
		span.classList.add(name);
		span.textContent = value;
		return span;
	}
	
	renderItem(track) {
		const item = document.createElement('li');
		item.classList.add('track');
		
		// Add divider to spans to be added
		const props = Object.keys(track);
		props.splice(props.indexOf('title'), 0, 'divider');
		props.forEach((propName) => {
			const value = propName == 'divider' ? '~' : track[propName];
			const span = this.renderProperty(propName, value);
			item.appendChild(span);
		});
		return item;
	}
	
	handleSubmit(e) {
		// Initialize playlist
		if (document.querySelector('#mixName').textContent == "") {
			document.querySelector('#mixName').textContent = `My Mix (${this.getSeason()})`;
		}
		
		const f = e.target;
	
		// Create track object
		const track = {
			artist: f.artist.value,
			title: f.title.value,
		}
		this.tracks.push(track);
		
		const item = this.renderItem(track);

		const list = document.querySelector('#list');
		list.appendChild(item);
	
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