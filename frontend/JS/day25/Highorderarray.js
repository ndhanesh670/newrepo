let a = [1, 2, 3, 4];
let result1 = a.map((num) => num * 2);
console.log(result1);

let b = [1, 2, 3];
let result2 = b.map((num) => String(num));
console.log(result2);

let c = ["apple", "banana"];
let result3 = c.map((item) => "fruit: " + item);
console.log(result3);

let d = [1, 2, 3, 4, 5, 6];
let result4 = d.filter((num) => num % 2 === 0);
console.log(result4);

let e = [10, 60, 30, 80];
let result5 = e.filter((num) => num > 50);
console.log(result5);

let f = ["Ram", "Ravi", "John"];
let result6 = f.filter((name) => name.startsWith("R"));
console.log(result6);

let g = [10, 20, 30, 40];
let result7 = g.find((num) => num > 25);
console.log(result7);

let users = [
  { name: "Arun", age: 20 },
  { name: "Priya", age: 28 },
  { name: "John", age: 30 },
];

let result8 = users.find((user) => user.age > 25);
console.log(result8);

let h = [1, 2, 3, 4];
let result9 = h.reduce((total, num) => total + num, 0);
console.log(result9);

let i = [10, 50, 20, 80];
let result10 = i.reduce((a, b) => (a > b ? a : b));
console.log(result10);

let j = [5, 5, 5];
let result11 = j.reduce((total, num) => total + num, 0);
console.log(result11);

let k = [1, 3, 5, 6];
let result12 = k.some((num) => num % 2 === 0);
console.log(result12);

let users2 = [
  { name: "A", age: 20 },
  { name: "B", age: 15 },
];

let result13 = users2.some((user) => user.age < 18);
console.log(result13);

let l = [2, 4, 6];
let result14 = l.every((num) => num % 2 === 0);
console.log(result14);

let marks = [80, 75, 90];
let result15 = marks.every((mark) => mark >= 35);
console.log(result15);
