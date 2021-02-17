const select = (el) => document.querySelector(el);
const imageCarousel = select('.image-carousel');
const carouselImages = imageCarousel.querySelectorAll('img');
const imageArea = imageCarousel.querySelector('.image-area');

const icons = {
	nextIcon: `
	<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 443.52 443.52" style="enable-background:new 0 0 443.52 443.52;" xml:space="preserve">
		<g>
			<g>
				<path d="M336.226,209.591l-204.8-204.8c-6.78-6.548-17.584-6.36-24.132,0.42c-6.388,6.614-6.388,17.099,0,23.712l192.734,192.734    L107.294,414.391c-6.663,6.664-6.663,17.468,0,24.132c6.665,6.663,17.468,6.663,24.132,0l204.8-204.8    C342.889,227.058,342.889,216.255,336.226,209.591z"/>
			</g>
		</g>
	</svg>`,
	prevIcon: `
	<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 443.52 443.52" style="enable-background:new 0 0 443.52 443.52;" xml:space="preserve">
		<g>
			<g>
				<path d="M143.492,221.863L336.226,29.129c6.663-6.664,6.663-17.468,0-24.132c-6.665-6.662-17.468-6.662-24.132,0l-204.8,204.8    c-6.662,6.664-6.662,17.468,0,24.132l204.8,204.8c6.78,6.548,17.584,6.36,24.132-0.42c6.387-6.614,6.387-17.099,0-23.712    L143.492,221.863z"/>
			</g>
		</g>
	</svg>`
}

const firstSlideClone = document.createElement('img');
firstSlideClone.src = imageArea.firstElementChild.src;
const lastSlideClone = document.createElement('img');
lastSlideClone.src = imageArea.lastElementChild.src;

imageArea.appendChild(firstSlideClone);
imageArea.insertBefore(lastSlideClone, imageArea.firstElementChild);

console.log(firstSlideClone, ' : ', lastSlideClone);

let slide = 1;

const buttons = {
	prev: select('.image-carousel-prev'),
	next: select('.image-carousel-next')
};

if (buttons.prev.textContent.trim() == 'image_carousel_svg')
	buttons.prev.innerHTML = icons.prevIcon;

if (buttons.next.textContent.trim() == 'image_carousel_svg')
	buttons.next.innerHTML = icons.nextIcon;

imageArea.style.transform = `translateX(-100%)`;

const carouselKeyDown = e => {
	switch (e.key) {
		case 'ArrowLeft':
			prevSlide();
			break;
		case 'ArrowRight':
			nextSlide();
			break;
	}
}

const nextTransitionEnd = () => {
	if (slide > carouselImages.length) {
		console.log('BAŞA DÖN!');
		console.log(slide, ' : ', carouselImages.length);
		slide = 1;
		imageArea.style.transform = 'translate(-100%)';
	}
	imageArea.style.transition = 'none';
	imageArea.removeEventListener('transitionend', nextTransitionEnd);
	console.log(slide);
}

const nextSlide = () => {
	imageArea.style.transition = 'transform 350ms ease-in-out';
	imageArea.style.transform = `translateX(-${++slide * 100}%)`;
	imageArea.addEventListener('transitionend', nextTransitionEnd);
};

const prevSlide = () => {
	imageArea.style.transition = 'transform 350ms ease-in-out';
	imageArea.style.transform = `translateX(-${--slide * 100}%)`;
	imageArea.addEventListener('transitionend', () => {
		imageArea.style.transition = 'none';
		if (slide <= 0) {
			console.log('Son slayta git !');
			slide = carouselImages.length;
			imageArea.style.transform = `translateX(-${slide * 100}%)`;
		}
	});
	console.log(slide);
};

imageCarousel.addEventListener('mouseenter', e => {
	e.preventDefault();
	window.addEventListener('keyup', carouselKeyDown);
});

imageCarousel.addEventListener('mouseleave', e => {
	e.preventDefault();
	window.removeEventListener('keyup', carouselKeyDown);
})

buttons.prev.addEventListener('click', e => {
	e.preventDefault();
	prevSlide();
});

buttons.next.addEventListener('click', e => {
	e.preventDefault();
	nextSlide();
});