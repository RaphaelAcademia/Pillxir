'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReceiptSchema = new Schema({
  Total: {
    type: Number,
    required: 'Enter the total cost'
  },
  Timestamp: {
    type: Date,
    default: Date.now
  },
  Store: {
    type: String,
    required: 'Enter the store'
  }
});

module.exports = mongoose.model('Receipts', ReceiptSchema);