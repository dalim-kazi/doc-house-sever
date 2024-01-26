import  Jwt  from "jsonwebtoken"
const handleJwtTokenVerify = (req, res, next) => {
    const authorization = req.headers.authorization 
    if (!authorization) {
       return res.status(401).send({error:true,message:"unAuthorization"})
    }
    const token = authorization.split(' ')[1]
    Jwt.verify(token, process.env.JWT_TOKEN, (err, decoded) => {
        if (err) {
            return res.status(401).send({error:true,message:"unAuthorization-token"})
        }
        req.decoded = decoded 
        next()
    })
}

export default handleJwtTokenVerify