const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
    res.status(200).json("All good in here");
});

const authRoutes = require('./auth.routes');
router.use('/auth', authRoutes);

module.exports = router;