import userModel from "../Models/user.js";

export const signUp = async (req, res) =>{
    try {
        const {name, email, phoneNo, gotra, currentAddress, parmanentAddress, district, tehsil, bloodGroup, fatherName} = req.body;

        if(!name|| !email || !phoneNo || !gotra ||  !currentAddress || !parmanentAddress || !district || !tehsil || !bloodGroup || !fatherName){
            return req.status(400).json({message : "All fileds are required"})
        }

        const existEmail = await userModel.findOne({email});

        if(existEmail){
             return req.status(400).json({message : "Already registerd"}) 
        }

        const user = userModel.create({
            name , 
            email, 
            phoneNo, 
            gotra, 
            currentAddress, 
            parmanentAddress, 
            district, 
            tehsil, 
            bloodGroup, 
            fatherName
        })

        return res.status(200).json(user);
        
    } catch (error) {
        return res.status(500).json({message : `sign up error : ${error}`});
    }
}