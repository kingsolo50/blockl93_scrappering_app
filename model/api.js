'use strict';

const   mongoose = require('mongoose'),
        Schema = mongoose.Schema;

const   apiSchema = new Schema({

        imageUrl: { type: String},
        type: { type: String },
        title: { type: String },
        town: { type: String },
        location: { type: String },
        info: { type: String },
        contact: { type: String },
        size: { type: String },
        price: { type: Number },
        source: { type: String },
        created: { type: Date, default: Date.now }
        
});
    
module.exports = mongoose.model('Api', apiSchema);;