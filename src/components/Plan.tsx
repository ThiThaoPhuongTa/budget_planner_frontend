import { Expense, Income, IncomeType, formatCurrency } from '../domain/plan'
import { Icon } from '@iconify/react';

import IncomeItem from './IncomeItem'
import ExpenseTable from './ExpenseTable'
import BaseLayout from './BaseLayout'
import BaseButton, { Variant } from './BaseButton'
import { useImmer } from 'use-immer';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { UpdateExpensePayload, addExpense, currentExpenses, updateExpense } from '../store/expensesSlice';
import { PieChart, Pie, Cell } from 'recharts';

function Plan() {
  const expenses = useAppSelector(currentExpenses);
  const dispatch = useAppDispatch();

  const [incomes, setIncomes] = useImmer<Income[]>([{ amount: 10000000, type: IncomeType.Salary }])

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.bankTransfer.amount, 0)

  const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0)

  const handleAddIncome = () => {
    setIncomes((draft) => {
      draft.push({ amount: 0, type: IncomeType.Other })
    })
  }

  const handleChangeIncome = (index: number, nextIncome: Income) => {
    setIncomes((draft) => {
      draft[index] = nextIncome
    })
  }

  const handleRemoveIncome = (index: number) => {
    setIncomes((draft) => {
      draft.splice(index)
    })
  }

  const handleAddExpense = () => {
    dispatch(addExpense({
      description: '',
      bankTransfer: { bankAccount: { bankId: '', bankCode: '', accountNumber: '' }, amount: 0, purpose: '' },
      done: false
    } satisfies Expense))
  }

  const handleChangeExpense = (index: number, nextExpense: Expense) => {
    dispatch(updateExpense({ index: index, expense: nextExpense } satisfies UpdateExpensePayload))
  }

  const totalExpensesChartData = [
    { name: 'Total Expenses', value: totalExpenses },
    { name: 'Balance', value: totalIncome - totalExpenses }
  ]

  const expensesChartData = expenses.map(expense => {
    return ({
      name: expense.description, value: expense.bankTransfer.amount
    })
  })

  const COLORS = ["#FFBB28", "#FF8042", "#0088FE", "#00C49F",];

  return (
    <BaseLayout>
      <form>
        <h2>Month</h2>
        <div className='d-flex'>
          <div>
            <PieChart width={200} height={200}>
              <Pie
                data={totalExpensesChartData}
                cx={100}
                cy={100}
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {totalExpensesChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </div>
          <div>
            <PieChart width={200} height={200}>
              <Pie
                data={expensesChartData}
                cx={100}
                cy={100}
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {expensesChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length + 2]} />
                ))}
              </Pie>
            </PieChart>
          </div>
        </div>

        <section>
          <div className="d-flex justify-content-between gap-3">
            <h3>Income</h3>
            <div>{formatCurrency(totalIncome)}</div>
          </div>
          {
            incomes.map((income, index) => {
              return (
                <IncomeItem
                  key={index}
                  index={index}
                  income={income}
                  handleChange={handleChangeIncome}
                  handleRemove={handleRemoveIncome}
                />
              )
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
          <ExpenseTable expenses={expenses} handleChange={handleChangeExpense} />
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
