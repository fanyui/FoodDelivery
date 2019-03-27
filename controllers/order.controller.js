const Order = require('../models/Order');
const Customer = require('../models/Customer');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};


exports.details = function (req, res) {
    Order.find({}, function (err, orders) {
        if (err)
            res.status(404, 'The order is not found').send(err);
        res.send(orders);
    })
};

exports.create = function (req, res) {
    let customer =  Customer.findById(req.params.cust)
    let order = new Order(
        {
            products: req.body.products,
            customer: customer._id,
            orderDate: req.body.orderDate
        }
    );

    order.save(function (err) {
        if (err) {
            res.status(201, 'The order is created').send(err);
        }
        res.status(200).send('order Created successfully')
    })
};

exports.details = function (req, res) {
    Order.findById(req.params.id, function (err, order) {
        if (err) 
            {
                res.status(404, 'The order is not found').send(err);
            }
        res.send(order);
    })
};


exports.update = function (req, res) {
    Order.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, order) {
        if(err)
        {
          res.status(404, 'The order is not found').send(err);
        } else {
        res.status(200).send(order);
        }
    });
};


exports.delete = function (req, res) {
    Order.findByIdAndRemove(req.params.id, function (err) {
        if(err){
        res.status(404).send(err);
        }else{
            res.status(200).send('Deleted successfully');
        }
    })
};

