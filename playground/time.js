//Jan 1 1970 midnight
const moment =require('moment');
// var date =new Date();
// //var months =['Jan']
// console.log(date.getMonth());
 var date=moment();
var createdat =1234;
var date = moment(createdat);
 console.log(date.format('h:mm a'));
