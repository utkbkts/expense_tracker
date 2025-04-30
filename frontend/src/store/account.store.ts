import { axios } from "@/libs/axios";
import { accountType } from "@/types/type";
import toast from "react-hot-toast";
import { create } from "zustand";

interface accountStoreType {
  account: accountType | null;
  loading: boolean;
  getAccount: () => Promise<void>;
}

const accountStore = create<accountStoreType>((set) => ({
  account: null,
  loading: false,

  getAccount: async () => {
    try {
      const response = await axios.get("/account");
      const res = response.data;
      set({ account: res.data, loading: false });
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
      set({ loading: false, account: null });
    }
  },
}));

export default accountStore;
