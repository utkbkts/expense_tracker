import { axios } from "@/libs/axios";
import { TransactionType } from "@/types/type";
import { create } from "zustand";


interface TransactionStore {
  transaction: TransactionType[] | any;
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
      set({ loading: false, transaction: [] });
    }
  },
}));

export default useTransactionStore;
