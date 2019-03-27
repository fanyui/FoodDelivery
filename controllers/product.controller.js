const Product = require('../models/Product');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

exports.all = function (req, res) {
	Product.find( {}, function (err, product) {
        if (err) 
        	res.status(404, 'No products found').send(err);
        res.status(200).send(product);
    })
};

exports.create = function (req, res) {
    let product = new Product(
        {
            name: req.body.name,
            price: req.body.price,
            type: req.body.type,
            description: req.body.description
        }
    );

    product.save(function (err) {
        if (err) {
            res.status(404, 'The product is not created').send(err);
        }
        res.status(201).send('Product Created successfully')
    })
};

exports.details = function (req, res) {
    Product.findById(req.params.id, function (err, product) {
        if (err) 
        	res.status(404, 'The product is not found').send(err);
        res.status(200).send(product);
    })
};


exports.update = function (req, res) {
    Product.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, product) {
        if (err)
        	res.status(404, 'The product is not updated').send(err);
        res.status(200, 'The product is updated').send('Product udpated.');
    });
};


exports.delete = function (req, res) {
    Product.findByIdAndRemove(req.params.id, function (err) {
        if (err)
        	res.status(404, 'The product is not deleted').send(err);
        res.send('Deleted successfully!');
    })
};

