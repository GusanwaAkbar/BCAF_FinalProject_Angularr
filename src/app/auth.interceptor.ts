import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get the authorization token from AuthService
    const authToken = localStorage.getItem("token")

    // Clone the request and add the authorization header
    const authRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`
      }
    });

    // Pass the cloned request to the next handler
    return next.handle(authRequest).pipe(
      catchError((error: HttpErrorResponse) => {

        console.log("error dari status")
        console.log(error.status)
        // Handle HTTP errors here
        // For example, check for 401 Unauthorized and redirect to login page
        if (error.status === 401) {
          // Handle unauthorized access
          // Redirect to login page, throw an error, or handle it in any other way
          console.log("you have to redirect")
        }
        
        // Propagate the error downstream
        return throwError(error);
      })
    );
  }
}
