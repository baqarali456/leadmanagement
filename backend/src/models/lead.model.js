import mongoose from "mongoose"

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
    },
    source: {
        type: String,
        enum:
            [
                'Social media marketing',
                'Referrals',
                'Email marketing',
                'Content marketing',
                'Events',
                'Other'
            ],
        default: 'Other',
    },
    status: {
        type: String,
        enum: ["New", "Contacted", "Converted", "Lost"],
        default: "New"
    }
}, { timestamps: true })


export const Lead = mongoose.model('Lead', leadSchema);