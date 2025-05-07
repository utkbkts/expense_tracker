import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useAccountStore from "@/store/account.store";
import DialogWrapper from "@/components/DialogWrapper";
import { DialogPanel, DialogTitle } from "@headlessui/react";
import Input from "@/components/input/Input";
import Button from "@/components/button/Button";
import {
  AddMoneyAccountSchema,
  AddMoneyAccountType,
} from "@/schema/account.schema";

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  id: string;
}

const AddMoneyAccount = ({ isOpen, setIsOpen, id }: Props) => {
  const { addMoneyAccount, loading } = useAccountStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(AddMoneyAccountSchema),
  });

  const submitHandler = async (data: AddMoneyAccountType) => {
    const newData = {
      id,
      amount: data.amount,
    };
    window.location.reload();
    await addMoneyAccount(newData);
  };
  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <DialogWrapper isOpen={isOpen} closeModal={onClose}>
      <DialogPanel
        className={
          "w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-black"
        }
      >
        <DialogTitle
          as={"h3"}
          className={
            "text-lg font-medium leading-6 mb-4 uppercase text-gray-600"
          }
        >
          Add Money To Account
        </DialogTitle>
        <form className="space-y-6" onSubmit={handleSubmit(submitHandler)}>
          <Input
            type="number"
            name="amount"
            label="Amount"
            placeholder="amount"
            register={register}
            disabled={loading}
            errors={errors?.amount}
          />
          <div className="flex justify-end">
            <Button
              disabled={loading}
              loading={loading}
              type="submit"
              text={"Add Money Account"}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </form>
      </DialogPanel>
    </DialogWrapper>
  );
};

export default AddMoneyAccount;
