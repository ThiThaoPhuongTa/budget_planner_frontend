import { Icon } from '@iconify/react';
import { Expense, Income, IncomeType, formatCurrency } from '../domain/plan';

import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, XAxis, YAxis } from 'recharts';
import { useImmer } from 'use-immer';
import { UpdateExpensePayload, addExpense, currentExpenses, updateExpense } from '../store/expensesSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import BaseButton, { Variant } from './BaseButton';
import BaseLayout from './BaseLayout';
import ExpenseTable from './ExpenseTable';
import IncomeItem from './IncomeItem';

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
    { name: 'Total Income', value: totalIncome },
    { name: 'Total Expenses', value: totalExpenses }
  ]

  const expensesChartData = expenses.map(expense => {
    return ({
      name: expense.description, value: expense.bankTransfer.amount
    })
  })

  const COLORS = [
    'text-primary',
    'text-secondary',
    'text-accent',
    'text-success',
    'text-warning',
    'text-error',
    'text-info',
  ]
  return (
    <BaseLayout>
      <form>
        <h2>Month</h2>
        <div className='flex flex-wrap justify-center'>
          <div>
            <BarChart
              width={350}
              height={300}
              data={totalExpensesChartData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </div>
          <div>
            <PieChart width={200} height={200}>
              <Pie
                data={expensesChartData}
                cx={100}
                cy={100}
                labelLine={false}
                outerRadius={80}
                // fill="currentColor"
                // className='text-secondary'
                dataKey="value"
              >
                {expensesChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill='currentColor' className={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </div>
        </div>

        <section>
          <div className="flex justify-between gap-3 items-center">
            <h3 className="text-lg font-medium text-success">Income</h3>
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
          <div className="flex justify-between gap-3">
            <h3 className='text-lg font-medium text-error'>Expsenses</h3>
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

