class ApiError extends Error{
    constructor(status,message) {
        super();
        this.status = status;
        this.message = message;

    }
// client errors
    static notFound(message){
        return new ApiError(404,message)
    }

    static unauthorized(message){
        return new ApiError(401,message)
    }

    static forbidden(message){
        return new ApiError(403,message)
    }

    static badRequest(message){
        return new ApiError(400,message)
    }

    // server errors

    static internal(message){
        return new ApiError(500,message)
    }



}

module.exports = ApiError;
