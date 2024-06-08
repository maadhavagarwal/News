// CourseSchema
const mongoose = require("mongoose");
const { Schema } = mongoose;

const CourseSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user' // Referring to the 'User' model
    },
    name: { type: String, trim: true, required: true, maxlength: 1000 },
    description: { type: String, trim: true, required: true, maxlength: 5000 },
    category: { type: String, trim: true, required: true, maxlength: 200 },
    image: { type: String, trim: true, required: true,maxlength: 5000 },
    duration: { type: Number, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, required: true },
    enrolledStudents: { type: Number, required: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Course', CourseSchema);
