import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { Token } from '../models/token';
import { HttpHeaders } from '@angular/common/http';


import { Login } from '../models/login';
import { Register } from '../models/register';
import { OTP } from '../models/otp';
import { MessageService } from './message.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  

  private apiUrl = environment.apiUrl; // Assuming you have apiUrl defined in your environment file

  constructor(private http: HttpClient,  public messageService: MessageService) { }

  login(credentials: Login): Observable<any> {
    const loginUrl = `${this.apiUrl}/api/auth0/login/v1`; // Adjust the endpoint according to your backend
    return this.http.post(loginUrl, credentials).pipe(
      catchError(this.handleError<any>('getData'))
    );
  }

  register(register: Register): Observable<any> {
      
    const registerUrl = `${this.apiUrl}/api/auth0/v1/regis`; // Adjust the endpoint according to your backend
    
    return this.http.post(registerUrl, register).pipe(
      catchError(this.handleError<any>('getData'))
    );
  }

  resend(username: string): Observable<any> {
    const registerUrl = `${this.apiUrl}/api/auth0/otp/resend`;
    const body = { username }; // Encapsulate username in an object to send as JSON

    return this.http.post(registerUrl, body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  inputOTP(otp:OTP): Observable<any> {
    // const token = localStorage.getItem('token'); // Get the token from local storage
    // let headers = new HttpHeaders();
    // if (token) {
    //   // Add authorization header if token exists
    //   headers = headers.set('Authorization', `Bearer ${token}`);
    // }

    if(!otp)
    {
      "peler"
    }

    return this.http.post<OTP>(this.apiUrl+ '/api/auth0/otp/v1', otp, );

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



  private handleError<T>(operation = 'operation') {
    return (error: any): Observable<T> => {
      // Logging the error to the console
      console.error(error);

      // Check if the error response has the expected format and extract the message
      const errorMessage = error.error?.message || 'Unknown error occurred.';

      // Display the error message using MessageService
      this.messageService.addError(`${operation} failed: ${errorMessage}`);

      // Let the app keep running by returning an error
      return throwError(() => new Error(errorMessage));
    };
  }


}
