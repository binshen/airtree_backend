
module.exports = function (mongoose) {

    var device = new mongoose.Schema({
        mac: { type:String, required:true },
        type: { type:Number },
        name: { type:String },
        userID: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
        status: { type:Number },
        last_updated: { type:Number },
        app_status: { type:Number },
        app_last_updated: { type:Number }
    });
    return mongoose.model('Device', device);
};