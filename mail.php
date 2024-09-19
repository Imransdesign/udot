<?php

/* Code by David McKeown - craftedbydavid.com */
/* Editable entries are bellow */

$send_to = "sample@youremail.com"; //Change to Your Own Email address here.
$send_subject = "Message From Udot Bootstrap Template";



/*Be careful when editing below this line */

$f_name = cleanupentries($_POST["name"]);
$f_email = cleanupentries($_POST["email"]);
$f_phone= cleanupentries($_POST["phone"]);
$f_subject= cleanupentries($_POST["subject"]);
$f_message = cleanupentries($_POST["message"]);
$from_ip = $_SERVER['REMOTE_ADDR'];
$from_browser = $_SERVER['HTTP_USER_AGENT'];

function cleanupentries($entry) {
	$entry = trim($entry);
	$entry = stripslashes($entry);
	$entry = htmlspecialchars($entry);

	return $entry;
}

$message = "This email was submitted on " . date('m-d-Y') . 
"\n\nName: " . $f_name . 
"\n\nE-Mail: " . $f_email .
"\n\nSubject: " . $f_subject .
"\n\nPhone Number: " . $f_phone . 
"\n\nMessage: \n" . $f_message . 
"\n\n\nTechnical Details:\n" . $from_ip . "\n" . $from_browser;

$send_subject .= " - {$f_name}";

$headers = "From: " . $f_email . "\r\n" .
    "Reply-To: " . $f_email . "\r\n" .
    "X-Mailer: PHP/" . phpversion();

if (!$f_email) {
	echo "no email";
	exit;
}else if (!$f_name){
	echo "no name";
	exit;
}else{
	if (filter_var($f_email, FILTER_VALIDATE_EMAIL)) {
		mail($send_to, $send_subject, $message, $headers);
		echo '<span class="success">Thank You! Your message has been sent.</span>';
	}else{
		echo '<span class="error">Oops! Something went wrong and we could not send your message.</span>';
		exit;
	}
}

?>