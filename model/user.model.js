const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const userSchema = new mongoose.Schema({
    _id: Number,
    name: { type: String },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    password: { type: String, required: true },
    date: { type: Date, default: Date.now },
    loginStatus: { type: Boolean, default: true }
}, { _id: false });

userSchema.plugin(AutoIncrement, { id: 'user_counter', inc_field: '_id' });

module.exports = mongoose.model('User', userSchema);
