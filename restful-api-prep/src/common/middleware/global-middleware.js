import ApiError from "../utils/api-error";

const validate = (dtoClass) =>{
    return(req, _, next)=>{
        const {errors, value} = dtoClass.validate(req.body)
        if(errors){
            throw ApiError.badreq()
        }
        req.body = value
        next()
    }
}

export {validate}