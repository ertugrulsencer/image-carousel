const select = (el) => document.querySelector(el);
const imageCarousel = select('.image-carousel');
const carouselImages = imageCarousel.querySelectorAll('img');
const imageArea = imageCarousel.querySelector('.image-area');

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

imageArea.style.transform = `translateX(-100%)`;

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

buttons.prev.addEventListener('click', e => {
	e.preventDefault();
	prevSlide();
});

buttons.next.addEventListener('click', e => {
	e.preventDefault();
	nextSlide();
});