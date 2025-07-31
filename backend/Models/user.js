import mongoose from "mongoose";

const familyMemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  relation: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  bloodGroup: {
    type: String,
    required: true
  },
  contactNo: {
    type: Number,
    required: true
  }
}, { _id: false }); // disables _id for subdocs (optional)

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phoneNo: {
    type: Number,
    required: true
  },
  gotra: {
    type: String,
    required: true
  },
  currentAddress: {
    type: String,
    required: true
  },
  parmanentAddress: {
    type: String,
    required: true
  },
  district: {
    type: String,
    required: true
  },
  tehsil: {
    type: String,
    required: true
  },
  bloodGroup: {
    type: String,
    required: true
  },
  fatherName: {
    type: String,
    required: true
  },
  familyMembers: [familyMemberSchema]  // <-- New array of subdocuments
});

const userModel = mongoose.model("user", userSchema);
export default userModel;
