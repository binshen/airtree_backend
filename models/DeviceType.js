/**
 * Created by bin.shen on 02/11/2016.
 */

module.exports = function (mongoose) {

    var deviceType = new mongoose.Schema({
        mac: { type:String, required:true },
        type: { type:Number },
        created: { type:Number }
    }, {
        collection: 'device_types',
        id: false
    });
    return mongoose.model('DeviceType', deviceType);
};