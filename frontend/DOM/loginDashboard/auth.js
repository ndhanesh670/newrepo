// ============= HELPER FUNCTIONS =============

function getLoggedInUser() {
  const raw = localStorage.getItem("loggedIn");
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

function setLoggedInUser(email) {
  localStorage.setItem("loggedIn", JSON.stringify({ email: email }));
}

function clearLoggedInUser() {
  localStorage.removeItem("loggedIn");
}

function getUsers() {
  const usersRaw = localStorage.getItem("userinfo");
  if (!usersRaw) return [];
  try {
    return JSON.parse(usersRaw);
  } catch (e) {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem("userinfo", JSON.stringify(users));
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
  return emailRegex.test(email);
}

function escapeHtml(str) {
  return str.replace(/[&<>]/g, function(m) {
    if (m === '&') return '&amp;';
    if (m === '<') return '&lt;';
    if (m === '>') return '&gt;';
    return m;
  });
}

// ============= PAGE RENDERING =============

function renderDashboard() {
  const user = getLoggedInUser();
  
  if (!user || !user.email) {
    window.location.href = "login.html";
    return;
  }

  const userEmail = user.email;
  const firstLetter = userEmail.charAt(0).toUpperCase();
  const container = document.getElementById("dashboardContainer");
  
  if (!container) return;
  
  container.innerHTML = `
    <div class="avatar">
      <span>${escapeHtml(firstLetter)}</span>
    </div>
    <div class="welcome-text">Welcome back</div>
    <div class="user-email">${escapeHtml(userEmail)}</div>
    <button id="logoutBtn" class="logout-btn">← Logout</button>
    <hr />
    <div class="info-note">
      ✅ You're logged in with email<br>
      🔐 Your data stays in your browser
    </div>
  `;

  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      clearLoggedInUser();
      window.location.href = "login.html";
    });
  }
}

// ============= LOGIN PAGE HANDLER =============

function initLoginPage() {
  const form = document.getElementById("loginForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const emailInput = document.getElementById("loginEmail");
    const passInput = document.getElementById("loginPassword");
    
    const email = emailInput.value.trim();
    const password = passInput.value;

    if (email === "" || password === "") {
      alert("Please fill in both email and password.");
      return;
    }

    if (!isValidEmail(email)) {
      alert("Please enter a valid email address (e.g., name@domain.com).");
      return;
    }

    const users = getUsers();
    const foundUser = users.find(user => user.email === email && user.password === password);

    if (foundUser) {
      setLoggedInUser(email);
      window.location.href = "dashboard.html";
    } else {
      alert("Invalid email or password. Try again or register.");
    }
  });
}

// ============= REGISTER PAGE HANDLER =============

function initRegisterPage() {
  const form = document.getElementById("registerForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const emailInput = document.getElementById("regEmail");
    const passInput = document.getElementById("regPassword");
    
    const email = emailInput.value.trim();
    const password = passInput.value;

    if (email === "" || password === "") {
      alert("Please fill in all fields.");
      return;
    }

    if (!isValidEmail(email)) {
      alert("Please enter a valid email address (e.g., name@domain.com).");
      return;
    }

    if (password.length < 4) {
      alert("Password must be at least 4 characters.");
      return;
    }

    const users = getUsers();
    const emailExists = users.some(user => user.email === email);
    
    if (emailExists) {
      alert("An account with this email already exists. Please log in.");
      return;
    }

    const newUser = { email: email, password: password };
    users.push(newUser);
    saveUsers(users);

    alert("Registration successful! You can now log in.");
    window.location.href = "login.html";
  });
}

// ============= PROTECT DASHBOARD =============

function protectDashboard() {
  const user = getLoggedInUser();
  if (!user || !user.email) {
    window.location.href = "login.html";
    return false;
  }
  return true;
}

// ============= PAGE INITIALIZATION =============

// Detect which page we're on and run appropriate initialization
if (document.getElementById("loginForm")) {
  initLoginPage();
}

if (document.getElementById("registerForm")) {
  initRegisterPage();
}

if (document.getElementById("dashboardContainer")) {
  if (protectDashboard()) {
    renderDashboard();
  }
}
