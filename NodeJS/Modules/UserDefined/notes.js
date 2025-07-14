// user-defined modules ==> modules which are defined by the user

//~ in order to export a module, we have two ways
//! 1) module.exports = variableName; (using this we can only export one variable at a time)
//! 2) module.exports = {variableName1, variableName2, ....}

//~ for importing we have two ways
//? the syntax is ==> let variableName = require("path of the file")

//! 1) let variableName = require("path")
//! 2) let {variableName1, variableName2, ...} = require("path")
