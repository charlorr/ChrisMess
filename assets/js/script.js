class Applet {
	constructor(){
		const form = document.querySelector('form#mixer');
		this.tracks = [];
		form.addEventListener('submit', (e) => {
			e.preventDefault();
			this.handleSubmit(e);
		});
		
	}
	
	// cla = class
	sourceImg(element, source) {
		//document.querySelector('.del').src = source;
		element.setAttribute('src', source);
	}
	
	renderProperty(name, value) {
		const type = name == 'fav' || name == 'del' ? 'img' : 'span';
		const element = document.createElement(type);
		element.classList.add(name);
		if (type == 'span') {
			element.textContent = value;
		} 
		else if (name == 'del') {
			this.sourceImg(element, 'assets/img/round-delete-24px.svg');
		} else {
			this.sourceImg(element, 'assets/img/round-star_border-24px.svg');
		}
		return element;
	}
	
	renderItem(track) {
		const item = document.createElement('li');
		item.classList.add('track');
		
		// Add divider to spans to be added
		const props = Object.keys(track);
		props.splice(props.indexOf('title'), 0, 'divider');
		props.forEach((propName) => {
			const value = propName == 'divider' ? '~' : track[propName];
			const element = this.renderProperty(propName, value);
			
			// Render images
			/*if (element.nodeName == 'IMG') {
				this.sourceImg(name, element.className == 'del' ? 'assets/img/round-delete-24px.svg' : 'assets/img/round-star_border-24px.svg');
			}*/
			item.appendChild(element);
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
			fav: false,
			del: false,
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