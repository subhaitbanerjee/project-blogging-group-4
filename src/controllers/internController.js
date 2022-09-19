const internModel = require("../models/internModel");
const collegeModel = require("../models/collegeModel");

const isValid = function (value) {
  if (typeof value === "undefined" || value === null) return false;
  if (typeof value === "string" && value.trim().length === 0) return false;      // should not be an empty string
  if (typeof value === "string") return true;
};

const createIntern = async function (req, res){
  try {
    let data = req.body
    const { name, email, mobile, collegeName } = data;   //destructing 
    if(Object.keys(data).length == 0){
      return res.status(400).send({ status: false, msg: "Please provide data in request body" });    
    }

    if (!isValid(name) || !/^[a-zA-Z]+([\s][a-zA-Z]+)*$/.test(name))   //validation and regex
      return res.status(400).send({ status: false,message: "Name is mandatory & should be in correct format",});

    if (!isValid(email) || !/^[a-z0-9_]{3,}@[a-z]{3,}.[a-z]{3,6}$/.test(email))
      return res.status(400).send({ status: false, message: "Email is mandatory & should be valid" });

    const checkemail= await internModel.findOne({ email: email })        //db call
    if(checkemail)
    return res.status(400).send({ status: false, message: "Email should be unique" });

    if (!isValid(mobile) || !/^[6-9]{1}[0-9]{9}$/im.test(mobile))
      return res.status(400).send({status: false,message: "Mobile is mandatory & should be in valid format (10 digit Indian number)",});

   const checkmobile= await internModel.findOne({ mobile: mobile })   //db call
   if(checkmobile)
    return res.status(404).send({ status: false, message: "Mobile Number should be unique" });


    if (!collegeName || !isValid(collegeName))
      return res.status(400).send({ status: false,message: "collegeName is mandatory & should be valid"});

    let collegeDoc = await collegeModel.findOne({name: data.collegeName,});   //db call
    if (!collegeDoc)
      return res.status(404).send({ status: false, message: "no such collegeName is present" });

    data.collegeId = collegeDoc._id;   // storing the collge id in internmodel collge id 
    let saveData = await internModel.create(data);
    return res.status(201).send({ status: true, data: saveData });
  } 
  catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

module.exports.createIntern = createIntern;
