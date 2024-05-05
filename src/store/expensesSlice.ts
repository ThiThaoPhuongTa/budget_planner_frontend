import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Expense } from "../domain/plan";
import { RootState } from "./store";

export interface UpdateExpensePayload {
  index: number;
  expense: Expense;
}

const initialState = [{
  description: "Food",
  bankTransfer: {bankAccount: {bankId: "970423", bankCode: "TPB", accountNumber: "123456"}, amount: 1000000, purpose: "Budget planner transfer Food"},
  done: true
},
{
  description: "Electric Billing",
  done: false,
  bankTransfer:{bankAccount: {bankId: "", bankCode: "", accountNumber: ""}, amount: 1000000, purpose: "Budget planner transfer Electric Billing"},
}] satisfies Expense[]

const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    addExpense: (state, action: PayloadAction<Expense>) => {
      state.push(action.payload);
    },
    updateExpense: (state, action: PayloadAction<UpdateExpensePayload>) => {
      state[action.payload.index] = action.payload.expense;
    },
    removeExpense: (state, action: PayloadAction<number>) => {
      state.splice(action.payload, 1)
    }
  },
});

export const { addExpense, updateExpense, removeExpense } = expensesSlice.actions;

export const currentExpenses = (state: RootState) => state.expenses;

export default expensesSlice.reducer;