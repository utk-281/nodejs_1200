let abc = asyncHandler(async function call() {
  let apiCall = await fetch("https://jsonplacer.typicode.com/users");

  console.log(apiCall);

  let data = await apiCall.json();
});

abc();

function asyncHandler(fn) {
  return function () {
    console.log(fn);
    Promise.resolve(fn()).catch((err) => {
      console.log(err);
      console.log("rejected");
    });
  };
}
