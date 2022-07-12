module.exports = {
    development: {
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        port: process.env.DATABASE_PORT,
        host: process.env.DATABASE_HOST,
        dialect: process.env.DATABASE_DIALECT,
        logging: true,
    },
    production: {
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        port: process.env.DATABASE_PORT,
        host: process.env.DATABASE_HOST,
        dialect: process.env.DATABASE_DIALECT,
    },
    docker: {
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        port: process.env.DATABASE_PORT,
        host: process.env.DATABASE_HOST_DOCKER,
        dialect: process.env.DATABASE_DIALECT,
    },
};