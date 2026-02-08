export class ResponseArgs {
    Success: boolean;
    Message: string;
    AdditionalInfo?: string;
    AdditionalObject?: any;

    constructor(success: boolean, message?: string){
        this.Success = success;
        this.Message = message ?? "";
    }
}