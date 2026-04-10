let form = document.getElementById("form");
let username = document.getElementById("name");
let password = document.getElementById("password");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    let name = username.value;
    let pass = password.value;
    let user = {
        username: name,
        userpassword: pass
    };
    if (name === "" || pass === "") {
        alert("Please fill all fields");
        return;
    }

    let users = JSON.parse(localStorage.getItem("userinfo")) || [];
    users.push(user);
    localStorage.setItem("userinfo", JSON.stringify(users));

    alert("User registered successfully!");
    form.reset();

});

