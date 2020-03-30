export interface ResponseData {
    code: number;
    msg: string;
    data: any;
    time: string;
}
export declare class JsonData {
    static success(data: any): ResponseData;
    static fail(code: number, msg: string): ResponseData;
}
