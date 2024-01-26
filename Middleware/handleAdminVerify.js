import serviceModel from "../models/index.js"

const handleAdminVerify = async(req, res, next) => {
    const email = req.query.email 
    const query ={email:email}
    const user = await serviceModel.user.findOne(query)
    if (user?.role !== "admin") {
        return res.status(404).send({error:true,message:"unAuthorizationAdmin"})
    }
    next()
}

export default handleAdminVerify