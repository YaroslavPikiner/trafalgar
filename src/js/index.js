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

let x = 0;
let y = 0;

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



// function Click() {
// 	this.handlers = [];
// }


// Click.prototype = {
// 	findElement: function() {

// 	}
// }



// // DRAG N DROP

const mouseDownHandler = function(e) {
    // Get the current mouse position
    x = e.clientX;
    y = e.clientY;

    // Attach the listeners to document
    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
};

const mouseMoveHandler = function(e) {
    // How far the mouse has been movesearchModal
    searchModal.style.zIndex = 100;
    const dx = e.clientX - x;
    const dy = e.clientY - y;

    // Set the position of element
    searchModal.style.top = `${searchModal.offsetTop + dy}px`;
    searchModal.style.left = `${searchModal.offsetLeft + dx}px`;

    // Reassign the position of mouse
    x = e.clientX;
    y = e.clientY;
};

const mouseUpHandler = function() {
    // Remove the handlers of mousemove and mouseup
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
};

searchModal.addEventListener('mousedown', mouseDownHandler);





