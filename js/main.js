const body = document.querySelector('body');
const modalWindow = document.querySelector('.modal');
const modalClose = document.querySelector('.modal__close');
const modalBtn = document.querySelectorAll('.modal__btn');
const wrapper = document.querySelector('.wrapper')
let x;
let y;
let wrapperW;
let wrapperH;
let bodyW;
let bodyH;

// Получение начального положения (координат) body и wrapper
function position () {
	let wrapperPositon = wrapper.getBoundingClientRect();
	x = wrapperPositon.x;
	y = wrapperPositon.y;
	wrapperW = wrapperPositon.width;
	wrapperH = wrapperPositon.height;
	let bodyPositon = body.getBoundingClientRect();
	bodyW = bodyPositon.width;
	bodyH = bodyPositon.height;
};

position();

console.log('Size of body block: ' + bodyW, bodyH);
console.log('Size of wrapper block: ' + wrapperW, wrapperH);
console.log(x, y);


body.addEventListener('resize', position);

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
		modalWindow.classList.add('modal-open');
		// Добавление класса .noscroll к объекту body
		body.classList.add('noscroll');
		wrapper.classList.add('fixed');
		wrapper.style.left = x + 'px';
		wrapper.style.top = y + 'px';
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
});