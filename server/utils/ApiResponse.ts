class ApiResponse {
    success: boolean;
    constructor(
        public status: number,
        public message: string = "Success",
        public data?: any,
    ) {
        this.status = status;
        this.message = message;
        this.data = data;
        this.success = status >= 200 && status < 400;
    }

    static success(data: any, message: string = "Success", status: number = 200): ApiResponse {
        return new ApiResponse(status, message, data);
    }

    static error(message: string = "Error", status: number = 500, data?: any): ApiResponse {
        return new ApiResponse(status, message, data);
    }

}
export default ApiResponse;