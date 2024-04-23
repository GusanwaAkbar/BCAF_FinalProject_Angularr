import { IToken } from "../interfaces/i-token";

export class Token implements IToken{

    token:string

    constructor(token:string)
    {
        this.token = token
    }

    
}
