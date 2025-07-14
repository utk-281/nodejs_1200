// setTimeout(() => {
//   console.log("inside setTimeout 2");
// }, 5000);

// console.log(1);

// console.log(2);

// setTimeout(() => {
//   console.log("inside setTimeout 1");
// }, 1000);

// console.log(3);

// // promise is an object which represents eventual completion of an asynchronous op

// let food = ["food1", "food2"];

// let apiCall = fetch("https://fakestoreapi.in/api/products");
// console.log(apiCall);
/* {
  state:"fulfilled",
  result:"data"
}
/* {
  state:"reject",
  result:"err"
}
 */
// apiCall
//   .then((data) => {
//     console.log(data);
//     let jsonData = data.json();
//     // console.log(jsonData);
//     jsonData
//       .then((value) => {
//         console.log(object)
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//     // console.log("promise is resolved");
//   })
//   .catch((err) => {
//     console.log(err);
//     console.log("some error");
//   });

// let promise = new Promise((res, rej) => {
//   let a = 20;
//   if (a == 21) {
//     res({ success: true, message: "done" });
//   } else {
//     rej({ success: false, message: "error" });
//   }
// });

// console.log(promise);

// promise
//   .then((data) => {
//     console.log("promise resolved");
//     return data;
//   })
//   .then((data) => {
//     console.log(data.message);
//   })
//   .catch(() => {
//     console.log("rejected");
//   });

// async function hello() {
//   return 1123;
// }

// let res = hello();
// console.log(res);

async function call() {
  try {
    let apiCall = await fetch("https://fakestoreapi.in/api/products");
    console.log("call 1");
    let jsonData = await apiCall.json();
    console.log(jsonData);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
function helloWorld() {
  console.log("hello world");
  console.log("123");
}

async function call2() {
  let apiCall = await fetch("https://fakestoreapi.in/api/products/category");
  console.log("call 2");
  let jsonData = await apiCall.json();
  console.log(jsonData);
}

call();
helloWorld();
call2();

let express = require("express");
