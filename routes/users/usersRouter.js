const express = require('express');
const {
    login,
    signup,
    forgotPassword,
    protect,
    verify_code,
    verify_code_forgotten,
} = require('../../controllers/users/authController');
const { getMyCart, addMyCart, select, updateProduct, deleteProduct, isOrdered } = require('../../controllers/users/cartControllers');
const {
    addMyOrders,
    getMyOrders,
    getMyOrderProducts,
    getNotOrderedProducts,
    deleteOrderedProduct,
    deleteAllOrderedProducts
} = require('../../controllers/users/ordersControllers');
const {
    getMe,
    updateMyPassword,
    updateMe,
    deleteMe,
    getAllHistory,
    addMyHistory,
    deleteMyHistory,
    enterToCompetition,
    addOne,
    deleteCompetitor,
    likeProduct,
    dislikeProduct,
    getUsersLikedProducts,
    uploadUserImage,
    createCard,
    deleteAllHistory,
    generateLink,
    getMyResult
} = require('../../controllers/users/usersControllers');
const router = express.Router();
router.use("/products", protect, require("./routes/productsRouter"))
router.use("/address", protect, require("./routes/addressRouter"))
router.use("/chat", protect, require("./routes/chatsRouter"))
router.patch('/forgot-password', verify_code_forgotten, forgotPassword);
router.post('/signup', verify_code, signup);
router.get("/get-me", protect, getMe)
router.post('/login', login);
router.get('/my-account', protect, getMe);
router.patch('/update-me', protect, updateMe);
router.delete('/delete-me', protect, deleteMe);
router.post("/upload-image", protect, uploadUserImage)
router.patch('/update-my-password', protect, updateMyPassword);
router.post("/history", protect, addMyHistory)
router.get("/history", protect, getAllHistory)
router.delete("/history", protect, deleteMyHistory)
router.delete("/history/all", protect, deleteAllHistory)
router.get('/my-cart', protect, getMyCart);
router.get("/is-ordered", protect, isOrdered)
router.patch("/my-cart/select/:id", protect, select)
router.patch("/my-cart/:id", protect, updateProduct)
router.post("/to-my-cart", protect, addMyCart)
router.get('/my-orders', protect, getMyOrders);
router.delete("/my-orders", protect, deleteOrderedProduct)
router.delete("/my-orders/all", protect, deleteAllOrderedProducts)
router.get("/not-ordered", protect, getNotOrderedProducts)
router.delete("/not-ordered/:id", protect, deleteProduct)
    // router.delete("/not-ordered/multiple/")
router.post('/my-orders/add', protect, addMyOrders);
router.post("/competition/add", protect, enterToCompetition)
router.post("/competition/add-one", protect, addOne)
router.post("/competition/link", protect, generateLink)
router.delete("/competition/:id", protect, deleteCompetitor)
router.get("/competition/me/:id", protect, getMyResult)
router.get("/like", protect, getUsersLikedProducts)
router.post("/like", protect, likeProduct)
router.delete("/like/:id", protect, dislikeProduct)
router.post("/card", protect, createCard)
module.exports = router;