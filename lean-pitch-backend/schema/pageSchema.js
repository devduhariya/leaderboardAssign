const mongoose = require('mongoose');
const { Schema } = mongoose;
const pageSchema = new Schema({
    pageNo:Number    
});
mongoose.model('Page', pageSchema);

// text:[{textId:1234},{points:100}],
// video:[{videoId:234},{points}],
