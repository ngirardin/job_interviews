// let x = 2;
// let y = 8;
// const a = function(b) {
//   return function(c) {
//     //console.log(c);
//     // x = 2
//     // y = 8
//     // b = 2
//     // 12 + c
//     // c = [0 , 10]
//     // console.log(x + y + Math.abs(b) + c);
//     return x + y + Math.abs(b) + c;
//     // [12, 22]
//   };
// };

// // Statement will go here

// // x > 0
// // needed min=10, max=20, delta=10
// // x=, y=, min=, max=, delta=

// x = 2;
// y = 4;

// const fn = a(x); // 0 < x < 10
// x = 4;

// const r = [];
// for (let i = 0; i < 1000; i++) {
//   const x = fn(Math.random() * 10);
//   // console.log(x);
//   r.push(x);
// }

// const min = Math.floor(Math.min(...r));
// const max = Math.ceil(Math.max(...r));
// const delta = max - min;

// console.log(`min: ${min}`);
// console.log(`max: ${max}`);
// console.log(`delta: ${delta}`);

//

let x = 2;
let y = 8;
const a = function(b) {
  return function(c) {
    return x + y + Math.abs(b) + c;
  };
};

// Statement will go here
// ---
y = 4;
// ---

const fn = a(x);
x = 4;
for (let i = 0; i < 100; i++) {
  console.log(fn(Math.random() * 10));
}
