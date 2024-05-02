import { Expense } from "../domain/plan";
import BaseLayout from "./BaseLayout";
import { OptionProps, components } from "react-select";
import Select from "react-select";
import CurrencyInput from "react-currency-input-field";
import { Bank, banks, encodeBankTransfer } from "../domain/bankTransfer";
import { QRCodeSVG } from "qrcode.react";
import { useImmer } from "use-immer";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useNavigate, useParams } from "react-router-dom";
import _ from "lodash";
import { currentExpenses, updateExpense } from "../store/expensesSlice";
import BaseButton, { Variant } from "./BaseButton";

interface BankOption {
  label: string;
  value: Bank;
}

const Option = (props: OptionProps<BankOption>) => {
  const { value } = props.data;
  return (
    <div className="d-flex">
      <img src={`/src/assets/Bank/${value.code}.png`} style={{ width: '8%' }}></img>
      <components.Option {...props} />
    </div>
  );
};

function Transfer() {
  const expenses = useAppSelector(currentExpenses);
  const dispatch = useAppDispatch();
  const expenseDescription = useParams().expense;
  const isCurrent = (expense: Expense) => expense.description === _.startCase(expenseDescription)

  const [expense, setExpense] = useImmer<Expense | undefined>(expenses.find((expense: Expense) => isCurrent(expense)));
  const index = expenses.findIndex((expense: Expense) => isCurrent(expense));

  const disabled = !expense || expense.done;

  const banksOptions = banks.map(bank => ({
    label: `${bank.fullName} - ${bank.name}`, value: bank
  }))

  const currentBank = banks.find(bank => bank.id === expense?.bankTransfer.bankAccount.bankId);

  const currentBankOption = banksOptions.find(option => option.value === currentBank);

  const navigate = useNavigate();

  function handleDone() {
    if (expense) {
      dispatch(updateExpense({ index: index, expense: { ...expense, done: true } }));
      navigate("/");
    }
  }

  return (
    <form>
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
                if (draft) {
                  draft.bankTransfer.bankAccount.bankId = option?.value.id || ""
                  draft.bankTransfer.bankAccount.bankCode = option?.value.code || ""
                }
              })
            }
            isDisabled={disabled}
          />
          <input
            className="form-control"
            type="number"
            placeholder="Account number"
            value={expense?.bankTransfer.bankAccount.accountNumber}
            onChange={(e) => setExpense((draft) => {
              if (draft) {
                draft.bankTransfer.bankAccount.accountNumber = e.target.value;
              }
            })}
            disabled={disabled}
          />
          <CurrencyInput
            className="form-control"
            disabled
            value={expense?.bankTransfer.amount}
            intlConfig={{ locale: 'vi-VN', currency: 'VND' }}
          />
          <textarea
            className="form-control"
            value={expense?.bankTransfer.purpose}
            onChange={(e) => setExpense((draft) => {
              if (draft) {
                draft.bankTransfer.purpose = e.target.value;
              }
            })}
            disabled={disabled}
          />
          {!disabled && (
            <div className="d-flex flex-column mx-auto gap-3">
              <QRCodeSVG value={expense ? encodeBankTransfer(expense.bankTransfer) : ""} />
              <BaseButton variant={Variant.Primary} handleClick={handleDone}>
                Done
              </BaseButton>
            </div>
          )}
        </div>
      </BaseLayout>
    </form>
  )
}

export default Transfer;

//0351000778874