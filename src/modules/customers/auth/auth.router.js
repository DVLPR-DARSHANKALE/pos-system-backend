const router = require("express").Router();
const validations = require("./auth.validations");
const validator = require("../../../middlewares/validate");
const controller = require("./auth.controller");

router.post("/sign-up", validator(validations.signUpSchema), controller.signUp);
router.post("/sign-in", validator(validations.signInSchema), controller.signIn);

module.exports = router;