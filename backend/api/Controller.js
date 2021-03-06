'use strict';

var mongoose = require('mongoose'),
  Receipt = mongoose.model('Receipts');
var service = require('./Service.js');

exports.list_all_receipts = (req, res) => {
  Receipt.find({}, (err, receipt) => {
    if (err)
      res.send(err);
    res.json(receipt);
  });
};

exports.delete_all_receipts = (req, res) => {
  Receipt.remove({}, (err, receipt) => {
    if (err)
      res.send(err);
    res.json({ message: 'All receipts successfully deleted' });
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

/**
 * Returns specific date based on request query string
 * format of request query paramaters:
 * 
 * 
 * "startDate": "YYYY-MM-DD"
 * "endDate": "YYYY-MM-DD"
 * 
 * 
 */
exports.get_speciic_receipts = (req, res) => {
 
  Receipt.find({Timestamp: { $gte: new Date(req.query.startDate), $lte: new Date(req.query.endDate).setHours(24)}}, (err, receipt) => {
    if (err)
      res.send(err);
    res.json(receipt);
  });
};

//Handles uploading
exports.upload = async (req, res) => {

  try {
    if(!req.files) {
        res.send({
            status: false,
            message: 'No file uploaded'
        });
    } else {
        let file = req.files.file;
        service.moveFile(file);
        res.send({
            status: true,
            message: 'File is uploaded',
            data: {
                name: file.name,
                mimetype: file.mimetype,
                size: file.size
            }
        });
    }
} catch (err) {
  res.status(500).send(err);
}
};

