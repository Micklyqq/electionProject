const Router = require("express");
const router = new Router();
const candidateController= require("../controllers/candidateController");

router.post("/create",candidateController.create);
router.post("/vote/:id",candidateController.vote);
router.get("/getAll/:electionID",candidateController.getAllCandidates);
router.get("/getOne/:id",candidateController.getCandidate);
router.delete("/:id",candidateController.deleteCandidate);

module.exports = router;