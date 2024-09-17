// Get References To Form and Display Area
var form = document.getElementById('resume-form');
var displayArea = document.getElementById('resume-display');
var shareableLinkContainer = document.getElementById('shareable-link-container');
var shareableLink = document.getElementById('shareable-link');
var downloadPdfButton = document.getElementById('download-pdf');
// Handle Form Submission
form.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent page reload
    console.log('Form submitted. Preventing default action.');
    // Collect Form Data
    var username = document.getElementById('username').value;
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var address = document.getElementById('address').value;
    var education = document.getElementById('education').value;
    var experience = document.getElementById('experience').value;
    var skills = document.getElementById('skills').value;
    // Save Data to Local Storage
    var resumeData = {
        username: username,
        name: name,
        email: email,
        phone: phone,
        address: address,
        education: education,
        experience: experience,
        skills: skills
    };
    localStorage.setItem(username, JSON.stringify(resumeData)); //saving data locally
    // Generate and Display Resume Content
    var resumeContent = "\n        <h2>Shareable Resume</h2>\n        <h3>Personal Information</h3>\n        <p><b>Name:</b> <span contenteditable =\"true\"> ".concat(name, "</span></p>\n        <p><b>Email:</b><span contenteditable =\"true\"> ").concat(email, "</span></p>\n        <p><b>Phone:</b><span contenteditable =\"true\"> ").concat(phone, "</span></p>\n        <p><b>Address:</b> ").concat(address, "</span></p>\n        \n        <h3>Education</h3>\n        <p contenteditable =\"true\">").concat(education, "</p>\n        \n        <h3>Experience</h3>\n        <p contenteditable =\"true\">").concat(experience, "</p>\n        \n        <h3>Skills</h3>\n        <p contenteditable =\"true\">").concat(skills, "</p>\n    ");
    // Display the generated resume
    displayArea.innerHTML = resumeContent;
    // Create and Display Shareable URL With Username Only
    var shareableURL = "".concat(window.location.origin, "?username=").concat(encodeURIComponent(username));
    shareableLink.href = shareableURL;
    shareableLink.textContent = shareableURL;
    shareableLinkContainer.style.display = 'block';
});
// handle PDF download
downloadPdfButton.addEventListener('click', function () {
    window.print();
});
// Prefill The Form Based On Username In URl
window.addEventListener('DOMContentLoaded', function () {
    var URLParams = new URLSearchParams(window.location.search);
    var username = URLParams.get('username');
    if (username) {
        var storedResumeData = localStorage.getItem(username);
        if (storedResumeData) {
            var resumeData = JSON.parse(storedResumeData);
            document.getElementById('username').value =
                username;
            document.getElementById('name').value =
                resumeData.name;
            document.getElementById('email').value =
                resumeData.email;
            document.getElementById('phone').value =
                resumeData.phone;
            document.getElementById('education').value =
                resumeData.education;
            document.getElementById('experience').value
                = resumeData.experience;
            document.getElementById('skills').value =
                resumeData.skills;
        }
    }
});
