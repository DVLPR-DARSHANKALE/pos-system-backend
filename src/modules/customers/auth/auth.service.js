
const AppError = require("../../../utils/app_error");
const repository = require("./auth.repository");
const bcrypt = require("bcrypt");
const jwt = require("../../../utils/jwt");



async function signUp(data) {
    let user = await repository.findUserByEmail(data.email);

    if (user) {
        throw new AppError("Email alredy exists", 404);
    }

    const password_hash = await bcrypt.hash(data.password, 10);

    data.password_hash = password_hash;

    user = await repository.createUser(data);

    const refreshTokenPayload = {
        sub: user.id,
        type: "refresh"
    }
    const accessTokenPayload = {
        sub: user.id,
        type: "access"
    }
    const accessToken = jwt.getAccessToken(accessTokenPayload);
    const refreshToken = jwt.getRefreshToken(refreshTokenPayload);


    return { user, accessToken, refreshToken };

}

async function signIn(data) {

    const user = await repository.findUserByEmail(data.email);

    if (!user) {
        throw new AppError("Invalid Credentials", 404);
    }


    const passwordMatched = await bcrypt.compare(data.password, user.password_hash);
    if (!passwordMatched) {
        throw new AppError("Invalid Credentials", 404);
    }

    const refreshTokenPayload = {
        sub: user.id,
        type: "refresh"
    }
    const accessTokenPayload = {
        sub: user.id,
        type: "access"
    }
    const accessToken = jwt.getAccessToken(accessTokenPayload);
    const refreshToken = jwt.getRefreshToken(refreshTokenPayload);


    return { user, accessToken, refreshToken };



}

module.exports = {
    signUp, signIn
}