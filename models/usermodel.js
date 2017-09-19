
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.Promise = global.Promise;
//build connection with db
mongoose.connect('mongodb://localhost:27017/mydb');

// create a schema
var UserSchema = new Schema({

    username: { type:String,
        required: true,
        unique: true },

    email: { type: String, required: true , unique:true},
    password:{ type: String, required: true },
    salt:{ type: String },
    jwt:{type:String}

});

// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('users', UserSchema);


module.exports = User;
