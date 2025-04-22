import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getBaseUrl } from "../../utils/getBaseUrl";
import axios from "axios";

// =================== Types =================== //

interface WebutationFormPayload {
  [key: string]: any;
}

interface WebutationFormState {
  loading: boolean;
  success: boolean;
  attachmentUrl: string | null;
  error: string | null;
  status: "idle" | "pending" | "completed" | "failed";
}

// =================== Async Thunk =================== //

export const submitWebutationForm = createAsyncThunk(
  "webutationForm/submitWebutationForm",
  async (formData: WebutationFormPayload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${getBaseUrl()}/api/webutation-form`,
        formData
      );
      return response.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.error || err.message || "Submission failed"
      );
    }
  }
);

// =================== Slice Definition =================== //

const initialState: WebutationFormState = {
  loading: false,
  success: false,
  attachmentUrl: null,
  error: null,
  status: "idle",
};

const webutationFormSlice = createSlice({
  name: "webutationForm",
  initialState,

  reducers: {
    resetWebutationFormState: (state) => {
      state.loading = false;
      state.success = false;
      state.attachmentUrl = null;
      state.error = null;
      state.status = "idle";
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(submitWebutationForm.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.status = "pending";
      })
      .addCase(submitWebutationForm.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.attachmentUrl = action.payload.attachmentUrl || null;
        state.status = "completed";
      })
      .addCase(submitWebutationForm.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
        state.status = "failed";
      });
  },
});

// =================== Exports =================== //

export const { resetWebutationFormState } = webutationFormSlice.actions;
export default webutationFormSlice.reducer;
