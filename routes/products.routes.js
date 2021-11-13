const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/product.controller');

router.get('/products', ProductController.getAll);
router.get('/products/random', ProductController.getRandom);
router.get('/products/:id', ProductController.getProdById);
router.post('/products', ProductController.addProd);
router.put('/products/:id', ProductController.editProd);
router.delete('/products/:id', ProductController.deleteProd);

module.exports = router;
