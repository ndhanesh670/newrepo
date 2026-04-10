let form = document.getElementById("form");
let username = document.getElementById("name");
let userpassword = document.getElementById("password");
let output = document.getElementById("output");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    let name = username.value;
    let password = userpassword.value;
    let user = {name: name, password: password};
    localStorage.setItem("username", name);
    localStorage.setItem("password", password);
    localStorage.setItem("user", JSON.stringify(user));
    alert("Data saved to local storage!");
});
