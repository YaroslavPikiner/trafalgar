const modal = `
<section class="modal__search">
<input type="text" class="modal__input" placeholder='Write element' id="modal__search" />
<span id='warn-message'> </span>
<button class="modal__btn findBtn">find</button>
<button class="modal__btn clearBtn">clear</button>
<div class="modal__btns">
	<button name="prev" class="modal__btn prevBtn" disabled>prev</button>
	<button name="next" class="modal__btn nextBtn" disabled>next</button>
	<button name="child" class="modal__btn upBtn" disabled>Child</button>
	<button name="parent" class="modal__btn downBtn" disabled>Parent</button>
</div>
</section>`;
// for insert modal
let header = document.querySelector('header');
header.insertAdjacentHTML('beforebegin', modal);
// element modal 
let searchButton = document.querySelector('.findBtn');
let searchInput = document.querySelector('#modal__search');
let nextElButton = document.querySelector('.nextBtn');
let prevElButton = document.querySelector('.prevBtn');
let childElButton = document.querySelector('.upBtn');
let parentElButton = document.querySelector('.downBtn');
let clearBtn = document.querySelector('.clearBtn');
let searchModal = document.querySelector('.modal__search');
let modal__btns = document.querySelector('.modal__btns');
let span = document.getElementById('warn-message');
// for element body 
let element;
// for drag n drop
let x = 0;
let y = 0;

const scrollToElement = (element) => {
    window.scrollTo(pageXOffset, element.offsetTop);
};

const findElement = function () {
	if (element) {
		unSelectElement();
	}
	if (searchInput.value) {
		element = document.querySelector(`${searchInput.value}`);
		if (!element) {
			span.style.visibility = '';

		} else {
			scrollToElement(element);
			span.style.visibility = 'hidden';
		}
	}
	if (element) {
		checkElements();
		selectElement();
	}
	scrollToElement(element);
};

const selectElement = function () {
	element.style.border = '1px solid red';
};

const unSelectElement = function () {
	element.style.border = '';
};

const checkElements = function () {
	prevElButton.disabled = !element.previousElementSibling;
	nextElButton.disabled = !element.nextElementSibling;
	parentElButton.disabled = !element.parentElement;
	childElButton.disabled = !element.firstElementChild;
};

searchButton.onclick = function () {
	span.innerHTML = '';
	focus();
	findElement();
};

modal__btns.addEventListener('click', function(event) {
    unSelectElement();
    switch (event.target.name) {
        case 'next':
            element = element.nextElementSibling;
            break;
        case 'prev':
            element = element.previousElementSibling;
            break;
        case 'parent':
            element = element.parentElement;
            break;
        case 'child':
            element = element.firstElementChild;
            break;
        default:
            return false;
    }

    selectElement();
    checkElements();
    return undefined;
})

clearBtn.onclick = function () {
	searchInput.value = '';
	element.style.border = '';
	element = '';
	checkElements();
};


const mouseDownHandler = function (e) {
	x = e.clientX;
	y = e.clientY;

	document.addEventListener('mousemove', mouseMoveHandler);
	document.addEventListener('mouseup', mouseUpHandler);
};

const mouseMoveHandler = function (e) {
	searchModal.style.zIndex = 100;
	searchModal.style.background = '#fff';

	const dx = e.clientX - x;
	const dy = e.clientY - y;

	searchModal.style.top = `${searchModal.offsetTop + dy}px`;
	searchModal.style.left = `${searchModal.offsetLeft + dx}px`;

	x = e.clientX;
	y = e.clientY;
};

const mouseUpHandler = function () {
	searchModal.style.background = '';
	document.removeEventListener('mousemove', mouseMoveHandler);
	document.removeEventListener('mouseup', mouseUpHandler);
};

searchModal.addEventListener('mousedown', mouseDownHandler);





