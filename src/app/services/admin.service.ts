import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Beneficiary } from '../models/beneficiary.model';
import { AccountBalance } from '../models/account-balance.model';
import { Admin } from '../models/admin.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private base = `${environment.apiUrl}/admin`; // matches controller route api/admin

  constructor(private http: HttpClient) { }

  // Login expects JSON { message: string } from backend
  login(admin: Admin): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.base}/login`, admin);
  }

  getPendingBeneficiaries(): Observable<Beneficiary[]> {
    return this.http.get<Beneficiary[]>(`${this.base}/pending-beneficiaries`);
  }

  approveBeneficiary(id: number): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.base}/approve-beneficiary/${id}`, {});
  }

  rejectBeneficiary(id: number): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.base}/reject-beneficiary/${id}`, {});
  }

  getBalance(customerId: number): Observable<AccountBalance> {
    return this.http.get<AccountBalance>(`${this.base}/balance/${customerId}`);
  }

  deposit(customerId: number, amount: number): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.base}/deposit/${customerId}`, amount);
  }

  withdraw(customerId: number, amount: number): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.base}/withdraw/${customerId}`, amount);
  }
}
