const body = document.querySelector('body');
const modalWindow = document.querySelector('.modal');
const modalClose = document.querySelector('.modal__close');
const modalBtn = document.querySelectorAll('.modal__btn');
const timeout = 800;
let unlock = true;

// -- Появление модального окна
// Перебор всех элементов (кнопок) с классом .modal__btn
modalBtn.forEach(item=> {
	/* 
	На каждую кнопку (item) "вешается" обработчик, который по клику
	на любую из кнопок (item) зпускает стрелочную функцию ()=>
	*/
	item.addEventListener('click', () => {
		/* 
		Добавление к объекту modalWindow CSS-свойства (display: grid)
		Оно и делает модальное окно видимым. По умолчанию display: none;
		*/
		//modalWindow.style.display = 'grid';
		modalWindow.classList.add('modal-open')
		// Добавление класса .noscroll к объекту body
		body.classList.add('noscroll');
	});
});


// -- Исчезновение (закрытие) модального окна по клику вне модального окна
modalWindow.addEventListener('click', (e) => {
	// Получение по клику (e - событие) в переменную isModal внешнего поля (затем. фон)
	const isModal = e.target.closest('.modal-window__wrapper');
	// Также можно обратиться к напрямую к род. элементу
	//const isModal = e.target.querySelector('.window__form')
	/*
	Если клик приходится на внешнее поле (за пределами модального окна),
	то выполняется код внутри условия.
	*/
	if(!isModal) {
		// закрытие модального окна путём присвоения пустого значения
		//modalWindow.style.display = '';
		modalWindow.classList.remove('modal-open')
		// разблокировка верт. прокутки с помощью удаления класса noscroll
		body.classList.remove('noscroll');
	}
});

// -- Исчезновение (закрытие) модального окна по клику на кнопку крест
modalClose.addEventListener('click', () => {
	//modalWindow.style.display = '';
	modalWindow.classList.remove('modal-open')
	body.classList.remove('noscroll');
});

// Устранение сдвига по гор. вправо при появлении модального окна
function bodyLock() {
    // Calculating the scrollbar width
	/*
	В переменную lockPaddingValue записывается ширина полосы прокрутки (справа).
	Она рассчитыватеся как разница между шириной объекта window и элемента body. 
	*/
    const lockPaddingValue = window.innerWidth - body.offsetWidth + 'px';

    if (lockPadding.length > 0) {
        for (let index = 0; index < lockPadding.length; index++) {
            const el = lockPadding[index];
            el.style.paddingRight = lockPaddingValue;
        }
    }
    body.style.paddingRight = lockPaddingValue;

    setTimeout(function () {
        unlock = true;
    }, timeout);
}

// Устранение сдвига по гор. влево при закрытии модального окна
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

    unlock = false;
    setTimeout(function () {
        unlock = true;
    }, timeout);
}