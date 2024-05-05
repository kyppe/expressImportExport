import jwt from "jsonwebtoken";
import vars from "../../config/conf.js";


function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token =authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, vars.ACCESS_TOKEN_SECRET, (err, User) => {
      console.log(err)
      if (err) return res.sendStatus(403)
      req.User = User
      next()
    })
  }
  

  export default authenticateToken;
