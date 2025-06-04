export interface ISalaryHistory {
  amount: number;
  paidDate: Date;
  status?: "Paid" | "Pending";
}

export interface IUser {
  name: string;
  phoneNumber: number;
  startDate: string;
  endDate?: string;
  salary?: number;
  salaryHistory: ISalaryHistory[];
  role?: string;
}
