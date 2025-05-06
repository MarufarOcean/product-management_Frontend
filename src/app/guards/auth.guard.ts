import { Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token'); // Check if the token exists
    if (token) {
      return true; // Allow access if the user is logged in
    } else {
      alert('Access denied. Please log in first.');
      this.router.navigate(['/']); // Redirect to the login page
      return false; // Deny access
    }
  }
}