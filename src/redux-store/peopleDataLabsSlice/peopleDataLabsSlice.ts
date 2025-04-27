// =================== peopleDataLabsSlice.ts =================== //

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getBaseUrl } from "../../utils/getBaseUrl";
import axios from "axios";

// =================== Types =================== //

interface PeopleDataLabsPayload {
  name?: string;
  phone?: string;
  country?: string;
  size?: number;
  dataset?: string;
  titlecase?: boolean;
  pretty?: boolean;
}

interface PeopleDataLabsState {
  loading: boolean;
  data: any[] | null;
  error: string | null;
  status: "idle" | "pending" | "completed" | "failed";
}

// =================== Async Thunks =================== //

// POST request (send fields like name, phone, country directly)
export const fetchPeopleDataLabs = createAsyncThunk(
  "peopleDataLabs/fetchPeopleDataLabs",
  async (payload: PeopleDataLabsPayload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${getBaseUrl()}/api/people/search`,
        payload
      );
      return response.data;
    } catch (err: any) {
      const message =
        err.response?.data?.error?.message ||
        err.response?.data?.message ||
        err.message ||
        "Request failed";
      return rejectWithValue(message);
    }
  }
);

// GET request (simple search by passing params)
export const fetchPeopleDataLabsSimple = createAsyncThunk(
  "peopleDataLabs/fetchPeopleDataLabsSimple",
  async (payload: PeopleDataLabsPayload, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${getBaseUrl()}/api/people/search-simple`,
        {
          params: payload,
        }
      );
      return response.data;
    } catch (err: any) {
      const message =
        err.response?.data?.error?.message ||
        err.response?.data?.message ||
        err.message ||
        "Request failed";
      return rejectWithValue(message);
    }
  }
);

// =================== Slice Definition =================== //

const initialState: PeopleDataLabsState = {
  loading: false,
  data: null,
  error: null,
  status: "idle",
};

const peopleDataLabsSlice = createSlice({
  name: "peopleDataLabs",
  initialState,

  reducers: {
    resetPeopleDataLabsState: (state) => {
      state.loading = false;
      state.data = null;
      state.error = null;
      state.status = "idle";
    },
  },

  extraReducers: (builder) => {
    builder
      // For POST
      .addCase(fetchPeopleDataLabs.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.data = null;
        state.status = "pending";
      })
      .addCase(fetchPeopleDataLabs.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data || [];
        state.status = "completed";
      })
      .addCase(fetchPeopleDataLabs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.status = "failed";
      })

      // For GET
      .addCase(fetchPeopleDataLabsSimple.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.data = null;
        state.status = "pending";
      })
      .addCase(fetchPeopleDataLabsSimple.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data || [];
        state.status = "completed";
      })
      .addCase(fetchPeopleDataLabsSimple.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.status = "failed";
      });
  },
});

// =================== Exports =================== //

export const { resetPeopleDataLabsState } = peopleDataLabsSlice.actions;
export default peopleDataLabsSlice.reducer;
