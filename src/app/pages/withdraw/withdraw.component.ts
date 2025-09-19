import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html'
})
export class WithdrawComponent {
  customerId!: number | null;
  balance: number | null = null;
  amountToWithdraw: number | null = null;
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

  withdraw() {
    this.message = '';
    this.error = '';
    if (!this.customerId || !this.amountToWithdraw) { this.error = 'Enter details'; return; }

    this.adminService.withdraw(this.customerId, this.amountToWithdraw).subscribe({
      next: res => {
        this.message = 'Withdrawn successfully';
        setTimeout(() => this.router.navigate(['/dashboard']), 1200);
      },
      error: err => this.error = err?.error ?? 'Withdraw failed'
    });
  }

  goBack() { this.router.navigate(['/dashboard']); }
}
