import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { Admin } from '../../models/admin.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

  constructor(private adminService: AdminService, private router: Router) { }

  login() {
    this.error = '';
    const admin: Admin = { username: this.username, password: this.password, adminId: 0 }; // adminId ignored in login

    this.adminService.login(admin)
      .subscribe({
        next: (res) => {
          // store session
          localStorage.setItem('isAdminLoggedIn', 'true');
          console.log(res.message); // shows "Login successful."
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.error(err);
          this.error = err?.error?.message ?? 'Login failed';
        }
      });
  }
}
