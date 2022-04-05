const modalWindow = document.querySelector('.modal');
const modalBtn = document.querySelectorAll('.modal__btn');

// -- Появление модального окна
// Перебор всех кнопок с классом .modal__btn
modalBtn.forEach((item)=> {
	// На каждую кнопку по клику "вешается" обработчик
	item.addEventListener('click', () => {
		modalWindow.style.display = 'grid';
	});
	
});


// --- Исчезновение (закрытие) модального окна
modalWindow.addEventListener('click', (e) => {
	// Запись в переменную isModal по клику на высплывающее окно
	const isModal = e.target.closest('.modal-window__wrapper');
	if(!isModal) {
		modalWindow.style.display = 'none';
	}
});