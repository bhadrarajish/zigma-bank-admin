export interface Beneficiary {
  beneficiaryId: number;
  nickName: string;
  accountNumber: string;
  bankName: string;
  iFSC: string;
  customerCRN: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  createdAt: string;
}
