// Default content with YOUR information
const defaultContent = {
    "hero-name": "DASARI LAL KUMAR",
    "hero-title": "Frontend Developer",
    "about-text": "Aspiring front-end developer with hands-on experience in building dynamic and responsive web applications. Proficient in HTML, CSS, JavaScript, and Bootstrap, with a strong foundation in Python, Java, and SQL. Seeking to leverage my skills and training to contribute effectively to challenging projects.",
    "skills-list": "HTML,CSS,JavaScript,React,Bootstrap,Python,Java,SQL",
    "contact-email": "dasarilalkumar@gmail.com",
    "contact-phone": "8688876024",
    "contact-location": "Hyderabad",
    "logo-text": "DASARI LAL KUMAR",
    "experience": [
        {
            "id": 1,
            "title": "Frontend Developer Intern",
            "company": "Tech Solutions Inc.",
            "date": "2023 - Present",
            "description": "Developing responsive web applications using React and modern JavaScript. Collaborating with senior developers to implement user interfaces and fix bugs."
        },
        {
            "id": 2,
            "title": "Web Development Trainee",
            "company": "Digital Innovations",
            "date": "2022 - 2023",
            "description": "Learned web development fundamentals and built multiple projects. Gained experience in HTML, CSS, JavaScript and responsive design principles."
        }
    ],
    "projects": [
        {
            "id": 1,
            "title": "Portfolio Website",
            "description": "A responsive portfolio website with dynamic content editing capabilities built with HTML, CSS, and JavaScript.",
            "technologies": "HTML,CSS,JavaScript",
            "demoUrl": "#",
            "codeUrl": "#",
            "color": "#3498db"
        },
        {
            "id": 2,
            "title": "Task Management App",
            "description": "A simple task management application with add, edit, delete and filter functionality.",
            "technologies": "JavaScript,HTML,CSS",
            "demoUrl": "#",
            "codeUrl": "#",
            "color": "#e74c3c"
        },
        {
            "id": 3,
            "title": "Weather Dashboard",
            "description": "A weather application that displays current weather and forecast using a weather API.",
            "technologies": "JavaScript,API,HTML,CSS",
            "demoUrl": "#",
            "codeUrl": "#",
            "color": "#2ecc71"
        }
    ]
};

// DOM Elements
const editToggle = document.getElementById('editToggle');
const editPanel = document.getElementById('editPanel');
const editClose = document.getElementById('editClose');
const saveChanges = document.getElementById('saveChanges');
const resetContent = document.getElementById('resetContent');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const contactForm = document.getElementById('contactForm');
const tabButtons = document.querySelectorAll('.tab-button');
const addExperience = document.getElementById('addExperience');
const experienceList = document.getElementById('experienceList');
const experienceForm = document.getElementById('experienceForm');
const saveExperience = document.getElementById('saveExperience');
const cancelExperience = document.getElementById('cancelExperience');
const addProject = document.getElementById('addProject');
const projectList = document.getElementById('projectList');
const projectForm = document.getElementById('projectForm');
const saveProject = document.getElementById('saveProject');
const cancelProject = document.getElementById('cancelProject');
const downloadResumeBtn = document.getElementById('downloadResumeBtn');
const resumeModal = document.getElementById('resumeModal');
const resumeClose = document.getElementById('resumeClose');
const resumeBody = document.getElementById('resumeBody');
const downloadResume = document.getElementById('downloadResume');
const printResume = document.getElementById('printResume');

// State variables
let currentEditingExpId = null;
let currentEditingProjId = null;

