const env = {
    accessSecret: process.env.ACCESS_TOKEN_SECRET ?? "banana2030",
    refreshSecret: process.env.REFRESH_TOKEN_SECRET ?? "Banana2030", 
    accessTtl: process.env.JWT_ACCESS_EXPIRES_IN ?? 900000,
    refreshTtl: process.env.JWT_REFRESH_EXPIRES_IN ?? 2.88e+7,
};

export default env