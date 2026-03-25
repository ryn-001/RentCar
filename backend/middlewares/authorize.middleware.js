const authorize = (role) => {
    return (req, res, next) => {
        if (role !== req.user.role) {
            return res.status(403).json({ 
                message: "Forbidden: Insufficient Permissions" 
            });
        }
        next();
    };
};

module.exports = {authorize};