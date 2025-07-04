const isAuthenticated = (req, res, next) => {
    if (req.session.user === undefined) {
        return res.status(401).json("Access Denied. You don't have credentials to access here.")
    }
    next();
}

export {isAuthenticated}