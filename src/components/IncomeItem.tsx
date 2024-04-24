import CurrencyInput from "react-currency-input-field";
import { Income, IncomeType } from "../domain/plan";
import Select from "react-select";

interface Props {
  index: number,
  income: Income,
  handleChange: (index: number, income: Income) => void
}

interface TypeOption {
  label: IncomeType, value: IncomeType
}

function IncomeItem({ index, income, handleChange }: Props) {

  const typeOptions: TypeOption[] = Object.values(IncomeType).map(type => ({
    label: type, value: type
  }));

  return (
    <div className="d-flex justify-content-between gap-3 mt-2">
      <div className="col-auto">
        <Select<TypeOption>
          options={typeOptions}
          value={{label: income.type, value: income.type}}
          onChange={(option) => handleChange(index, { ...income, type: option?.value || IncomeType.Other})}>
        </Select>
      </div>
      <div className="flex-grow-1">
        <CurrencyInput
          className='form-control'
          intlConfig={{ locale: 'vi-VN', currency: 'VND' }}
          value={income.amount}
          onValueChange={(value, name, values) => handleChange(index, { ...income, amount: Number(value || 0) })}
        />
      </div>
    </div>
  )
}

export default IncomeItem;