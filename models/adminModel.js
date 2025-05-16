import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "admin",
    },
    permissions: {
        canEditBooks: {
            type: Boolean,
            default: true,
        },
        canAddBooks: {
            type: Boolean,
            default: true,
        },
        canDeleteBooks: {
            type: Boolean,
            default: true,
        },
        canEditStudents: {
            type: Boolean,
            default: true,
        },
        canAddStudents: {
            type: Boolean,
            default: true,
        },
        canDeleteStudents: {
            type: Boolean,
            default: true,
        },
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;