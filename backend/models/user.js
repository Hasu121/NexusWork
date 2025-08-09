const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    googleId: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
    },
    f_name: {
        type: String,
        default: '',
    },
    headline: {
        type: String,
        default: '',
    },
    curr_company: {
        type: String,
        default: '',
    },
    curr_location: {
        type: String,
        default: '',
    },
    profile_pic: {
        type: String,
        default: 'https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg',
    },
    cover_pic: {
        type: String,
        default: 'https://t3.ftcdn.net/jpg/03/16/91/28/360_F_316912806_RCeHVmUx5LuBMi7MKYTY5arkE4I0DcpU.jpg',
    },
    curr_company: {
        type: String,
        default: '',
    },
    about: {
        type: String,
        default: '',
    },
    skills: {
        type: [String],
        default: [],
    },
    experience: [
        {
            designation: {
                type: String,
            },
            company_name: {
                type: String,
            },
            Duration: {
                type: String,
            },
            location: {
                type: String,
            },
        }
    ],
    friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    ],
    pending_friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    ],
    resume: {
        type: String,
    },
},{timestamps: true});

const userModel = mongoose.model('user', UserSchema);
module.exports = userModel;