const User = require('../model/user.model');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

exports.registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { name, username, email, phone, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ error: 'Email already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            username,
            email,
            phone,
            password: hashedPassword
        });

        await user.save();
        res.status(201).json({ message: "User registered successfully", id: user._id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.loginUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid password' });

        return res.status(200).json({ message: 'Login successful', userId: user._id });
    } catch (err) {
        console.error("Login error:", err);
        return res.status(500).json({ error: 'Server error' });
    }
};


exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, '-password');
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
