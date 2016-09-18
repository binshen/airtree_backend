
module.exports = function (mongoose) {

    var version = new mongoose.Schema({
        username: { type:String, required:true },
        password: { type:String, required:true },
        nickname: { type:String }
    });
    return mongoose.model('Version', version);
};