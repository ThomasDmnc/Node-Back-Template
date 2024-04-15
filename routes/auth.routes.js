const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const { verifyToken } = require("../middlewares/auth.middleware");
const router = express.Router();


router.get('/', (req, res, next) => {
    res.status(200).json({message: 'All good from /api/auth'})
})

router.post('/signup', (req, res, next) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const { email, password } = req.body;
    const salt = bcrypt.genSaltSync(12);
    const passwordHash = bcrypt.hashSync(password, salt);

    if ( email == '' || password == '') {
        return res.status(400).json({ message: 'Please provide an email or a password' })
    };
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Please provide a valid email address' })
    };
    if (password.length < 8) {
       return  res.status(400).json({ message: 'Please provide a valid password' })
    }
     User.findOne({email}).then((foundUser) => {
        if (foundUser) {
            return res.status(400).json({ message: 'This user already exists' })
        }
        return User.create({email, passwordHash})
    }).then((createdUser) => {
        const { _id, email } = createdUser;
        const user =  { _id, email };
        res.status(200).json({ user: user});
    }).catch((error) => {
        next(error);
    }) 
})

router.post('/login', (req, res, next) => {
    const { email, password } = req.body;
    if ( email == '' || password == '') {
       return res.status(400).json({ message: 'Please provide an email or a password' })
    };

    User.findOne({email})
    .then((foundUser) => {
        if (!foundUser){
            res.status(400).json({message: 'User not found.'})
            return
        }
        const passwordCorrect = bcrypt.compareSync(password, foundUser.passwordHash);
        if (passwordCorrect){
            const authToken = jwt.sign(
                { userId: foundUser._id},
                process.env.TOKEN_SECRET,
                {
                    algorithm: 'HS256',
                    expiresIn: '6h'
                }
            )
            res.status(201).json({token: authToken})
        } else {
            res.status(401).json({message: "Unable to auth the user"})
        }
    })
    .catch((error) => {
        next(error)
    })
})

router.get('/verify', verifyToken, (req, res, next) => {
    res.status(200).json(req.payload)
})

module.exports = router;