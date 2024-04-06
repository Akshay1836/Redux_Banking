import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

export const accountSlice = createSlice({
  name: "accountReducer",
  initialState: initialState,
  reducers: {
    deposit(state, action) {
      state.balance = state.balance + action.payload;
      state.isLoading=false
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },
    requestloan: {
      prepare(amount, purpose) {
        return {
          payload: { amount, purpose },
        };
      },
      reducer(state, action) {
        if (state.loan > 0) return;
        console.log("action", action);
        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance = state.balance + action.payload.amount;
      },
    },
    payloan(state, action) {
      state.loanPurpose = "";
      state.balance = state.balance - state.loan;
      state.loan = 0;
    },
    converting(state){
      state.isLoading=true
    }
  },
});
console.log(accountSlice);
export const { withdraw, requestloan, payloan } = accountSlice.actions;

export function deposit(amount,currency) {
  console.log(amount, currency);
  if (currency === "INR") return { type: "accountReducer/deposit", payload: amount };
  return async function (dispatch, getState) {
    //API Call
    dispatch({ type: "accountReducer/converting" });
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=INR`
    );
    const data = await res.json();
    const converted = data.rates.INR;
    console.log(data);
    dispatch({ type: "accountReducer/deposit", payload: converted });
  };
}
export default accountSlice.reducer;

console.log(requestloan(1000, "home"));








// //account reducer creation

// export function accountReducer(state = initialState, action) {
//   switch (action.type) {
//     case "account/deposit":
//       return {
//         ...state,
//         balance: state.balance + action.payload,
//         isLoading: false,
//       };
//     case "account/withdraw":
//       return { ...state, balance: state.balance - action.payload };
//     case "account/requestLoan":
//       if (state.loan > 0) return state;
//       //LATER
//       return {
//         ...state,
//         loan: action.payload.amount,
//         loanPurpose: action.payload.purpose,
//         balance: state.balance + action.payload.amount,
//       };
//     case "account/payloan":
//       return {
//         ...state,
//         loan: 0,
//         loanPurpose: "",
//         balance: state.balance - state.loan,
//       };
//     case "account/Converting":
//       return {
//         ...state,
//         isLoading: true,
//       };
//     default:
//       return state;
//   }
// }

// export function deposit(amount, currency) {
//   console.log(amount, currency);
//   if (currency === "INR") return { type: "account/deposit", payload: amount };
//   return async function (dispatch, getState) {
//     //API Call
//     dispatch({ type: "account/Converting" });
//     const res = await fetch(
//       `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=INR`
//     );
//     const data = await res.json();
//     const converted = data.rates.INR;
//     console.log(data);
//     dispatch({ type: "account/deposit", payload: converted });
//   };
//   //https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=INR
//   // return { type: "account/deposit", payload: amount };
// }

// export function withdraw(amount) {
//   return { type: "account/withdraw", payload: amount };
// }

// export function requestloan(amount, purpose) {
//   return {
//     type: "account/requestLoan",
//     payload: { amount: amount, purpose: purpose },
//   };
// }
// export function payloan() {
//   return { type: "account/payloan" };
// }

// requestloan(state, action) {
//   if (state.loan > 0) return;
//   console.log("action", action);
//   state.loan = action.payload.data.loanAmount;
//   state.loanPurpose = action.payload.data.loanPurpose;
//   state.balance = state.balance + action.payload.data.loanAmount;
// },
