import { cn } from "@/libs/utils";
import Loading from "../Loadind";

interface Props {
  text: React.ReactNode;
  type?: "submit" | "button";
  disabled?: boolean;
  loading?: boolean;
  className?:string;
  onClick?:()=>void;
}

const Button = ({ text, type = "submit", disabled = false, loading = false,className,onClick }: Props) => {
  return (
    <button
      className={cn("border border-gray-300 px-4 py-2 rounded-md cursor-pointer text-sm w-full active:scale-[0.98] hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed",className)}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {loading ? <div className="flex items-center justify-center w-full gap-2"><Loading/> Loading...</div> : text}
    </button>
  );
};

export default Button;
