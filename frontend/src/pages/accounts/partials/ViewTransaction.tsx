import DialogWrapper from "@/components/DialogWrapper";
import { TransactionType } from "@/types/type";
import { DialogPanel, DialogTitle } from "@headlessui/react";
import { PiSealCheckFill } from "react-icons/pi";

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  data: TransactionType | any;
}

const ViewTransaction = ({ isOpen, setIsOpen, data }: Props) => {
  console.log("🚀 ~ ViewTransaction ~ data:", data)
  function closeModal() {
    setIsOpen(false);
  }

  const longDateString = new Date(data?.createdat).toLocaleDateString(
    "en-US",
    {
      dateStyle: "full",
    }
  );

  const longTimeString = new Date(data?.createdat).toLocaleTimeString(
    "en-US"
  );

  return (
    <DialogWrapper isOpen={isOpen} closeModal={closeModal}>
      <DialogPanel
        className={
          "w-full max-w-md transform overflow-hidden rounded-2xl bg-white"
        }
      >
        <DialogTitle
          as={"h3"}
          className={
            "text-lg font-medium leading-6 text-gray-900 mb-4 uppercase"
          }
        >
          Transaction Detail
        </DialogTitle>
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-gray-600 border-y border-gray-400">
            <p>{data?.source}</p>
            <PiSealCheckFill size={30} className="text-emerald-500 ml-4" />
          </div>
          <div className="mb-10">
            <p className="text-xl text-black">{data?.description}</p>
            {longDateString} - {longTimeString}
          </div>
        </div>

        <div className="mt-10 mb-3 flex justify-between">
          <p className="text-2xl font-bold">
            <span
              className={`${
                data?.type === "income"
                  ? "text-emerald-600"
                  : "text-red-600"
              } font-bold ml-1`}
            >
              {data?.type === "income" ? "+" : "-"}
              {data?.amount}
            </span>
          </p>
          <button
            className="rounded-md outline-none bg-violet-800 px-4 py-2 text-sm font-medium text-white cursor-pointer"
            onClick={closeModal}
            type="button"
          >
            Got it, thanks!
          </button>
        </div>
      </DialogPanel>
    </DialogWrapper>
  );
};

export default ViewTransaction;
