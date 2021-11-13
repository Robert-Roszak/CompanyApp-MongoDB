const Product = require('../models/products.model');

exports.getAll = async (req, res) => {
    try {
      res.json(await Product.find());
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.getRandom = async (req, res) => {
    try {
      const count = await Product.countDocuments();
      const rand = Math.floor(Math.random() * count);
      const prod = await Product.findOne().skip(rand);
      if(!prod) res.status(404).json({ message: 'Not found' });
      else res.json(prod);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.getProdById = async (req, res) => {
    try {
      const prod = await Product.findById(req.params.id);
      if(!prod) res.status(404).json({ message: 'Not found' });
      else res.json(prod);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.addProd = async (req, res) => {
    try {
      const { name, client } = req.body;
      const newProduct = new Product({ name: name, client: client });
      await newProduct.save();
      res.json({ message: 'OK' });
    } catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.editProd = async (req, res) => {
    const { name, client } = req.body;
    try {
      const prod = await Product.findById(req.params.id);
      if(prod) {
        prod.name = name;
        prod.client = client;
        await prod.save();
        res.json({ message: 'OK' });
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.deleteProd = async (req, res) => {
    try {
      const prod = await Product.findById(req.params.id);
      if(prod) {
        await prod.remove();
        res.json({ message: 'OK' });
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};
