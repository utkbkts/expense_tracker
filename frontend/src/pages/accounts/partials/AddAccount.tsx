import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import useAccountStore from "@/store/account.store";
import DialogWrapper from "@/components/DialogWrapper";
import { DialogPanel, DialogTitle } from "@headlessui/react";
import { MdOutlineWarning } from "react-icons/md";

interface AccountType {
  id: number;
  title: string;
}

const accounts: AccountType[] = [
  {
    id: 1,
    title: "Cash",
  },
  {
    id: 2,
    title: "Crypto",
  },
  {
    id: 3,
    title: "Paypal",
  },
  {
    id: 4,
    title: "Visa Debit Card",
  },
];

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const AddAccount = ({ isOpen, setIsOpen }: Props) => {
  const { account, loading } = useAccountStore();
  const [selectedAccount, setSelectedAccount] = useState(accounts[0].title);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const onClose = () => {
    setIsOpen(false);
  };
  const onSubmit = () => {};

  return (
    <DialogWrapper isOpen={isOpen} closeModal={onClose}>
      <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
        <DialogTitle
          as="h3"
          className="text-xl font-semibold text-gray-800 mb-6 text-center"
        >
          Add New Account
        </DialogTitle>

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Select Account
            </label>
            <select
              className="border border-gray-300 rounded-lg py-2 px-3 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedAccount}
              onChange={(e) => setSelectedAccount(e.target.value)}
            >
              {accounts.map((acc) => (
                <option key={acc.id} value={acc.title}>
                  {acc.title}
                </option>
              ))}
            </select>
          </div>

          {account?.some((a) => a.account_name === selectedAccount) && (
            <div className="flex items-center gap-2 bg-yellow-400 text-black p-2 mt-6 rounded">
              <MdOutlineWarning size={30} />
              <span className="text-sm">
                This account has already been activated. Try another one. Thank
                you.
              </span>
            </div>
          )}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Add Account
            </button>
          </div>
        </form>
      </DialogPanel>
    </DialogWrapper>
  );
};

export default AddAccount;
