module.exports = function (mongoose) {

    var admin = new mongoose.Schema({
        username: { type:String, required:true },
        password: { type:String, required:true },
        nickname: { type:String, required:true }
    });
    return mongoose.model('Admin', admin);
};