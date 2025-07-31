import userModel from "../Models/user.js";

export const allUsers = async (req, res) =>{
    try {
        const users = await userModel.findOne()

        return res.status(200).json(users);
        
    } catch (error) {
        return res.status(500).json({message : `sign up error : ${error}`});
    }
}