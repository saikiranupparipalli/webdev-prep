
class ApiError extends Error{
    constructor(statusCode, message){
       super(message)
         this.statusCode = statusCode
        Error.captureStackTrace(this, this.constructor)
    }

    static badreq(message = "bad request"){
        return new ApiError(400, message)
    }

    static confilct(message = "conflict"){
        return new ApiError(404, message)
    }

};

export default ApiError