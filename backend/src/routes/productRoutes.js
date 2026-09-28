const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.getAllProducts);
router.get('/carousel', productController.getCarouselProducts);

module.exports = router;