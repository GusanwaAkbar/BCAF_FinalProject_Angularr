import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class authGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Check authentication status here
    const token = localStorage.getItem('token'); // Get the token from local storage

    if (token) {
      return true; // Allow navigation
    } else {
      // Redirect to a different route when not authenticated
      this.router.navigate(['/login']);
      // Or, redirect to a different route
      // this.router.navigate(['/custom-redirect']);
      return false; // Block navigation
    }
  }
}
