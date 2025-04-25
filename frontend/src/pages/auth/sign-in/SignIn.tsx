import google from "@/assets/auth/google.png";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/input/Input";
import { CreateSignInSchema, SignInSchema } from "@/schema/signin.schema";
import Button from "@/components/button/Button";
import { Link } from "react-router-dom";
const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignInSchema),
  });

  const onSubmit = (data: CreateSignInSchema) => {
    console.log(data);
  };

  return (
    <div className="bg-mint-500 min-h-screen w-full flex items-center justify-center">
      <div className="border border-gray-300 shadow-md w-[400px] h-full">
        <div className="p-4 flex flex-col items-center gap-8 justify-center">
          <h1 className="text-2xl">Sign In</h1>
          <div className="flex items-center gap-3 border border-gray-300 rounded-lg px-4 py-3 justify-center cursor-pointer hover:bg-blue-50 transition-all duration-200 shadow-sm hover:shadow-md active:scale-[0.98]">
            <img
              src={google}
              alt="Google"
              width={20}
              height={20}
              className="w-5 h-5"
            />
            <p className="text-sm font-medium text-gray-700">
              Continue with Google
            </p>
          </div>
          <div className="flex items-center w-full">
            <div className="flex-1 h-[1px] bg-gray-300"></div>{" "}
            <span className="text-sm text-gray-500 px-2">Or</span>{" "}
            <div className="flex-1 h-[1px] bg-gray-300"></div>{" "}
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <Input
              errors={errors?.email}
              register={register}
              name="email"
              label="Email"
              type="email"
              placeholder="Email"
            />
            <Input
              errors={errors?.password}
              register={register}
              name="password"
              label="Password"
              type="password"
              placeholder="Password"
            />
           
            <div className="mt-5 flex w-full">
              <Button text="Sign In" />
            </div>
          </form>
          <div className="">
              <span className="text-sm flex gap-1 items-center">
              Don't have an account?
                <Link to={"/sign-up"} className="text-blue-400 underline cursor-pointer">
                  Sign Up
                </Link>
              </span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
