
const mongoose  = require('mongoose')
const {
    Schema
} = mongoose;

const userSchema = new Schema({

    firstName: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },


    lastName: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },

    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },
    socialAccount: {
        type: [{
            social: String,
            url: String
        }]
    },

    porfolio: {
        type: String
    },

    tagline: {
        type: [String]
    },

    refreshToken:{
        type:String,
        unique:true,
    },

    accessToken:{
        type:String,
        unique:true,
    }

},  {
    timestamps: true
});

const profileSchema = mongoose.model('Profiles', userSchema);


module.exports= profileSchema
