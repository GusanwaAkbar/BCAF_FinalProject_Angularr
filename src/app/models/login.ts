import { ILogin } from "../interfaces/i-login";



export class Login implements ILogin {
    username: string;
    password: string;
  
    constructor(email: string, password: string) {
      this.username = email;
      this.password = password;
    }
  }