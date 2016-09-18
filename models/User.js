
module.exports = function (mongoose) {

    var user = new mongoose.Schema({
        username: { type:String, required:true },
        password: { type:String, required:true },
        nickname: { type:String }
    });
    return mongoose.model('User', user);
};