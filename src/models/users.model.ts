import mongoose from "mongoose";
// User Schema
const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    salt : {
        type: String,
        required: true,
    },
    refreshToken: {
        type: String,
    },
    isDeleted : {
        type: Boolean,
        default: false,
    }
},
{
    timestamps : true,
    toJSON : {
        transform(doc, rec){
            delete rec.password;
            delete rec.__v;
            delete rec.salt;
            delete rec.refreshToken;
            return rec;
        }
    }
});

const User = mongoose.model("User", userSchema);

export default User;                