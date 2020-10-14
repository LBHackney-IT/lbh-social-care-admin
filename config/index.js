require('dotenv').config(); // this loads the defined variables from .env

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
    host: process.env.HOST || "localhost",
    port: parseInt(process.env.PORT, 10) || 5000,
    protocol: process.env.PROTOCOL,
    local: process.env.LOCAL,
    local_user_name: process.env.LOCAL_USER_NAME,
    local_is_admin: process.env.LOCAL_IS_ADMIN || false,
    ga_ua: process.env.GA_UA,

    addresses_api_url: process.env.ADDRESSES_API_URL,
    addresses_api_key: process.env.ADDRESSES_API_KEY,

    social_care_records_api_url: process.env.SOCIAL_CARE_RECORDS_API_URL,
    social_care_records_api_key: process.env.SOCIAL_CARE_RECORDS_API_KEY,
    
    authorised_user_group: process.env.AUTHORISED_USER_GROUP,
    authorised_admin_group: process.env.AUTHORISED_ADMIN_GROUP,
    token_name: process.env.TOKEN_NAME,
    hackney_jwt_secret: process.env.HACKNEY_JWT_SECRET,

    winston: {
        console: {
            file_level: process.env.WINSTON_CONSOLE_LEVEL,
            handleExceptions: process.env.WINSTON_CONSOLE_HANDLE_EXCEPTIONS,
            json: process.env.WINSTON_CONSOLE_JSON,
            colorize: process.env.WINSTON_CONSOLE_COLORIZE
        }
    }
}