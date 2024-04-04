import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deposit, payloan, requestloan, withdraw } from "./AccountSlices";

function AccountOperations() {
  const storeData = useSelector((state) => state);
  console.log(storeData);
  const { loan: Amount,isLoading } = useSelector(
    (store) => store.account
  );
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [loanPurpose, setLoanPurpose] = useState("");
  const [currency, setCurrency] = useState("INR");

  const dispatch = useDispatch();

  function handleDeposit() {
    if (depositAmount) {
      dispatch(deposit(depositAmount,currency));
      setDepositAmount("");
    }
  }

  function handleWithdrawal() {
    if (withdrawalAmount) {
      dispatch(withdraw(withdrawalAmount));
    }
  }

  function handleRequestLoan() {
    dispatch(requestloan(loanAmount, loanPurpose));
  }

  function handlePayLoan() {
    dispatch(payloan());
  }

  return (
    <div>
      <h2>Your account operations</h2>
      <div className="inputs">
        <div>
          <label>Deposit</label>
          <input
            type="number"
            value={depositAmount}
            onChange={(e) => setDepositAmount(+e.target.value)}
          />
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            defaultValue="INR"
          >
            <option value="INR">INR</option>
            <option value="USD">US Dollar</option>
            <option value="EUR">Euro</option>
            <option value="GBP">British Pound</option>
          </select>

          <button onClick={handleDeposit} disabled={isLoading}>{isLoading ? "Converting": `Deposit ${depositAmount}`}</button>
        </div>

        <div>
          <label>Withdraw</label>
          <input
            type="number"
            value={withdrawalAmount}
            onChange={(e) => setWithdrawalAmount(+e.target.value)}
          />
          <button onClick={handleWithdrawal}>
            Withdraw {withdrawalAmount}
          </button>
        </div>

        <div>
          <label>Request loan</label>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(+e.target.value)}
            placeholder="Loan amount"
          />
          <input
            value={loanPurpose}
            onChange={(e) => setLoanPurpose(e.target.value)}
            placeholder="Loan purpose"
          />
          <button onClick={handleRequestLoan}>Request loan</button>
        </div>

        {Amount>0 && <div>
          <span>Pay back {Amount}</span>
          <button onClick={handlePayLoan}>Pay loan</button>
        </div>}
      </div>
    </div>
  );
}

export default AccountOperations;
