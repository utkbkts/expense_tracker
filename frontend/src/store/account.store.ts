import { axios } from "@/libs/axios";
import { accountType } from "@/types/type";
import toast from "react-hot-toast";
import { create } from "zustand";

interface accountStoreType {
  account: accountType[];
  loading: boolean;
  getAccount: () => Promise<void>;
  createAccount: (newData: any) => Promise<any>;
}

const useAccountStore = create<accountStoreType>((set) => ({
  account: [],
  loading: false,

  getAccount: async () => {
    set({ loading: true });
    try {
      const response = await axios.get("/account");
      const res = response.data;
      set({ account: res.data, loading: false });
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
      set({ loading: false, account: [] });
    }
  },
  createAccount: async (newData) => {
    set({ loading: true });
    try {
      const response = await axios.post("/account/create", newData);
      const newAccount = response.data.data;
  
      set((state) => ({
        account: [...state.account, newAccount],
        loading: false,
      }));
  
      toast.success("Account created successfully!");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      set({ loading: false });
    }
  }
  
}));

export default useAccountStore;
