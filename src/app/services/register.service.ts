import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from '../models/login';
import { environment } from '../../environments/environment';
import { Token } from '../models/token';
import { Register } from '../models/register';
import { OTP } from '../models/otp';

import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  

  private apiUrl = environment.apiUrl; // Assuming you have apiUrl defined in your environment file

  constructor(private http: HttpClient) { }

  register(register: Register): Observable<any> {
    const registerUrl = `${this.apiUrl}/api/auth0/v1/regis`; // Adjust the endpoint according to your backend
    
    return this.http.post(registerUrl, register);
  }

  inputOTP(otp:OTP): Observable<any> {
    const token = localStorage.getItem('token'); // Get the token from local storage
    let headers = new HttpHeaders();
    if (token) {
      // Add authorization header if token exists
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return this.http.post<OTP>(this.apiUrl+ '/api/auth0/otp/v1', otp, { headers });

  }

  
  saveToken(token: Token): void {
    localStorage.setItem('token', token.token);
  }

  getToken(): Token | null {
    const tokenString = localStorage.getItem('token');
    return tokenString ? new Token(tokenString) : null;
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }


}
