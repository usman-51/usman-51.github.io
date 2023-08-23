document.getElementById("contactForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent form submission

  // Retrieve form data
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var subject = document.getElementById("subject").value;
  var message = document.getElementById("message").value;

  // Compose email body
  var body = "Name: " + name + "\n";
  body += "Email: " + email + "\n";
  body += "Subject: " + subject + "\n";
  body += "Message: " + message;

  console.log(body)


  // Send email using SMTP
  Email.send({
    Host: "smtp.gmail.com",
//    SecureToken: "YOUR_SMTP_SECURE_TOKEN",
    Username: "usman",
    Password: "",
    To: 'anyone@gmail.com',
    From: 'annn@gmail.com',
    Subject: subject,
    Body: body
  }).then(
    function(response) {
      console.log(body)

      if (response === 'OK') {
        alert("Message sent successfully!");
        document.getElementById("contactForm").reset(); // Clear form fields
      } else {
        alert("Failed to send message. Please try again later. 1");
      }
    }
  ).catch(
    function(error) {
      alert("Failed to send message. Please try again later. 2");
    }
  );
});

