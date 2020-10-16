const jwt = require('jsonwebtoken');

const config = require('../config');

const isAuthorised = (req, res, next) => {
  const token = req.cookies[config.token_name];

  // If on local environment, bypass authentication, 
  // get username from config and set Admin permission
  if(config.local == 'true')  {
    req.auth = {
      userName: config.local_user_name,
      userEmail: config.local_user_email,
      isAdmin: config.local_is_admin === 'true' ? true : false
    }

    return next();
  };

  res.locals.returnURL = req.protocol + '://' + req.hostname + (config.port && `:${config.port}`);

  if (token) {
    let payload = null;

    try {
      let isAuthorised = false;

      payload = jwt.verify(token, config.hackney_jwt_secret);
      const groups = payload.groups;

      req.auth = {
        userName: payload.name,
        userEmail: payload.email,
        isAdmin: false
      }

      if (groups) {
        // User is authorised if in either group
        if(groups.includes(config.authorised_user_group) || groups.includes(config.authorised_admin_group)) {
          isAuthorised = true;
        };
        
        // User is an Admin if in the admin group
        if(groups.includes(config.authorised_admin_group)) {
          req.auth.isAdmin = true;
        }

        if (isAuthorised) {
          return next();
        } else {
          return accessDenied(req, res, next);
        }    
      }

    } catch (err) {
        if (err instanceof jwt.JsonWebTokenError) {
          return res.status(401).redirect("login.njk");
        } else {
          const error = new Error(err);

          return next(error);
        }
    } 
  }

  // If not authorised, render the login page
  return res.render("login.njk");
};

// Used by the routes to determine if a user is an Admin
const isAdmin = (req, res, next) => {
  if(req.auth && req.auth.isAdmin) {
    return next();
  }

  return res.status(401).render("access-denied.njk");
}


// Used by the routes to determine if a user is an Admin
const getUserProps = (req, res, next) => {
  return req.auth;
}

const logout = (req, res, next) => {
  const token = req.cookies[config.token_name];

  if (token) {
    res.clearCookie(config.token_name, { 
      path: "/",
      domain: config.token_domain,
    });
  }

  return res.status(401).redirect("/");

}

const accessDenied = (req, res, next) => {
  const token = req.cookies[config.token_name];

  if (token) {
    res.clearCookie(config.token_name, { 
      path: "/",
      domain: config.token_domain,
    });
  }

  return res.status(401).render("access-denied.njk");

}

module.exports = {
  isAuthorised,
  isAdmin,
  getUserProps,
  logout
};