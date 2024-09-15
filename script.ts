/// Get Refrences To Form and Display Area

const form2 = document.getElementById('resume-form') as HTMLFormElement;
const displayArea2 = document.getElementById('resume-display') as HTMLDivElement;
const shareableLinkContainer = document.getElementById('shareable-link-container') as HTMLDivElement;
const shareableLink = document.getElementById('shareable-link') as HTMLAnchorElement;
const downloadPdfBotton = document.getElementById('download-pdf') as HTMLButtonElement;

// Handle Form Submission
form2.addEventListener('submit', (event:Event) => {
    event.preventDefault(); //prevent page reload

    // Input Collection
    const username = (document.getElementById('username')as HTMLInputElement).value;
    const name = (document.getElementById('name') as HTMLInputElement).value
    const email = (document.getElementById('email') as HTMLInputElement).value
    const phone = (document.getElementById('phone') as HTMLInputElement).value
    const address = (document.getElementById('address') as HTMLInputElement).value
    const education = (document.getElementById('education') as HTMLInputElement).value
    const experience = (document.getElementById('experience') as HTMLInputElement).value
    const skills = (document.getElementById('skills') as HTMLInputElement).value

    // save form data in local storage with the username as the key
    const resumedata ={
        username:username,
        name:name,
        email:email,
        phone:phone,
        address:address,
        education:education,
        experience:experience,
        skills:skills
    };

    localStorage.setItem(username, JSON.stringify(resumedata)); // saving the data locally
 
// Generate the resume content dynamically
const resumeContent = `

<h2>Sheareable Resume</h2>
<h3>Personal Information</h3>
<p><b>Name:</b> <span contenteditable="true">${name}</span></p>
<p><b>Email:</b> <span contenteditable="true">${email}</span></p>
<p><b>Phone:</b> <span contenteditable="true">${phone}</span></p>
<h3>Education</h3>
<p contenteditable="true">${education}</p>
<h3>Experience</h3>
<p contenteditable="true">${experience}</p>
<h3>Skills</h3>
<p contenteditable="true">${skills}</p>
`;
// Display the generated resume
displayArea2.innerHTML = resumeContent;
// Generate a shareable URL with the username only
const shareableURL =
`${window.location.origin}?username=${encodeURIComponent(username)}`;
// Display the shareable link
shareableLinkContainer.style.display = 'block';
shareableLink.href = shareableURL;
shareableLink.textContent = shareableURL;
});
// Handle PDF download
downloadPdfBotton.addEventListener('click', () => {
window.print(); // This will open the print dialog and allow the user to save
//as PDF
});
// Prefill the form based on the username in the URL
window.addEventListener('DOMContentLoaded', () => {
const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get('username');
if (username) {
    // Autofill form if data is found in localStorage
const savedResumeData = localStorage.getItem(username);
if (savedResumeData) {
const resumeData = JSON.parse(savedResumeData);
(document.getElementById('username') as HTMLInputElement).value =
username;
(document.getElementById('name') as HTMLInputElement).value =
resumeData.name;
(document.getElementById('email') as HTMLInputElement).value =
resumeData.email;
(document.getElementById('phone') as HTMLInputElement).value =
resumeData.phone;
(document.getElementById('education') as HTMLTextAreaElement).value =
resumeData.education;
(document.getElementById('experience') as HTMLTextAreaElement).value
= resumeData.experience;
(document.getElementById('skills') as HTMLTextAreaElement).value =
resumeData.skills;
}
}
}
);