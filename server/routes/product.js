const express = require('express');
const multer = require('multer');
const authMiddleware = require('../middleware/auth');
const adminAuthMiddleware = require('../middleware/adminAuth');
const {
  getAllProducts,
  getProduct,
  getProductCount,
  getFeaturedProducts,
  postProduct,
  updateProduct,
  updateProductImages,
  deleteProduct,
} = require('../controllers/productController');
const router = express.Router();

const FILE_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg',
  'image/webp': 'webp',
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let uploadError = new Error('Invalid file type');
    if (isValid) uploadError = null;
    cb(uploadError, 'public/uploads');
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.replaceAll(' ', '-').split('.')[0];
    const extension = FILE_TYPE_MAP[file.mimetype];
    cb(null, `${fileName}-${Date.now()}.${extension}`);
  },
});

const uploadOptions = multer({ storage: storage });

router
  .get('/', getAllProducts)
  .get('/get/featured/:count?', getFeaturedProducts);

router.use(authMiddleware);

router.get('/:productId', getProduct);

router.use(adminAuthMiddleware);
router
  .post('/', uploadOptions.single('image'), postProduct)
  .patch('/:productId', updateProduct)
  .put(
    '/gallery-images/:productId',
    uploadOptions.array('images', 3),
    updateProductImages
  )
  .delete('/:productId', deleteProduct)
  .get('/get/count', getProductCount);

module.exports = router;
