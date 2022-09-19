const mongoose = require("mongoose");
let ObjectId = mongoose.Schema.Types.ObjectId;

const internSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      require: true,
       trim: true 
      },
    email: {
       type: String, 
       require: true,
        trim: true, 
        lowercase: true 
      },
    mobile: { 
      type: String, 
      require: true,
      unique: true
     },
    collegeId: { 
      type: ObjectId, 
      ref: "college", 
      require: true 
    },
    isDeleted: { 
      type: Boolean,
       default: false 
      },
  },
  { timestamps: true }
);

module.exports = mongoose.model("intern", internSchema);
