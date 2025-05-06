import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private router: Router) {}

  logout() {
    localStorage.clear(); // Clear all stored data (e.g., token, userRole)
    alert('You have been logged out.');
    this.router.navigate(['/']); // Redirect to the login page
  }
}
