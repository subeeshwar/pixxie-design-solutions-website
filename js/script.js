const slider = document.querySelector(".slider"); 
const afterImg = document.querySelector(".after-img"); 
const sliderLine = document.querySelector(".slider-line"); 
const sliderHolder = document.querySelector(".slider-holder"); 

if (slider) {

    slider.addEventListener("input", function () { 
        afterImg.style.clipPath = `inset(0 ${100 - this.value}% 0 0)`; 
        sliderLine.style.left = `${this.value}%`; 
        sliderHolder.style.left = `${this.value}%`; 
    });

}




const track = document.querySelector(".slideshow-group"); 

let position = 0; 
const speed = 0.5; 

if (track) {

    function moveSlideshow() { 

        position -= speed; 

        const maxScroll = track.scrollWidth - window.innerWidth; 

        if (Math.abs(position) >= maxScroll) { 
            position = 0; 
        } 

        track.style.transform = `translateX(${position}px)`; 

        requestAnimationFrame(moveSlideshow); 
    } 

    moveSlideshow();

}



// Contact Form

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (contactForm) {

    contactForm.addEventListener("submit", function(event) {

        // Stop the page from refreshing
        event.preventDefault();

        // Get the form that was actually submitted
        const form = event.currentTarget;

        // Get the form values
        const firstname = form.querySelector('[name="firstname"]').value.trim();
        const lastname = form.querySelector('[name="lastname"]').value.trim();
        const email = form.querySelector('[name="email"]').value.trim();
        const phone = form.querySelector('[name="phone"]').value.trim();
        const message = form.querySelector('[name="message"]').value.trim();

        // Check First Name
        if (firstname === "") {
            formMessage.innerHTML = "Please enter your first name.";
            return;
        }

        // Check Last Name
        if (lastname === "") {
            formMessage.innerHTML = "Please enter your last name.";
            return;
        }

        // Check Email
        if (email === "" || !email.includes("@")) {
            formMessage.innerHTML = "Please enter a valid email address.";
            return;
        }

        // Check Phone
        if (phone === "") {
            formMessage.innerHTML = "Please enter your phone number.";
            return;
        }

        // Check Message
        if (message === "") {
            formMessage.innerHTML = "Please enter your message.";
            return;
        }

        // Show sending message
        formMessage.innerHTML = "Sending...";

        // Create FormData from the exact form being submitted
        const formData = new FormData(form);

        // Send form information to PHP
        fetch("/sendmail.php", {
            method: "POST",
            body: formData
        })

        .then(function(response) {
            return response.text();
        })

        .then(function(result) {

            result = result.trim();

            if (result === "success") {

                formMessage.innerHTML =
                    "Your message has been sent successfully!";

                form.reset();

            } else {

                formMessage.innerHTML =
                    "Something went wrong. Please try again.";

                console.log("PHP response:", result);
            }

        })

        .catch(function(error) {

            console.log("Form error:", error);

            formMessage.innerHTML =
                "Unable to send your message. Please try again.";

        });

    });

}