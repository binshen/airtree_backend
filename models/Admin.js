module.exports = function (mongoose) {

    var admin = new mongoose.Schema({
        username: { type:String, required:true },
        password: { type:String, required:true }
    }, { collection: 'admins' });
    return mongoose.model('Admin', admin);
};