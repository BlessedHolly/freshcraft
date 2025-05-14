import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ErrorItem = {
  id: number;
  errorText: string;
  success?: boolean;
};

const initialState: ErrorItem[] = [];

const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    setAttention: (
      state,
      action: PayloadAction<{ errorText: string; success?: boolean }>
    ) => {
      state.unshift({
        id: Date.now(),
        errorText: action.payload.errorText,
        success: action.payload.success,
      });
    },
    removeAttention: (state, action: PayloadAction<number>) => {
      return state.filter((item) => item.id !== action.payload);
    },
  },
});

export const { setAttention, removeAttention } = errorSlice.actions;
export default errorSlice;
