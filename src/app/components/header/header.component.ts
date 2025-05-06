import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  isLoggedIn: boolean = false;
  constructor(private router: Router, private cdr: ChangeDetectorRef) {}
   // Define the isLoggedIn property
   

  ngOnInit(): void {
    // Check if the user is logged in initially
    this.updateLoginStatus();
    console.log(this.isLoggedIn); // Check the initial login status in console

    // Listen to router events to dynamically update login status
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateLoginStatus();
      }
    });
  }

  logout() {
    localStorage.clear(); // Clear all stored data (e.g., token, userRole)
    this.isLoggedIn = false; // Update the isLoggedIn property
    this.cdr.detectChanges(); // Trigger change detection to update the view
    alert('You have been logged out.');
    this.router.navigate(['/']); // Redirect to the login page
  }
  updateLoginStatus(): void {
    this.isLoggedIn = !!localStorage.getItem('token'); // Check if the token exists
    this.cdr.detectChanges(); // Trigger change detection to update the view
  }
}
