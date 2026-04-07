let password = document.getElementById("password");
let show = document.getElementById("show");

show.addEventListener("click", () => {
    if (password.type === "password") {
        password.type = "text";
        show.textContent = "Hide password";
    } else {
        password.type = "password";
        show.textContent = "Show password";
    }
});