const { Router } = require("express");
const {
  addUser,
  fetchAllUsers,
  fetchOneUser,
  deleteUser,
  updateUser,
} = require("../controller/user.controller");

const router = Router();

router.post("/register", addUser);
router.get("/all", fetchAllUsers);
router.get("/one/:id", fetchOneUser);
router.delete("/delete/:id", deleteUser);
router.patch("/update/:id", updateUser);

module.exports = router;

//  {
//   xyz: '6894515e8ee21bc745018343',
//   name: 'utkarsh'
// }
