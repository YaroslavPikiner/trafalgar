const modal =  `
<section class="modal__search">
<input type="text" class="modal__input" placeholder='Write element' id="modal__search" />
<button class="modal__btn findBtn">find</button>
<button class="modal__btn clearBtn">clear</button>
<div class="modal__btns">
	<button class="modal__btn prevBtn">prev</button>
	<button class="modal__btn nextBtn">next</button>
	<button class="modal__btn upBtn">up</button>
	<button class="modal__btn downBtn">down</button>
</div>
</section>`;


const main = document.querySelector('main');
main.insertAdjacentHTML('beforebegin', modal);
const searchButton = document.querySelector('.findBtn');
const searchInput = document.querySelector('#modal__search');
const nextElButton = document.querySelector('.nextBtn');
const prevElButton = document.querySelector('.prevBtn');
const childElButton = document.querySelector('.upBtn');
const parentElButton = document.querySelector('.downBtn');
const clearBtn = document.querySelector('.clearBtn');
const searchModal = document.querySelector('.modal__search');
let element;

function selectElement() {
	element.style.border = '1px solid red';
}

function unSelectElement() {
	element.style.border = '';
}

function findElement() {
	if (element) {
		unSelectElement();
	}
	element = document.querySelector(`${searchInput.value}`);
	checkElements();
	selectElement();
	console.log(element.nextElementSibling);
}

searchButton.addEventListener('click', () => {
	focus();
	findElement();
});

nextElButton.addEventListener('click', () => {
	unSelectElement();
	if (element.nextElementSibling) {
		element = element.nextElementSibling;
		selectElement();
	} else {
		console.log('no more elements');
	}
});

prevElButton.addEventListener('click', () => {
	if (element.previousElementSibling) {
		unSelectElement();
		element = element.previousElementSibling;
		selectElement();
	} else {
		console.log('no more elements in this block');
	}
});

childElButton.addEventListener('click', () => {
	unSelectElement();
	element = element.firstElementChild;
	selectElement();
});

parentElButton.addEventListener('click', () => {
	unSelectElement();
	element = element.parentElement;
	selectElement();
});

clearBtn.addEventListener('click', () => {
	searchInput.value = '';
	element.style.border = '';
});

function checkElements() {
	element.previousElementSibling
		? (prevElButton.disabled = false)
		: (prevElButton.disabled = true);
	element.nextElementSibling
		? (nextElButton.disabled = false)
		: (nextElButton.disabled = true);
}

searchModal.onmousedown = function (event) {
	let shiftX = event.clientX - searchModal.getBoundingClientRect().left;
	let shiftY = event.clientY - searchModal.getBoundingClientRect().top;

	moveAt(event.pageX, event.pageY);

	function moveAt(pageX, pageY) {
		searchModal.style.left = pageX - shiftX + 'px';
		searchModal.style.top = pageY - shiftY + 'px';
	}

	function onMouseMove(event) {
		moveAt(event.pageX, event.pageY);
	}

	document.addEventListener('mousemove', onMouseMove);

	searchModal.onmouseup = function () {
		document.removeEventListener('mousemove', onMouseMove);
		searchModal.onmouseup = null;
	};
};

searchModal.ondragstart = function () {
	return false;
};
