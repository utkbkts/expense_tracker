import useUserStore from "@/store/user.store";
import { Button } from "@headlessui/react";
import { useState } from "react";

const Accounts = () => {
  const { user } = useUserStore();

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenTopup, setIsOpenTopup] = useState(false);
  const [isOpenTransfer, setIsOpenTransfer] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState("");

  return (
    <div className="bg-black-400 min-h-screen text-white">
      <div className="container mx-auto pt-32">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl text-white">Account Information</h1>
          <div>
            <Button className="rounded bg-sky-600 px-4 py-2 text-sm text-white data-hover:bg-sky-500 data-hover:data-active:bg-sky-700 cursor-pointer">
              Save changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accounts;
