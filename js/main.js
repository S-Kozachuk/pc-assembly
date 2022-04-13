const body = document.querySelector('body');
const modalWindow = document.querySelector('.modal');
const modalClose = document.querySelector('.modal__close');
const modalBtn = document.querySelectorAll('.modal__btn');
const wrapper = document.querySelector('.wrapper');
let x, y, wrapperW, wrapperH, bodyW, bodyH, bodyX, bodyY, descrBody, descrWrapper;

// Получение начального положения (координат) body и wrapper
function position () {
	let wrapperPositon = wrapper.getBoundingClientRect();
	x = wrapperPositon.x;
	y = wrapperPositon.y;
	wrapperW = wrapperPositon.width;
	wrapperH = wrapperPositon.height;
	let bodyPositon = body.getBoundingClientRect();
	bodyX = bodyPositon.x;
	bodyY = bodyPositon.y;
	bodyW = bodyPositon.width;
	bodyH = bodyPositon.height;
	descrBodyPos = 'Position of body block:'
	descrBody = 'Size of body block:'
	descrWrapperPos = 'Position of wrapper block:'
	descrWrapper = 'Size of wrapper block:'
};

position();

console.log(descrBodyPos, bodyX, bodyY);
console.log(descrBody, bodyW, bodyH);
console.log(descrWrapperPos, x, y);
console.log(descrWrapper, wrapperW, wrapperH);

// Запуск функции position по событию resize
body.addEventListener('resize', position);

// Вешаем обработчик на кажду кнопку с помощью цикла forEach
modalBtn.forEach(item=> {
	/* 
	На каждую кнопку (item) "вешается" обработчик, который по клику
	на любую из кнопок (item) зпускает стрелочную функцию ()=>
	*/
	item.addEventListener('click', () => {
		modalWindow.classList.add('modal-open');
		wrapper.classList.add('fixed');
		body.classList.add('noscroll');
		wrapper.style.left = x + 'px';
	});
});

// -- Исчезновение (закрытие) модального окна по клику вне модального окна
modalWindow.addEventListener('click', (e) => {
	const isModal = e.target.closest('.modal-window__wrapper');
	if(!isModal) {
		// закрытие модального окна путём присвоения пустого значения
		//modalWindow.style.display = '';
		modalWindow.classList.remove('modal-open');
		// разблокировка верт. прокутки с помощью удаления класса noscroll
		body.classList.remove('noscroll');
		wrapper.classList.remove('fixed');
	}
});

// -- Исчезновение (закрытие) модального окна по клику на кнопку крест
modalClose.addEventListener('click', () => {
	//modalWindow.style.display = '';
	modalWindow.classList.remove('modal-open')
	body.classList.remove('noscroll');
	wrapper.classList.remove('fixed');
});