import { Expense, Income, IncomeType, formatCurrency } from '../domain/plan'
import { Icon } from '@iconify/react';

import IncomeItem from './IncomeItem'
import ExpenseTable from './ExpenseTable'
import BaseLayout from './BaseLayout'
import BaseButton, { Variant } from './BaseButton'
import { useImmer } from 'use-immer';

function Plan() {
  const [expenses, setExpenses] = useImmer<Expense[]>([{
    description: "Food",
    bankTransfer: {bankAccount: {bankId: "970423", bankCode: "TPB", accountNumber: "123456"}, amount: 1000000, purpose: "Budger planner transfer Food"},
    done: true
  },
  {
    description: "Electric Billing",
    done: false,
    bankTransfer:{bankAccount: {bankId: "", bankCode: "", accountNumber: ""}, amount: 1000000, purpose: "Budger planner transfer Electric Billing"},
    
  }]);
  const [incomes, setIncomes] = useImmer<Income[]>([{ amount: 10000000, type: IncomeType.Salary}])

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.bankTransfer.amount, 0)

  const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0)

  const handleAddIncome = () => {
    setIncomes((draft) => {
      draft.push({amount: 0, type: IncomeType.Other})
    })
  }

  const handleChangeIncome = (index: number, nextIncome: Income) => {
    setIncomes((draft) => {
      draft[index] = nextIncome
    })
  }

  const handleAddExpense = () => {
    setExpenses((draft) => {
      draft.push({
        description: '',
        bankTransfer: {bankAccount: {bankId: '', bankCode: '', accountNumber: ''}, amount: 0, purpose: ''},
        done: false
      })
    })
  }

  const handleChangeExpense = (index: number, nextExpense: Expense) => {
    setExpenses((draft) => {
      draft[index] = nextExpense;
    });
  }

  return (
    <BaseLayout>
      <form>
        <h2>Month</h2>

        <section>
          <div className="d-flex justify-content-between gap-3">
            <h3>Income</h3>
            <div>{formatCurrency(totalIncome)}</div>
          </div>
          {
            incomes.map((income, index) => {
              return <IncomeItem  key={index} index={index} income={income} handleChange={handleChangeIncome}/>
            })
          }
          <div className='mt-2'>
            <BaseButton handleClick={handleAddIncome} variant={Variant.Success}>
              Add <Icon icon="gg:add" />
            </BaseButton>
          </div>
        </section>

        <section className='mt-4'>
          <div className="d-flex justify-content-between gap-3">
            <h3>Expsenses</h3>
            <div>{formatCurrency(totalExpenses)}</div>
          </div>
          <ExpenseTable expenses={expenses} handleChange={handleChangeExpense}/>
          <div className='mt-2'>
            <BaseButton handleClick={handleAddExpense} variant={Variant.Danger}>
              Add <Icon icon="gg:add" />
            </BaseButton>
          </div>
        </section>
      </form>
    </BaseLayout>
  )
}

export default Plan
