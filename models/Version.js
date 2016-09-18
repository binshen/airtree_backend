
module.exports = function (mongoose) {

    var version = new mongoose.Schema({
        type: { type:Number, required:true },
        ver: { type:String, required:true },
        md5: { type:String },
        size: { type:String },
        dev: { type:String },
        file: { type:String, required:true },
        sys: { type:String },
        wlan: { type:String },
        created: { type:Number }
    });
    return mongoose.model('Version', version);
};