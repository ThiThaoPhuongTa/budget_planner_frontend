import { BankTransfer } from "./bankTransfer";

export type Expense = {
  description: string;
  bankTransfer: BankTransfer;
  done: boolean;
};

export type Income = {
  type: IncomeType;
  amount: number;
};

export enum IncomeType {
  Salary = "Salary",
  Interest = "Interest",
  Giftted = "Gif",
  Bonus = "Bonus",
  Other = "Other",
}

export enum ExpenseDescription {
  Food = "Food",
  Transportation = "Transportation",
  WaterBill = "Water Bill",
  PhoneBill = "Phone Bill",
  ElectricityBill = "Electricity Bill",
  GasBill = "Gas Bill",
  TelevisionBill = "Television Bill",
  InternetBill = "Internet Bill",
  HomeMaintenance = "Home Maintenance",
  VehicleMaintenance = "Vehicle Maintenance",
  MedicalCheckUp = "Medical Check Up",
  Insurances = "Insurances",
  Education = "Education",
  Shopping = "Shopping",
}

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value)
}