/* =====================================================
   PRO RESUME BUILDER - COMPLETE SCRIPT
===================================================== */

let skills = [];
let currentTemplate = "modern";
let photoData = "";
let draggedSection = null;
let isLoading = false;


/* =====================================================
   HELPER
===================================================== */

function escapeHTML(value) {

    if (value === null || value === undefined) {
        return "";
    }

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


/* =====================================================
   UPDATE COMPLETE RESUME
===================================================== */

function updateResume() {

    // Personal information
    const name =
        document.getElementById("name")?.value || "";

    const title =
        document.getElementById("title")?.value || "";

    const email =
        document.getElementById("email")?.value || "";

    const phone =
        document.getElementById("phone")?.value || "";

    const location =
        document.getElementById("location")?.value || "";

    const linkedin =
        document.getElementById("linkedin")?.value || "";

    const github =
        document.getElementById("github")?.value || "";


    // Preview
    setText("previewName", name || "Your Name");
    setText("previewTitle", title || "Professional Title");

    setText("previewEmail", email);
    setText("previewPhone", phone);
    setText("previewLocation", location);

    setText("previewLinkedin", linkedin);
    setText("previewGithub", github);


    // Summary
    const summary =
        document.getElementById("summary")?.value || "";

    const previewSummary =
        document.getElementById("previewSummary");

    if (previewSummary) {
        previewSummary.innerHTML =
            escapeHTML(summary).replace(/\n/g, "<br>");
    }


    // Dynamic sections
    updateEducationPreview();
    updateSkillsPreview();
    updateExperiencePreview();
    updateProjectsPreview();
    updateCertificatesPreview();

    updateProgress();


    if (!isLoading) {
        autoSave();
    }
}


/* =====================================================
   SET TEXT
===================================================== */

function setText(id, value) {

    const element =
        document.getElementById(id);

    if (element) {
        element.textContent = value;
    }
}


/* =====================================================
   EDUCATION
===================================================== */

function addEducation(data = {}) {

    const container =
        document.getElementById("educationContainer");

    if (!container) return;


    const item =
        document.createElement("div");

    item.className = "dynamic-item education-item";

    item.innerHTML = `

        <div class="form-grid">

            <div class="form-group">

                <label>Degree</label>

                <input
                    type="text"
                    class="edu-degree"
                    placeholder="B.Tech Computer Science"
                    value="${escapeHTML(data.degree || "")}"
                    oninput="updateResume()">

            </div>


            <div class="form-group">

                <label>College / University</label>

                <input
                    type="text"
                    class="edu-college"
                    placeholder="DAVV Indore"
                    value="${escapeHTML(data.college || "")}"
                    oninput="updateResume()">

            </div>


            <div class="form-group">

                <label>Year</label>

                <input
                    type="text"
                    class="edu-year"
                    placeholder="2024 - 2028"
                    value="${escapeHTML(data.year || "")}"
                    oninput="updateResume()">

            </div>


            <div class="form-group">

                <label>CGPA / Percentage</label>

                <input
                    type="text"
                    class="edu-score"
                    placeholder="8.2 CGPA"
                    value="${escapeHTML(data.score || "")}"
                    oninput="updateResume()">

            </div>

        </div>


        <button
            type="button"
            class="delete-btn"
            onclick="deleteItem(this)">
            Delete
        </button>
    `;

    container.appendChild(item);

    updateResume();
}


/* =====================================================
   EDUCATION PREVIEW
===================================================== */

function updateEducationPreview() {

    const container =
        document.getElementById("previewEducation");

    if (!container) return;


    const data =
        getEducationData();

    container.innerHTML = "";


    data.forEach(item => {

        if (
            !item.degree &&
            !item.college &&
            !item.year &&
            !item.score
        ) {
            return;
        }


        const div =
            document.createElement("div");

        div.className = "resume-item";

        div.innerHTML = `

            <h3>
                ${escapeHTML(item.degree)}
            </h3>

            <p>
                ${escapeHTML(item.college)}
            </p>

            <span>
                ${escapeHTML(item.year)}
                ${item.score ? " • " + escapeHTML(item.score) : ""}
            </span>

        `;

        container.appendChild(div);
    });
}


/* =====================================================
   GET EDUCATION DATA
===================================================== */

function getEducationData() {

    const items =
        document.querySelectorAll(
            ".education-item"
        );

    const data = [];


    items.forEach(item => {

        data.push({

            degree:
                item.querySelector(".edu-degree")?.value || "",

            college:
                item.querySelector(".edu-college")?.value || "",

            year:
                item.querySelector(".edu-year")?.value || "",

            score:
                item.querySelector(".edu-score")?.value || ""

        });

    });


    return data;
}


/* =====================================================
   SKILLS
===================================================== */

function addSkill() {

    const input =
        document.getElementById("skillInput");

    if (!input) return;


    const value =
        input.value.trim();

    if (!value) return;


    skills.push(value);

    input.value = "";

    displaySkills();

    updateResume();
}


/* =====================================================
   DISPLAY SKILLS
===================================================== */

function displaySkills() {

    const container =
        document.getElementById("skillsContainer");

    if (!container) return;


    container.innerHTML = "";


    skills.forEach((skill, index) => {

        const div =
            document.createElement("div");

        div.className = "skill";

        div.innerHTML = `

            <span>
                ${escapeHTML(skill)}
            </span>

            <button
                type="button"
                onclick="deleteSkill(${index})">
                ×
            </button>

        `;

        container.appendChild(div);
    });
}


/* =====================================================
   DELETE SKILL
===================================================== */

function deleteSkill(index) {

    skills.splice(index, 1);

    displaySkills();

    updateResume();
}


/* =====================================================
   SKILLS PREVIEW
===================================================== */

function updateSkillsPreview() {

    const container =
        document.getElementById("previewSkills");

    if (!container) return;


    container.innerHTML = "";


    skills.forEach(skill => {

        const span =
            document.createElement("span");

        span.className = "resume-skill";

        span.textContent = skill;

        container.appendChild(span);
    });
}


/* =====================================================
   EXPERIENCE
===================================================== */

function addExperience(data = {}) {

    const container =
        document.getElementById("experienceContainer");

    if (!container) return;


    const item =
        document.createElement("div");

    item.className =
        "dynamic-item experience-item";


    item.innerHTML = `

        <div class="form-grid">

            <div class="form-group">

                <label>Job Title</label>

                <input
                    type="text"
                    class="exp-role"
                    placeholder="Software Developer Intern"
                    value="${escapeHTML(data.role || "")}"
                    oninput="updateResume()">

            </div>


            <div class="form-group">

                <label>Company</label>

                <input
                    type="text"
                    class="exp-company"
                    placeholder="Company Name"
                    value="${escapeHTML(data.company || "")}"
                    oninput="updateResume()">

            </div>


            <div class="form-group">

                <label>Duration</label>

                <input
                    type="text"
                    class="exp-duration"
                    placeholder="June 2025 - August 2025"
                    value="${escapeHTML(data.duration || "")}"
                    oninput="updateResume()">

            </div>

        </div>


        <div class="form-group">

            <label>Description</label>

            <textarea
                class="exp-description"
                placeholder="Describe your work..."
                oninput="updateResume()">${escapeHTML(data.description || "")}</textarea>

        </div>


        <button
            type="button"
            class="delete-btn"
            onclick="deleteItem(this)">
            Delete
        </button>

    `;


    container.appendChild(item);

    updateResume();
}


/* =====================================================
   EXPERIENCE PREVIEW
===================================================== */

function updateExperiencePreview() {

    const container =
        document.getElementById("previewExperience");

    if (!container) return;


    const data =
        getExperienceData();

    container.innerHTML = "";


    data.forEach(item => {

        if (
            !item.role &&
            !item.company &&
            !item.duration &&
            !item.description
        ) {
            return;
        }


        const div =
            document.createElement("div");

        div.className = "resume-item";

        div.innerHTML = `

            <h3>
                ${escapeHTML(item.role)}
            </h3>

            <p>
                ${escapeHTML(item.company)}
            </p>

            <span>
                ${escapeHTML(item.duration)}
            </span>

            <div>
                ${escapeHTML(item.description)
                    .replace(/\n/g, "<br>")}
            </div>

        `;

        container.appendChild(div);
    });
}


/* =====================================================
   GET EXPERIENCE
===================================================== */

function getExperienceData() {

    const items =
        document.querySelectorAll(
            ".experience-item"
        );

    const data = [];


    items.forEach(item => {

        data.push({

            role:
                item.querySelector(".exp-role")?.value || "",

            company:
                item.querySelector(".exp-company")?.value || "",

            duration:
                item.querySelector(".exp-duration")?.value || "",

            description:
                item.querySelector(".exp-description")?.value || ""

        });

    });


    return data;
}


/* =====================================================
   PROJECTS
===================================================== */

function addProject(data = {}) {

    const container =
        document.getElementById("projectsContainer");

    if (!container) return;


    const item =
        document.createElement("div");

    item.className =
        "dynamic-item project-item";


    item.innerHTML = `

        <div class="form-grid">

            <div class="form-group">

                <label>Project Name</label>

                <input
                    type="text"
                    class="project-name"
                    placeholder="Online Voting System"
                    value="${escapeHTML(data.name || "")}"
                    oninput="updateResume()">

            </div>


            <div class="form-group">

                <label>Technology</label>

                <input
                    type="text"
                    class="project-tech"
                    placeholder="HTML, CSS, JavaScript"
                    value="${escapeHTML(data.tech || "")}"
                    oninput="updateResume()">

            </div>

        </div>


        <div class="form-group">

            <label>Project Link</label>

            <input
                type="text"
                class="project-link"
                placeholder="https://github.com/..."
                value="${escapeHTML(data.link || "")}"
                oninput="updateResume()">

        </div>


        <div class="form-group">

            <label>Description</label>

            <textarea
                class="project-description"
                placeholder="Describe your project..."
                oninput="updateResume()">${escapeHTML(data.description || "")}</textarea>

        </div>


        <button
            type="button"
            class="delete-btn"
            onclick="deleteItem(this)">
            Delete
        </button>

    `;


    container.appendChild(item);

    updateResume();
}


/* =====================================================
   PROJECT PREVIEW
===================================================== */

function updateProjectsPreview() {

    const container =
        document.getElementById("previewProjects");

    if (!container) return;


    const data =
        getProjectData();

    container.innerHTML = "";


    data.forEach(item => {

        if (
            !item.name &&
            !item.tech &&
            !item.description
        ) {
            return;
        }


        const div =
            document.createElement("div");

        div.className = "resume-item";


        let linkHTML = "";

        if (item.link) {

            let url = item.link.trim();

            if (
                !url.startsWith("http://") &&
                !url.startsWith("https://")
            ) {
                url = "https://" + url;
            }

            linkHTML = `
                <a
                    href="${escapeHTML(url)}"
                    target="_blank"
                    rel="noopener noreferrer">
                    Project Link
                </a>
            `;
        }


        div.innerHTML = `

            <h3>
                ${escapeHTML(item.name)}
            </h3>

            <p>
                ${escapeHTML(item.tech)}
            </p>

            <div>
                ${escapeHTML(item.description)
                    .replace(/\n/g, "<br>")}
            </div>

            ${linkHTML}

        `;


        container.appendChild(div);
    });
}


/* =====================================================
   GET PROJECT DATA
===================================================== */

function getProjectData() {

    const items =
        document.querySelectorAll(
            ".project-item"
        );

    const data = [];


    items.forEach(item => {

        data.push({

            name:
                item.querySelector(".project-name")?.value || "",

            tech:
                item.querySelector(".project-tech")?.value || "",

            link:
                item.querySelector(".project-link")?.value || "",

            description:
                item.querySelector(".project-description")?.value || ""

        });

    });


    return data;
}


/* =====================================================
   CERTIFICATES
===================================================== */

function addCertificate(data = {}) {

    const container =
        document.getElementById(
            "certificatesContainer"
        );

    if (!container) return;


    const item =
        document.createElement("div");

    item.className =
        "dynamic-item certificate-item";


    item.innerHTML = `

        <div class="form-grid">

            <div class="form-group">

                <label>Certificate Name</label>

                <input
                    type="text"
                    class="certificate-name"
                    placeholder="AWS Cloud Practitioner"
                    value="${escapeHTML(data.name || "")}"
                    oninput="updateResume()">

            </div>


            <div class="form-group">

                <label>Issuer</label>

                <input
                    type="text"
                    class="certificate-issuer"
                    placeholder="Amazon Web Services"
                    value="${escapeHTML(data.issuer || "")}"
                    oninput="updateResume()">

            </div>


            <div class="form-group">

                <label>Year</label>

                <input
                    type="text"
                    class="certificate-year"
                    placeholder="2026"
                    value="${escapeHTML(data.year || "")}"
                    oninput="updateResume()">

            </div>

        </div>


        <div class="form-group">

            <label>Certificate Link</label>

            <input
                type="text"
                class="certificate-link"
                placeholder="https://..."
                value="${escapeHTML(data.link || "")}"
                oninput="updateResume()">

        </div>


        <button
            type="button"
            class="delete-btn"
            onclick="deleteItem(this)">
            Delete
        </button>

    `;


    container.appendChild(item);

    updateResume();
}


/* =====================================================
   CERTIFICATE PREVIEW
===================================================== */

function updateCertificatesPreview() {

    const container =
        document.getElementById(
            "previewCertificates"
        );

    if (!container) return;


    const data =
        getCertificateData();

    container.innerHTML = "";


    data.forEach(item => {

        if (
            !item.name &&
            !item.issuer &&
            !item.year
        ) {
            return;
        }


        const div =
            document.createElement("div");

        div.className = "resume-item";


        let linkHTML = "";

        if (item.link) {

            let url =
                item.link.trim();

            if (
                !url.startsWith("http://") &&
                !url.startsWith("https://")
            ) {
                url = "https://" + url;
            }

            linkHTML = `
                <a
                    href="${escapeHTML(url)}"
                    target="_blank"
                    rel="noopener noreferrer">
                    View Certificate
                </a>
            `;
        }


        div.innerHTML = `

            <h3>
                ${escapeHTML(item.name)}
            </h3>

            <p>
                ${escapeHTML(item.issuer)}
            </p>

            <span>
                ${escapeHTML(item.year)}
            </span>

            ${linkHTML}

        `;


        container.appendChild(div);
    });
}


/* =====================================================
   GET CERTIFICATE DATA
===================================================== */

function getCertificateData() {

    const items =
        document.querySelectorAll(
            ".certificate-item"
        );

    const data = [];


    items.forEach(item => {

        data.push({

            name:
                item.querySelector(
                    ".certificate-name"
                )?.value || "",

            issuer:
                item.querySelector(
                    ".certificate-issuer"
                )?.value || "",

            year:
                item.querySelector(
                    ".certificate-year"
                )?.value || "",

            link:
                item.querySelector(
                    ".certificate-link"
                )?.value || ""

        });

    });


    return data;
}


/* =====================================================
   DELETE DYNAMIC ITEM
===================================================== */

function deleteItem(button) {

    const item =
        button.closest(".dynamic-item");

    if (!item) return;


    item.remove();

    updateResume();
}


/* =====================================================
   TEMPLATE CHANGE
===================================================== */

function changeTemplate(template) {

    const resume =
        document.getElementById("resume");

    if (!resume) return;


    resume.classList.remove(
        "modern",
        "classic",
        "minimal"
    );

    resume.classList.add(template);

    currentTemplate = template;


    // Active template card
    document.querySelectorAll(
        ".template-option"
    ).forEach(option => {

        option.classList.remove("active");

    });


    const selected =
        document.querySelector(
            `.template-option[onclick*="'${template}'"]`
        );

    if (selected) {
        selected.classList.add("active");
    }


    localStorage.setItem(
        "resumeTemplate",
        template
    );
}


/* =====================================================
   PROFILE PHOTO
===================================================== */

function uploadPhoto(event) {

    const file =
        event.target.files?.[0];

    if (!file) return;


    if (!file.type.startsWith("image/")) {

        alert("Please select an image file.");

        return;
    }


    const reader =
        new FileReader();


    reader.onload = function(e) {

        photoData =
            e.target.result;


        // Resume preview photo
        const image =
            document.getElementById(
                "previewPhoto"
            );

        if (image) {

            image.src =
                photoData;

            image.style.display =
                "block";
        }


        // Editor photo
        const editorImage =
            document.getElementById(
                "editorPhotoPreview"
            );

        const placeholder =
            document.getElementById(
                "photoPlaceholder"
            );


        if (editorImage) {

            editorImage.src =
                photoData;

            editorImage.style.display =
                "block";
        }


        if (placeholder) {

            placeholder.style.display =
                "none";
        }


        autoSave();
    };


    reader.readAsDataURL(file);
}


/* =====================================================
   COLOR CUSTOMIZATION
===================================================== */

function changeResumeColor(color) {

    const resume =
        document.getElementById("resume");

    if (!resume) return;


    resume.style.setProperty(
        "--resume-color",
        color
    );


    // Section headings
    resume.querySelectorAll(
        ".resume-section h2"
    ).forEach(element => {

        element.style.color =
            color;

    });


    // Title
    const title =
        document.getElementById(
            "previewTitle"
        );

    if (title) {

        title.style.color =
            color;
    }


    localStorage.setItem(
        "resumeColor",
        color
    );
}


/* =====================================================
   FONT CUSTOMIZATION
===================================================== */

function changeResumeFont(font) {

    const resume =
        document.getElementById("resume");

    if (!resume) return;


    resume.style.fontFamily =
        font;


    localStorage.setItem(
        "resumeFont",
        font
    );
}


/* =====================================================
   LOAD CUSTOMIZATION
===================================================== */

function loadCustomization() {

    const savedColor =
        localStorage.getItem(
            "resumeColor"
        );


    const savedFont =
        localStorage.getItem(
            "resumeFont"
        );


    if (savedColor) {

        changeResumeColor(
            savedColor
        );
    }


    if (savedFont) {

        const select =
            document.getElementById(
                "resumeFont"
            );

        if (select) {
            select.value =
                savedFont;
        }


        changeResumeFont(
            savedFont
        );
    }
}


/* =====================================================
   SECTION SHOW / HIDE
===================================================== */

function toggleSection(
    sectionName,
    button
) {

    const section =
        document.querySelector(
            `.resume-section[data-section="${sectionName}"]`
        );


    if (!section) {

        console.log(
            "Section not found:",
            sectionName
        );

        return;
    }


    const hidden =
        section.classList.toggle(
            "section-hidden"
        );


    if (hidden) {

        button.classList.remove(
            "active"
        );

        button.textContent =
            "👁‍🗨";

    } else {

        button.classList.add(
            "active"
        );

        button.textContent =
            "👁";
    }


    saveSectionVisibility();
}


/* =====================================================
   SAVE SECTION VISIBILITY
===================================================== */

function saveSectionVisibility() {

    const visibility = {};


    document.querySelectorAll(
        ".resume-section"
    ).forEach(section => {

        const name =
            section.dataset.section;

        if (!name) return;


        visibility[name] =
            !section.classList.contains(
                "section-hidden"
            );

    });


    localStorage.setItem(
        "resumeVisibility",
        JSON.stringify(visibility)
    );
}


/* =====================================================
   LOAD SECTION VISIBILITY
===================================================== */

function loadSectionVisibility() {

    const saved =
        localStorage.getItem(
            "resumeVisibility"
        );


    if (!saved) return;


    try {

        const visibility =
            JSON.parse(saved);


        Object.keys(visibility).forEach(
            sectionName => {

                const section =
                    document.querySelector(
                        `.resume-section[data-section="${sectionName}"]`
                    );


                const button =
                    document.querySelector(
                        `.visibility-btn[data-section="${sectionName}"]`
                    );


                if (!section || !button) {
                    return;
                }


                if (
                    visibility[sectionName] === false
                ) {

                    section.classList.add(
                        "section-hidden"
                    );

                    button.classList.remove(
                        "active"
                    );

                    button.textContent =
                        "👁‍🗨";

                } else {

                    section.classList.remove(
                        "section-hidden"
                    );

                    button.classList.add(
                        "active"
                    );

                    button.textContent =
                        "👁";
                }

            }
        );

    } catch (error) {

        console.log(
            "Visibility data error:",
            error
        );
    }
}


/* =====================================================
   RESUME DATA
===================================================== */

function getResumeData() {

    return {

        personal: {

            name:
                document.getElementById(
                    "name"
                )?.value || "",

            title:
                document.getElementById(
                    "title"
                )?.value || "",

            email:
                document.getElementById(
                    "email"
                )?.value || "",

            phone:
                document.getElementById(
                    "phone"
                )?.value || "",

            location:
                document.getElementById(
                    "location"
                )?.value || "",

            linkedin:
                document.getElementById(
                    "linkedin"
                )?.value || "",

            github:
                document.getElementById(
                    "github"
                )?.value || ""

        },


        summary:
            document.getElementById(
                "summary"
            )?.value || "",


        education:
            getEducationData(),


        skills:
            skills,


        experience:
            getExperienceData(),


        projects:
            getProjectData(),


        certificates:
            getCertificateData(),


        template:
            currentTemplate,


        photo:
            photoData,


        color:
            localStorage.getItem(
                "resumeColor"
            ) || "#635bff",


        font:
            localStorage.getItem(
                "resumeFont"
            ) || "Arial",


        sectionVisibility:
            JSON.parse(
                localStorage.getItem(
                    "resumeVisibility"
                ) || "{}"
            ),


        sectionOrder:
            getSectionOrder()

    };
}


/* =====================================================
   SAVE RESUME
===================================================== */

function saveResume() {

    const data =
        getResumeData();


    localStorage.setItem(
        "resumeData",
        JSON.stringify(data)
    );


    const message =
        document.getElementById(
            "saveMessage"
        );


    if (message) {

        message.textContent =
            "Saved ✓";

        setTimeout(() => {

            message.textContent =
                "";

        }, 2000);
    }


    console.log(
        "Resume saved successfully"
    );
}


/* =====================================================
   AUTO SAVE
===================================================== */

function autoSave() {

    if (isLoading) return;


    const data =
        getResumeData();


    localStorage.setItem(
        "resumeData",
        JSON.stringify(data)
    );
}


/* =====================================================
   LOAD RESUME
===================================================== */

function loadResume() {

    const saved =
        localStorage.getItem(
            "resumeData"
        );


    if (!saved) {

        updateResume();

        return;
    }


    try {

        isLoading = true;


        const data =
            JSON.parse(saved);


        // Personal
        if (data.personal) {

            setInput(
                "name",
                data.personal.name
            );

            setInput(
                "title",
                data.personal.title
            );

            setInput(
                "email",
                data.personal.email
            );

            setInput(
                "phone",
                data.personal.phone
            );

            setInput(
                "location",
                data.personal.location
            );

            setInput(
                "linkedin",
                data.personal.linkedin
            );

            setInput(
                "github",
                data.personal.github
            );
        }


        // Summary
        setInput(
            "summary",
            data.summary || ""
        );


        // Skills
        skills =
            Array.isArray(data.skills)
                ? data.skills
                : [];

        displaySkills();


        // Education
        const educationContainer =
            document.getElementById(
                "educationContainer"
            );

        if (educationContainer) {

            educationContainer.innerHTML =
                "";

            if (
                Array.isArray(
                    data.education
                )
            ) {

                data.education.forEach(
                    item => {

                        addEducation(item);

                    }
                );
            }
        }


        // Experience
        const experienceContainer =
            document.getElementById(
                "experienceContainer"
            );

        if (experienceContainer) {

            experienceContainer.innerHTML =
                "";

            if (
                Array.isArray(
                    data.experience
                )
            ) {

                data.experience.forEach(
                    item => {

                        addExperience(item);

                    }
                );
            }
        }


        // Projects
        const projectsContainer =
            document.getElementById(
                "projectsContainer"
            );

        if (projectsContainer) {

            projectsContainer.innerHTML =
                "";

            if (
                Array.isArray(
                    data.projects
                )
            ) {

                data.projects.forEach(
                    item => {

                        addProject(item);

                    }
                );
            }
        }


        // Certificates
        const certificatesContainer =
            document.getElementById(
                "certificatesContainer"
            );

        if (certificatesContainer) {

            certificatesContainer.innerHTML =
                "";

            if (
                Array.isArray(
                    data.certificates
                )
            ) {

                data.certificates.forEach(
                    item => {

                        addCertificate(item);

                    }
                );
            }
        }


        // Template
        if (data.template) {

            currentTemplate =
                data.template;

            changeTemplate(
                data.template
            );
        }


        // Photo
        if (data.photo) {

            photoData =
                data.photo;


            const preview =
                document.getElementById(
                    "previewPhoto"
                );

            if (preview) {

                preview.src =
                    photoData;

                preview.style.display =
                    "block";
            }


            const editorPhoto =
                document.getElementById(
                    "editorPhotoPreview"
                );

            const placeholder =
                document.getElementById(
                    "photoPlaceholder"
                );


            if (editorPhoto) {

                editorPhoto.src =
                    photoData;

                editorPhoto.style.display =
                    "block";
            }


            if (placeholder) {

                placeholder.style.display =
                    "none";
            }
        }


        // Final preview update
        updateResume();


        isLoading = false;


        // Load customization
        loadCustomization();


        // Load visibility after dynamic sections
        setTimeout(() => {

            loadSectionVisibility();

            applySectionOrder(
                data.sectionOrder || []
            );

        }, 100);


    } catch (error) {

        isLoading = false;

        console.error(
            "Resume loading error:",
            error
        );
    }
}


/* =====================================================
   SET INPUT
===================================================== */

function setInput(id, value) {

    const input =
        document.getElementById(id);

    if (input) {

        input.value =
            value || "";
    }
}


/* =====================================================
   CLEAR RESUME
===================================================== */

function clearResume() {

    const confirmClear =
        confirm(
            "Are you sure you want to clear your resume?"
        );


    if (!confirmClear) return;


    localStorage.removeItem(
        "resumeData"
    );

    localStorage.removeItem(
        "resumeColor"
    );

    localStorage.removeItem(
        "resumeFont"
    );

    localStorage.removeItem(
        "resumeVisibility"
    );


    location.reload();
}


/* =====================================================
   PDF DOWNLOAD
===================================================== */

function downloadPDF() {

    const resume =
        document.getElementById(
            "resume"
        );


    if (!resume) {

        alert(
            "Resume preview not found."
        );

        return;
    }


    if (
        typeof html2pdf ===
        "undefined"
    ) {

        alert(
            "PDF library is not loaded. Check your internet connection."
        );

        return;
    }


    const options = {

        margin: 0,

        filename:
            "My_Resume.pdf",

        image: {

            type: "jpeg",

            quality: 0.98

        },

        html2canvas: {

            scale: 2,

            useCORS: true

        },

        jsPDF: {

            unit: "mm",

            format: "a4",

            orientation: "portrait"

        }

    };


    html2pdf()
        .set(options)
        .from(resume)
        .save();
}


/* =====================================================
   RESUME STRENGTH
===================================================== */

function updateProgress() {

    let completed = 0;

    let total = 10;


    const fields = [

        "name",
        "title",
        "email",
        "phone",
        "location",
        "summary"

    ];


    fields.forEach(id => {

        const input =
            document.getElementById(id);

        if (
            input &&
            input.value.trim()
        ) {

            completed++;

        }

    });


    if (skills.length > 0) {
        completed++;
    }


    if (
        getEducationData().length > 0
    ) {
        completed++;
    }


    if (
        getProjectData().length > 0
    ) {
        completed++;
    }


    if (
        getExperienceData().length > 0
    ) {
        completed++;
    }


    if (photoData) {
        completed++;
    }


    let percentage =
        Math.round(
            (completed / total) * 100
        );


    if (percentage > 100) {
        percentage = 100;
    }


    const progressFill =
        document.getElementById(
            "progressFill"
        );


    const progressText =
        document.getElementById(
            "progressText"
        );


    const strengthMessage =
        document.getElementById(
            "strengthMessage"
        );


    if (progressFill) {

        progressFill.style.width =
            percentage + "%";
    }


    if (progressText) {

        progressText.textContent =
            percentage + "%";
    }


    if (strengthMessage) {

        if (percentage < 40) {

            strengthMessage.textContent =
                "Add more information to strengthen your resume.";

        } else if (percentage < 70) {

            strengthMessage.textContent =
                "Good start! Add projects and experience.";

        } else if (percentage < 90) {

            strengthMessage.textContent =
                "Great resume! Add a few more details.";

        } else {

            strengthMessage.textContent =
                "Excellent! Your resume is looking strong.";

        }
    }
}


/* =====================================================
   DRAG & DROP
===================================================== */

function setupDragAndDrop() {

    const sections =
        document.querySelectorAll(
            ".draggable-section"
        );


    sections.forEach(section => {

        section.addEventListener(
            "dragstart",
            function() {

                draggedSection =
                    section;

                section.classList.add(
                    "dragging"
                );

            }
        );


        section.addEventListener(
            "dragend",
            function() {

                section.classList.remove(
                    "dragging"
                );

                draggedSection =
                    null;

                saveSectionOrder();

            }
        );


        section.addEventListener(
            "dragover",
            function(event) {

                event.preventDefault();


                if (
                    !draggedSection ||
                    draggedSection === section
                ) {
                    return;
                }


                const container =
                    section.parentNode;


                const rect =
                    section.getBoundingClientRect();


                const middle =
                    rect.top +
                    rect.height / 2;


                if (
                    event.clientY < middle
                ) {

                    container.insertBefore(
                        draggedSection,
                        section
                    );

                } else {

                    container.insertBefore(
                        draggedSection,
                        section.nextSibling
                    );
                }

            }
        );

    });
}


/* =====================================================
   GET SECTION ORDER
===================================================== */

function getSectionOrder() {

    const sections =
        document.querySelectorAll(
            ".draggable-section"
        );


    return Array.from(sections)
        .map(section =>
            section.dataset.section
        )
        .filter(Boolean);
}


/* =====================================================
   SAVE SECTION ORDER
===================================================== */

function saveSectionOrder() {

    const order =
        getSectionOrder();


    localStorage.setItem(
        "resumeSectionOrder",
        JSON.stringify(order)
    );


    autoSave();
}


/* =====================================================
   APPLY SECTION ORDER
===================================================== */

function applySectionOrder(order) {

    if (
        !Array.isArray(order) ||
        order.length === 0
    ) {
        return;
    }


    const container =
        document.querySelector(
            ".resume"
        );


    if (!container) return;


    order.forEach(sectionName => {

        const section =
            container.querySelector(
                `.draggable-section[data-section="${sectionName}"]`
            );


        if (section) {

            container.appendChild(
                section
            );
        }

    });


    setupDragAndDrop();
}


/* =====================================================
   INPUT AUTO UPDATE
===================================================== */

document.addEventListener(
    "input",
    function(event) {

        if (
            event.target.matches(
                "input, textarea"
            )
        ) {

            updateResume();

        }

    }
);


/* =====================================================
   INITIALIZE
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        loadResume();

        setupDragAndDrop();

        updateProgress();

        loadCustomization();

        setTimeout(function() {

            loadSectionVisibility();

        }, 200);

    }
);