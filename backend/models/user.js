const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    // email: {
    //     type: String,
    //     required: true,
    //     unique: true
    // },
    // googleId: {
    //     type: String,
    //     unique: true
    // },
    email: {
        type: String,
        unique: true
    },
    phone: {
        type: String,
        unique: true
    },
    url : {
        type: String
    },
    gender: {
        type: String
    },
    address: {
        type: String
    }
});

UserSchema.plugin(passportLocalMongoose);



// UserSchema.statics.findOrCreate = async function (profile, cb) {
//     try {
//         const user = await this.findOne({ googleId: profile.id });
//         // if (!user) {
//         //     // If no user is found, create a new one
//         //     user = await this.create({
//         //         googleId: profile.id,
//         //         username: profile.displayName,
//         //         email: profile.emails[0].value   // Google OAuth2 provides the email in the profile
//         //     });
//         // }
//         return cb(null, user);
//     } catch (err) {
//         return cb(err, null);
//     }
// };


module.exports = mongoose.model('User', UserSchema);