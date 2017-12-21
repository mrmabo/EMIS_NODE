const mongoose = require('mongoose');
// Promise = require('bluebird');
// mongoose.Promise = Promise;

const ObjectID = require('mongodb').ObjectID;

const url = "mongodb://localhost/test";
mongoose.connect(url, {
    useMongoClient: true
});

const partnerSchema = new mongoose.Schema({
    name: {type: String, required:true},
})

// partnerSchema.statics.get = (uid = null) => {
//     return new Promise((resolve, reject)=>{
//         if(uid == null){
//             Partner.find(function (err, partner) {
//                 if (err) {
//                     reject({
//                         message: err,
//                         status: 0
//                     })
//                 }
//                 resolve(data);
//             })
//         } else {
//             Partner.find({
//                 "_id": ObjectID(uid)
//             }, function (err, data) {
//                 if (err) rej(err);
//                 res(data);
//             });
//         }
//     })
// }

// partnerSchema.method.save = (data = {}, id = 0) => {
//     return new Promise((resolve, reject) => {
//         Partner.findOneAndUpdate({
//             _id:ObjectID(id)
//         },{
//             name: this.name,
//         },{
//             new : true
//         },function (err,data) {
//             if (err) {
//                 reject({
//                     message: err,
//                     status: 0
//                 });
//             } else {
//                 console.log("new event Added Successfully !");
//                 resolve({
//                     message: "New Event Added",
//                     status: 1
//                 })
//             }
//         })
//     })
// }

// partnerSchema.statics.delete = (id = null) => {
//     return new Promise((res, rej) => {
//         if (id === null) {
//             res({ message : "Remove Failed. No ID found"});
//         } else {
//             Partner.remove({
//                 _id: id
//             }, function (err, data) {
//                 if (err) {
//                     reject({
//                         message: err,
//                         status: 0
//                     });
//                 }
//                 res({message : "Remove Successfully", data: data});
//             });
//         }
//     });
// }

const Partners = mongoose.model('partners', partnerSchema)

module.exports = Partners;