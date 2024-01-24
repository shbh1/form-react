// formSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormDetail } from '../AppStore.type';

interface FormState {
  forms: FormDetail[];
}

const initialState: FormState = {
  forms: [],
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setForms: (state, action: PayloadAction<FormDetail[]>) => {
      state.forms = action.payload;
    },
  },
});

export const { setForms } = formSlice.actions;
export default formSlice.reducer;
