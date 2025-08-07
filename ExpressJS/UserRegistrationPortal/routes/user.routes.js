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
router.get("/one/:id1", fetchOneUser);
router.delete("/delete", deleteUser);
router.patch("/update", updateUser);

module.exports = router;

//  {
//   xyz: '6894515e8ee21bc745018343',
//   name: 'utkarsh'
// }
