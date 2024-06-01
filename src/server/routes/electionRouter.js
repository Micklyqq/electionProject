const Router = require("express");
const router = new Router();
const electionController = require("../controllers/electionController");

router.post("/create",electionController.create);
router.get("/winner/:id",electionController.selectWinner);
router.get("/getAll/:regionID",electionController.getAllElections);
router.get("/getOne/:id",electionController.getElection);
router.delete("/:id",electionController.deleteElection);

module.exports = router;