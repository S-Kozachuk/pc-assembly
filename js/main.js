const modalWindow = document.querySelector('.modal');
const modalBtn = document.querySelectorAll('.modal__btn');

// Перебор всех кнопок с классом .modal__btn
modalBtn.forEach((item)=> {
	// На каждую кнопку по клику "вешается" обработчик
	item.addEventListener('click', () => {
		modalWindow.style.display = 'grid';
	});
	
})