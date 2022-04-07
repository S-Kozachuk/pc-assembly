const body = document.querySelector('body');
const modalWindow = document.querySelector('.modal');
const modalClose = document.querySelector('.modal__close');
const modalBtn = document.querySelectorAll('.modal__btn');

// -- Появление модального окна
// Перебор всех элементов (кнопок) с классом .modal__btn
modalBtn.forEach(item=> {
	/* 
	На каждую кнопку "вешается" обработчик, который по клику
	на любую из кнопок (item) зпускает стрелочную функцию ()=>
	*/
	item.addEventListener('click', () => {
		/* 
		Добавление к объекту modalWindow CSS-правила (display: grid)
		Оно и делает модальное окно видимым. По умолчанию display: none;
		*/
		modalWindow.style.display = 'grid';
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
		modalWindow.style.display = '';
		// разблокировка верт. прокутки с помощью удаления класса noscroll
		body.classList.remove('noscroll');
	}
});

// -- Исчезновение (закрытие) модального окна по клику на кнопку крест
modalClose.addEventListener('click', () => {
	modalWindow.style.display = '';
	body.classList.remove('noscroll');
});