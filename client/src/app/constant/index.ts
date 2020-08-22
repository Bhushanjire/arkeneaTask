export const constant = {
    baseUrl : 'http://localhost:4500/',
    imageUrl : 'http://localhost:4500/uploads/'
}

export interface apiResponce{
    statusCode : number,
    message :String,
    data : any,
    isSuccess : boolean
}