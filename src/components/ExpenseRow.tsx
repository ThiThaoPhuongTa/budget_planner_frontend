import { Icon } from "@iconify/react/dist/iconify.js"
import _ from "lodash"
import CurrencyInput from "react-currency-input-field"
import { Link } from "react-router-dom"
import CreatableSelect from "react-select/creatable"
import { Expense, ExpenseDescription } from "../domain/plan"
import { removeExpense } from "../store/expensesSlice"
import { useAppDispatch } from "../store/hooks"
import BaseButton, { Variant } from "./BaseButton"

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
          className="bg-base-100 rounded-3xl"
          isClearable
          options={descriptionOptions}
          value={{ label: expense.description, value: expense.description }}
          onChange={(option) => handleChange(index, { ...expense, description: option?.value || "" })}
          styles={{
            control: (base) => ({
              ...base,
              borderColor: 'transparent',
              borderRadius: 20,
              height: 48,
              background: 'inherit',
            }),
          }}
        />
      </td>
      <td>
        <CurrencyInput
          className='input'
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
          <Link to={`transfer/${_.kebabCase(expense.description)}`} className="btn btn-outline btn-info">
            <Icon icon="fa6-solid:money-bill-transfer" />
          </Link>
        }
      </td>
    </tr>
  )
}

export default ExpenseRow;