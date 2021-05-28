import ValidationException from "./ValidationException";

export default class HttpException extends Error {

    statusCode = 400;

    constructor(axiosError) {
        super('HttpException');
        this.dispatchError(axiosError)
    }

    dispatchError = (error) =>{
        this.statusCode = error.response.status;
        this.message = JSON.stringify(error.response.data);
    }

    static create = (error) => {
        if (ValidationException.isShape(error)) {
            return ValidationException.create(error);
        }
        return Promise.reject(new HttpException(error));
    }

}

