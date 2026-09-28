const defaults = {
  profile: {
    name: "Your Name",
    title: "UI/UX Designer & AI Developer",
    heroTitle: "Designing ideas.<br><span>Building experiences.</span>",
    bio: "I design clean, user-centered digital products and build technology-driven experiences.",
    aboutTitle: "Turning concepts into useful digital products.",
    about: "I am a UI/UX designer with hands-on experience in Figma, wireframing, prototyping and user-centered design.",
    email: "your.email@example.com",
    mobile: "1234567890",
    extra: []
  },

  links: [
    { title: "LinkedIn", url: "#", place: "contact" },
    { title: "GitHub", url: "#", place: "contact" },
    { title: "Figma", url: "#", place: "contact" }
  ],

  education: [],
  experience: [],

  skills: [
    { name: "UI/UX Design", details: "Figma · Wireframing · Prototyping" },
    { name: "Product Design", details: "User journeys · Design systems" },
    { name: "Web Development", details: "HTML · CSS · JavaScript · React" },
    { name: "Programming", details: "Python · Java" },
    { name: "AI / ML", details: "AI concepts · ML projects" },
    { name: "Databases", details: "MongoDB · SQL" },
    { name: "Tools", details: "Git · GitHub · VS Code" },
    { name: "Visual Design", details: "Branding · UI systems" }
  ],

  projects: [
    {
      title: "Haptic Scene",
      description: "AI-powered accessibility concept.",
      tags: ["AI", "Accessibility", "Product"],
      links: []
    },
    {
      title: "AI Travel Guide",
      description: "Travel product concept focused on personalized discovery.",
      tags: ["UI/UX", "Figma", "Case Study"],
      links: []
    }
  ],

  certificates: [],
  details: []
};

function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function normalizeProfile(profile) {
  const p = {
    ...defaults.profile,
    ...(profile || {})
  };

  if (!Array.isArray(p.extra)) {
    p.extra = [];
  }

  const mobileExtra = p.extra.find(
    x => String(x.label || "").trim().toLowerCase() === "mobile"
  );

  if (!p.mobile && mobileExtra?.value) {
    p.mobile = mobileExtra.value;
  }

  p.extra = p.extra.filter(
    x => String(x.label || "").trim().toLowerCase() !== "mobile"
  );

  return p;
}

function loadLocal() {
  try {
    const saved = JSON.parse(
      localStorage.getItem("portfolioData") || "{}"
    );

    return {
      profile: normalizeProfile(saved.profile),

      links: Array.isArray(saved.links)
        ? saved.links
        : clone(defaults.links),

      education: Array.isArray(saved.education)
        ? saved.education
        : [],

      experience: Array.isArray(saved.experience)
        ? saved.experience
        : [],

      skills: Array.isArray(saved.skills)
        ? saved.skills
        : clone(defaults.skills),

      projects: Array.isArray(saved.projects)
        ? saved.projects
        : clone(defaults.projects),

      certificates: Array.isArray(saved.certificates)
        ? saved.certificates
        : [],

      details: Array.isArray(saved.details)
        ? saved.details
        : []
    };
  } catch (error) {
    console.warn("Local data error:", error);
    return clone(defaults);
  }
}

let d = loadLocal();

const app = document.getElementById("app");

