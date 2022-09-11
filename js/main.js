const body = document.querySelector('body'),
	menuToggle = document.querySelector('.toggle-menu'),
	mobMenu = document.querySelector('.header-nav'),
	overlayEl = document.querySelector('#overlay'),
	modalWindow = document.querySelector('.modal-window'),
	modalClose = document.querySelector('.modal__close'),
	modalBtn = document.querySelectorAll('.modal__btn'),
	formElem = document.querySelector('.form-window__elements'),
	submitBtn = document.getElementById('btn-submit'),
	timeout = 800;
let errorLabel,
	fieldClear,
	removeErrorsMessages;

function openCloseMobileMenu() {
	function openMobileMenu() {
		menuToggle.classList.toggle('active');
		mobMenu.classList.toggle('active');
		overlayEl.classList.toggle('active');
		body.classList.toggle('noscroll');
	}
 
	function closeMobileMenu() {
		overlayEl.classList.remove('active');
		mobMenu.classList.remove('active');
		menuToggle.classList.remove('active');
		body.classList.remove('noscroll');
	}

	menuToggle.addEventListener('click', openMobileMenu);

	mobMenu.addEventListener('click',closeMobileMenu);

	window.addEventListener('resize', closeMobileMenu);

	overlayEl.addEventListener('click', closeMobileMenu);
}
openCloseMobileMenu();

function timer() {
	const timerDigit = document.querySelectorAll('.timer__digit');
	let timerSeconds = timerDigit[3],
		timerMinutes = timerDigit[2],
		timerHours = timerDigit[1],
		timerDays = timerDigit[0],
		initialSeconds = 59,
		initialMinutes = 59,
		initialHours = 15,
		initialDays = 10,
		timerId,
		trigger;

	setTimeout(secondsCounting, 500);

	function secondsCounting() {
		timerId = setInterval(()=>{
			// console.log(initialSeconds--);
			initialSeconds--;	
			timerSeconds.innerHTML = initialSeconds< 10 ? "0" + initialSeconds : initialSeconds;
			if (initialSeconds == 0) {
				initialSeconds = 59;
				minutesCounting();
			}
			if (trigger == 3) {
				clearInterval(timerId);
				console.log('Timer is stopped');
			}
		}, 1000);
	};

	function minutesCounting() {
		initialMinutes--;
		if (initialMinutes == 0 && trigger !== 2) {
			hoursCounting();
			initialMinutes = 59;
		}
		if (trigger == 2) {
			initialMinutes = 0;
			trigger = 3;
		}
		timerMinutes.innerHTML = initialMinutes< 10 ? "0" + initialMinutes : initialMinutes;
	}

	function hoursCounting() {
		initialHours--;
		if (initialHours == 0) {
			initialHours = 3;
			daysCounting();
		}
		if (trigger == 1){
			initialHours = 0;
			trigger = 2;
		}
		timerHours.innerHTML = initialHours;
	}

	function daysCounting() {
		if(initialDays !== 0) {
			initialDays--;
			timerDays.innerHTML = initialDays;
			//initialDays = 0
		}
		else {
			initialDays = 0;
			trigger = 1;
			console.log(trigger);
		}
	}
}
timer();

function scrollUpArrow() {
	const scrollBtn = document.querySelector('.scroll_arrow');
	window.onscroll = () => {
		if(window.scrollY > 400) {
			scrollBtn.classList.remove('scroll__btn-hide');
		}
		else if (window.scrollY < 400) {
			scrollBtn.classList.add('scroll__btn-hide');
		}
	};
	scrollBtn.onclick = () => {
		window.scrollTo(0, 0);
	};
}
scrollUpArrow();

function modalWindowOpenClose() {
	function modalWindowOpen(){
		modalBtn.forEach(item=> {
			item.addEventListener('click', (e) => {
				e.preventDefault();
				addScrollIndent();
				modalWindow.classList.add('open');
				body.classList.add('noscroll');
				fieldClear();
			});
		});
	}
	modalWindowOpen();

	function closeOutlineModalWindow() {
		modalWindow.addEventListener('click', (e) => {
		const isModal = e.target.closest('.modal-window__content');
			if(!isModal) {
				modalWindow.classList.remove('open');
				removeScrollIndent();
				removeErrorsMessages();
			}
		});
	}
	closeOutlineModalWindow();
	

	function closeCrossModalWindow() {
		modalClose.addEventListener('click', () => {
			modalWindow.classList.remove('open');
			removeScrollIndent();
			removeErrorsMessages();
		});
	}
	closeCrossModalWindow();

	function closeEcsModalWindow() {
		document.addEventListener ('keydown', function (e) {
			if (e.code == 'Escape') {
				modalWindow.classList.remove('open');
				removeScrollIndent();
				removeErrorsMessages();
			}
		});
	}
	closeEcsModalWindow();

	function addScrollIndent() {
		const lockPaddingValue = window.innerWidth - body.offsetWidth + 'px';
		body.style.paddingRight = lockPaddingValue;
	}

	function removeScrollIndent() {  
		setTimeout(function() {
			body.style.paddingRight = '0px';
			body.classList.remove('noscroll');
		}, timeout);
	}
}
modalWindowOpenClose();

function formCheck() {
	function setJQueryValidate() {
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
	}
	setJQueryValidate();

	fieldClear = (()=>{
		const mainForm = document.querySelectorAll('.form__input');
		mainForm.forEach(elem =>{
			elem.value = "";
		})
	});

	let getFieldsError = (()=> {
		submitBtn.addEventListener('click', ()=> {
			setTimeout(()=> {
				errorLabel = formElem.querySelectorAll('label.error');
				console.log(errorLabel);
			}, 100);
		});
	});
	getFieldsError();

	removeErrorsMessages = (()=> {
		if (errorLabel) {
			for (let label of errorLabel) {
				label.remove();
				console.log('Removed error message');
			}
		}
	});

	function checkingForLetters() {
		$.validator.addMethod('lettersOnly', function(value, element) {
			return this.optional(element) || /^[a-zа-я]+$/i.test(value);
		}, "Вводите только буквы");
	}
	checkingForLetters();
}
formCheck()


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