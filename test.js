// var size = Math.ceil(121634 / 1000);
// console.log(size);
//
// var common = require('./utils/common');
// console.log(common.md5("1"));
// console.log(common.getFileMD5('/Users/bin.shen/Desktop/download/Master.UI.1.2016.8.11.01s copy.rar'));

// var crypto = require('crypto');
// var fs = require('fs');
//
// var rs = fs.createReadStream('/Users/bin.shen/Desktop/download/Master.UI.1.2016.8.11.01s copy.rar');
//
// var hash = crypto.createHash('md5');
// rs.on('data', hash.update.bind(hash));
//
// rs.on('end', function () {
//     console.log(hash.digest('hex'));
// });

//4b540abd91f8e8c9266a11cd1706beba
//4b540abd91f8e8c9266a11cd1706beba


// //读取一个Buffer
// var buffer = fs.readFileSync('/Users/bin.shen/Desktop/download/Master.UI.1.2016.8.11.01s copy.rar');
// var fsHash = crypto.createHash('md5');
// fsHash.update(buffer);
// var md5 = fsHash.digest('hex');
// console.log("文件的MD5是：%s", md5);

// var dt = 1478136089668;
// var date = new Date(dt);
// console.log(date);

var xlsx = require('node-xlsx').default;
var fs = require('fs');

var data = [['MAC地址', '机型']];
var file = xlsx.build([{name: "mySheetName", data: data}]);
console.log(file);
fs.writeFileSync('user.xlsx', file, 'binary')