import CurrencyInput from "react-currency-input-field"
import { Expense, ExpenseDescription } from "../domain/plan"
import CreatableSelect from "react-select/creatable"
import { Icon } from "@iconify/react/dist/iconify.js"
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

  function handleTransfer() {
    console.log("transfer")
  }

  return (
    <tr>
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
          className='px-2 py-1 bg-transparent dotted-input w-50'
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
          <BaseButton variant={Variant.Secondary} handleClick={handleTransfer}>
            <Icon icon="fa6-solid:money-bill-transfer" />
          </BaseButton>
        }
      </td>
    </tr>
  )
}

export default ExpenseRow;