// Initialize the portfolio
function initPortfolio() {
    console.log("Initializing portfolio...");
    
    // Load saved content or use defaults
    Object.keys(defaultContent).forEach(key => {
        if (key === 'experience' || key === 'projects') {
            // Handle arrays separately
            const savedValue = localStorage.getItem(key);
            let value;
            
            try {
                value = savedValue !== null ? JSON.parse(savedValue) : defaultContent[key];
            } catch (e) {
                console.error(`Error parsing ${key}:`, e);
                value = defaultContent[key];
            }
            
            if (key === 'experience') {
                renderExperience(value);
                renderExperienceList(value);
            } else if (key === 'projects') {
                renderProjects(value);
                renderProjectList(value);
            }
        } else {
            const savedValue = localStorage.getItem(key);
            const value = savedValue !== null ? savedValue : defaultContent[key];
            
            console.log(`Setting ${key}:`, value);
            
            // Update all elements with this data-id
            document.querySelectorAll(`[data-id="${key}"]`).forEach(element => {
                if (key === 'skills-list') {
                    // Special handling for skills
                    updateSkills(value);
                } else {
                    element.textContent = value;
                }
            });
            
            // Update edit panel inputs - ONLY for basic info tab
            if (key !== 'experience' && key !== 'projects') {
                const editInput = document.getElementById(`edit${key.split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('')}`);
                if (editInput) {
                    editInput.value = value;
                }
            }
        }
    });
    
    // Initialize the edit panel with current values
    initializeEditPanel();
}

// Initialize edit panel with current values
function initializeEditPanel() {
    const basicInfoFields = ['hero-name', 'hero-title', 'about-text', 'skills-list', 'contact-email', 'contact-phone', 'contact-location'];
    
    basicInfoFields.forEach(field => {
        const value = localStorage.getItem(field) || defaultContent[field];
        const input = document.getElementById(`edit${field.split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('')}`);
        if (input) {
            input.value = value;
        }
    });
}

// Update skills display
function updateSkills(skillsString) {
    const skillsContainer = document.querySelector('.skills');
    if (!skillsContainer) return;
    
    skillsContainer.innerHTML = '';
    
    const skills = skillsString.split(',');
    skills.forEach(skill => {
        if (skill.trim()) {
            const skillElement = document.createElement('span');
            skillElement.className = 'skill-tag';
            skillElement.textContent = skill.trim();
            skillsContainer.appendChild(skillElement);
        }
    });
}

// Render experience in the timeline
function renderExperience(experiences) {
    const experienceContainer = document.getElementById('experienceContainer');
    if (!experienceContainer) return;
    
    experienceContainer.innerHTML = '';
    
    experiences.forEach((exp, index) => {
        const expElement = document.createElement('div');
        expElement.className = 'timeline-item';
        expElement.innerHTML = `
            <div class="timeline-content">
                <span class="timeline-date">${exp.date}</span>
                <h3>${exp.title}</h3>
                <p class="resume-item-company">${exp.company}</p>
                <p>${exp.description}</p>
            </div>
        `;
        experienceContainer.appendChild(expElement);
    });
}

// Render projects in the projects section
function renderProjects(projects) {
    const projectsContainer = document.getElementById('projectsContainer');
    if (!projectsContainer) return;
    
    projectsContainer.innerHTML = '';
    
    projects.forEach(project => {
        const projectElement = document.createElement('div');
        projectElement.className = 'project-card';
        projectElement.innerHTML = `
            <div class="project-img" style="background:${project.color};">
                <i class="fas fa-project-diagram"></i>
            </div>
            <div class="project-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tech">
                    ${project.technologies.split(',').map(tech => `<span class="tech-tag">${tech.trim()}</span>`).join('')}
                </div>
                <div class="project-links">
                    <a href="${project.demoUrl}" target="_blank" title="View live demo">
                        <i class="fas fa-external-link-alt"></i> Live Demo
                    </a>
                    <a href="${project.codeUrl}" target="_blank" title="View source code">
                        <i class="fab fa-github"></i> View Code
                    </a>
                </div>
            </div>
        `;
        projectsContainer.appendChild(projectElement);
    });
}

