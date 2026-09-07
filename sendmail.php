<?php

// Get the information from the form
$firstname = trim($_POST["firstname"] ?? "");
$lastname  = trim($_POST["lastname"] ?? "");
$email     = trim($_POST["email"] ?? "");
$phone     = trim($_POST["phone"] ?? "");
$message   = trim($_POST["message"] ?? "");

// Check that the required information was received
if (
    $firstname === "" ||
    $lastname === "" ||
    $email === "" ||
    $phone === "" ||
    $message === ""
) {
    echo "error";
    exit;
}

// Check email address
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo "error";
    exit;
}

// Where we want to receive the email
$to = "info@pixxiedesignsolutions.com";

// Email subject
$subject = "New Contact Form Enquiry";

// Create the email message
$emailMessage = "You have received a new enquiry from your website.\n\n";

$emailMessage .= "First Name: " . $firstname . "\n";
$emailMessage .= "Last Name: " . $lastname . "\n";
$emailMessage .= "Email: " . $email . "\n";
$emailMessage .= "Phone: " . $phone . "\n\n";

$emailMessage .= "Message:\n";
$emailMessage .= $message;

// Email headers
$headers = "From: info@pixxiedesignsolutions.com\r\n";
$headers .= "Reply-To: " . $email . "\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// Send the email
if (mail($to, $subject, $emailMessage, $headers)) {

    echo "success";

} else {

    echo "error";

}

?>