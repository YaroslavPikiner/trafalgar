const modal = `
<section class="modal__search">
<input type="text" class="modal__input" placeholder='Write element' id="modal__search" />
<span id='warn-message'> </span>
<button class="modal__btn findBtn">find</button>
<button class="modal__btn clearBtn">clear</button>
<div class="modal__btns">
	<button class="modal__btn prevBtn">prev</button>
	<button class="modal__btn nextBtn">next</button>
	<button class="modal__btn upBtn">up</button>
	<button class="modal__btn downBtn">down</button>
</div>
</section>`;

let header = document.querySelector('header');
header.insertAdjacentHTML('beforebegin', modal);
let searchButton = document.querySelector('.findBtn');
let searchInput = document.querySelector('#modal__search');
let nextElButton = document.querySelector('.nextBtn');
let prevElButton = document.querySelector('.prevBtn');
let childElButton = document.querySelector('.upBtn');
let parentElButton = document.querySelector('.downBtn');
let clearBtn = document.querySelector('.clearBtn');
let searchModal = document.querySelector('.modal__search');
let span = document.getElementById('warn-message');
let element;

const findElement = function () {
	element = document.querySelector(`${searchInput.value}`);

	if (element) {
		unSelectElement();
	}

	if (!element) {
		span.innerHTML = 'Cant find element';
	} else {
		span.innerHTML = '';
	}

	checkElements();
	selectElement();
	scrollToElemnt(element);
};

const scrollToElemnt = function (element) {
	window.scrollTo(pageXOffset, element.offsetTop);
	searchModal.style.top = element.offsetTop + 'px';
};

const selectElement = function () {
	element.style.border = '1px solid red';
};

const unSelectElement = function () {
	element.style.border = '';
};

const checkElements = function () {
	element.previousElementSibling
		? (prevElButton.disabled = false)
		: (prevElButton.disabled = true);
	element.nextElementSibling
		? (nextElButton.disabled = false)
		: (nextElButton.disabled = true);
};

searchButton.onclick = function () {
	span.innerHTML = '';
	focus();
	findElement();
};

nextElButton.onclick = function () {
	unSelectElement();
	if (element.nextElementSibling) {
		element = element.nextElementSibling;
		selectElement();
	} else {
		console.log('no more elements');
	}
};

prevElButton.onclick = function () {
	if (element.previousElementSibling) {
		unSelectElement();
		element = element.previousElementSibling;
		selectElement();
	} else {
		console.log('no more elements in this block');
	}
};

childElButton.onclick = function () {
	unSelectElement();
	element = element.firstElementChild;
	selectElement();
};

parentElButton.onclick = function () {
	unSelectElement();
	element = element.parentElement;
	selectElement();
};

clearBtn.onclick = function () {
	searchInput.value = '';
	element.style.border = '';
};

// // DRAG N DROP
searchModal.onmousedown = function (event) {
	let shiftX = event.clientX - searchModal.getBoundingClientRect().left;
	let shiftY = event.clientY - searchModal.getBoundingClientRect().top;
	searchModal.style.background = '#63B8F2';
	searchModal.style.cursor = 'pointer';

	moveAt(event.pageX, event.pageY);
	function moveAt(pageX, pageY) {
		searchModal.style.left = pageX - shiftX + 'px';
		searchModal.style.top = pageY - shiftY + 'px';
	}

	const onMouseMove = function (event) {
		moveAt(event.pageX, event.pageY);
	};

	document.addEventListener('mousemove', onMouseMove);

	searchModal.onmouseup = function () {
		document.removeEventListener('mousemove', onMouseMove);
		searchModal.onmouseup = null;
		searchModal.style.background = '';
	};
};

searchModal.ondragstart = function () {
	return false;
};
