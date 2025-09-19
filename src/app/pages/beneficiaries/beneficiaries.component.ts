// src/app/pages/beneficiaries/beneficiaries.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Beneficiary } from '../../models/beneficiary.model';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-beneficiaries',
  templateUrl: './beneficiaries.component.html',
  styleUrls: ['./beneficiaries.component.css'] // optional; remove if you don't have it
})
export class BeneficiariesComponent implements OnInit {
  // Properties used by the template
  pending: Beneficiary[] = [];
  loading = false;
  error = '';

  constructor(private adminService: AdminService, private router: Router) {}

  ngOnInit(): void {
    this.loadPending();
  }

  // Load pending beneficiaries from backend
  loadPending(): void {
    this.loading = true;
    this.error = '';
    this.adminService.getPendingBeneficiaries().subscribe({
      next: (res) => {
        // ensure array even if backend returns null
        this.pending = res ?? [];
        this.loading = false;
      },
      error: (err) => {
        this.error = err?.error ?? 'Failed to load pending beneficiaries';
        this.loading = false;
      }
    });
  }

  // Approve a beneficiary and remove it from the list on success
  approve(id: number, index: number): void {
    this.error = '';
    this.adminService.approveBeneficiary(id).subscribe({
      next: () => {
        this.pending.splice(index, 1);
      },
      error: () => {
        this.error = 'Approve action failed';
      }
    });
  }

  // Reject a beneficiary and remove it from the list on success
  reject(id: number, index: number): void {
    this.error = '';
    this.adminService.rejectBeneficiary(id).subscribe({
      next: () => {
        this.pending.splice(index, 1);
      },
      error: () => {
        this.error = 'Reject action failed';
      }
    });
  }

  // Navigate back to dashboard
  goBack(): void {
    this.router.navigate(['/dashboard']);
  }
}
