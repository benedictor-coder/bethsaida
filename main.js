"use strict"
// Read more button
function readMore(){
    let dots = document.getElementById("dots");
    let moreText = document.getElementById("more");
    let moreButton = document.getElementById("btnReadMore");

    if(dots.style.display === "none"){
        dots.style.display = "inline";
        moreButton.innerHTML = "Read More";
        moreText.style.display = "none";
    }else{
        dots.style.display = "none";
        moreButton.style.display = "Read Less";
        moreText.style.display = "inline";
    }
}

// The Book Appointment JS
function bookAppointment() {

    var firstName = document.querySelector('#fName').value;
    var lastName = document.querySelector('#lName').value;
    var emailAddress = document.querySelector('#eAddress').value;
    var phoneNumber = document.querySelector('#pNumber').value;
    var age = document.querySelector('#age').value;
    var genderMale = document.querySelector('#male').value;
    var genderFemale = document.querySelector('#female').value;

   // let name = /[a-zA-Z]/;
    if(firstName ==="" || firstName === null){
        alert("First name is missing...");
        document.getElementById('fName').focus();
        return false;
    }else if(lastName ==="" || lastName === null){
        alert("Last name is missing...");
        document.getElementById('lName').focus();
        return false;
    };

    let atpos = emailAddress.indexOf("@");
    let dotpos = emailAddress.lastIndexOf(".");
    if(emailAddress ==="" || emailAddress === null){
        alert("Email address is required");
        document.getElementById('eAddress').focus();
        return false;
    }else if(atpos < 1 || (dotpos-atpos < 2 )) {
        alert("Make sure the email address has the '@' and the 'dot' included...");
        document.getElementById('eAddress').focus();
        return false;
    };

    if(phoneNumber === "" || phoneNumber === null){
        alert("Enter your phone number...");
        document.getElementById('pNumber').focus();
        return false;
    }else if(isNaN(phoneNumber)) {
        alert("Enter a valid phone number that is ten digits...");
        document.getElementById('pNumber').focus();
        return false;
    };

    if(age === "" || age === null){
        alert("Please fill in your age...");
        document.getElementById('age').focus();
        return false;
    } else if(isNaN(age)){
        alert("Your age must be a number");
        return false;
    };

    if(genderFemale.checked || genderMale.checked){
        alert("Please select your gender to proceed...");
        return false;
    }else{
    alert('Appointment booking done successfully');
    event.stopPropagation();
    location.reload();
    return true;
    };
};


// The Send  Email JS
function validateSendEmail(){
    let name = document.sendEmail.enter-name.value;
    let email = document.sendEmail.enter-email.value;
    let subject = document.sendEmail.enter-subject.value;
    let text = document.sendEmail.email-body-text.value;

    let atpos = email.indexOf("@");
    let dotpos = email.lastIndexOf(".");

    if(name === "" || name === null){
        alert("Enter your name in the field...");
        document.getElementById("enterName").focus();
        return false;
    }
    if(email === ""||email === null){
        alert("Enter your email address...");
        document.getElementById("enterEmail").focus();
        return false;
    }else if(atpos <1 || (dotpos-atpos < 2)){
        alert("Enter a valid email address...");
        document.getElementById("enterEmail").focus();
        return false;
    }
    if(subject === "" || subject === null){
        alert("Enter a subject for the email to be sent");
        document.getElementById("enterSubject").focus();
        return false;
    }
    if(text === "" || text === null){
        alert("Type your email here...");
        document.getElementById("emailText").focus();
        return false;
    }else {
    alert("Email sent successfully. Thank you");
    preventDefaullt();
    location.reload();
    return true;
  };
};
