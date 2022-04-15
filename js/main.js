const body = document.querySelector('body');
const modalWindow = document.querySelector('.modal');
const modalClose = document.querySelector('.modal__close');
const modalBtn = document.querySelectorAll('.modal__btn');
const timeout = 800;
const lockPadding = document.querySelectorAll('.lock-padding');

// -- Появление модального окна
modalBtn.forEach(item=> {
	console.log(window.innerWidth);
	console.log(body.offsetWidth);
	item.addEventListener('click', () => {
		modalWindow.classList.add('modal-open');
		body.classList.add('noscroll');
		bodyLock();
	});
});


// -- Исчезновение (закрытие) модального окна по клику вне модального окна
modalWindow.addEventListener('click', (e) => {
	// Получение по клику (e - событие) в переменную isModal внешнего поля (затем. фон)
	const isModal = e.target.closest('.modal-window__wrapper');
	if(!isModal) {
		modalWindow.classList.remove('modal-open');
		body.classList.remove('noscroll');
		bodyUnLock();
	}
});

// -- Исчезновение (закрытие) модального окна по клику на крест
modalClose.addEventListener('click', () => {
	modalWindow.classList.remove('modal-open');
	body.classList.remove('noscroll');
});

// Компенсация сдвига по гор. вправо при появлении модального окна
function bodyLock() {
    const lockPaddingValue = window.innerWidth - body.offsetWidth + 'px';
	if (lockPadding.length > 0) {
        for (let index = 0; index < lockPadding.length; index++) {
            const el = lockPadding[index];
            el.style.paddingRight = lockPaddingValue;
        }
    }
	
	body.style.paddingRight = lockPaddingValue;
    setTimeout(function () {
    }, timeout);
}

// Компенсация сдвига по гор. влево при закрытии модального окна
function bodyUnLock() {
    setTimeout(function () {
        if (lockPadding.length > 0) {    
            for (let index = 0; index < lockPadding.length; index++) {
                const el = lockPadding[index];
                el.style.paddingRight = '0px';
            }
        }    
        body.style.paddingRight = '0px';
    }, timeout);
    
	setTimeout(function () {
    }, timeout);
}