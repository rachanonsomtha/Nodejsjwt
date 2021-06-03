const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

//validation!
const validation = require('../validation')


router.post('/register', async (req, res) => {
    //validate the data
    const { error } = validation.registerValdation(req.body)

    if (error) return res.status(400).send(error.details[0].message);

    //checking if the user is already exist in database
    const emailExist = await User.findOne({ email: req.body.email })
    if (emailExist) return res.status(400).send('email already exist');

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);


    //create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
    })

    try {
        const savedUser = await user.save();
        res.status(200).send(savedUser);
    } catch (err) {
        res.status(400).send(err);
    }
});

//login
router.post('/login', async (req, res) => {
    //validate the data
    const { error } = validation.loginValdation(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    //checking if the user is already exist in database
    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).send('Email or password is wrong');

    //password is correct?
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Invalid password');

    //create and assign a web token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
    res.header('auth-token', token).send(token);
});


module.exports = router;