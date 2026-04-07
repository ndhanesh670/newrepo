let names = document.getElementById("names");
let btn = document.getElementById("btn");
let view = document.getElementById("view");

btn.addEventListener("click", function (e) {
    e.preventDefault();
    view.textContent = names.value;
});