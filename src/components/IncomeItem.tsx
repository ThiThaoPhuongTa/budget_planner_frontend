import { Icon } from "@iconify/react/dist/iconify.js";
import CurrencyInput from "react-currency-input-field";
import Select from "react-select";
import { Income, IncomeType } from "../domain/plan";
import BaseButton, { Variant } from "./BaseButton";

interface Props {
  index: number,
  income: Income,
  handleChange: (index: number, income: Income) => void,
  handleRemove: (index: number) => void
}

interface TypeOption {
  label: IncomeType, value: IncomeType
}

function IncomeItem({ index, income, handleChange, handleRemove }: Props) {

  const typeOptions: TypeOption[] = Object.values(IncomeType).map(type => ({
    label: type, value: type
  }));

  return (
    <div className="flex justify-between gap-3 mt-2 items-center">
      <BaseButton variant={Variant.Transparent} handleClick={() => handleRemove(index)}>
        <Icon icon="zondicons:minus-outline" style={{ color: 'red' }} />
      </BaseButton>
      <div>
        <Select<TypeOption>
          className="bg-base-100 rounded-3xl"
          options={typeOptions}
          value={{ label: income.type, value: income.type }}
          onChange={(option) => handleChange(index, { ...income, type: option?.value || IncomeType.Other })}
          styles={{
            control: (base) => ({
              ...base,
              borderColor: 'transparent',
              borderRadius: 20,
              height: 48,
              background: 'inherit',
            }),
          }}
        >
        </Select>
      </div>
      <div className="grow">
        <CurrencyInput
          className='input w-full'
          intlConfig={{ locale: 'vi-VN', currency: 'VND' }}
          value={income.amount}
          onValueChange={(value, name, values) => handleChange(index, { ...income, amount: Number(value || 0) })}
        />
      </div>
    </div>
  )
}

export default IncomeItem;