import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedPlan: null,
  isFromPricing: false,
};

const selectedPlanSlice = createSlice({
  name: 'selectedPlan',
  initialState,
  reducers: {
    setSelectedPlan: (state, action) => {
      state.selectedPlan = action.payload;
      state.isFromPricing = true;
    },
    clearSelectedPlan: (state) => {
      state.selectedPlan = null;
      state.isFromPricing = false;
    },
  },
});

export const { setSelectedPlan, clearSelectedPlan } = selectedPlanSlice.actions;
export default selectedPlanSlice.reducer;