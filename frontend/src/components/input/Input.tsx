interface Props {
  errors?: {
    message?: string;
  };
  register: any;
  name: string;
  label: string;
  type: string;
  placeholder: string;
  disabled?: boolean;
}

const Input = ({
  errors,
  register,
  type = "text",
  name,
  label,
  placeholder,
  disabled=false
}: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="mt-2 text-sm">{label}</label>
      <div className="relative group">
        <input
          type={type}
          name={name}
          {...register(name)}
          disabled={disabled}
          placeholder={placeholder}
          className="py-2 px-2 w-full  outline-none bg-transparent border-b-gray-300 border-b text-sm"
        />
        <span className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-blue-400 transition-all duration-300 group-focus-within:left-0 group-focus-within:w-1/2"></span>
        <span className="absolute bottom-0 right-1/2 w-0 h-[2px] bg-blue-400 transition-all duration-300 group-focus-within:right-0 group-focus-within:w-1/2"></span>
      </div>
      {errors && (
        <span className="text-red-500 text-xs">{errors?.message}</span>
      )}
    </div>
  );
};

export default Input;
