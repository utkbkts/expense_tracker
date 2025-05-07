import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { MdMoreVert } from "react-icons/md";

interface Props {
  addMoney: () => void;
  transferMoney: () => void;
  deleteAccount: () => void;
}

const AccountMenu = ({ addMoney, transferMoney,deleteAccount }: Props) => {
  return (
    <Menu as="div" className="relative">
      <MenuButton className="inline-flex justify-center items-center rounded-md text-sm font-medium text-gray-600 cursor-pointer">
        <MdMoreVert size={24} className="text-gray-600" />
      </MenuButton>
      <MenuItems className="absolute right-0 mt-2 w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-md ring-1 ring-gray-200 ring-opacity-50 focus:outline-none text-black z-10">
        <div className="px-2 py-1 ">
          <MenuItem>
            {({ active }) => (
              <button
                onClick={transferMoney}
                className={`${
                  active ? "bg-gray-100 text-gray-900 cursor-pointer" : "text-gray-600"
                } group flex w-full items-center rounded-md px-4 py-2 text-sm transition-colors`}
              >
                Transfer Funds
              </button>
            )}
          </MenuItem>
          <MenuItem>
            {({ active }) => (
              <button
                onClick={addMoney}
                className={`${
                  active ? "bg-gray-100 text-red-600 cursor-pointer" : "text-red-600"
                } group flex w-full items-center rounded-md px-4 py-2 text-sm transition-colors`}
              >
                Add Money
              </button>
            )}
          </MenuItem>
          <MenuItem>
            {({ active }) => (
              <button
                onClick={deleteAccount}
                className={`${
                  active ? "bg-gray-100 text-red-600 cursor-pointer" : "text-red-600"
                } group flex w-full items-center rounded-md px-4 py-2 text-sm transition-colors`}
              >
                Delete Account
              </button>
            )}
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
};

export default AccountMenu;
