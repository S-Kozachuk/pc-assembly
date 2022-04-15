const body = document.querySelector('body');
const modalWindow = document.querySelector('.modal');
const modalClose = document.querySelector('.modal__close');
const modalBtn = document.querySelectorAll('.modal__btn');
const timeout = 800;
const lockPadding = document.querySelectorAll('.lock-padding');

// -- Появление модального окна
modalBtn.forEach(item=> {
	item.addEventListener('click', () => {
		addScrollIndent();
		modalWindow.classList.add('modal-open');
		body.classList.add('noscroll');
	});
});
console.log(window.innerWidth);
console.log(body.offsetWidth);

// -- Исчезновение (закрытие) модального окна по клику вне модального окна
modalWindow.addEventListener('click', (e) => {
	// Получение по клику (e - событие) в переменную isModal внешнего поля (затем. фон)
	const isModal = e.target.closest('.modal-window__wrapper');
	if(!isModal) {
		removeScrollIndent();
		modalWindow.classList.remove('modal-open');
		body.classList.remove('noscroll');
	}
});

// -- Исчезновение (закрытие) модального окна по клику на крест
modalClose.addEventListener('click', () => {
	modalWindow.classList.remove('modal-open');
	removeScrollIndent();
	body.classList.remove('noscroll');
});

// Компенсация сдвига по гор. вправо при появлении модального окна
function addScrollIndent() {
	const lockPaddingValue = window.innerWidth - body.offsetWidth + 'px';
		
	console.log(window.innerWidth);
	console.log(body.offsetWidth);
	console.log(lockPaddingValue);

	body.style.paddingRight = lockPaddingValue;
}

// Компенсация сдвига по гор. влево при закрытии модального окна
function removeScrollIndent() {  
    body.style.paddingRight = '0px';
	setTimeout(function () {
    }, timeout);
}