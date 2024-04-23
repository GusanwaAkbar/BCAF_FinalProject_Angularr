import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Router } from '@angular/router'; // Import Router from angular/router

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from 'src/app/models/login';  // Import the Login interface
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth.service';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Register } from 'src/app/models/register';
import { OTP } from 'src/app/models/otp';



@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    standalone: false,
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

    loginData: Login = new Login('', ''); // Initialize loginData with empty valuese
    registerData: Register = new Register('','','','','','','');
    otp: OTP = new OTP(0);


    registerDialog: boolean = false

    registerSuccessDialog = false
    otpSuccessDialog = false
    otpFailedDialog = false

   
    
    

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

    askRegister(){
        this.registerDialog = true
    }

    doRegister() {

        console.log("register is clicked, below is your rorm register")
                    console.log(this.registerData)

        this.authService.register(this.registerData)

        
            .subscribe(
                
                (response: any) => {


                    console.log("register is clicked, below is your rorm register")
                    console.log(this.registerData)

                    console.log('Register successful', response);
                    if (response.success) {
                        const token = response.data.token;
                        console.log("my token register is below, saved at local storage browser")
                        console.log(token)
                        this.authService.saveToken({token});

                        console.log("register is clicked, below is your rorm register")
                        console.log(this.registerData)

                        this.registerDialog = true
                        }
                    },
                    error => {
                        console.error('Login error', error);
                        // Display error message to the user
                    }
                );

            }

    
    
    doOTP() {

        this.authService.inputOTP(this.otp)
            .subscribe(
                (response: any) => {
                    console.log('otp verification successfully', response);
                    if (response.success) {
                        this.otpSuccessDialog = true
                        }
                    },
                        error => {
                            this.otpFailedDialog = true
                            console.error('OTP error', error);
                            // Display error message to the user
                        }
                
            );

    }

}