// Render experience list in the edit panel
function renderExperienceList(experiences) {
    if (!experienceList) return;
    
    experienceList.innerHTML = '';
    
    experiences.forEach(exp => {
        const expItem = document.createElement('div');
        expItem.className = 'item-card';
        expItem.innerHTML = `
            <div>
                <strong>${exp.title}</strong> at ${exp.company}
                <div style="font-size: 0.9rem; color: #666;">${exp.date}</div>
            </div>
            <div class="item-actions">
                <button class="item-action edit-exp" data-id="${exp.id}" title="Edit this experience">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="item-action delete-exp" data-id="${exp.id}" title="Delete this experience">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        experienceList.appendChild(expItem);
    });
    
    // Add event listeners to the buttons
    document.querySelectorAll('.edit-exp').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = parseInt(e.target.closest('button').getAttribute('data-id'));
            editExperience(id);
        });
    });
    
    document.querySelectorAll('.delete-exp').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = parseInt(e.target.closest('button').getAttribute('data-id'));
            deleteExperience(id);
        });
    });
}

// Render project list in the edit panel
function renderProjectList(projects) {
    if (!projectList) return;
    
    projectList.innerHTML = '';
    
    projects.forEach(project => {
        const projItem = document.createElement('div');
        projItem.className = 'item-card';
        projItem.innerHTML = `
            <div>
                <strong>${project.title}</strong>
                <div style="font-size: 0.9rem; color: #666;">${project.technologies}</div>
            </div>
            <div class="item-actions">
                <button class="item-action edit-proj" data-id="${project.id}" title="Edit this project">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="item-action delete-proj" data-id="${project.id}" title="Delete this project">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        projectList.appendChild(projItem);
    });
    
    // Add event listeners to the buttons
    document.querySelectorAll('.edit-proj').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = parseInt(e.target.closest('button').getAttribute('data-id'));
            editProject(id);
        });
    });
    
    document.querySelectorAll('.delete-proj').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = parseInt(e.target.closest('button').getAttribute('data-id'));
            deleteProject(id);
        });
    });
}

