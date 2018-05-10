const moment = require('moment');

let date = moment();
console.log(date.format('MMM')) // May
console.log(date.format('MMM YYYY')) // May 2018
console.log(date.format('Do dddd MMM YYYY')) // 10th Thursday May 2018
console.log(date.format('Do ddd MMM YYYY')) // 10th Thu May 2018
console.log(date.format('Do dddd MMM YYYY kk:mm:ss')) // 10th Thursday May 2018 15:04:02

