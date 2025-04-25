import { axios } from "@/libs/axios";
import { SignUpType } from "@/types/type";
import toast from "react-hot-toast";
import { create } from "zustand";

interface userStoreType {
    user: SignUpType | null;
    loading: boolean;
    signup: (user: SignUpType) => Promise<void>;
  }
  
  const useUserStore = create<userStoreType>((set) => ({
    user: null,
    loading: false,
  
    signup: async (user: SignUpType) => {
      set({ loading: true });
      try {
        const response = await axios.post("/auth/sign-up", user);
        const res = response.data;
        set({ user: res.data, loading: false });
        toast.success("Sign up is successfully")
      } catch (error:any) {
        toast.error(error?.response?.data?.message)
        set({ loading: false });
      }
    },
  }));

export default useUserStore;
