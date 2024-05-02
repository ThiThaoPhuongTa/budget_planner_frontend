import CurrencyInput from "react-currency-input-field"
import { Expense, ExpenseDescription } from "../domain/plan"
import CreatableSelect from "react-select/creatable"
import { Icon } from "@iconify/react/dist/iconify.js"
import { Link } from "react-router-dom"
import _ from "lodash"
import BaseButton, { Variant } from "./BaseButton"
import { useAppDispatch } from "../store/hooks"
import { removeExpense } from "../store/expensesSlice"

interface Props {
  index: number,
  expense: Expense,
  handleChange: (index: number, expense: Expense) => void,
}

interface DescriptionOption {
  label: string,
  value: string
}

function ExpenseRow({ index, expense, handleChange }: Props) {
  const descriptionOptions: DescriptionOption[] = Object.values(ExpenseDescription).map(description => ({
    label: description, value: description
  }))

  const dispatch = useAppDispatch();

  return (
    <tr>
      <td>
        <BaseButton variant={Variant.Transparent} handleClick={() => dispatch(removeExpense(index))}>
          <Icon icon="zondicons:minus-outline" style={{color: 'red'}}/>
        </BaseButton>
      </td>
      <td>
        <CreatableSelect
          className="w-100"
          isClearable
          options={descriptionOptions}
          value={{ label: expense.description, value: expense.description }}
          onChange={(option) => handleChange(index, { ...expense, description: option?.value || "" })}
        />
      </td>
      <td>
        <CurrencyInput
          className='px-2 py-1 bg-transparent dotted-input'
          intlConfig={{ locale: 'vi-VN', currency: 'VND' }}
          value={expense.bankTransfer.amount}
          onValueChange={(value, name, values) => handleChange(index, { ...expense, bankTransfer: {...expense.bankTransfer, amount: Number(value || 0) }})}
        />
      </td>
      <td>
        {expense.done ?
          <div>
            <p>{[expense.bankTransfer.bankAccount.bankCode, expense.bankTransfer.bankAccount.accountNumber].join(" - ")} <span><Icon icon="flat-color-icons:ok" /></span></p>
          </div> :
          <Link to={`transfer/${_.kebabCase(expense.description)}`} className="btn btn-outline-primary">
            <Icon icon="fa6-solid:money-bill-transfer" />
          </Link>
        }
      </td>
    </tr>
  )
}

export default ExpenseRow;