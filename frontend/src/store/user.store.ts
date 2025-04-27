import { axios } from "@/libs/axios";
import { SignInType, SignUpType, updateUserType } from "@/types/type";
import toast from "react-hot-toast";
import { create } from "zustand";

interface userStoreType {
  user: updateUserType | null;
  loading: boolean;
  checkingAuth: boolean;
  signup: (user: SignUpType) => Promise<boolean>;
  signin: (user: SignInType) => Promise<boolean>;
  logout: () => void;
  getUser: () => Promise<void>;
  updateUser: (newData: updateUserType) => Promise<any>;
}

const useUserStore = create<userStoreType>((set) => ({
  user: null,
  loading: false,
  checkingAuth: true,

  signup: async (user: SignUpType) => {
    set({ loading: true });
    try {
      const response = await axios.post("/auth/sign-up", user);
      const res = response.data;
      set({ user: res.data, loading: false });
      toast.success("Sign up is successfully");
      return true;
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
      set({ loading: false });
      return false;
    }
  },

  signin: async (user: SignInType) => {
    set({ loading: true });
    try {
      const response = await axios.post("/auth/sign-in", user);
      const res = response.data;
      set({ user: res.data, loading: false });
      toast.success("Sign in is successfully");
      return true;
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
      set({ loading: false });
      return false;
    }
  },

  logout: async () => {
    set({ loading: true });
    try {
      const response = await axios.post("/auth/logout");
      const res = response.data;
      set({ user: res.data, loading: false });
      toast.success("Logout is successfully");
    } catch (error) {
      set({ loading: false });
    }
  },
  getUser: async () => {
    set({ checkingAuth: true });
    try {
      const response = await axios.get("/user");
      set({ user: response.data, checkingAuth: false });
    } catch (error: any) {
      set({ checkingAuth: false, user: null });
    }
  },
  updateUser: async (user: updateUserType) => {
    set({ loading: true });
    try {
      const response = await axios.put("/user", {...user});
      toast.success(response?.data?.message);
      set({ user: response.data, loading: false });
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
      set({ loading: false, user: null });
    }
  },
}));

export default useUserStore;
