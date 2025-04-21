interface Props {
  text: React.ReactNode;
  type?: "submit" | "button";
}

const Button = ({ text, type = "submit" }: Props) => {
  return <button className="border border-gray-300 px-4 py-2 rounded-md cursor-pointer text-sm w-full active:scale-[0.98] hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md" type={type}>{text}</button>;
};

export default Button;
