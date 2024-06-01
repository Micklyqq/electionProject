
const Router = require("express");
const router = new Router();
const regionController= require("../controllers/regionController");

router.post("/create",regionController.create);
router.get("/getAll",regionController.getAllRegions);
router.get("/getOne/:id",regionController.getRegion);
router.delete("/:id",regionController.deleteRegion);

module.exports = router;