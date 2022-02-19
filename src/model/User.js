const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//Schema
const userSchema = mongoose.Schema(
    {
        firstName:{
            required: [true,'First Name is required'],
            type: String,
        },
        lastName:{
            required: [true,'Last Name is required'],
            type: String,
        },
        email:{
            required: [true,'Email is required'],
            type: String,
        },
        password:{
            required: [true,'Password is required'],
            type: String,
        },
        isAdmin:{
            type: Boolean,
            default: false,
        }
    },
    {
        timestamp: true,
    } 
); 

//Hash password
userSchema.pre("save",async function(next){
    if(!this.isModified('password')){
        next();
    }
    this.password = await bcrypt.hash(this.password,10);
    next();
})

const User = mongoose.model('User',userSchema);
module.exports = User;




// console.log(this.password);
// bcrypt.hash(this.password, 10, function(err, hash) {
//     console.log(hash);
//     console.log("Before: ",this.password);
//     this.password = hash;
//     console.log("After: ",this.password);
    
// });