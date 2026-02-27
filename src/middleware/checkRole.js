export const checkRole = (roles) => {
  return (req, res, next) => {
    const userRole = req.user.role;
  // console.log(typeof roles, typeof userRole);    
  // console.log(userRole);
    if (roles!==userRole) {
      return res.status(403).json({ success: false, message: "Access denied" });
    }
    next();
  };
}