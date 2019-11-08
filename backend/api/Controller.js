'use strict';

var mongoose = require('mongoose'),
  Receipt = mongoose.model('Receipts');

exports.list_all_receipts = (req, res) => {
  Receipt.find({}, (err, receipt) => {
    if (err)
      res.send(err);
    res.json(receipt);
  });
};

exports.create_a_receipt = (req, res) => {
  var new_receipt = new Receipt(req.body);
  new_receipt.save((err, receipt) => {
    if (err)
      res.send(err);
    res.json(receipt);
  });
};

exports.read_a_receipt = (req, res) => {
  Receipt.findById(req.params.receiptId, (err, receipt) => {
    if (err)
      res.send(err);
    res.json(receipt);
  });
};

exports.update_a_receipt = (req, res) => {
  Receipt.findOneAndUpdate({ _id: req.params.receiptId }, req.body, {new: true}, (err, receipt) => {
    if (err)
      res.send(err);
    res.json(receipt);
  });
};

exports.delete_a_receipt = (req, res) => {
  Receipt.remove({ _id: req.params.receiptId }, (err, receipt) => {
    if (err)
      res.send(err);
    res.json({ message: 'Receipt successfully deleted' });
  });
};