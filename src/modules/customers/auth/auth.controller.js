const { response } = require("../../../core");
const service = require("./auth.service");
module.exports.signUp = async (req, res) => {

    const data = req.validatedData.body;
    const user = await service.signUp(data);
    return response.success(res, 200, "User sign up successfully !", user);
}


module.exports.signIn = async (req, res) => {
    const data = req.validatedData.body;
    const user = await service.signIn(data);
    return response.success(res, 200, "User sign in successfully !", user);
}