const Router = require("express");
const router = new Router();
const userController = require("../controllers/userController");

router.post("/reg",userController.registration);
router.post("/auth",userController.auth);
router.post("/giveAdmin",userController.giveAdmin);

module.exports = router;