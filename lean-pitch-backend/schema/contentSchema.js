const mongoose = require('mongoose');
const { Schema } = mongoose;
const ObjectID = require('mongodb').ObjectID;
const contentSchema = new Schema({
    pageId:ObjectID,
    type:String,
    content:String,
    points:Number
});
mongoose.model('Content', contentSchema);