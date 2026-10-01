const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');


router.get('/carousel', productController.getCarouselProducts);
router.get('/', productController.getAllProducts);

module.exports = router;