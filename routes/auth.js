const router = require('express').Router();
const User = require('../models/User');
const { registerValidation } = require('../validation');
const bcrypt = require('bcryptjs');


router.post('/register', async(req, res) => {


    // To check if the user entered details are valid or not
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // To check if the user is already in the database
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send("email already there");


    const salt = await bcrypt.genSalt(6);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);


    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
    });


    try {
        const savedUser = await user.save();
        res.status(200).json(savedUser);
    } catch (e) {
        res.status(400).json({ message: e });
    }
});

module.exports = router;