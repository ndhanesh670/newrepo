let btn = document.getElementById("btn");
let count = document.getElementById("count");

let counter = 0;

btn.addEventListener("click", () => {
    counter++;
    count.textContent = counter;
});