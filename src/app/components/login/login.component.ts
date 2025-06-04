import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, FormsModule, RouterModule, FontAwesomeModule] // 👈 Import FormsModule here
})
export class LoginComponent {
  username = '';
  password = '';
  faUser = faUser;
  faLock = faLock;

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    this.authService.login({ username: this.username, password: this.password }).subscribe(
      {
        next: (res) => {
          //console.log(res);
          this.authService.saveToken(res.token);
          localStorage.setItem('userRole', res.userRole,);
          localStorage.setItem('username', this.username); // Save the username to local storage
          alert('Login Successful!');
          //this.router.navigate(['/products']); // লগইন সফল হলে প্রোডাক্ট লিস্টে যাবে
          this.router.navigate(['/dashboard']); // লগইন সফল হলে ড্যাশবোর্ডে যাবে
        },
        error: (error) => {
          alert('Invalid credentials')
        }
      }
    );
  }
  //Register function to navigate to the register page
  goToRegister(product: any) {
    this.router.navigate(['/register']);
  }
}