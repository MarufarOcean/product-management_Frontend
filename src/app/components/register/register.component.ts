import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  role: string = 'user'; // Default role

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    const registerData = {
      username: this.username,
      password: this.password,
      role: this.role
    };

    this.authService.register(registerData).subscribe({
      next: (res) => {
        alert('Registration successful!');
        //localStorage.setItem('userRole', this.role);
        this.router.navigate(['/']); // Redirect to login page after successful registration
      },
      error: (err) => {
        alert(err.error || 'Registration failed. Please try again.');
      }
    });
  }
}
