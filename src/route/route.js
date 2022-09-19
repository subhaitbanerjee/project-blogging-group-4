const express = require("express");
const router = express.Router();
const cc = require("../controllers/collegeController");  //importing the college controller
const ic = require("../controllers/internController");   //importing the intern controller 

router.post("/functionup/colleges", cc.createCollege);
router.post("/functionup/interns", ic.createIntern);                             //all the handlers
router.get("/functionup/collegeDetails", cc.collegeDetails);

module.exports = router;
