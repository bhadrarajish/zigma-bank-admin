import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html'
})
export class DepositComponent {
  customerId!: number | null;
  balance: number | null = null;
  amountToDeposit: number | null = null;
  message = '';
  error = '';

  constructor(private adminService: AdminService, private router: Router) {}

  fetchBalance() {
    this.message = '';
    this.error = '';
    if (!this.customerId) { this.error = 'Enter CustomerId'; return; }

    this.adminService.getBalance(this.customerId).subscribe({
      next: res => this.balance = res.balance,
      error: err => this.error = err?.error ?? 'Account not found'
    });
  }

  deposit() {
    this.message = '';
    this.error = '';
    if (!this.customerId || !this.amountToDeposit) { this.error = 'Enter details'; return; }

    this.adminService.deposit(this.customerId, this.amountToDeposit).subscribe({
      next: res => {
        this.message = 'Deposited successfully';
        setTimeout(() => this.router.navigate(['/dashboard']), 1200);
      },
      error: err => this.error = err?.error ?? 'Deposit failed'
    });
  }

  goBack() { this.router.navigate(['/dashboard']); }
}
