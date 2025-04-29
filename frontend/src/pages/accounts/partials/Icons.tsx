import { FaBtc, FaPaypal } from "react-icons/fa";
import { RiVisaLine } from "react-icons/ri";
import { GiCash } from "react-icons/gi";

export const Icons = {
  crypto: (
    <div className="w-12 h-12 bg-amber-600 text-white flex items-center justify-center rounded-full">
      <FaBtc size={26} />
    </div>
  ),
  "visa debit card": (
    <div className="w-12 h-12 bg-blue-600 text-white flex items-center justify-center rounded-full">
      <RiVisaLine size={26} />
    </div>
  ),
  cash: (
    <div className="w-12 h-12 bg-rose-600 text-white flex items-center justify-center rounded-full">
      <GiCash size={26} />
    </div>
  ),
  paypal: (
    <div className="w-12 h-12 bg-rose-600 text-white flex items-center justify-center rounded-full">
      <FaPaypal size={26} />
    </div>
  ),
};
