const Router = require("express");
const router = new Router();
const userRouter = require("./userRouter");
const electionRouter = require("./electionRouter");
const candidateRouter = require('./candidateRouter');
const regionRouter = require('./regionRouter')
router.use('/user',userRouter);
router.use('/election', electionRouter);
router.use('/candidate',candidateRouter);
router.use('/region',regionRouter);
module.exports = router;