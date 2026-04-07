let input = document.getElementById("name");
let view = document.getElementById("view");

input.addEventListener("input", () => {
    view.textContent = input.value;
});