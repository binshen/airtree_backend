
module.exports = function (mongoose) {

    var data = new mongoose.Schema({
        mac: { type:String, required:true },
        x1: { type:Number },
        x2: { type:Number },
        x3: { type:Number },
        x4: { type:Number },
        x5: { type:String },
        x6: { type:String },
        x7: { type:String },
        x8: { type:String },
        x9: { type:Number },
        x10: { type:Number },
        x11: { type:Number },
        x12: { type:Number },
        x13: { type:Number },
        x14: { type:Number },
        p1: { type:Number },
        p2: { type:Number },
        p3: { type:Number },
        p4: { type:Number },
        fei: { type:Number },
        ferval: { type:Number },
        aqi: { type:Number },
        s: { type:Number },
        rank: { type:Number },
        ddv: { type:Number },
        mcu: { type:Number },
        day: { type:String },
        created: { type:Number }
    }, {
        collection: 'data',
        id: false
    });
    return mongoose.model('Data', data);
};