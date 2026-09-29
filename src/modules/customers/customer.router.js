const router = require("express").Router();


router.use("/auth", require("./auth/auth.router"));

module.exports = router;