import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getBaseUrl } from "../../utils/getBaseUrl";
import axios from "axios";

// =================== Types =================== //

interface OsintPayload {
  name?: string;
  email?: string;
  phone?: string;
  username?: string;
}

interface OsintState {
  loading: boolean;
  data: any[] | null;
  error: string | null;
  status: "idle" | "pending" | "completed" | "failed";
}

// =================== Async Thunks =================== //

export const fetchOsintData = createAsyncThunk(
  "osint/fetchOsintData",
  async (payload: OsintPayload, { rejectWithValue }) => {
    try {
      const params: any = {};
      if (payload.name) params.name = payload.name;
      if (payload.email) params.email = payload.email;
      if (payload.phone) params.phone = payload.phone;
      if (payload.username) params.username = payload.username;

      const response = await axios.get(`${getBaseUrl()}/api/osint`, {
        params,
      });

      return response.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.error || err.message || "Request failed"
      );
    }
  }
);

// =================== Slice Definition =================== //

const initialState: OsintState = {
  loading: false,
  data: null,
  error: null,
  status: "idle",
};

const osintSlice = createSlice({
  name: "osint",
  initialState,

  reducers: {
    resetOsintState: (state) => {
      state.loading = false;
      state.data = null;
      state.error = null;
      state.status = "idle";
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchOsintData.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.data = null;
        state.status = "pending";
      })
      .addCase(fetchOsintData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data || [];
        state.status = action.payload.status || "completed";
      })
      .addCase(fetchOsintData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.status = "failed";
      });
  },
});

// =================== Exports =================== //

export const { resetOsintState } = osintSlice.actions;
export default osintSlice.reducer;
