const body = document.querySelector('body');
const modalWindow = document.querySelector('.modal');
const modalClose = document.querySelector('.modal__close');
const modalBtn = document.querySelectorAll('.modal__btn');

// -- Появление модального окна
// Перебор всех элементов (кнопок) с классом .modal__btn
modalBtn.forEach((item)=> {
	// На каждую кнопку по клику "вешается" обработчик
	item.addEventListener('click', () => {
		modalWindow.style.display = 'grid';
		// Добавление класса .noscroll к объекту body
		body.classList.add('noscroll');
	});
});


// -- Исчезновение (закрытие) модального окна по клику вне самого окна
modalWindow.addEventListener('click', (e) => {
	// Получение в переменную isModal внешнего поля (затем. фон)
	const isModal = e.target.closest('.modal-window__wrapper');
	/*
	Если клик приходится на внешнее поле (за пределами модального окна),
	то выполняется код внутри условия.
	*/
	if(!isModal) {
		// закрытие модального окна путём присвоения значения none
		modalWindow.style.display = 'none';
		// разблокировка верт. прокутки с помощью удаления класса noscroll
		body.classList.remove('noscroll');
	}
});

// -- Исчезновение (закрытие) модального окна по клику на крест
modalClose.addEventListener('click', () => {
	modalWindow.style.display = 'none';
	body.classList.remove('noscroll');
});