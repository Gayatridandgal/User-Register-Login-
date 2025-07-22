const { body } = require('express-validator');

exports.registerValidation = [
    body('username').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Enter a valid email'),
    body('password')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
        .matches(/[a-z]/).withMessage('Password must contain lowercase')
        .matches(/[A-Z]/).withMessage('Password must contain uppercase')
        .matches(/\d/).withMessage('Password must contain number'),
    body('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.password) throw new Error('Passwords do not match');
        return true;
    })
];

exports.loginValidation = [
    body('email').isEmail().withMessage('Enter a valid email'),
    body('password').notEmpty().withMessage('Password is required')
];
