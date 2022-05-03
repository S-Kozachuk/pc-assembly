const body = document.querySelector('body');
const modalWindow = document.querySelector('.modal');
const modalClose = document.querySelector('.modal__close');
const modalBtn = document.querySelectorAll('.modal__btn');
const timeout = 500;

// -- Появление модального окна
modalBtn.forEach(item=> {
	item.addEventListener('click', () => {
		addScrollIndent();
		modalWindow.classList.add('modal-open');
		body.classList.add('noscroll');
	});
});

// -- Исчезновение (закрытие) модального окна по клику вне модального окна
modalWindow.addEventListener('click', (e) => {
	// Получение по клику (e - событие) в переменную isModal внешнего поля (затем. фон)
	const isModal = e.target.closest('.modal-window__wrapper');
	if(!isModal) {
		modalWindow.classList.remove('modal-open');
		removeScrollIndent();
	}
});

// -- Исчезновение (закрытие) модального окна по клику на крест
modalClose.addEventListener('click', () => {
	modalWindow.classList.remove('modal-open');
	removeScrollIndent();
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

// Close popup if Esc click
document.addEventListener ('keydown', function (e) {
    if (e.code == 'Escape') {
        modalWindow.classList.remove('modal-open');
		removeScrollIndent();
    }
});

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
$(modalWindow).validate ({
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
			minlength: "Не меньше 3-х букв"
		},
		phone: {
			required: 'Введите номер телефона',
			digits: "Вводите только цифры",
			rangelength: jQuery.validator.format("От {0} до {1} цифр")
		},
		email: {
			required: 'Введите email',
			email: 'Отсутствует символ @'
		},
		submitHandler: function (form) {
			ajaxFormSubmit();
		}
	}
});

// Custom rule to cheking a letter
$.validator.addMethod("lettersOnly", function(value, element) {
	return this.optional(element) || /^[a-zа-я]+$/i.test(value);
}, "Вводите только буквы");


// AJAX query function on server
function ajaxFormSubmit() {
    let string = $("#contacts-form").serialize(); // Соханяем данные введенные в форму в строку.
    //Формируем ajax запрос
    $.ajax({
        type: "POST", // Тип запроса - POST
        url: "php/mail.php", // Куда отправляем запрос
        data: string, // Какие даные отправляем, в данном случае отправляем переменную string
        // Функция если все прошло успешно
        success: function (html) {
            $("#contacts-form").slideUp(800);
            $('#answer').html(html);
        }
    });
    // Чтобы по Submit больше ничего не выполнялось - делаем возврат false чтобы прервать цепчку срабатывания остальных функций
    return false;
}