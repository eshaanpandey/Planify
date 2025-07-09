import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../../services/authService";

const saveToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const removeFromLocalStorage = (key) => {
  localStorage.removeItem(key);
};

const loadFromLocalStorage = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key)) || null;
  } catch {
    return null;
  }
};

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authService.login(credentials);
      if (!response.user || !response.token) {
        throw new Error("Invalid login response");
      }
      return response;
    } catch (error) {
    //   console.error("Login error in slice:", error);
      return rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

export const registerAdmin = createAsyncThunk(
  "auth/admin/register",
  async (data, { rejectWithValue }) => {
    try {
      const payload = { ...data, role: "admin" };
      const response = await authService.registerAdmin(payload);
      const { user, organizationId, token } = response.data;
      console.log("response in authSlices: ", response.data);
 
      if (!user || !organizationId) {
        throw new Error("Invalid admin registration response");
      }

      return { user, organizationId, token };
    } catch (error) {
      console.error("Admin registration failed:", error);
      return rejectWithValue(error.response?.data || "Admin registration failed");
    }
  }
);

export const registerSuperAdmin = createAsyncThunk(
  "auth/superadmin/register",
  async (data, { rejectWithValue }) => {
    try {
      const payload = { ...data, role: "superadmin" };
      const response = await authService.registerSuperAdmin(payload);
      const { user } = response.data;

      if (!user ) {
        throw new Error("Invalid superadmin registration response");
      }
      return { user };
    } catch (error) {
    //   console.error("SuperAdmin registration failed:", error);
      return rejectWithValue(error.response?.data || "SuperAdmin registration failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: loadFromLocalStorage("user"),
    token: loadFromLocalStorage("token"),
    organizationId: loadFromLocalStorage("organizationId"),
    status: {
      login: "idle",
      registerAdmin: "idle",
      registerSuperAdmin: "idle",
    },
    error: {
      login: null,
      registerAdmin: null,
      registerSuperAdmin: null,
    },
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.status = {
        login: "idle",
        registerAdmin: "idle",
        registerSuperAdmin: "idle",
      };
      state.error = {
        login: null,
        registerAdmin: null,
        registerSuperAdmin: null,
      };
      removeFromLocalStorage("user");
      removeFromLocalStorage("token");
    },
  },
  extraReducers: (builder) => {
    builder
      // Login user
      .addCase(loginUser.pending, (state) => {
        state.status.login = "loading";
        state.error.login = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status.login = "succeeded";
        const { user, token } = action.payload || {};
        state.user = user;
        state.token = token;
        saveToLocalStorage("user", user);
        saveToLocalStorage("token", token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status.login = "failed";
        state.error.login = action.payload;
      })
      // Register admin
      .addCase(registerAdmin.pending, (state) => {
        state.status.registerAdmin = "loading";
        state.error.registerAdmin = null;
      })
      .addCase(registerAdmin.fulfilled, (state, action) => {
        state.status.registerAdmin = "succeeded";
        const { user, organizationId, token } = action.payload || {};
        state.user = user;
        state.organizationId = organizationId;
        state.token = token;
        saveToLocalStorage("user", user);
        saveToLocalStorage("token", token);
        saveToLocalStorage("organizationId", organizationId);
      })
      .addCase(registerAdmin.rejected, (state, action) => {
        state.status.registerAdmin = "failed";
        state.error.registerAdmin = action.payload;
      })
      // Register superadmin
      .addCase(registerSuperAdmin.pending, (state) => {
        state.status.registerSuperAdmin = "loading";
        state.error.registerSuperAdmin = null;
      })
      .addCase(registerSuperAdmin.fulfilled, (state, action) => {
        state.status.registerSuperAdmin = "succeeded";
        const { user } = action.payload || {};
        state.user = user;
        saveToLocalStorage("user", user);
      })
      .addCase(registerSuperAdmin.rejected, (state, action) => {
        state.status.registerSuperAdmin = "failed";
        state.error.registerSuperAdmin = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
