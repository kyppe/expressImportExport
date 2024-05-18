import jwt from "jsonwebtoken";
import vars from "../../config/conf";
import { Request, Response, NextFunction } from "express";

function authenticateToken(req:Request, res:Response, next:NextFunction) {
  const authHeader = req.headers['authorization']
  
  const token =authHeader && authHeader.split(' ')[1]
  
  if (token == null) return res.sendStatus(401)

  jwt.verify(token,vars.ACCESS_TOKEN_SECRET, (err, User) => {
    if (err) return res.sendStatus(403)
    req.body.User = User
    next()
  })
}


export default authenticateToken ;