const router = require("express").Router();


router.use("/customers", require("../modules/customers/customer.router"));

module.exports = router;
