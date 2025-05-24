import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { faSignOut } from '@fortawesome/free-solid-svg-icons'; 
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,FontAwesomeModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  faSignOut = faSignOut; // FontAwesome icon for logout
  isLoggedIn: boolean = false;
  username: string | null = null; // Store the username
  userRole: string | null = null; // Store the user role

  inactivityTimeout: any;
  readonly AUTO_LOGOUT_MINUTES = 15;

  constructor(private router: Router, private cdr: ChangeDetectorRef) {}
   // Define the isLoggedIn property
   

  ngOnInit(): void {
    // Check if the user is logged in initially
    this.updateLoginStatus();
    // Auto logout on browser/tab close
    window.addEventListener('unload', () => {
      localStorage.clear();
    });

    // Listen to router events to dynamically update login status
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateLoginStatus();
      }
    });

    // Auto logout after inactivity
    this.startInactivityTimer();
      ['click', 'mousemove', 'keypress', 'scroll'].forEach(event => {
      window.addEventListener(event, () => this.resetInactivityTimer());
    });

  }

  
  logout() {
    localStorage.clear(); // Clear all stored data (e.g., token, userRole)
    this.isLoggedIn = false; // Update the isLoggedIn property
    this.username = null; // Clear the username
    this.userRole = null; // Clear the user role
    this.cdr.detectChanges(); // Trigger change detection to update the view
    alert('You have been logged out.');
    this.router.navigate(['/']); // Redirect to the login page
  }
  updateLoginStatus(): void {
    this.isLoggedIn = !!localStorage.getItem('token'); // Check if the token exists
    this.username = localStorage.getItem('username'); // Retrieve the username
    this.userRole = localStorage.getItem('userRole'); // Retrieve the user role
    this.cdr.detectChanges(); // Trigger change detection to update the view
  }
  goToLogin() {
    this.router.navigate(['/'])
  }

  startInactivityTimer() {
    this.inactivityTimeout = setTimeout(() => {
      this.logout();
      alert('You have been logged out due to inactivity.');
    }, this.AUTO_LOGOUT_MINUTES * 60 * 1000); // 15 minutes
  }

  resetInactivityTimer() {
    clearTimeout(this.inactivityTimeout);
    this.startInactivityTimer();
  }
}
