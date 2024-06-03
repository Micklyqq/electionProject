const Router = require("express");
const router = new Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/reg",userController.registration);
router.post("/auth",userController.auth);
router.post("/giveAdmin",userController.giveAdmin);
router.get('/checkAuth',authMiddleware,userController.check)

module.exports = router;