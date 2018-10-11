const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        maxlength:25,
        minlength:2,
    },

    password:{
        type:String,
        required:true,
        minlength: [5, '`{PATH}` alanı (`{VALUE}`), ({MINLENGTH}) karakterden büyük olmalıdır.']
    }
});

module.exports = mongoose.model('users', UserSchema);