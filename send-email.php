<?php
  // Check if the form has been submitted
  if (isset($_POST['submit'])) {
    // Get the form data
    $name = $_POST['name'];
    $email = $_POST['email'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];

    // Set the recipient email address
    $to = "jess.c.zhou@gmail.com";

    // Set the email subject
    $subject = "New message from $name";

    // Build the email content
    $email_content = "Name: $name\n";
    $email_content .= "Email: $email\n\n";
    $email_content .= "Subject: $subject\n\n";
    $email_content .= "Message:\n$message\n";

    // Build the email headers
    $email_headers = "From: $name <$email>";

    // Send the email
    mail($to, $subject, $email_content, $email_headers);

    // Redirect back to index with success message
    header("Location: index.html?message=success");
    exit;
  }
?>
