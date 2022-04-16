const body = document.querySelector('body');
const modalWindow = document.querySelector('.modal');
const modalClose = document.querySelector('.modal__close');
const modalBtn = document.querySelectorAll('.modal__btn');
const timeout = 500;

// -- Появление модального окна
modalBtn.forEach(item=> {
	item.addEventListener('click', () => {
		addScrollIndent();
		modalWindow.classList.add('modal-open');
		body.classList.add('noscroll');
	});
});

// -- Исчезновение (закрытие) модального окна по клику вне модального окна
modalWindow.addEventListener('click', (e) => {
	// Получение по клику (e - событие) в переменную isModal внешнего поля (затем. фон)
	const isModal = e.target.closest('.modal-window__wrapper');
	if(!isModal) {
		modalWindow.classList.remove('modal-open');
		removeScrollIndent();
	}
});

// -- Исчезновение (закрытие) модального окна по клику на крест
modalClose.addEventListener('click', () => {
	modalWindow.classList.remove('modal-open');
	removeScrollIndent();
});

// Компенсация сдвига по гор. вправо при появлении модального окна
function addScrollIndent() {
	const lockPaddingValue = window.innerWidth - body.offsetWidth + 'px';
	body.style.paddingRight = lockPaddingValue;
}

// Компенсация сдвига по гор. влево при закрытии модального окна
function removeScrollIndent() {  
	setTimeout(function() {
		body.style.paddingRight = '0px';
		body.classList.remove('noscroll');
	}, timeout);
}

// Close popup if Esc click
document.addEventListener ('keydown', function (e) {
    if (e.code == 'Escape') {
        modalWindow.classList.remove('modal-open');
		removeScrollIndent();
    }
});