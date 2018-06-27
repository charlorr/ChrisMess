class Applet {
	constructor(){
		const form = document.querySelector('form#mixer');
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
		
		const props = Object.keys(track);
		props.forEach((propName) => {
			const span = this.renderProperty(propName, track[propName]);
			item.appendChild(span);
		});
		return item;
	}
	
	handleSubmit(e) {
		const f = e.target;
	
		// Create track object
		const track = {
			artist: f.artist.value,
			title: f.title.value,
		}
		
		const item = this.renderItem(track);

		const list = document.querySelector('#list');
		list.appendChild(item);
	
		// Reset for next input
		f.reset();
		f.artist.focus();
	}
}

const app = new Applet();