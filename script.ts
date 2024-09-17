
// Get References To Form and Display Area

const form = document.getElementById('resume-form') as HTMLFormElement;
const displayArea = document.getElementById('resume-display') as HTMLDivElement;
const shareableLinkContainer = document.getElementById('shareable-link-container') as HTMLDivElement;
const shareableLink = document.getElementById('shareable-link') as HTMLAnchorElement;
const downloadPdfButton = document.getElementById('download-pdf') as HTMLButtonElement;

// Handle Form Submission
form.addEventListener('submit', (event: Event) => {
    event.preventDefault(); // Prevent page reload

    console.log('Form submitted. Preventing default action.');

    // Collect Form Data
    const username = (document.getElementById('username') as HTMLInputElement).value;
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const phone = (document.getElementById('phone') as HTMLInputElement).value;
    const address = (document.getElementById('address') as HTMLInputElement).value;
    const education = (document.getElementById('education') as HTMLTextAreaElement).value;
    const experience = (document.getElementById('experience') as HTMLTextAreaElement).value;
    const skills = (document.getElementById('skills') as HTMLTextAreaElement).value;

    // Save Data to Local Storage
    const resumeData = {
         username,
          name,
           email,
          phone,
          address, 
          education, 
          experience, 
          skills
         };
    localStorage.setItem(username, JSON.stringify(resumeData)); //saving data locally

    // Generate and Display Resume Content

    const resumeContent = `
        <h2>Shareable Resume</h2>
        <h3>Personal Information</h3>
        <p><b>Name:</b> <span contenteditable ="true"> ${name}</span></p>
        <p><b>Email:</b><span contenteditable ="true"> ${email}</span></p>
        <p><b>Phone:</b><span contenteditable ="true"> ${phone}</span></p>
        <p><b>Address:</b> ${address}</span></p>
        
        <h3>Education</h3>
        <p contenteditable ="true">${education}</p>
        
        <h3>Experience</h3>
        <p contenteditable ="true">${experience}</p>
        
        <h3>Skills</h3>
        <p contenteditable ="true">${skills}</p>
    `;

    // Display the generated resume
    displayArea.innerHTML = resumeContent;

    // Create and Display Shareable URL With Username Only
    const shareableURL = 
    `${window.location.origin}?username=${encodeURIComponent(username)}`;
    shareableLink.href = shareableURL;
    shareableLink.textContent = shareableURL;
    shareableLinkContainer.style.display = 'block';
});
// handle PDF download
downloadPdfButton.addEventListener('click', () => {
    window.print();
});

// Prefill The Form Based On Username In URl
window.addEventListener('DOMContentLoaded', () => {
    const URLParams = new URLSearchParams(window.location.search);
    const username = URLParams.get('username');
    
    if (username) {
        const storedResumeData = localStorage.getItem(username);
        if (storedResumeData) {
            const resumeData = JSON.parse(storedResumeData);
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

});

