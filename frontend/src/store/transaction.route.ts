import { axios } from "@/libs/axios";
import toast from "react-hot-toast";
import { create } from "zustand";

interface Transaction {
  id: string;
  amount: number;
  date: string;
  description: string;
}

interface TransactionStore {
  transaction: Transaction[];
  loading: boolean;
  getTransaction: (startDate: string, endDate: string, search: string) => Promise<void>;
}

const useTransactionStore = create<TransactionStore>((set) => ({
  transaction: [],
  loading: false,

  getTransaction: async (startDate, endDate, search) => {
    set({ loading: true });
    try {
      const response = await axios.get(`/transaction?df=${startDate}&dt=${endDate}&s=${search}`);
      const res = response.data;
      set({ transaction: res.data || [], loading: false });
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Bir hata oluştu");
      set({ loading: false, transaction: [] });
    }
  },
}));

export default useTransactionStore;
