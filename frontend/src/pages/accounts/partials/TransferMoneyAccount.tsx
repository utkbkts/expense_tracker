import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useAccountStore from "@/store/account.store";
import DialogWrapper from "@/components/DialogWrapper";
import { DialogPanel, DialogTitle } from "@headlessui/react";
import { MdOutlineWarning } from "react-icons/md";
import Input from "@/components/input/Input";
import Button from "@/components/button/Button";
import {
  AddMoneyAccountSchema,
  AddMoneyAccountType,
} from "@/schema/account.schema";
import { accountType } from "@/types/type";
import toast from "react-hot-toast";

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const TransferMoneyAccount = ({ isOpen, setIsOpen }: Props) => {
  const { account, loading, transferMoney } = useAccountStore();
  const [fromAccountInfo, setFromAccountInfo] = useState<accountType | null>(
    null
  );
  const [toAccountInfo, setToAccountInfo] = useState<accountType | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddMoneyAccountType>({
    resolver: zodResolver(AddMoneyAccountSchema),
  });

  const getAccountByName = (
    value: string,
    setter: (account: accountType | null) => void
  ) => {
    const data = account?.find(
      (acc: accountType) => acc?.account_name === value
    );
    setter(data || null);
  };

  const onClose = () => setIsOpen(false);
  const onSubmit = async (data: AddMoneyAccountType) => {
    if (!fromAccountInfo || !toAccountInfo) return;

    const newData = {
      from_account: fromAccountInfo?.id,
      to_account: toAccountInfo?.id,
      amount: Number(data.amount),
    };
    toast.success("Transfer money successfully!");
    window.location.reload();
    await transferMoney(newData);
    setIsOpen(false);
  };

  return (
    <DialogWrapper isOpen={isOpen} closeModal={onClose}>
      <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
        <DialogTitle
          as="h3"
          className="text-xl font-semibold text-gray-800 mb-6 text-center"
        >
          Transfer Money
        </DialogTitle>

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              From Account
            </label>
            <select
              className="border border-gray-300 rounded-lg py-2 px-3 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => {
                getAccountByName(e.target.value, setFromAccountInfo);
              }}
              defaultValue=""
            >
              <option value="" disabled>
                Select Account
              </option>
              {account?.map((acc: accountType) => (
                <option key={acc?.id} value={acc?.account_name}>
                  {acc?.account_name} {" - "}
                  {acc?.account_balance}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              To Account
            </label>
            <select
              className="border border-gray-300 rounded-lg py-2 px-3 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => {
                getAccountByName(e.target.value, setToAccountInfo);
              }}
              defaultValue=""
            >
              <option value="" disabled>
                To Account
              </option>
              {account?.map((acc: accountType) => (
                <option key={acc?.id} value={acc?.account_name}>
                  {acc?.account_name} {" - "}
                  {acc?.account_balance}
                </option>
              ))}
            </select>
          </div>

          {fromAccountInfo?.account_balance !== undefined &&
            fromAccountInfo?.account_balance <= 0 && (
              <div className="flex items-center gap-2 bg-yellow-400 text-black p-2 mt-6 rounded">
                <MdOutlineWarning size={30} />
                <span className="text-sm">
                  You can not transfer money from this account. Insufficient
                  account balance.
                </span>
              </div>
            )}

          <Input
            name="amount"
            label="Amount"
            placeholder="Enter amount"
            register={register}
            errors={errors?.amount}
            disabled={loading}
            type="number"
          />

          <div className="flex justify-end">
            <Button
              disabled={loading || !fromAccountInfo || !toAccountInfo}
              loading={loading}
              type="submit"
              text="Transfer"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </form>
      </DialogPanel>
    </DialogWrapper>
  );
};

export default TransferMoneyAccount;
