import { Expense } from "../domain/plan";
import ExpenseRow from "./ExpenseRow";

interface Props {
  expenses: Expense[];
  handleChange: (index: number, expense: Expense) => void,
}

function ExpenseTable({ expenses, handleChange }: Props) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th></th>
          <th>Description</th>
          <th>Amount</th>
          <th>Account</th>
        </tr>
      </thead>
      <tbody>
        {
          expenses.map((exp, i) => {
            return <ExpenseRow key={i} index={i} expense={exp} handleChange={handleChange} />
          })
        }
      </tbody>
    </table>
  )
}

export default ExpenseTable;