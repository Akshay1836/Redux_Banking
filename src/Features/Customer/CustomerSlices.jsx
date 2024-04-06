import { createSlice } from "@reduxjs/toolkit";
const customerState = {
  name: "",
  nationalID: "",
  createdAt: "",
};

export const CustomerSlice=createSlice({
  name:"CustomerReducer",
  initialState:customerState,
  reducers:{
    add(state,action){
      state.name=action.payload.data.fullName;
      state.nationalID= action.payload.data.nationalId;
    },
    addName(state,action){
      state.name=action.payload.name
    }
  }
})

export const {add,addName}=CustomerSlice.actions;
export default CustomerSlice.reducer;

// const customerState = {
//   name: "",
//   nationalID: "",
//   createdAt: "",
// };
// // customer reducer creation
// export default function CustomerReducer(state = customerState, action) {
//   switch (action.type) {
//     case "customer/add":
//       return {
//         ...state,
//         name: action.payload.name,
//         nationalID: action.payload.nationalID,
//         createdAt: action.payload.createdAt,
//       };
//     case "customer/addName":
//       return { ...state, name: action.customer.name };
//     default:
//       return state;
//   }
// }

// //action creators for customer
// export function addCustomer(name, nationalID) {
//   return { type: "customer/add", payload: { name, nationalID } };
// }

// export function addName(name) {
//   return { type: "customer/addName", payload: name };
// }
