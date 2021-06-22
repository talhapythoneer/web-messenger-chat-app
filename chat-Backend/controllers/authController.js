const User = require("../models").User
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const config = require("../config/app")

exports.login = async(req, res) => {
    const { email, password } = req.body;

    try {

        const secret = require("crypto").randomBytes(64).toString("hex")

        // find the user
        const user = await User.findOne({
            where: {
                email
            }
        })

        // if user not found
        if (!user) return res.status(404).json({ message: "User Not Found!" });

        // check password matches
        if (!bcrypt.compareSync(password, user.password)) res.status(401).json({ message: "Incorrect Password" });

        // generate token
        const userWihToken = generateToken(user.get({ raw: true }))
        userWihToken.user.avatar = user.avatar

        return res.send(userWihToken);

    } catch (e) {
        return res.status(500).json({ message: e.message });
    }


}

exports.register = async(req, res) => {


    try {
        const user = await User.create(req.body)

        // generate token
        const userWihToken = generateToken(user.get({ raw: true }))
        return res.send(userWihToken);

    } catch (e) {
        return res.status(500).json({ message: e.message });
    }

}

const generateToken = (user) => {

    delete user.password

    const token = jwt.sign(user, config.appKey, { expiresIn: 86400 })

    return {...{user}, ... { token } }

}