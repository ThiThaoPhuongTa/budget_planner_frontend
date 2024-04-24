import { Expense } from "../domain/plan";
import BaseLayout from "./BaseLayout";
import { OptionProps, components } from "react-select";
import Select from "react-select";
import CurrencyInput from "react-currency-input-field";
import { Bank, banks, encodeBankTransfer } from "../domain/bankTransfer";
import { QRCodeSVG } from "qrcode.react";
import { useImmer } from "use-immer";

interface BankOption {
  label: string;
  value: Bank;
}

const Option = (props: OptionProps<BankOption>) => {
  const { value } = props.data;
  return (
    <div className="d-flex">
      <img src={`src/assets/Bank/${value.code}.png`} style={{ width: '8%' }}></img>
      <components.Option {...props} />
    </div>
  );
};

function Transfer() {
  const [expense, setExpense] = useImmer<Expense>({
    description: 'Food',
    bankTransfer: {bankAccount: {bankId: "", bankCode: "", accountNumber: ""}, amount: 100000, purpose: "Budger planner transfer Food"},
    done: false
  })

  const banksOptions = banks.map(bank => ({
    label: `${bank.fullName} - ${bank.name}`, value: bank
  }))

  const currentBank = banks.find(bank => bank.id === expense.bankTransfer.bankAccount.bankId);

  const currentBankOption = banksOptions.find(option => option.value === currentBank);
  
  return (
    <BaseLayout>
      <h2>Transfer</h2>
      <div className="d-flex flex-column gap-3" >
        <Select<BankOption>
          options={banksOptions}
          components={{ Option }}
          placeholder="Choose a Bank"
          value={currentBankOption}
          onChange={(option) => 
            setExpense((draft) => {
              draft.bankTransfer.bankAccount.bankId = option?.value.id || ""
              draft.bankTransfer.bankAccount.bankCode = option?.value.code || ""
            })
          }
        />
        <input 
          className="form-control" 
          type="number" 
          placeholder="Account number" 
          value={expense.bankTransfer.bankAccount.accountNumber}
          onChange={(e) => setExpense((draft) => {
            draft.bankTransfer.bankAccount.accountNumber = e.target.value;
          })}
        />
        <CurrencyInput
          className="form-control"
          disabled
          value={expense.bankTransfer.amount}
          intlConfig={{ locale: 'vi-VN', currency: 'VND' }}
        />
        <textarea 
          className="form-control" 
          value={expense.bankTransfer.purpose} 
          onChange={(e) => setExpense((draft) => {
            draft.bankTransfer.purpose = e.target.value;
          })}
        />
        <QRCodeSVG className="text-center" value={encodeBankTransfer(expense.bankTransfer)} />
      </div>
    </BaseLayout>
  )
}

export default Transfer;

//0351000778874