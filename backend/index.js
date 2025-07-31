import express from "express"
import path from 'path'
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
dotenv.config();
import { fileURLToPath } from 'url';

import { dirname } from 'path';
import { signUp } from "./controller/user.controller.js";
import userModel from "./Models/user.js";
import connectDB from "./config/db.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname , 'public')))
app.set('view engine' , 'ejs')

app.get('/', (req, res)=>{
    res.render('index')
})


app.post('/register', async (req, res) => {
    try {
        const {
            name, email, phoneNo, gotra, currentAddress, parmanentAddress,
            district, tehsil, bloodGroup, fatherName, familyMembers
        } = req.body;

        if (!name || !email || !phoneNo || !gotra || !currentAddress || !parmanentAddress ||
            !district || !tehsil || !bloodGroup || !fatherName) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existEmail = await userModel.findOne({ email });
        if (existEmail) {
            return res.status(400).json({ message: "Already registered" });
        }

        // Parse familyMembers from form data
        let parsedFamilyMembers = [];
        if (familyMembers) {
            if (Array.isArray(familyMembers)) {
                parsedFamilyMembers = familyMembers.map(fm => ({
                    name: fm.name,
                    age: fm.age,
                    relation: fm.relation,
                    bloodGroup: fm.bloodGroup,
                    contactNo: fm.contactNo
                }));
            } else if (typeof familyMembers === 'object') {
                parsedFamilyMembers = Object.values(familyMembers);
            }
        }

        const user = await userModel.create({
            name, email, phoneNo, gotra, currentAddress, parmanentAddress,
            district, tehsil, bloodGroup, fatherName,
            familyMembers: parsedFamilyMembers
        });

        res.redirect('/');
    } catch (error) {
        return res.status(500).json({ message: `sign up error : ${error}` });
    }
});

app.get('/getall',async (req, res)=>{
    const alluser = await userModel.find()
    res.render('alluser',{alluser} )
})

app.post('/login',async (req, res)=>{
    let user = await userModel.findOne({email : req.body.email})
    if(!user) return res.status(400).render('404')
    res.redirect('/getall')
})

app.get('/login', (req, res)=>{
    res.render('login')
})
app.get('/form', (req, res)=>{
    res.render('form')
})
app.get('/event', (req, res)=>{
    res.render('index')
})




const PORT = process.env.PORT || 3000;

// Connect to DB before starting server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`server is started at [http://localhost:${PORT}]`);
    });
}).catch((err) => {
    console.error('Failed to connect to database:', err);
    process.exit(1);
});