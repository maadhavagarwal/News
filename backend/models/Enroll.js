// EnrollSchema
const mongoose = require("mongoose");
const { Schema } = mongoose;

const EnrollSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user' // Referring to the 'User' model
    },
    courseId: { type: String, trim: true, required: true, maxlength: 1000 },
    Name: { type: String, required: true, maxlength: 100 },
    paymentId: { type: String, trim: true, required: true, maxlength: 1000 },
    Address: { type: String, required: true, maxlength: 1000 },
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Enroll', EnrollSchema);
