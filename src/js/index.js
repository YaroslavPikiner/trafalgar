let searchButton = document.querySelector('.findBtn');
let searchInput = document.querySelector('#modal__search');
let nextElButton = document.querySelector('.nextBtn');
let prevElButton = document.querySelector('.prevBtn');
let childElButton = document.querySelector('.upBtn');
let parentElButton = document.querySelector('.downBtn');
let clearBtn = document.querySelector('.clearBtn');
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
