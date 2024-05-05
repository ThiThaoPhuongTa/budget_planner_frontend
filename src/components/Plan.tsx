import { Icon } from '@iconify/react';
import { Expense, Income, IncomeType, formatCurrency } from '../domain/plan';

import { useImmer } from 'use-immer';
import { UpdateExpensePayload, addExpense, currentExpenses, updateExpense } from '../store/expensesSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import BaseButton, { Variant } from './BaseButton';
import BaseLayout from './BaseLayout';
import ExpenseTable from './ExpenseTable';
import IncomeItem from './IncomeItem';
import { CategoryScale, LinearScale, BarElement, Title, Chart, Tooltip, Legend, ArcElement, Colors, ChartData } from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Colors
);

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

  const totalExpensesChartConfig = {
    data: {
      datasets: [{
        label: 'Total Money',
        data: [{label: 'Total Incomes', value: totalIncome}, {label: 'Total Expenses', value: totalExpenses}]
      }]
    }  satisfies ChartData <'bar', {label: string, value: number} []>,
    options: {
      responsive: true,
      locale: 'vi-VN',
      parsing: {
        xAxisKey: 'label',
        yAxisKey: 'value'
      }
    }
  }

  const expensesChartConfig = {
    data: {
      labels: expenses.map((expense) => expense.description),
      datasets: [{
        label: 'Expense Amount',
        data: expenses
      }]
    } satisfies ChartData <'pie', Expense []>,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        colors: {
          forceOverride: true
        }
      },
      parsing: {
        key: 'bankTransfer.amount'
      }
    }

  }

  return (
    <BaseLayout>
      <form>
        <h2>Month</h2>
        <div className='flex flex-wrap justify-center'>
          <div className='w-1/2'>
            <Bar data={totalExpensesChartConfig.data} options={totalExpensesChartConfig.options}/>
          </div>
          <div className='w-1/2'>
            <Pie data={expensesChartConfig.data} options={expensesChartConfig.options}/>
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