function esc(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function field(label, key, value, textarea = false) {
  if (textarea) {
    return `
      <label>
        ${label}
        <textarea data-key="${key}">${esc(value)}</textarea>
      </label>
    `;
  }

  return `
    <label>
      ${label}
      <input data-key="${key}" value="${esc(value)}">
    </label>
  `;
}

function renderProfile() {
  return `
    <div class="card">
      <h2>Profile</h2>
      <p class="hint">Edit the content shown on your portfolio.</p>

      <div class="grid">

        ${field("Name", "name", d.profile.name)}

        ${field(
          "Professional Title",
          "title",
          d.profile.title
        )}

        ${field(
          "Hero Heading (HTML allowed)",
          "heroTitle",
          d.profile.heroTitle,
          true
        )}

        ${field("Email", "email", d.profile.email)}

        ${field(
          "Mobile Number",
          "mobile",
          d.profile.mobile
        )}

        ${field(
          "Bio",
          "bio",
          d.profile.bio,
          true
        )}

        ${field(
          "About Heading",
          "aboutTitle",
          d.profile.aboutTitle
        )}

        ${field(
          "About",
          "about",
          d.profile.about,
          true
        )}

      </div>

      <div class="profile-extra">

        <div class="bar">
          <div>
            <h3>Additional Profile Fields</h3>
            <p>
              Add location, website, designation or
              other custom information.
            </p>
          </div>

          <button onclick="addProfileField()">
            + Add New
          </button>
        </div>

        ${d.profile.extra.map((x, i) => `
          <div class="item">

            <div class="itemhead">
              <b>Profile Field ${i + 1}</b>

              <button
                class="danger small"
                onclick="removeProfileField(${i})"
              >
                Delete
              </button>
            </div>

            <div class="grid">

              <label>
                Field Name
                <input
                  data-extra="${i}"
                  data-key="label"
                  value="${esc(x.label)}"
                >
              </label>

              <label>
                Value
                <input
                  data-extra="${i}"
                  data-key="value"
                  value="${esc(x.value)}"
                >
              </label>

              <label>
                Link URL
                <input
                  data-extra="${i}"
                  data-key="url"
                  value="${esc(x.url)}"
                >
              </label>

              <label>
                Show In
                <select data-extra="${i}" data-key="place">
                  <option value="hero"
                    ${x.place === "hero" ? "selected" : ""}>
                    Hero
                  </option>

                  <option value="about"
                    ${x.place === "about" ? "selected" : ""}>
                    About
                  </option>

                  <option value="contact"
                    ${x.place === "contact" ? "selected" : ""}>
                    Contact
                  </option>
                </select>
              </label>

            </div>
          </div>
        `).join("")}

      </div>
    </div>
  `;
}

function renderLinks() {
  return `
    <div class="card">

      <div class="bar">
        <div>
          <h2>Links</h2>
          <p>Add social and portfolio links.</p>
        </div>

        <button onclick="addLink()">
          + Add New Link
        </button>
      </div>

      ${d.links.map((x, i) => `
        <div class="item">

          <div class="itemhead">
            <b>Link ${i + 1}</b>

            <button
              class="danger small"
              onclick="removeItem('links', ${i})"
            >
              Delete
            </button>
          </div>

          <div class="grid">

            ${field("Title", "title", x.title)}

            ${field("URL", "url", x.url)}

            <label>
              Place

              <select
                data-array="links"
                data-index="${i}"
                data-key="place"
              >
                <option value="nav"
                  ${x.place === "nav" ? "selected" : ""}>
                  Navigation
                </option>

                <option value="hero"
                  ${x.place === "hero" ? "selected" : ""}>
                  Hero
                </option>

                <option value="contact"
                  ${x.place === "contact" ? "selected" : ""}>
                  Contact
                </option>
              </select>
            </label>

          </div>
        </div>
      `).join("")}

    </div>
  `;
}

function renderArray(title, key, fields) {
  return `
    <div class="card">

      <div class="bar">
        <div>
          <h2>${title}</h2>
          <p>Add, edit or delete ${title.toLowerCase()}.</p>
        </div>

        <button onclick="addItem('${key}')">
          + Add New
        </button>
      </div>

      ${d[key].map((item, i) => `
        <div class="item">

          <div class="itemhead">
            <b>${title} ${i + 1}</b>

            <button
              class="danger small"
              onclick="removeItem('${key}', ${i})"
            >
              Delete
            </button>
          </div>

          <div class="grid">

            ${fields.map(f => {
              if (f.type === "textarea") {
                return `
                  <label>
                    ${f.label}
                    <textarea
                      data-array="${key}"
                      data-index="${i}"
                      data-key="${f.key}"
                    >${esc(item[f.key] || "")}</textarea>
                  </label>
                `;
              }

              return `
                <label>
                  ${f.label}
                  <input
                    data-array="${key}"
                    data-index="${i}"
                    data-key="${f.key}"
                    value="${esc(item[f.key] || "")}"
                  >
                </label>
              `;
            }).join("")}

          </div>

        </div>
      `).join("")}

    </div>
  `;
}

function renderProjects() {
  return `
    <div class="card">

      <div class="bar">
        <div>
          <h2>Projects</h2>
          <p>Add projects and links.</p>
        </div>

        <button onclick="addItem('projects')">
          + Add New Project
        </button>
      </div>

      ${d.projects.map((p, i) => `
        <div class="item">

          <div class="itemhead">
            <b>Project ${i + 1}</b>

            <button
              class="danger small"
              onclick="removeItem('projects', ${i})"
            >
              Delete
            </button>
          </div>

          <div class="grid">

            <label>
              Project Title
              <input
                data-array="projects"
                data-index="${i}"
                data-key="title"
                value="${esc(p.title)}"
              >
            </label>

            <label>
              Tags
              <input
                data-array="projects"
                data-index="${i}"
                data-key="tagsText"
                value="${esc((p.tags || []).join(", "))}"
              >
            </label>

            <label>
              Description
              <textarea
                data-array="projects"
                data-index="${i}"
                data-key="description"
              >${esc(p.description)}</textarea>
            </label>

          </div>

        </div>
      `).join("")}

    </div>
  `;
}

function render(tab = "profile") {

  document.querySelectorAll(".side").forEach(button => {
    button.classList.toggle(
      "active",
      button.dataset.tab === tab
    );
  });

  if (!app) {
    console.error("Admin #app element not found.");
    return;
  }

  if (tab === "profile") {
    app.innerHTML = renderProfile();
  }

  else if (tab === "links") {
    app.innerHTML = renderLinks();
  }

  else if (tab === "education") {
    app.innerHTML = renderArray(
      "Education",
      "education",
      [
        { label: "Degree / Course", key: "title" },
        { label: "Institution", key: "institution" },
        { label: "Period", key: "period" },
        { label: "Board / University", key: "board" },
        { label: "Stream / Specialization", key: "stream" },
        { label: "CGPA", key: "cgpa" },
        { label: "Percentage", key: "percentage" },
        { label: "Marks", key: "marks" },
        { label: "Grade / Class", key: "grade" },
        { label: "Link", key: "url" },
        {
          label: "Description",
          key: "description",
          type: "textarea"
        }
      ]
    );
  }

  else if (tab === "experience") {
    app.innerHTML = renderArray(
      "Experience",
      "experience",
      [
        { label: "Role", key: "title" },
        { label: "Company", key: "company" },
        { label: "Period", key: "period" },
        {
          label: "Description",
          key: "description",
          type: "textarea"
        }
      ]
    );
  }

  else if (tab === "skills") {
    app.innerHTML = renderArray(
      "Skills",
      "skills",
      [
        { label: "Skill Name", key: "name" },
        { label: "Skill Details", key: "details" }
      ]
    );
  }

  else if (tab === "projects") {
    app.innerHTML = renderProjects();
  }

  else if (tab === "certificates") {
    app.innerHTML = renderArray(
      "Certificates",
      "certificates",
      [
        { label: "Certificate Title", key: "title" },
        { label: "Issuer", key: "issuer" },
        { label: "Date", key: "date" },
        { label: "Verification URL", key: "url" },
        {
          label: "Description",
          key: "description",
          type: "textarea"
        }
      ]
    );
  }

  else if (tab === "details") {
    app.innerHTML = renderArray(
      "Additional Details",
      "details",
      [
        { label: "Title", key: "title" },
        { label: "Link Title", key: "linkTitle" },
        { label: "Link URL", key: "url" },
        {
          label: "Details",
          key: "text",
          type: "textarea"
        }
      ]
    );
  }

  else if (tab === "resume") {
    app.innerHTML = `
      <div class="card">
        <h2>Resume PDF</h2>

        <p class="hint">
          Upload your resume PDF.
        </p>

        <input
          type="file"
          id="resumeFile"
          accept="application/pdf"
        >

        <p id="fileName" class="hint"></p>
      </div>
    `;

    const file = document.getElementById("resumeFile");

    if (file) {
      file.onchange = uploadResume;
    }
  }

  wireInputs();
}

function wireInputs() {

  document.querySelectorAll("[data-key]").forEach(el => {

    const event =
      el.tagName === "SELECT"
        ? "change"
        : "input";

    el.addEventListener(event, () => {

      if (el.dataset.extra !== undefined) {

        const i = Number(el.dataset.extra);

        if (d.profile.extra[i]) {
          d.profile.extra[i][el.dataset.key] = el.value;
        }

        return;
      }

      if (el.dataset.array) {

        const arr = d[el.dataset.array];
        const i = Number(el.dataset.index);

        if (!arr[i]) return;

        if (
          el.dataset.key === "tagsText"
        ) {
          arr[i].tags = el.value
            .split(",")
            .map(x => x.trim())
            .filter(Boolean);
        }

        else {
          arr[i][el.dataset.key] = el.value;
        }
      }

      else if (
        document.querySelector(".side.active")?.dataset.tab ===
        "profile"
      ) {

        d.profile[el.dataset.key] = el.value;
      }
    });
  });
}

function addProfileField() {

  d.profile.extra.push({
    label: "New Field",
    value: "",
    url: "",
    place: "contact"
  });

  render("profile");
}

function removeProfileField(i) {

  d.profile.extra.splice(i, 1);

  render("profile");
}

function addLink() {

  d.links.push({
    title: "New Link",
    url: "#",
    place: "contact"
  });

  render("links");
}

function addItem(type) {

  const templates = {

    education: {
      title: "Degree / Course",
      institution: "",
      period: "",
      board: "",
      stream: "",
      cgpa: "",
      percentage: "",
      marks: "",
      grade: "",
      description: "",
      url: ""
    },

    experience: {
      title: "Role",
      company: "",
      period: "",
      description: ""
    },

    skills: {
      name: "New Skill",
      details: ""
    },

    projects: {
      title: "New Project",
      description: "",
      tags: [],
      links: []
    },

    certificates: {
      title: "New Certificate",
      issuer: "",
      date: "",
      description: "",
      url: ""
    },

    details: {
      title: "New Detail",
      text: "",
      linkTitle: "Open link",
      url: ""
    }
  };

  d[type].push(clone(templates[type]));

  render(type);
}

function removeItem(type, index) {

  d[type].splice(index, 1);

  render(type);
}

function uploadResume(event) {

  const file = event.target.files[0];

  if (!file) return;

  if (file.type !== "application/pdf") {
    show("Please select a PDF file.");
    return;
  }

  if (file.size > 8 * 1024 * 1024) {
    show("PDF must be smaller than 8 MB.");
    return;
  }

  const reader = new FileReader();

  reader.onload = () => {

    localStorage.setItem(
      "portfolioResume",
      reader.result
    );

    show("Resume PDF saved.");
  };

  reader.readAsDataURL(file);
}

function show(message) {

  const status =
    document.getElementById("status");

  if (!status) return;

  status.textContent = message;
  status.style.display = "block";

  setTimeout(() => {
    status.style.display = "none";
  }, 3000);
}

/* Navigation */

document.querySelectorAll(".side").forEach(button => {

  button.addEventListener("click", () => {
    render(button.dataset.tab);
  });

});

/* Save */

const saveButton =
  document.getElementById("save");

if (saveButton) {

  saveButton.addEventListener("click", async () => {

    /* Local backup */

    localStorage.setItem(
      "portfolioData",
      JSON.stringify(d)
    );

    /* Supabase */

    if (!window.supabaseClient) {

      show(
        "Saved locally. Supabase is not connected."
      );

      return;
    }

    try {

      const payload = {
        id: 1,
        data: d,
        updated_at: new Date().toISOString()
      };

      const { error } =
        await window.supabaseClient
          .from("portfolio")
          .upsert(payload);

      if (error) {

        console.error(
          "Supabase save error:",
          error
        );

        show(
          "Supabase save failed: " +
          error.message
        );

        return;
      }

      show(
        "Changes saved successfully."
      );

    } catch (error) {

      console.error(error);

      show(
        "Save failed: " +
        error.message
      );
    }
  });
}

/* Preview */

const previewButton =
  document.getElementById("preview");

if (previewButton) {

  previewButton.addEventListener("click", () => {

    window.open(
      "index.html",
      "_blank"
    );

  });
}

/* Load Supabase */

async function loadFromSupabase() {

  if (!window.supabaseClient) {
    console.warn(
      "Supabase unavailable. Using local data."
    );
    return;
  }

  try {

    const {
      data: row,
      error
    } = await window.supabaseClient
      .from("portfolio")
      .select("data")
      .eq("id", 1)
      .maybeSingle();

    if (error) {

      console.error(
        "Supabase load error:",
        error
      );

      return;
    }

    if (!row || !row.data) {
      return;
    }

    d = {
      ...d,
      ...row.data,
      profile: normalizeProfile(
        row.data.profile
      )
    };

    localStorage.setItem(
      "portfolioData",
      JSON.stringify(d)
    );

    render("profile");

  } catch (error) {

    console.error(
      "Supabase load failed:",
      error
    );
  }
}

/* Start */

render("profile");

loadFromSupabase();
