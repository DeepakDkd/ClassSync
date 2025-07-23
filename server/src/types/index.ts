export interface CustomRequest {
    userId?: string;
    body: Record<string, any>;
}

export interface CustomResponse {
    status: number;
    message: string;
    data?: Record<string, any>;
}