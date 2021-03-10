const mongoose = require('mongoose');
const { Schema } = mongoose;
const ObjectID = require('mongodb').ObjectID;
const userContentSchema = new Schema({
   userId:String,
   contentId:String,
   isCompleted:Boolean
   
});
mongoose.model('userContent', userContentSchema);