import { useEffect, useState } from "react";
import useUserStore from "@/store/user.store";
import { Button } from "@headlessui/react";
import { MdAdd, MdVerifiedUser } from "react-icons/md";
import useAccountStore from "@/store/account.store";
import { getAccountIcon } from "@/helpers/helper";
import AccountMenu from "./partials/AccountMenu";
import AddAccount from "./partials/AddAccount";
import AddMoneyAccount from "./partials/AddMoneyAccount";

const Accounts = () => {
  const { user } = useUserStore();
  const { account, getAccount } = useAccountStore();
  useEffect(() => {
    getAccount();
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenTopup, setIsOpenTopup] = useState(false);
  const [isOpenTransfer, setIsOpenTransfer] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState("");

  const handleOpenAddMoney = (el: any) => {
    setSelectedAccount(el?.id);
    setIsOpenTopup(true);
  };

  const handleTransferMoney = (el: any) => {
    setSelectedAccount(el?.id);
    setIsOpenTopup(true);
  };
  return (
    <>
      <div className="bg-black-400 min-h-screen text-white">
        <div className="container mx-auto pt-32">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl text-white">Account Information</h1>
            <div>
              <Button
                onClick={() => setIsOpen(!isOpen)}
                className="rounded bg-sky-600 px-4 py-2 text-sm text-white data-hover:bg-sky-500 data-hover:data-active:bg-sky-700 cursor-pointer flex items-center gap-2"
              >
                <MdAdd size={20} /> <span>Add</span>
              </Button>
            </div>
          </div>
        </div>
        {!account ? (
          <div className="w-full flex items-center justify-center py-10 text-gray-600 text-lg">
            <span>No Account Found</span>
          </div>
        ) : (
          <div className="w-full grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-4 py-10 gap-6 p-4">
            {account?.map((item: any) => (
              <div
                key={item._id}
                className="w-full h-48 flex gap-4 bg-gray-50 p-3 rounded shadow"
              >
                <div>
                  {getAccountIcon(item?.account_name) ?? (
                    <div className="w-12 h-12 bg-gray-300 rounded-full" />
                  )}
                  <div className="space-y-2 w-full">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <p className="text-black">{item?.account_name}</p>
                        <MdVerifiedUser
                          size={26}
                          className="text-emerald-600 ml-1"
                        />
                      </div>
                      {isOpen && (
                        <AccountMenu
                          addMoney={() => handleOpenAddMoney(item)}
                          transferMoney={() => handleTransferMoney(item)}
                        />
                      )}
                    </div>
                    <span className="text-gray-600 font-light leading-loose">
                      {item?.account_number}
                    </span>
                    <p className="text-xs text-gray-600">
                      {new Date(item?.createdat).toLocaleDateString("en-US", {
                        dateStyle: "full",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isOpen && <AddAccount isOpen={isOpen} setIsOpen={setIsOpen} />}
      <AddMoneyAccount
        isOpen={isOpenTopup}
        setIsOpen={setIsOpenTopup}
        id={selectedAccount}
      />
    </>
  );
};

export default Accounts;
