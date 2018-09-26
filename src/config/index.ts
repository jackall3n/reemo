export default {
    database: {
        address: process.env.DB_STRING
    },
    auth: {
        secret: process.env.JWT_SECRET || 'test' 
    },
    email : {
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
}