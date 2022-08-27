<?php 

require_once('..\\libs/phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

$name = $_POST['name'];
$phone = $_POST['phone'];
$email = $_POST['email'];

// $mail->SMTPDebug = 3; // Enable verbose debug output

$mail->isSMTP(); // Set mailer to use SMTP
$mail->Host = 'smtp.yandex.ru'; 																						// Specify main and backup SMTP servers
$mail->SMTPAuth = true; // Enable SMTP authentication
$mail->Username = 'kozachuk-dev@yandex.ru'; // Ваш логин от почты с которой будут отправляться письма
$mail->Password = 'goyqjmuxryikqwzm'; // Ваш пароль от почты с которой будут отправляться письма
$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465; // TCP port to connect to / этот порт может отличаться у других провайдеров
$mail->setFrom('kozachuk-dev@yandex.ru', 'PC-Assembly.ru'); // от кого будет уходить письмо?
$mail->addAddress('skozachuk91@yandex.ru'); // Кому будет уходить письмо 
//$mail->addReplyTo('info@example.com', 'Information');
$mail->isHTML(true); // Set email format to HTML

$mail->Subject = 'Order from PC-Assembly.ru';
$mail->Body    = '' .$name . ' оставил заявку, его телефон ' .$phone. '<br>Почта этого пользователя: ' .$email;
$mail->AltBody = '';

if ($mail->send()) {
	echo 
	"<div class='contact-form__success'>
	<h2 class='contact-form__success'>Заявка принята!<br>
	Я свяжусь с&nbsp;Вами в&nbsp;ближайшее время.
	</h2>
  	</div> ";
  } else {
	echo 'Ошибка: ' . $mail->ErrorInfo;
  }  
?>