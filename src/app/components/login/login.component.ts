import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, FormsModule] // 👈 Import FormsModule here
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    this.authService.login({ username: this.username, password: this.password }).subscribe(
      {
        next: (res) => {
          console.log(res);
          this.authService.saveToken(res.token);
          alert('Login Successful!');
          this.router.navigate(['/products']); // লগইন সফল হলে প্রোডাক্ট লিস্টে যাবে
        },
        error: (error) => {
          alert('Invalid credentials')
        }
      }
    );
  }
}