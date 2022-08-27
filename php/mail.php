<?php 

require_once('..\\libs/phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

$name = $_POST['name'];
$phone = $_POST['phone'];
$email = $_POST['email'];

//$mail->SMTPDebug = 3;                               // Enable verbose debug output

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.yandex.ru'; 																						// Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'kozachuk-dev@yandex.ru'; // Ваш логин от почты с которой будут отправляться письма
$mail->Password = 'goyqjmuxryikqwzm'; // Ваш пароль от почты с которой будут отправляться письма
$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465; // TCP port to connect to / этот порт может отличаться у других провайдеров

$mail->setFrom('kozachuk-dev@yandex.ru'); // от кого будет уходить письмо?
$mail->addAddress('skozachuk91@yandex.ru'); // Кому будет уходить письмо 
//$mail->addAddress('ellen@example.com');               // Name is optional
//$mail->addReplyTo('info@example.com', 'Information');
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');
//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Заявка с тестового сайта';
$mail->Body    = '' .$name . ' оставил заявку, его телефон ' .$phone. '<br>Почта этого пользователя: ' .$email;
$mail->AltBody = '';

	success: function (html) {
		$('#contacts-form').slideUp(800);
		$('#answer').html(html);
	}
}

// Create message text for sending on email
$message = "<table style='width: 100%;'>$message</table>";

// Function to save User data in file
function send_user_data_in_txt_file ($message){
    //HERE SAVE TEXT INFO
	$f = fopen('form_fill.html', 'a+');
	fwrite($f, date('Y-m-d H:i:s'). "\n");
    fwrite($f, $message );
    fwrite($f, "\n" . "\n" . "\n" . "\n");
}

// Adjusting text encoding
function adopt($text) {
	return '=?UTF-8?B?'.base64_encode($text).'?=';
}
$form_subject = 'Заявка с сайта PC-Assembly';

// Preparing header
$headers = "MIME-Version: 1.0" . PHP_EOL .
"Content-Type: text/html; charset=utf-8" . PHP_EOL .
'From: '.adopt($project_name).' <'.$email_from.'>' . PHP_EOL .
'Reply-To: '.$admin_email.'' . PHP_EOL;

	// Sending email to admin
	mail($admin_email, $form_subject, $message, $headers );

	// Saving user data in file
	send_user_data_in_txt_file ($message);

	// Message about successful sending
	echo "<div class='contact-form__success'>
				<h2 class='contact-form__success'>
					Заявка принята!<br>
					Наш специалист свяжется с Вами в ближайшее время.
				</h2>
		</div>";
?>


	echo '<script type="text/javascript">',
	 'ajaxFormSubmit();'
     '</script>'
;
?>