import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { MdMoreVert } from "react-icons/md";

interface Props {
  addMoney: () => void;
  transferMoney: () => void;
}

const AccountMenu = ({ addMoney, transferMoney }: Props) => {
  return (
    <>
      <Menu as="div" className="fixed ">
        <MenuButton className="inline-flex w-full justify-center rounded-md text-sm font-medium text-gray-600">
          <MdMoreVert />
        </MenuButton>
        <MenuItems className="absolute p-2 right-0 mt-2 w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-black">
          <div className="px-1 py-1 space-y-2">
            <MenuItem>
              {({ active }) => (
                <button
                  onClick={transferMoney}
                  className={`${
                    active ? "bg-gray-100" : ""
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
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
                    active ? "bg-gray-100 text-red-600" : "text-red-600"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  Add Money
                </button>
              )}
            </MenuItem>
          </div>
        </MenuItems>
      </Menu>
    </>
  );
};

export default AccountMenu;
