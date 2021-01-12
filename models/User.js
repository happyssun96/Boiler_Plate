const { NativeError } = require("mongoose");
const bcrypt = require('bcrypt');
const saltRounds = 10; // salt를 10자리 글자로 생성
const jwt = require('jsonwebtoken');

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength:50
    },
    email: {
        type: String,
        trim: true, // 공백을 없애주는 역할
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

userSchema.pre('save', function(next) {
    var user = this;
    if(user.isModified('password')) { // 비밀번호를 바꿀때만 작동하도록 한다.
    // salt를 이용해서 비밀번호를 암호화 시킨다.
    bcrypt.genSalt(saltRounds, function(err, salt) {
        if(err) return next(err)

        bcrypt.hash(user.password, salt, function(err, hash) {
            if(err) return next(err)
            // Store hash in your password DB.
            user.password = hash
            next()
        })
    })
} else {
    next()
}
})

userSchema.methods.comparePassword = function (plainPassword, cb) {
    //// plainPassword 와 암호화된 비밀번호를 비교
    bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch); // 비밀번호가 같다면 true
    })
}

userSchema.methods.generateToken = function (cb) {
    var user = this;
    
    // jsonwebtoken을 이용해서 token을 생성하기 
    var token = jwt.sign(user._id.toHexString(), 'secretToken')
    // user._id + 'secretToken' = token 
    // -> 
    // 'secretToken' -> user._id

    user.token = token
    user.save(function (err, user) {
        if (err) return cb(err)
        cb(null, user)
    })
}

const User = mongoose.model('User', userSchema)

module.exports = {User} // 다른 곳에서도 쓸 수 있게 함