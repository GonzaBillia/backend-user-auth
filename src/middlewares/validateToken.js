import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config/config.js'

export const authRequired = (req, res, next) => {
    const {token} = req.cookies

    if(!token) return res.status(401).send("Unauthorized")
    
    jwt.verify(token, TOKEN_SECRET, (err, payload) => {
        if(err) return res.status(401).send("Unauthorized")
        
        req.user = payload
        
        next()
    })
}