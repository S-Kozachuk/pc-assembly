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
		// Добавеление класса .noscroll к объекту body
		body.classList.add('noscroll');
	});
});


//--- Исчезновение (закрытие) модального окна по клику вне самого окна
modalWindow.addEventListener('click', (e) => {
	// Запись в переменную isModal по клику на высплывающее окно
	const isModal = e.target.closest('.modal-window__wrapper');
	if(!isModal) {
		modalWindow.style.display = 'none';
	}
});

//--- Исчезновение (закрытие) модального окна по клику на крест
modalClose.addEventListener('click', () => {
	modalWindow.style.display = 'none';
});