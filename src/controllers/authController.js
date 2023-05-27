let checkLoggedIn = (req, res, next)=> {
    if(!req.isAuthenticated()){
        return res.redirect('/login');
    }
    next();
}

let checkLoggedOut = (req, res, next)=> {
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    next();
}

let postLogout = (req, res)=> {
    req.session.destroy((err)=>{
        return res.redirect('/login');
    })
}

module.exports = {
    checkLoggedIn: checkLoggedIn,
    checkLoggedOut: checkLoggedOut,
    postLogout: postLogout
}