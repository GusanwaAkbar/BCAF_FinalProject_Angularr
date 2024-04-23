import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Router } from '@angular/router'; // Import Router from angular/router

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from '../../../../models/login'; // Import the Login interface
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent {

    valCheck: string[] = ['remember'];
    loginData: Login = new Login('', ''); // Initialize loginData with empty values
    

    constructor(public layoutService: LayoutService, private authService: AuthService, private router: Router ) { }

    login() {
        this.authService.login(this.loginData)
            .subscribe(
                (response: any) => {
                    console.log('Login successful', response);
                    if (response.success) {
                        const token = response.data.token;
                        console.log("my token is below")
                        console.log(token)
                        this.authService.saveToken({token});
                        this.router.navigate(['']); // Redirect to the home page upon successful login
                    }
                },
                error => {
                    console.error('Login error', error);
                    // Display error message to the user
                }
            );
    }
}
