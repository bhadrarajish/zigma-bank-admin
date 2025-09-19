import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    const logged = localStorage.getItem('isAdminLoggedIn');
    if (!logged) {
      this.router.navigate(['/login']);
    }
  }

  goWithdraw() { this.router.navigate(['/withdraw']); }
  goDeposit() { this.router.navigate(['/deposit']); }
  goBeneficiaries() { this.router.navigate(['/beneficiaries']); }

  logout() {
    localStorage.removeItem('isAdminLoggedIn');
    this.router.navigate(['/login']);
  }
}
