let add = (a, b) => {
  return a + b;
};
console.log(add(10, 20));

let name = "Arun";
const age = 20;

name = "Rere";

console.log(name);
console.log(age);

let user = "Rere";
let age2 = 25;

console.log(`Hello ${user}, your age is ${age2}`);

let greet = (name = "Guest") => {
  console.log(name);
};

greet();
greet("Arun");

let num = 7;

let ans = num % 2 == 0 ? "Even" : "Odd";
console.log(ans);

let arr = [10, 20, 30];

let [a, b] = arr;

console.log(a);
console.log(b);

let obj = {
  name1: "Rere",
  age1: 25,
};

let { name1, age1 } = obj;

console.log(name1);
console.log(age1);

let x = [1, 2];
let y = [3, 4];

let z = [...x, ...y];

console.log(z);

let person = {
  name: "Arun",
};

let newPerson = {
  ...person,
  city: "Chennai",
};

console.log(newPerson);

let total = (...nums) => {
  let sum = nums.reduce((acc, val) => acc + val, 0);
  return sum;
};

console.log(total(1, 2, 3, 4));

let numbers = [1, 2, 3, 4];

let [first, ...rest] = numbers;

console.log(first);
console.log(rest);

let user1 = {};

console.log(user1?.name);

let value = null;

console.log(value ?? "Default Value");

let username = "Rere";
let city = "Chennai";

let details = {
  username,
  city,
};

console.log(details);
