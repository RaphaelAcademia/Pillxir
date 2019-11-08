module.exports = function(app) {
  var controller = require('./Controller.js');

  // Receipts Routes
  app.route('/receipts')
    .get(controller.list_all_receipts)
    .post(controller.create_a_receipt);
    
  app.route('/receipts/:receiptId')
    .get(controller.read_a_receipt)
    .put(controller.update_a_receipt)
    .delete(controller.delete_a_receipt);
};