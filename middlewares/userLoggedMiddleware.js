function userLoggedMiddleware(req, res, next){
    console.log("pase por md");
    res.locals.isLogged = false;
    
    if (req.session && req.session.userLogged) {
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged;
    }

    next();
}

module.exports = userLoggedMiddleware;