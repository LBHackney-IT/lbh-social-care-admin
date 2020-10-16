require('dotenv').config(); // this loads the defined variables from .env

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
    host: process.env.HOST || "localhost",
    port: parseInt(process.env.PORT, 10) || 5000,
    protocol: process.env.PROTOCOL,
    local: process.env.LOCAL,
    local_user_name: process.env.LOCAL_USER_NAME,
    local_user_email: process.env.LOCAL_USER_EMAIL,
    local_is_admin: process.env.LOCAL_IS_ADMIN || false,
    ga_ua: process.env.GA_UA,

    social_care_case_api_key: process.env.SOCIAL_CARE_CASE_API_KEY,

    cases_api_url: process.env.CASES_API_URL,
    people_api_url: process.env.PEOPLE_API_URL,
    
    authorised_admin_group: process.env.AUTHORISED_ADMIN_GROUP,
    token_name: process.env.TOKEN_NAME,
    token_domain: process.env.TOKEN_DOMAIN,
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