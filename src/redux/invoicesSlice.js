
import { createSlice } from '@reduxjs/toolkit';

const invoicesSlice = createSlice({
  name: 'invoices',
  initialState: [],
  reducers: {
    addInvoice: (state, action) => {
      state.push(action.payload);
    },
    deleteInvoice: (state, action) => {
      return state.filter((invoice) => invoice.id !== action.payload);
    },
    updateInvoice: (state, action) => {
      const { id, updatedInvoice } = action.payload;
      const index = state.findIndex((invoice) => invoice.id === id);
      if (index !== -1) {
        state[index] = updatedInvoice;
      }
    },
    bulkUpdate: (state, action) => {
      action.payload.forEach((updatedInvoice) => {
        const index = state.findIndex((invoice) => invoice.id === updatedInvoice.id);
        if (index !== -1) {
          state[index] = updatedInvoice;
        }
      });
    },
  },
});

export const {
  addInvoice,
  deleteInvoice,
  updateInvoice,
  bulkUpdate,
} = invoicesSlice.actions;

export const selectInvoiceList = (state) => state.invoices;

export default invoicesSlice.reducer;
