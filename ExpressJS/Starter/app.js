//! libraries ==>
//? it is a collection of reusable functions or modules that you call when you need them.
//? you are responsible for using them.
//? the flow of control is in your hands.
//? you can call as many libraries as you want.

//! frameworks ==>
//? it is a collection of libraries that can be used to build applications and it acts as a blueprint.
//? there is inversion of control ==> the flow of control is in the framework's hands.
//? we have to follow a architecture defined by a framework (MVC)

//~ third-party modules ==> modules which are installed from npm are known as tpm.

//~ npm ==> it stands for node package manager. it manages all the packages (creation, updation, deletion, installation, un-installation) for node.
// ~ the default package manager for nodeJS is npm.

//! 1) in each project folder, "package.json" file is mandatory
// ==> npm init : it will generate a package.json file with user defined input.
// ==> npm init -y : it will generate a package.json file with default values.
//! 2) installed required modules.
// ==> npm i/install <pkg>
// ==> npm i/install <pkg1> <pkg3> <pkg2>
//? by default using these commands, modules will be installed in "dependencies" section. (which means production dependency)

//~ after installing three changes will be there
//& ==> in package.json file dependencies will be added.
// prod dependency, dev dependency
// if you want to install development dep, use this command
//~ npm i <pkg> -D

//& ==> node_modules folder will be created.
//& ==> in package-lock.json file it will be added.

//~ npm i <pkg> -g

// npm uninstall <pkg>
// npm uninstall <pkg1> <pkg2>

//! a) importing modules
const express = require("express");
// console.log(express);

//! b) calling/invoking top level function
let app = express();

//~ Routing
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/home", (req, res) => {
  res.send("<h3>home page<h3>");
});

// app.use();

//! c) assign a port
app.listen(9000, (err) => {
  if (err) console.log(err);
  console.log("Server running at port 9000");
});
