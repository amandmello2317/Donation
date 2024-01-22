const CaterningSchema = require("../Model/CaterningSchema");
const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')
const JWT_SECERETE = 'hello'


// SignUp
const CaterningSignUp = async (req, res) => {
    try {
        const { name, email, password, district, state, location } = req.body

        const { certificate, cphoto } = req.files;

        const catval = await CaterningSchema.findOne({ email })
        if (catval) {
            console.log("")
            return res.json({ error: 'user alreadt exist' })

        }

        if (!password) {
            // Handle the case when the password is missing or undefined
            return (res.status(400).send({ success: "fail", error: 'Password is missing' }), console.log("error"))
        }


        const salt = await bcrypt.genSalt(10)
        const pass = await bcrypt.hash(password, salt)

        const caterning = new CaterningSchema({
            name,
            email,
            password: pass,
            certificate: certificate[0].filename,
            cphoto: cphoto[0].filename,
            district,
            state,
            location
        })
        const saveCaterning = caterning.save()
        res.json({ caterning })
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Error')
    }
}

// Login
const Caterninglogin = async (req, res) => {
    try {
        const { email, password } = req.body
        const val = await CaterningSchema.findOne({ email })

        if (!val) {
            res.json("Email Not found")
        }

        const match = await bcrypt.compare(password, val.password)
        if (!match) {
            return res.json("Password not match")
        }

        const data = val.id
        const token = await jwt.sign(data, JWT_SECERETE)
        res.json({ success: true, token, user: val })

    } catch (error) {
        console.log(error);
    }
}

// GET CATERNING PROFILE DETAILS

const CaterningProfile = async (req, res) => {
    try {
        const caterning = await CaterningSchema.findOne({ _id: req.params.id }).select("-password")

        if (!caterning) {
            return res.status(404).json({ error: "Caterning Not found" });
        }

        res.status(200).json({ caterning });
    } catch (error) {
        return res.status(422).json({ error: error.message });
    }
}

// EDIT PROFILE

const CaterningUpdate = async (req, res) => {
    const { name, email, location, state, district, } = req.body
    try {
        const newData = {}
        if (name) {
            newData.name = name
        }
        if (email) {
            newData.email = email
        }
        if (location) {
            newData.location = location
        }
        if (state) {
            newData.state = state
        }
        if (district) {
            newData.district = district
        }

        let caterning = await CaterningSchema.findOne({ _id: req.params.id })

        if (!caterning) {
            return res.status(404).send("Not Found")

        }

        ngo = await CaterningSchema.findByIdAndUpdate(
            req.params.id,
            { $set: newData }, { new: true }
        )
        res.json(caterning)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Error")
    }
}

// All the CETERNING 
const AllCat = async (req, res) => {
    try {
        const cat = await CaterningSchema.find()
        res.json(cat)

    } catch (error) {
        console.log(error);
        res.status(500).send("Internal error")
    }
}

module.exports = { CaterningSignUp, Caterninglogin, CaterningProfile, CaterningUpdate,AllCat }