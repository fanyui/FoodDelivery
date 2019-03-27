const Customer = require('../models/Customer');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

exports.all = function (req, res) {
    Customer.find( {}, function (err, customer) {
        if (err) 
            res.status(404, 'No customers found').send(err);
        res.status(200).send(customer);
    })
};

exports.details = function (req, res) {
    Customer.find({}, function (err, customers) {
        if (err)
            res.status(404, 'The customer is not found').send(err);
        res.send(customers);
    })
};

exports.create = function (req, res) {
    let customer = new Customer(
        {
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            password: req.body.password,
            image: req.body.image,
            updateAt: req.body.updateAt
        }
    );

    customer.save(function (err) {
        if (err) {
            res.status(201, 'The customer is created').send(err);
        }
        res.status(200).send('Customer Created successfully')
    });
};

exports.details = function (req, res) {
    Customer.findById(req.params.id, function (err, customer) {
        if (err) return next(err);
        res.send(customer);
    });
};


exports.update = function (req, res) {
    Customer.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, customer) {
        if(err)
        {
          res.status(404, 'The customer is not found').send(err);
        } else {
        res.status(200).send(customer);
        }
    });
};


exports.delete = function (req, res) {
    Customer.findByIdAndRemove(req.params.id, function (err) {
        if(err){
        res.status(404).send(err);
        }else{
            res.status(200).send('Deleted successfully');
        }
    });
};

