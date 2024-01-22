const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')
const CaterningSchema = require("../Model/CaterningSchema")
const AdminSchema = require('../Model/AdminSchema')
const JWT_SECERETE = 'hello'

const AdminSignUp = async (req, res) => {
    try {
        const { name, email, password} = req.body
        console.log(req.body);


        if (!password) {
            // Handle the case when the password is missing or undefined
            return (res.status(400).send({ success: "fail", error: 'Password is missing' }), console.log("error"))
        }


        const salt = await bcrypt.genSalt(10)
        const pass = await bcrypt.hash(password, salt)

        const admin = new AdminSchema({
            name,
            email,
            password: pass,          
        })
        const saveAmin = admin.save()
        res.json({ admin })
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Error')
    }
}

const AdminLogin = async (req, res) => {
    try {
        const { email, password } = req.body


        const admin = await AdminSchema.findOne({ email })
    
            const match = await bcrypt.compare(password, admin.password)
            if (!match) {
                return res.json("Password not match")
            }
                const data = admin.id
                const token = await jwt.sign(data, JWT_SECERETE)

                res.json({ Adminsuccess: true, token, token, admin: admin })
            

    } catch (error) {
        console.log(error);
    }
}


module.exports = {AdminSignUp, AdminLogin}
