const NgoSchema = require("../Model/NgoSchema")
const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')
const CaterningSchema = require("../Model/CaterningSchema")
const { json } = require("express")
const JWT_SECERETE = 'hello'


// SignUp
const NgoSignUp = async (req, res) => {
    try {
        const { name, email, password, district, state, location, cpassword } = req.body
        const { certificate, nphoto } = req.files;
        console.log(req.body);


        const ngoval = await NgoSchema.findOne({ email })
        console.log(ngoval);

        if (ngoval) {
            console.log("ghdfh")
            return res.json({error:'user alreadt exist'})
        } else {


            if (!password) {
                // Handle the case when the password is missing or undefined
                return (res.status(400).send({ success: "fail", error: 'Password is missing' }), console.log("error"))
            }
            // if (!cpassword) {
            // Handle the case when the password is missing or undefined
            //     return (res.status(400).send({ success: "fail", error: 'conform Password is missing' }), console.log("error"))
            // }

            // if(password != cpassword){
            //     return (res.status(400).send({ success: "fail", error: 'Insert correct password' }), console.log("error"))

            // }


            const salt = await bcrypt.genSalt(10)
            const pass = await bcrypt.hash(password, salt)

            const ngo = new NgoSchema({
                name,
                email,
                password: pass,
                certificate: certificate[0].filename,

                nphoto: nphoto[0].filename,
                district,
                state,
                location,
                request: 'pending'
            })
            const saveNgo = ngo.save()
            // res.json({ ngo })
            res.json({success:"Successfuly created account"})
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Error')
    }
}

// Login
const NgoLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        if (password == null || email == null) {
            return res.json("enter the the details")
        } else {

            const ngoval = await NgoSchema.findOne({ email })

            if (!ngoval) {
                return res.json("Email Not Found")
            } else {


                const match = await bcrypt.compare(password, ngoval.password)
                if (!match) {
                    return res.json("Password not match")
                }

                if (ngoval.request == "pending") {
                    return res.send("waiting")
                } else if (ngoval.request == "reject") {
                    return res.json("rejected")

                } else {
                    const data = ngoval.id
                    const token = await jwt.sign(data, JWT_SECERETE)

                    res.json({ success: true, token, token, ngo: ngoval })
                }
            }

        }

        // } else if (catval) {
        //     const match = await bcrypt.compare(password, catval.password)
        //     if (!match) {
        //         return res.json("Password not match")
        //     }

        //     const data = catval.id
        //     const token = await jwt.sign(data, JWT_SECERETE)

        //     res.json({ success: true, token, token, cat: catval })
        // } else {
        //     res.json("Email Not found")

        // }

    } catch (error) {
        console.log(error);
    }
}

// Get NGO PROFILE DETAILS

const NgoProfile = async (req, res) => {
    try {
        const ngo = await NgoSchema.findOne({ _id: req.params.id }).select("-password")

        if (!ngo) {
            return res.status(404).json({ error: "User Not found" });
        }

        res.status(200).json({ ngo });
    } catch (error) {
        return res.status(422).json({ error: error.message });
    }
}

// Edit Profile

const NgoUpdate = async (req, res) => {
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

        let ngo = await NgoSchema.findOne({ _id: req.params.id })

        if (!ngo) {
            return res.status(404).send("Not Found")

        }

        ngo = await NgoSchema.findByIdAndUpdate(
            req.params.id,
            { $set: newData }, { new: true }
        )
        res.json(ngo)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Error")
    }
}

// FIND ALL NGO WHO ARE AVAIBLE for adming

const AllNgo = async (req, res) => {
    try {
        const ngo = await NgoSchema.find()
        res.json(ngo)

    } catch (error) {
        console.log(error);
        res.status(500).send("Internal error")
    }
}

//  ACCEPTING THE NGO
const AccepNgo = async (req, res) => {
    // const request = req.body
    try {
        const ngo = await NgoSchema.findByIdAndUpdate(req.params.id, { request: "accept" }, { new: true })
        res.json(ngo)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Error")
    }
}

// CANCLING THE ACCEPTED REQUEST
const CancleNgo = async (req, res) => {
    // const request = req.body
    try {
        const ngo = await NgoSchema.findByIdAndUpdate(req.params.id, { request: "pending" }, { new: true })
        res.json(ngo)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Error")
    }
}


// REJECT THE REQUEST AND sending to reject state
const RejectNgo = async (req, res) => {
    // const request = req.body
    try {
        const ngo = await NgoSchema.findByIdAndUpdate(req.params.id, { request: "reject" }, { new: true })
        res.json(ngo)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Error")
    }
}


module.exports = { NgoSignUp, NgoLogin, NgoProfile, NgoUpdate, AllNgo, AccepNgo, CancleNgo, RejectNgo }

