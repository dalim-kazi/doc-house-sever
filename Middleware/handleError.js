import { generalError } from "../utils/Error.js"

const handleError = (err, req, res, next) => {
    if (err instanceof generalError) {
        const code = err.getCode()
        return res.status(code).json({name:err.name,message:err.message})
    }
    return res.status(500).json({name:"internal server error",message:err.message})
}

export default handleError