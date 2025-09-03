import mongoose from "mongoose";

const leadSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    AlternateEmail: {
        type: String,
    },
    source: {
        type: String,
        enum:
            [
                'Social media',
                'Referrals',
                'Website',
                'Email compaign',
                'Cold call',
                'Other'
            ],
        default: 'Other',
    },
    status: {
        type: String,
        enum: ["New", "Contacted", "Follow-Up", "Converted", "Qualified"],
        default: "New"
    },
    jobInterest: {
        type: String,
        enum: [
            'Web Development',
            'Data Science',
            'Mobile Development',
            'UI/UX Design',
            'Digital Marketing',
            'Other',
        ],
        required: true,
    },
    qualification: {
        type: String,
        enum: [
            'High School',
            'Bachelors',
            'Masters',
            'PhD',
            'Other',
        ],
        required: true,
    },
    assignedTo: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    passoutYear: {
        type: Number,
        required: true,
    }

}, { timestamps: true })


export const Lead = mongoose.model('Lead', leadSchema);