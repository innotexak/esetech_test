const {
    Schema
} = mongoose;

const work = new Schema({

    userId: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: "Profiles"
    },

    skills: {
        type: [String],
        required: true,
        trim: true,
        lowercase: true
    },

    education: {
        type: [{
            name: String,
            startDate: Date,
            endDate: Date,
            certificateObtained: String
        }]
    },

    projects: {
        type: [{
            name: String,
            description: String,
            url: String
        }]
    },

    workExperience: {
        type: [{
            companyName: String,
            position: String,
            startDate: Date,
            endDate: Date,
        }],
    },



}, {
    timestamp: true
});

const workSchema = mongoose.model('works', work);

export {
    workSchema
}