// Generate and display resume
function generateResume() {
    const name = localStorage.getItem('hero-name') || defaultContent['hero-name'];
    const title = localStorage.getItem('hero-title') || defaultContent['hero-title'];
    const about = localStorage.getItem('about-text') || defaultContent['about-text'];
    const skills = localStorage.getItem('skills-list') || defaultContent['skills-list'];
    const email = localStorage.getItem('contact-email') || defaultContent['contact-email'];
    const phone = localStorage.getItem('contact-phone') || defaultContent['contact-phone'];
    const location = localStorage.getItem('contact-location') || defaultContent['contact-location'];
    
    let experiences, projects;
    try {
        experiences = JSON.parse(localStorage.getItem('experience')) || defaultContent.experience;
        projects = JSON.parse(localStorage.getItem('projects')) || defaultContent.projects;
    } catch (e) {
        experiences = defaultContent.experience;
        projects = defaultContent.projects;
    }
    
    // Check if skills are empty
    const skillsArray = skills.split(',').filter(skill => skill.trim() !== '');
    
    if (skillsArray.length === 0) {
        // Show empty resume message
        resumeBody.innerHTML = `
            <div class="resume-empty">
                <i class="fas fa-file-alt"></i>
                <h3>No Skills Added</h3>
                <p>Your resume is empty because you haven't added any skills yet.</p>
                <p>Please add your skills in the "Basic Info" tab to generate a resume.</p>
            </div>
        `;
        return;
    }
    
    // Generate resume content
    let resumeHTML = `
        <div class="resume-section">
            <h2>${name}</h2>
            <p><strong>${title}</strong></p>
            <p>${email} | ${phone} | ${location}</p>
        </div>
        
        <div class="resume-section">
            <h3>Professional Summary</h3>
            <p>${about}</p>
        </div>
        
        <div class="resume-section">
            <h3>Skills</h3>
            <div class="resume-skills">
                ${skillsArray.map(skill => `<span class="resume-skill">${skill.trim()}</span>`).join('')}
            </div>
        </div>
    `;
    
    // Add experience if available
    if (experiences.length > 0) {
        resumeHTML += `
            <div class="resume-section">
                <h3>Work Experience</h3>
                ${experiences.map(exp => `
                    <div class="resume-item">
                        <div class="resume-item-header">
                            <div class="resume-item-title">${exp.title}</div>
                            <div class="resume-item-date">${exp.date}</div>
                        </div>
                        <div class="resume-item-company">${exp.company}</div>
                        <p>${exp.description}</p>
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    // Add projects if available
    if (projects.length > 0) {
        resumeHTML += `
            <div class="resume-section">
                <h3>Projects</h3>
                ${projects.map(project => `
                    <div class="resume-item">
                        <div class="resume-item-header">
                            <div class="resume-item-title">${project.title}</div>
                        </div>
                        <p>${project.description}</p>
                        <p><strong>Technologies:</strong> ${project.technologies}</p>
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    resumeBody.innerHTML = resumeHTML;
}

// Download resume as PDF
function downloadResumeAsPDF() {
    const name = localStorage.getItem('hero-name') || defaultContent['hero-name'];
    
    // Check if skills are empty
    const skills = localStorage.getItem('skills-list') || defaultContent['skills-list'];
    const skillsArray = skills.split(',').filter(skill => skill.trim() !== '');
    
    if (skillsArray.length === 0) {
        alert('Cannot download empty resume. Please add skills first.');
        return;
    }
    
    // In a real implementation, you would use a library like jsPDF
    // For this example, we'll just show an alert
    alert(`Resume for ${name} would be downloaded as PDF in a real implementation.`);
}

// Print resume
function printResumeDocument() {
    // Check if skills are empty
    const skills = localStorage.getItem('skills-list') || defaultContent['skills-list'];
    const skillsArray = skills.split(',').filter(skill => skill.trim() !== '');
    
    if (skillsArray.length === 0) {
        alert('Cannot print empty resume. Please add skills first.');
        return;
    }
    
    // In a real implementation, you would set up print styles
    // For this example, we'll just use the browser's print function
    window.print();
}

// Add new experience
function addNewExperience() {
    currentEditingExpId = null;
    experienceForm.classList.add('active');
    
    // Clear the form
    document.getElementById('expTitle').value = '';
    document.getElementById('expCompany').value = '';
    document.getElementById('expDate').value = '';
    document.getElementById('expDescription').value = '';
}

// Edit existing experience
function editExperience(id) {
    let experiences;
    try {
        experiences = JSON.parse(localStorage.getItem('experience')) || defaultContent.experience;
    } catch (e) {
        experiences = defaultContent.experience;
    }
    
    const exp = experiences.find(e => e.id === id);
    
    if (exp) {
        currentEditingExpId = id;
        experienceForm.classList.add('active');
        
        // Fill the form with existing data
        document.getElementById('expTitle').value = exp.title;
        document.getElementById('expCompany').value = exp.company;
        document.getElementById('expDate').value = exp.date;
        document.getElementById('expDescription').value = exp.description;
    }
}

// Save experience (new or edited)
function saveExperienceItem() {
    const title = document.getElementById('expTitle').value;
    const company = document.getElementById('expCompany').value;
    const date = document.getElementById('expDate').value;
    const description = document.getElementById('expDescription').value;
    
    if (!title || !company || !date || !description) {
        alert('Please fill in all fields');
        return;
    }
    
    let experiences;
    try {
        experiences = JSON.parse(localStorage.getItem('experience')) || defaultContent.experience;
    } catch (e) {
        experiences = defaultContent.experience;
    }
    
    if (currentEditingExpId) {
        // Update existing experience
        const index = experiences.findIndex(e => e.id === currentEditingExpId);
        if (index !== -1) {
            experiences[index] = {
                id: currentEditingExpId,
                title,
                company,
                date,
                description
            };
        }
    } else {
        // Add new experience
        const newId = experiences.length > 0 ? Math.max(...experiences.map(e => e.id)) + 1 : 1;
        experiences.push({
            id: newId,
            title,
            company,
            date,
            description
        });
    }
    
    // Save to localStorage
    localStorage.setItem('experience', JSON.stringify(experiences));
    
    // Update the display
    renderExperience(experiences);
    renderExperienceList(experiences);
    
    // Hide the form
    experienceForm.classList.remove('active');
    currentEditingExpId = null;
    
    alert('Experience saved successfully!');
}

// Delete experience
function deleteExperience(id) {
    if (confirm('Are you sure you want to delete this experience?')) {
        let experiences;
        try {
            experiences = JSON.parse(localStorage.getItem('experience')) || defaultContent.experience;
        } catch (e) {
            experiences = defaultContent.experience;
        }
        
        const filtered = experiences.filter(e => e.id !== id);
        
        // Save to localStorage
        localStorage.setItem('experience', JSON.stringify(filtered));
        
        // Update the display
        renderExperience(filtered);
        renderExperienceList(filtered);
        
        alert('Experience deleted successfully!');
    }
}

// Add new project
function addNewProject() {
    currentEditingProjId = null;
    projectForm.classList.add('active');
    
    // Clear the form
    document.getElementById('projTitle').value = '';
    document.getElementById('projDescription').value = '';
    document.getElementById('projTech').value = '';
    document.getElementById('projDemo').value = '';
    document.getElementById('projCode').value = '';
}

// Edit existing project
function editProject(id) {
    let projects;
    try {
        projects = JSON.parse(localStorage.getItem('projects')) || defaultContent.projects;
    } catch (e) {
        projects = defaultContent.projects;
    }
    
    const project = projects.find(p => p.id === id);
    
    if (project) {
        currentEditingProjId = id;
        projectForm.classList.add('active');
        
        // Fill the form with existing data
        document.getElementById('projTitle').value = project.title;
        document.getElementById('projDescription').value = project.description;
        document.getElementById('projTech').value = project.technologies;
        document.getElementById('projDemo').value = project.demoUrl;
        document.getElementById('projCode').value = project.codeUrl;
    }
}

// Save project (new or edited)
function saveProjectItem() {
    const title = document.getElementById('projTitle').value;
    const description = document.getElementById('projDescription').value;
    const technologies = document.getElementById('projTech').value;
    const demoUrl = document.getElementById('projDemo').value;
    const codeUrl = document.getElementById('projCode').value;
    
    if (!title || !description || !technologies) {
        alert('Please fill in all required fields');
        return;
    }
    
    let projects;
    try {
        projects = JSON.parse(localStorage.getItem('projects')) || defaultContent.projects;
    } catch (e) {
        projects = defaultContent.projects;
    }
    
    const colors = ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6', '#1abc9c'];
    
    if (currentEditingProjId) {
        // Update existing project
        const index = projects.findIndex(p => p.id === currentEditingProjId);
        if (index !== -1) {
            projects[index] = {
                ...projects[index],
                title,
                description,
                technologies,
                demoUrl: demoUrl || '#',
                codeUrl: codeUrl || '#'
            };
        }
    } else {
        // Add new project
        const newId = projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1;
        const color = colors[projects.length % colors.length];
        
        projects.push({
            id: newId,
            title,
            description,
            technologies,
            demoUrl: demoUrl || '#',
            codeUrl: codeUrl || '#',
            color
        });
    }
    
    // Save to localStorage
    localStorage.setItem('projects', JSON.stringify(projects));
    
    // Update the display
    renderProjects(projects);
    renderProjectList(projects);
    
    // Hide the form
    projectForm.classList.remove('active');
    currentEditingProjId = null;
    
    alert('Project saved successfully!');
}

// Delete project
function deleteProject(id) {
    if (confirm('Are you sure you want to delete this project?')) {
        let projects;
        try {
            projects = JSON.parse(localStorage.getItem('projects')) || defaultContent.projects;
        } catch (e) {
            projects = defaultContent.projects;
        }
        
        const filtered = projects.filter(p => p.id !== id);
        
        // Save to localStorage
        localStorage.setItem('projects', JSON.stringify(filtered));
        
        // Update the display
        renderProjects(filtered);
        renderProjectList(filtered);
        
        alert('Project deleted successfully!');
    }
}

// Toggle edit mode
function toggleEditMode() {
    editPanel.classList.toggle('active');
}

// Save changes to basic info - FIXED VERSION
function saveContentChanges() {
    // Only save basic info fields when on the basic info tab
    const activeTab = document.querySelector('.tab-content.active');
    
    if (activeTab && activeTab.id === 'basic-tab') {
        const editInputs = document.querySelectorAll('#basic-tab .edit-control');
        let hasChanges = false;
        
        editInputs.forEach(input => {
            const target = input.getAttribute('data-target');
            const value = input.value.trim();
            
            if (value) {
                // Save to localStorage
                localStorage.setItem(target, value);
                
                // Update all elements with this data-id
                document.querySelectorAll(`[data-id="${target}"]`).forEach(element => {
                    if (target === 'skills-list') {
                        // Special handling for skills
                        updateSkills(value);
                    } else {
                        element.textContent = value;
                    }
                });
                hasChanges = true;
            }
        });
        
        if (hasChanges) {
            alert('Basic information saved successfully!');
        } else {
            alert('Please fill in all fields before saving.');
        }
    } else {
        alert('Please switch to the "Basic Info" tab to save basic information changes.');
    }
}

// Reset to default content
function resetToDefault() {
    if (confirm('Are you sure you want to reset all content to default? This cannot be undone.')) {
        Object.keys(defaultContent).forEach(key => {
            localStorage.removeItem(key);
        });
        initPortfolio();
        alert('Content reset to default.');
    }
}

// Switch tabs in edit panel
function switchTab(tabName) {
    // Update tab buttons
    tabButtons.forEach(button => {
        if (button.getAttribute('data-tab') === tabName) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
    
    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => {
        if (content.id === `${tabName}-tab`) {
            content.classList.add('active');
        } else {
            content.classList.remove('active');
        }
    });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM loaded, initializing portfolio...");
    
    // Initialize the portfolio
    initPortfolio();
    
    // Set up event listeners
    if (editToggle) editToggle.addEventListener('click', toggleEditMode);
    if (editClose) editClose.addEventListener('click', toggleEditMode);
    if (saveChanges) saveChanges.addEventListener('click', saveContentChanges);
    if (resetContent) resetContent.addEventListener('click', resetToDefault);

    // Tab switching
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabName = button.getAttribute('data-tab');
            switchTab(tabName);
        });
    });

    // Experience editing
    if (addExperience) addExperience.addEventListener('click', addNewExperience);
    if (saveExperience) saveExperience.addEventListener('click', saveExperienceItem);
    if (cancelExperience) cancelExperience.addEventListener('click', () => {
        experienceForm.classList.remove('active');
        currentEditingExpId = null;
    });

    // Project editing
    if (addProject) addProject.addEventListener('click', addNewProject);
    if (saveProject) saveProject.addEventListener('click', saveProjectItem);
    if (cancelProject) cancelProject.addEventListener('click', () => {
        projectForm.classList.remove('active');
        currentEditingProjId = null;
    });

    // Resume functionality
    if (downloadResumeBtn) downloadResumeBtn.addEventListener('click', () => {
        generateResume();
        resumeModal.classList.add('active');
    });

    if (resumeClose) resumeClose.addEventListener('click', () => {
        resumeModal.classList.remove('active');
    });

    if (downloadResume) downloadResume.addEventListener('click', downloadResumeAsPDF);
    if (printResume) printResume.addEventListener('click', printResumeDocument);

    // Close modal when clicking outside
    if (resumeModal) resumeModal.addEventListener('click', (e) => {
        if (e.target === resumeModal) {
            resumeModal.classList.remove('active');
        }
    });

    // Mobile menu toggle
    if (menuToggle) menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // Form submission
    if (contactForm) contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
});