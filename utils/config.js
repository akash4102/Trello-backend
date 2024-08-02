const CONFIG = {
    PORT : process.env.PORT,
    BASE_URL : process.env.BASE_URL,
    MONGODB_URL : process.env.MONGODB_URL,
    JWT_SECRET : process.env.JWT_SECRET,
    ALLOWED_ORIGINS : process.env.ALLOWED_ORIGINS,
}

module.exports = { CONFIG };