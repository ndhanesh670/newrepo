let loginForm = document.getElementById("loginForm");
let inputName = document.getElementById("loginName");
let inputPassword = document.getElementById("loginPassword");

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let name = inputName.value;
    let pass = inputPassword.value;

    if (name === "" || pass === "") {
        alert("Please fill all fields");
        return;
    }

    let users = JSON.parse(localStorage.getItem("userinfo")) || [];

    let found = users.find(user => user.username === name && user.userpassword === pass);

    if (found) {
        localStorage.setItem("loggedIn", JSON.stringify({ username: name }));
        window.location.href = "dashboard.html";
    } else {
        alert("Invalid credentials");
    }
});