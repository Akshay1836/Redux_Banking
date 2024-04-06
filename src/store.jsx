// import { applyMiddleware, combineReducers, createStore } from "redux";
// import { accountReducer } from "./Features/Account/AccountSlices";
// import CustomerReducer from "./Features/Customer/CustomerSlices";

// import { configureStore } from "@reduxjs/toolkit";

// const rootReducer = combineReducers({
//   account: accountReducer,
//   customer: CustomerReducer,
// });
// const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)));
// console.log(store.getState());
// export default store;


import account from "./Features/Account/AccountSlices";
import CustomerReducer from "./Features/Customer/CustomerSlices";

import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer:{
    account:account,
    customer:CustomerReducer
  }
})

console.log(store.getState());
export default store;