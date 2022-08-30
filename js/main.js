const body = document.querySelector('body'),
	modalWindow = document.querySelector('.modal-window'),
	modalClose = document.querySelector('.modal__close'),
	modalBtn = document.querySelectorAll('.modal__btn'),
	formElem = document.querySelector('.form-window__elements'),
	submitBtn = document.getElementById('btn-submit'),
	timeout = 800;
let errorLabel;

let fieldClear = (()=>{
	const mainForm = document.querySelectorAll('.form__input');
	mainForm.forEach(elem =>{
		elem.value = "";
	})
});

// The plugin adds error messages with a delay
let getFieldsError = (()=> {
	submitBtn.addEventListener('click', ()=> {
		setTimeout(()=> {
			errorLabel = formElem.querySelectorAll('label.error');
			console.log(errorLabel);
		}, 100);
	});
});
getFieldsError();

let removeErrorsMessages = (()=> {
	if (errorLabel) {
		for (let label of errorLabel) {
			label.remove();
			console.log('Removed error message');
		}
	}
});

// -- Modal window --
// -- Появление модального окна
modalBtn.forEach(item=> {
	item.addEventListener('click', (e) => {
		e.preventDefault();
		addScrollIndent();
		modalWindow.classList.add('open');
		body.classList.add('noscroll');
		fieldClear();
	});
});

// -- Исчезновение (закрытие) модального окна по клику вне модального окна
modalWindow.addEventListener('click', (e) => {
	// Получение по клику (e - событие) в переменную isModal внешнего поля (затем. фон)
	const isModal = e.target.closest('.modal-window__content');
	if(!isModal) {
		modalWindow.classList.remove('open');
		removeScrollIndent();
		removeErrorsMessages();
	}
});

// -- Исчезновение (закрытие) модального окна по клику на крест
modalClose.addEventListener('click', () => {
	modalWindow.classList.remove('open');
	removeScrollIndent();
	removeErrorsMessages();
});

// Close popup if Esc click
document.addEventListener ('keydown', function (e) {
	if (e.code == 'Escape') {
		modalWindow.classList.remove('open');
		removeScrollIndent();
		removeErrorsMessages();
	}
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

// -- Кнопка для прокрутки вверх
// Получаю в константу кнопку (стрелку)
const scrollBtn = document.querySelector('.scroll_arrow');
window.onscroll = () => {
	// Появление кнопки при вертикальной прокрутке вниз (более чем на 400 px)
	if(window.scrollY > 400) {
		scrollBtn.classList.remove('scroll__btn-hide');
	}
	// Исчезновение кнопки при вертикальной прокрутке вверх (менее 400 px)
	else if (window.scrollY < 400) {
		scrollBtn.classList.add('scroll__btn-hide');
	}
};

// Прокрутка вверх (по координатам) по нажатию кнопки (стрелки)
scrollBtn.onclick = () => {
	window.scrollTo(0, 0);
};

// Form validate settings
$('#contacts-form').validate ({
	// focusCleanup: true,
	rules: {
		name: {
			required: true,
			minlength: 3,
			lettersOnly: true
		},
		phone: {
			required: true,
			digits: true,
			rangelength: [6, 10]
		},
		email: {
			required: true,
			email: true
		}
	},
	messages: {
		name: {
			required: 'Введите имя',
			minlength: 'Не меньше 3-х букв'
		},
		phone: {
			required: 'Введите номер телефона',
			digits: 'Вводите только цифры',
			rangelength: jQuery.validator.format('От {0} до {1} цифр')
		},
		email: {
			required: 'Введите email',
			email: 'Отсутствует символ @'
		}
	},
	submitHandler: function (form) {
		ajaxFormSubmit();
	}
});

// Custom rule to cheking a letter
$.validator.addMethod('lettersOnly', function(value, element) {
	return this.optional(element) || /^[a-zа-я]+$/i.test(value);
}, "Вводите только буквы");


// AJAX query function on server
function ajaxFormSubmit() {
    let string = $('#contacts-form').serialize(); // Сохраняем данные введенные в форму в строку.
    // AJAX query
    $.ajax({
        type: 'POST',
        url: 'php/mail.php',
        data: string,
        // Close the modal window (JQuery method slideUP)
        success: function (html) {
            $('#contacts-form').slideUp(800);
            $('#answer').html(html);
        }
    });
    // Block action if click to submit
    return false;
}

// Timer
/*
1. Get the current time (seconds).
2. Write a function that gets the time in seconds as the difference 
between the current time and the time elapsed since the function was called.

Formula: initial time (static, get when timer start) - current time

Basic time (is const), current time (get by setInterval), initial value.
Current time - basic time = last time 
initial time - last time

3. Use the next references:
https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Date
https://learn.javascript.ru/date
https://itchief.ru/javascript/date

*/
/*
function timer() {
	const timerDigit = document.querySelectorAll('.timer__digit');
	console.log(timerDigit);
	
	let inputTime = 60;
	let currentDate;
	let timePeriod;

	let timerId = setInterval(() => {
		currentDate = new Date; // set the time value
		let currentSeconds = currentDate.getSeconds();
		// 	console.log(currentMin);
		timePeriod = inputTime - currentSeconds;
		console.log(timePeriod);
	}, 1000);

	if (timePeriod === 1) {
		clearInterval(timerId);
	}
	
	console.log(currentDate);

}

timer();
*/
const timerDigit = document.querySelectorAll('.timer__digit');
let timerSeconds = timerDigit[3];
let timerMinutes = timerDigit[2];
let timerHours = timerDigit[1];
let initialSeconds = 60;
let initialMinutes = 60;
let initialHours = 60;
let initialDays = 18;
let trigger;

setTimeout(secondsCounting, 500);

function secondsCounting() {
	let timerId = setInterval(()=>{
		console.log(initialSeconds--);	
		timerSeconds.innerHTML = initialSeconds;
		if (initialSeconds == 0) {
			// clearInterval(timerId);
			initialSeconds = 60;
			console.log('Stop');
			minutesCounting();
		}
	}, 10);
};

function minutesCounting() {
	initialMinutes--;
	timerMinutes.innerHTML = initialMinutes;
	if (initialMinutes == 0) {
		initialMinutes = 60;
		hoursCounting();;
	}
	
}

function hoursCounting() {
	initialHours--;
	timerMinutes.innerHTML = initialHours;
}
