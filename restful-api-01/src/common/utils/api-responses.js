class ApiResponse {
    // static ok(res, message){
    //     return new res.statusCode(200).message
    // }

    static ok(res, message, data){
        return res.status(200).json({
            message,
            data
        })
    }

    static created(res, message, data){
        return res.status(201).json({
            message,
            data
        })
    }
}