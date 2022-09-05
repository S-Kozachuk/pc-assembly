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
// Link to the autor https://alekscher1993.github.io/PC-collect/#
const timer = () => {
const timers = document.querySelectorAll(".timer__digit");
let timerId;

	function timerHandler() {
		const date = new Date();
		const newDate = new Date(
			date.getFullYear(),
			date.getMonth(),
			date.getDate() +1,
		);
		console.log('Date:', date);
		console.log('New date:', newDate);

		const dateTime = date.getTime();
		const newDateTime = newDate.getTime();
		const diff = newDateTime - dateTime;
		console.log('NewDate time:', newDateTime);
		console.log('Date time:', dateTime);
		console.log('Diff:', diff);

		let diffDate = new Date(diff);
		console.log(diffDate);
		
		let newSec = Math.floor((diff / 1000) % 60);
		let newMin = Math.floor((diff / 1000 / 60) % 60);
		let newHour = Math.floor((diff / 1000 / 60 / 60) % 60);
		
		let hour = newHour < 10 ? "0" + newHour : newHour;
		let min = newMin < 10 ? "0" + newMin : newMin;
		let sec = newSec < 10 ? "0" + newSec : newSec;

		timers[1].innerHTML = hour;
		timers[2].innerHTML = min;
		timers[3].innerHTML = sec;
	}

	// Use insead of setInterval for testing
	// timerHandler()
	
	timerId = setInterval(timerHandler, 500);
	if (window.innerWidth <= 500) {
		clearInterval(timerId);
	}

}
	  